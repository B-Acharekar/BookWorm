from app.models.schemas import AgentState
from app.services.gemini_service import GeminiService
import os
import json

gemini_service = GeminiService()

async def events_agent(state: AgentState):
    """
    Summarizes Mumbai book events from curated sources.
    """
    # Mock curated events data - in real app, fetch from JSON or DB
    mumbai_events = [
        {"title": "Kala Ghoda Arts Festival", "date": "Feb 2026", "location": "Kala Ghoda"},
        {"title": "Tata Literature Live!", "date": "Nov 2025", "location": "NCPA/Prithvi"},
        {"title": "Author Meet at Kitab Khana", "date": "Every Saturday", "location": "Fort"}
    ]
    
    prompt_path = os.path.join("app", "prompts", "events_prompt.txt")
    with open(prompt_path, "r") as f:
        system_prompt = f.read()
    
    event_prompt = f"{system_prompt}\nEvents: {mumbai_events}\nUser Query: {state.query}"
    response = await gemini_service.generate_content(event_prompt)
    
    state.response = {"events": response}
    return state
