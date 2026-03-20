from datetime import datetime # Change this
import os
import firebase_admin
from firebase_admin import credentials, firestore
from typing import List, Dict, Any

class FirebaseService:
    def __init__(self):
        cred_path = os.path.join(os.getcwd(), "bookworm_firebase_admin.json")
        if not firebase_admin._apps:
            cred = credentials.Certificate(cred_path)
            firebase_admin.initialize_app(cred)
        self.db = firestore.client()

    def get_user_reading_history(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch reading history for a user."""
        docs = self.db.collection("reading_history").where("userId", "==", user_id).stream()
        return [doc.to_dict() for doc in docs]

    def add_to_reading_history(self, user_id: str, book_id: str, status: str):
        """Add a book to user's reading history."""
        self.db.collection("reading_history").add({
            "userId": user_id,
            "bookId": book_id,
            "status": status,
            "timestamp": firestore.SERVER_TIMESTAMP
        })

    def get_bookmarks(self, user_id: str) -> List[Dict[str, Any]]:
        """Fetch bookmarks for a user."""
        docs = self.db.collection("bookmarks").where("userId", "==", user_id).stream()
        return [doc.to_dict() for doc in docs]

    def add_bookmark(self, user_id: str, book_id: str):
        """Add a bookmark for a user."""
        self.db.collection("bookmarks").add({
            "userId": user_id,
            "bookId": book_id,
            "timestamp": firestore.SERVER_TIMESTAMP
        })
    def get_cached_events(self, pincode: str):
        """Fetch events for a specific pincode if they were updated this month."""
        current_month = datetime.now().strftime("%Y-%m")
        docs = self.db.collection("event_cache") \
            .where("pincode", "==", pincode) \
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