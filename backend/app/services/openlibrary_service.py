import httpx
import requests
import asyncio

BASE_URL = "https://openlibrary.org"

class OpenLibraryService:

    # 🔍 SEARCH BOOKS (Updated with limit and specific fields)
    async def search_books(self, query: str):
        async with httpx.AsyncClient() as client:
            try:
                res = await client.get(
                    f"{BASE_URL}/search.json",
                    params={
                        "q": query,
                        "limit": 10,  # ⚡ fast response
                        "fields":"title,author_name,first_publish_year,cover_i,key,ratings_average"
                    },
                    timeout=3.0
                )
                data = res.json()
                return data.get("docs", [])
            except Exception:
                return []

    # 📖 FULL BOOK DETAILS
    async def get_full_book(self, work_id: str):
        loop = asyncio.get_event_loop()

        # Normalize work_id
        if not work_id.startswith("/works/"):
            work_id = f"/works/{work_id}"

        def fetch_work():
            url = f"{BASE_URL}{work_id}.json"
            return requests.get(url, timeout=5).json()

        def fetch_editions():
            url = f"{BASE_URL}{work_id}/editions.json"
            return requests.get(url, timeout=5).json()

        # Run blocking requests in parallel executors
        work = await loop.run_in_executor(None, fetch_work)
        editions_data = await loop.run_in_executor(None, fetch_editions)

        # ✅ DESCRIPTION EXTRACTION
        description = None
        work_desc = work.get("description")
        if isinstance(work_desc, dict):
            description = work_desc.get("value")
        else:
            description = work_desc

        # ✅ PUBLICATION EXTRACTION
        publication = "UNKNOWN"
        publish_year = None
        editions = editions_data.get("entries", [])

        if editions:
            ed = editions[0]
            if ed.get("publishers"):
                publication = ed["publishers"][0]
            publish_year = ed.get("publish_date")

        return {
            "title": work.get("title"),
            "description": description,
            "publications": publication,
            "publish_year": publish_year,
            "cover": f"https://covers.openlibrary.org/b/id/{work.get('covers', [None])[0]}-L.jpg"
                     if work.get("covers") else None
        }