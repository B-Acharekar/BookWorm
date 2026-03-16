import asyncio
from olclient.openlibrary import OpenLibrary

class OpenLibraryService:
    def __init__(self):
        self.ol = OpenLibrary()

    async def search_books(self, title: str):
        """Search for books by title."""
        # OpenLibrary-client might not be fully async, wrapping in run_in_executor if needed
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self.ol.Work.search, title)

    async def get_author_by_name(self, name: str):
        """Get author details by name."""
        loop = asyncio.get_event_loop()
        author_olid = await loop.run_in_executor(None, self.ol.Author.get_olid_by_name, name)
        if author_olid:
            return await loop.run_in_executor(None, self.ol.get, author_olid)
        return None

    async def get_edition(self, edition_id: str):
        """Get edition details by OLID."""
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self.ol.Edition.get, edition_id)

    async def get_work(self, work_id: str):
        """Get work details by OLID."""
        loop = asyncio.get_event_loop()
        return await loop.run_in_executor(None, self.ol.Work.get, work_id)
