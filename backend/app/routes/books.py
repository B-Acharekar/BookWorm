from fastapi import APIRouter, HTTPException
from app.services.openlibrary_service import OpenLibraryService
from app.services.firebase_service import FirebaseService
from app.models.schemas import StatusUpdateRequest, ReviewRequest, FavoriteRequest
from rapidfuzz import fuzz

router = APIRouter()
service = OpenLibraryService()
firebase = FirebaseService()

# 🔍 SEARCH BOOKS
@router.get("/search")
async def search_books(query: str):
    try:
        books = await service.search_books(query)
        for b in books:
            # FIX: Changed from b["work_key"] to b["id"]
            local_rating = firebase.get_average_rating(b["id"])
            if local_rating:
                b["rating"] = local_rating
        return {"results": books}
    except Exception as e:
        # This will now print the actual error in your terminal if it fails again
        print(f"Router Search Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# 📖 BOOK DETAILS
@router.get("/book/{work_id:path}")
async def get_book_details(work_id: str):
    try:
        # The service now correctly handles raw IDs
        book = await service.get_full_book(work_id)
        if not book:
            raise HTTPException(status_code=404, detail="Book not found")
        
        # Merge local rating
        raw_id = work_id.replace("/works/", "")
        local_rating = firebase.get_average_rating(raw_id)
        if local_rating:
            book["rating"] = local_rating
        return book
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# 📚 USER LIBRARY MANAGEMENT
@router.get("/library/{user_id}")
async def get_library(user_id: str):
    return {"books": firebase.get_user_library(user_id)}

@router.post("/status")
async def update_status(req: StatusUpdateRequest):
    firebase.update_book_status(req.user_id, req.book_id, req.book_data, req.status, req.is_favorite)
    return {"message": "Status updated"}

@router.post("/favorite")
async def toggle_favorite(req: FavoriteRequest):
    firebase.toggle_favorite(req.user_id, req.book_id, req.is_favorite)
    return {"message": "Favorite toggled"}


# ⭐ REVIEWS & RATINGS
@router.get("/reviews/{book_id}")
async def get_reviews(book_id: str):
    return {"reviews": firebase.get_book_reviews(book_id)}

@router.post("/review")
async def add_review(req: ReviewRequest):
    firebase.add_review(req.user_id, req.book_id, req.rating, req.comment, req.user_name)
    return {"message": "Review added"}
