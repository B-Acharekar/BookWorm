import os
import google.generativeai as genai
from typing import List, Dict, Any

class GeminiService:
    def __init__(self):
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.model_name = os.getenv("MODEL_NAME", "gemini-1.5-flash-lite")
        self.model = genai.GenerativeModel(self.model_name)

    async def generate_content(self, prompt: str) -> str:
        """Generate content using Gemini model."""
        # Using async generate_content
        response = await self.model.generate_content_async(prompt)
        return response.text

    async def rank_recommendations(self, books: List[Dict[str, Any]], user_history: List[str]) -> List[Dict[str, Any]]:
        """Rank books based on user history."""
        prompt = f"""
        User Reading History: {user_history}
        Potential Recommendations: {books}
        
        Rank the top 5 books from the list that best match the user's history. 
        Return only a JSON list of book titles.
        """
        response_text = await self.generate_content(prompt)
        # Parse logic would go here, maybe more robust in the agent itself
        return response_text

    async def summarize_events(self, events: List[Dict[str, Any]]) -> str:
        """Summarize Mumbai book events."""
        prompt = f"Summarize the following book events in Mumbai concisely: {events}"
        return await self.generate_content(prompt)
