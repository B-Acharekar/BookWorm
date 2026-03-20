from fastapi import APIRouter
from app.services.gemini_service import GeminiService

router = APIRouter()
gemini = GeminiService()

@router.get("/")
async def get_events(location: str):
    """
    Fetches real-time events for a specific location name.
    Strictly Live: No Cache, No Defaults.
    """
    print(f"🤖 Fetching LIVE AI results for: {location}")
    
    # Trigger the live search using the location passed from frontend
    ai_response = await gemini.fetch_real_events(location_name=location)

    return {
        "events": ai_response, 
        "source": "ai_fresh_live",
        "requested_location": location
    }