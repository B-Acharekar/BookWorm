import json
import os
import re
from google import genai
from google.genai import types
from dotenv import load_dotenv
from typing import List, Dict, Any
from datetime import datetime

load_dotenv()

class GeminiService:
    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if not self.api_key:
            raise ValueError("❌ API KEY NOT FOUND - Check your .env file")
        
        self.client = genai.Client(api_key=self.api_key)
        self.model_name = os.getenv("MODEL_NAME", "gemini-2.0-flash-lite")

    async def generate_content(self, prompt: str, use_search: bool = False) -> str:
        """Async call with Google Search Grounding."""
        tools = [types.Tool(google_search=types.GoogleSearch())] if use_search else None
        
        config = types.GenerateContentConfig(
            tools=tools,
            response_mime_type="application/json"
        )

        try:
            response = await self.client.aio.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=config
            )
            return response.text if response.text else '{"events": []}'
        except Exception as e:
            print(f"❌ Gemini Error: {e}")
            return '{"events": []}'

    async def fetch_real_events(self, location_name: str):
        """Fetches live events with strict geographical boundaries."""
        today = datetime.now().strftime("%B %d, %Y")
        
        # We force the search tool to focus ONLY on the specific city/area
        search_queries = [
            f"current book events in {location_name} March 2026",
            f"literary meetups in {location_name} this week",
            f"site:bookmyshow.com {location_name} events",
            f"site:allevents.in {location_name} poetry"
        ]

        final_prompt = f"""
        SYSTEM: You are a LOCAL EVENT SCRAPER.
        USER LOCATION: {location_name}
        DATE: {today}

        CRITICAL INSTRUCTIONS:
        1. EXECUTE SEARCH for: {search_queries}
        2. DO NOT return results from Mumbai/Kala Ghoda if the location is {location_name}.
        3. ONLY return events occurring in 2026.
        4. If you cannot find a specific event in {location_name}, look in the immediate parent city.
        5. NO 'Every Saturday' or 'Weekly' placeholder text.
        6. Return ONLY valid JSON.

        OUTPUT FORMAT:
        {{
          "events": [
            {{
              "title": "string",
              "location": "string (must include city name)",
              "date": "DD Month YYYY",
              "description": "string",
              "relevance_score": float
            }}
          ]
        }}
        """

        print(f"🤖 Searching specifically for: {location_name}")
        response_text = await self.generate_content(final_prompt, use_search=True)

        try:
            cleaned = re.sub(r"```json|```", "", response_text).strip()
            parsed = json.loads(cleaned)
            events = parsed.get("events", [])
            
            # PASS THE TARGET LOCATION TO THE VALIDATOR
            return self.validate_events(events, location_name)
        except:
            return []

    def validate_events(self, events: List[Dict], target_city: str):
        """Hard-filters results to ensure they aren't Mumbai leftovers."""
        valid = []
        # Keywords to identify the target area
        city_slug = target_city.lower().split(',')[0].strip() 

        for e in events:
            date_str = str(e.get("date", "")).lower()
            loc_str = str(e.get("location", "")).lower()
            title_str = str(e.get("title", "")).lower()

            # 1. Year Check
            if "2026" not in date_str:
                continue

            # 2. Placeholder Check (Kills 'Every Saturday')
            if any(x in date_str for x in ["every", "weekly", "daily"]):
                continue

            # 3. GEOGRAPHICAL FENCE (The 'Anti-Mumbai' Filter)
            # If we are looking for Gurgaon, and the result is in Mumbai/Fort/Kala Ghoda, KILL IT.
            mumbai_indicators = ["mumbai", "fort", "kala ghoda", "kitab khana", "ncpa", "colaba"]
            if any(m in loc_str or m in title_str for m in mumbai_indicators):
                if "mumbai" not in target_city.lower():
                    print(f"🚩 Dropping Mumbai result found during {target_city} search")
                    continue

            # 4. Content Check
            if len(str(e.get("description", ""))) > 5:
                valid.append(e)

        valid.sort(key=lambda x: x.get("relevance_score", 0), reverse=True)
        return valid[:5]