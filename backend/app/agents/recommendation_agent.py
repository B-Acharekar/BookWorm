from app.models.schemas import AgentState
from app.services.openlibrary_service import OpenLibraryService
from app.services.gemini_service import GeminiService
from app.services.firebase_service import FirebaseService
import os
import json

ol_service = OpenLibraryService()
gemini_service = GeminiService()
firebase_service = FirebaseService()

async def recommendation_agent(state: AgentState):
    """
    Fetches user history, gets candidates from OpenLibrary, 
    and uses Gemini to rank them.
    """
    user_id = state.context.get("user_id", "test_user")
    history = firebase_service.get_user_library(user_id)
    
    # Extract titles for context
    past_titles = [doc.get("title", "Unknown") for doc in history]
    
    # Simple candidate fetching: search for one of the genres in history
    search_query = "fiction" 
    if past_titles:
        # Implementation could be smarter: extract genres from past_titles
        search_query = past_titles[0]

    works = await ol_service.search_books(search_query)
    candidates = []
    if works:
        for work in works[:10]: # Top 10 candidates
            candidates.append({
                "title": work.title,
                "author": ", ".join([a.name for a in work.authors]) if hasattr(work, "authors") else "Unknown"
            })

    # Gemini Ranking
    prompt_path = os.path.join("app", "prompts", "recommendation_prompt.txt")
    with open(prompt_path, "r") as f:
        system_prompt = f.read()
    
    ranking_prompt = f"{system_prompt}\nUser History: {past_titles}\nCandidates: {candidates}"
    response = await gemini_service.generate_content(ranking_prompt)
    
    # Robust JSON parsing
    try:
        cleaned = response.replace("```json", "").replace("```", "").strip()
        data = json.loads(cleaned)
        state.response = {"recommendations": data.get("recommendations", data) if isinstance(data, dict) else data}
    except:
        state.response = {"recommendations": []}
        
    return state
