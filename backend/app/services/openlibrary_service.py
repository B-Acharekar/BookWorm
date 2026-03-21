import httpx
import asyncio

BASE_URL = "https://openlibrary.org"

class OpenLibraryService:
    # 🔍 SEARCH BOOKS (Gallery/List View)
    async def search_books(self, query: str):
        async with httpx.AsyncClient() as client:
            try:
                res = await client.get(
                    f"{BASE_URL}/search.json",
                    params={
                        "q": query,
                        "limit": 15,
                        "fields": "title,author_name,first_publish_year,cover_i,key,ratings_average,subject"
                    },
                    timeout=10.0
                )
                data = res.json()
                docs = data.get("docs", [])
                
                processed = []
                for doc in docs:
                    key = doc.get("key", "")
                    work_id = key.replace("/works/", "")
                    processed.append({
                        "id": work_id,
                        "bookId": work_id, # Matches your React frontend's case-sensitivity
                        "title": doc.get("title", "Not available"),
                        "author": ", ".join(doc.get("author_name", [])) if doc.get("author_name") else "Unknown Author",
                        "publishedDate": str(doc.get("first_publish_year", "N/A")),
                        "coverImage": f"https://covers.openlibrary.org/b/id/{doc.get('cover_i')}-L.jpg" if doc.get("cover_i") else None,
                        "rating": round(doc.get("ratings_average", 0), 1),
                        "genres": doc.get("subject", [])[:3]
                    })
                return processed
            except Exception as e:
                print(f"Search Error: {e}")
                return []

    # 👤 PRIVATE HELPER: Fetch Author Name from Key
    async def _get_author_name(self, client, author_key):
        try:
            res = await client.get(f"{BASE_URL}{author_key}.json", timeout=5.0)
            if res.status_code == 200:
                return res.json().get("name", "Unknown Author")
        except:
            pass
        return "Unknown Author"

    # 📖 FULL BOOK DETAILS (Single Book View)
    async def get_full_book(self, work_id: str):
        # Normalize ID
        api_work_id = work_id if work_id.startswith("/works/") else f"/works/{work_id}"
        raw_id = work_id.replace("/works/", "")

        async with httpx.AsyncClient() as client:
            try:
                url = f"{BASE_URL}{api_work_id}.json"
                res = await client.get(url, timeout=10.0)
                if res.status_code != 200: 
                    return None
                
                work = res.json()

                # 1. FIX: Description (String vs Dict)
                desc_raw = work.get("description", "Description not available.")
                if isinstance(desc_raw, dict):
                    description = desc_raw.get("value", "Description not available.")
                else:
                    description = desc_raw

                # 2. FIX: Author Name (Fetch if key exists)
                author_names = "Unknown Author"
                authors_list = work.get("authors", [])
                if authors_list:
                    # Get the first author's key and fetch their name
                    first_author_key = authors_list[0].get("author", {}).get("key")
                    if first_author_key:
                        author_names = await self._get_author_name(client, first_author_key)

                # 3. FIX: Genres (Subjects)
                genres = work.get("subjects") or work.get("subject") or []

                # 4. FIX: Published Date (Using 'created' as source of truth for Works)
                pub_date = work.get("first_publish_date")
                if not pub_date and "created" in work:
                    # Extract '2020' from '2020-08-28T19:49:24.483076'
                    created_val = work["created"].get("value", "")
                    if created_val:
                        pub_date = created_val[:4]

                # External Links
                title_slug = work.get("title", "").replace(" ", "+")

                return {
                    "id": raw_id,
                    "bookId": raw_id,
                    "title": work.get("title", "Not available"),
                    "author": author_names,
                    "description": description,
                    "genres": genres[:10], # Increased limit for Detail page
                    "publishedDate": pub_date or "N/A",
                    "coverImage": f"https://covers.openlibrary.org/b/id/{work.get('covers', [None])[0]}-L.jpg"
                                  if work.get("covers") else None,
                    "rating": 4.5, # Default placeholder for detail view
                    "readLink": f"https://openlibrary.org/works/{raw_id}",
                    "buyLink": f"https://www.amazon.in/s?k={title_slug}+book"
                }
            except Exception as e:
                print(f"Error fetching book details: {e}")
                return None