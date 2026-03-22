from datetime import datetime # Change this
import os
import firebase_admin
from firebase_admin import credentials, firestore
from typing import List, Dict, Any

class FirebaseService:
    def __init__(self):
        from app.config import settings
        
        # Use the path from settings, which defaults to the Render secret path
        cred_path = settings.FIREBASE_CREDENTIAL_PATH
        
        if not firebase_admin._apps:
            if cred_path and os.path.exists(cred_path):
                cred = credentials.Certificate(cred_path)
                firebase_admin.initialize_app(cred)
            else:
                # Fallback for local development if the primary path doesn't exist
                local_path = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "bookworm_firebase_admin.json")
                if os.path.exists(local_path):
                    cred = credentials.Certificate(local_path)
                    firebase_admin.initialize_app(cred)
                else:
                    print(f"WARNING: Firebase credentials not found at {cred_path} or {local_path}")
        
        self.db = firestore.client()
        self.user_books = "user_books"
        self.reviews = "reviews"
        self.event_cache = "event_cache"

    def get_user_library(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch all books in the user's library."""
        docs = self.db.collection("users").document(user_id).collection("books").stream()
        return [doc.to_dict() for doc in docs]

    def update_book_status(self, user_id: str, book_id: str, book_data: Dict[str, Any], status: str, is_favorite: bool = False):
        """Add or update a book's status in the user's library subcollection with full metadata."""
        book_ref = self.db.collection("users").document(user_id).collection("books").document(book_id)
        
        # Prepare the base data object
        data = {
            "bookId": book_id,
            "title": book_data.get("title", "Untitled"),
            "author": book_data.get("author", "Unknown Author"),
            "cover": book_data.get("cover") or book_data.get("coverImage"),
            "status": status,
            "isFavorite": is_favorite,
            "rating": book_data.get("rating"),
            "genres": book_data.get("genres", []),
            "updatedAt": firestore.SERVER_TIMESTAMP
        }
        
        # Check if it's a new entry to add createdAt
        doc = book_ref.get()
        if not doc.exists:
            data["createdAt"] = firestore.SERVER_TIMESTAMP
        
        # Using set with merge=True ensures we update what's changed or create if missing
        book_ref.set(data, merge=True)

    def toggle_favorite(self, user_id: str, book_id: str, is_favorite: bool):
        """Toggle the isFavorite status of a book."""
        book_ref = self.db.collection("users").document(user_id).collection("books").document(book_id)
        book_ref.update({
            "isFavorite": is_favorite,
            "updatedAt": firestore.SERVER_TIMESTAMP
        })

    def get_average_rating(self, book_id: str) -> float:
        """Calculate average rating from all user reviews for a book."""
        reviews = self.db.collection(self.reviews).where("bookId", "==", book_id).stream()
        ratings = [r.to_dict().get("rating") for r in reviews if r.to_dict().get("rating")]
        if not ratings:
            return 0.0
        return round(sum(ratings) / len(ratings), 1)

    def get_book_reviews(self, book_id: str) -> List[Dict[str, Any]]:
        """Fetch all reviews for a specific book."""
        docs = self.db.collection(self.reviews).where("bookId", "==", book_id).order_by("timestamp", direction=firestore.Query.DESCENDING).stream()
        return [doc.to_dict() for doc in docs]

    def add_review(self, user_id: str, book_id: str, rating: float, comment: str, user_name: str = "Anonymous"):
        """Add a rating and comment for a book."""
        self.db.collection(self.reviews).add({
            "userId": user_id,
            "userName": user_name,
            "bookId": book_id,
            "rating": rating,
            "comment": comment,
            "timestamp": firestore.SERVER_TIMESTAMP
        })

    def get_cached_events(self, pincode_or_loc: str):
        """Fetch events for a specific location if they were updated this month."""
        current_month = datetime.now().strftime("%Y-%m")
        docs = self.db.collection(self.event_cache) \
            .where("location", "==", pincode_or_loc) \
            .where("month", "==", current_month).stream()
        
        events = [doc.to_dict().get("events") for doc in docs]
        return events[0] if events else None

    def cache_events(self, pincode: str, events: List[Dict]):
        """Store AI-fetched events in Firestore."""
        current_month = datetime.now().strftime("%Y-%m")
        self.db.collection("event_cache").add({
            "pincode": pincode,
            "month": current_month,
            "events": events,
            "createdAt": firestore.SERVER_TIMESTAMP
        })

    # --- ADMIN: USER MANAGEMENT ---

    def get_user_role(self, user_id: str) -> str:
        """Fetch user role from Firestore. Defaults to 'user' if not set."""
        doc = self.db.collection("users").document(user_id).get()
        if doc.exists:
            return doc.to_dict().get("role", "user")
        return "user"

    def set_user_role(self, user_id: str, email: str, role: str):
        """Assign a role to a user."""
        self.db.collection("users").document(user_id).set({
            "email": email,
            "role": role,
            "updatedAt": firestore.SERVER_TIMESTAMP
        }, merge=True)

    def list_all_users(self) -> List[Dict[str, Any]]:
        """List all users for the admin panel."""
        docs = self.db.collection("users").stream()
        return [{"uid": doc.id, **doc.to_dict()} for doc in docs]

    def remove_user_record(self, user_id: str):
        """Remove a user's role/metadata record from Firestore."""
        self.db.collection("users").document(user_id).delete()

    # --- ADMIN: MANUAL EVENT MANAGEMENT ---

    def create_event(self, event_data: Dict[str, Any]):
        """Manually create a literary event."""
        event_ref = self.db.collection("events").document()
        data = {
            "id": event_ref.id,
            "title": event_data.get("title"),
            "description": event_data.get("description"),
            "location": event_data.get("location"),
            "date": event_data.get("date"),
            "link": event_data.get("link"),
            "createdBy": event_data.get("createdBy"),
            "isManual": True,
            "createdAt": firestore.SERVER_TIMESTAMP
        }
        event_ref.set(data)
        return event_ref.id

    def update_event(self, event_id: str, event_data: Dict[str, Any]):
        """Update an existing event."""
        self.db.collection("events").document(event_id).update({
            **event_data,
            "updatedAt": firestore.SERVER_TIMESTAMP
        })

    def delete_event(self, event_id: str):
        """Permanently remove an event from the manual collection."""
        self.db.collection("events").document(event_id).delete()

    def get_manual_events(self) -> List[Dict[str, Any]]:
        """Fetch all manually created events."""
        docs = self.db.collection("events").order_by("date").stream()
        return [doc.to_dict() for doc in docs]