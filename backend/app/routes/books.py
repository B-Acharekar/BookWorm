from fastapi import APIRouter, HTTPException
from app.services.openlibrary_service import OpenLibraryService
from rapidfuzz import fuzz

router = APIRouter()
service = OpenLibraryService()

# 🔍 SEARCH BOOKS (With Smart Scoring & Ratings)
@router.get("/search")
async def search_books(query: str):
    try:
        results = await service.search_books(query)
        q = query.lower()

        # 🔥 SMART SCORING FUNCTION
        def score(book):
            title = book.get("title", "").lower()

            # 1. Exact match gets highest priority
            if title == q:
                return 100

            # 2. Simple partial match (substring)
            if q in title:
                return 80

            # 3. Fuzzy match (handles typos or close variations)
            # partial_ratio is great for finding 'Harry Potter' inside longer titles
            return fuzz.partial_ratio(q, title)

        # 🔥 SORT RESULTS by score (highest first)
        sorted_books = sorted(results, key=score, reverse=True)

        books = []
        for b in sorted_books[:10]:
            books.append({
                "title": b.get("title"),
                "author": ", ".join(b.get("author_name", [])) if b.get("author_name") else "Unknown",
                "publish_year": b.get("first_publish_year"),
                "cover": f"https://covers.openlibrary.org/b/id/{b.get('cover_i')}-M.jpg"
                         if b.get("cover_i") else None,
                "work_key": b.get("key"),

                # ⭐ NEW: Ratings (rounded to 1 decimal place)
                "rating": round(b.get("ratings_average", 0), 1)
                           if b.get("ratings_average") else None
            })

        return {"results": books}

    except Exception as e:
        # It's helpful to log 'e' here for debugging
        raise HTTPException(status_code=500, detail=str(e))


# 📖 BOOK DETAILS (DESCRIPTION + PUBLICATION)
@router.get("/book/{work_id:path}") # Added :path to allow IDs like /works/OL123W
async def get_book_details(work_id: str):
    try:
        book = await service.get_full_book(work_id)

        if not book:
            raise HTTPException(status_code=404, detail="Book not found")

        return book

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))