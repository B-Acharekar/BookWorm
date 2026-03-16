from app.models.schemas import AgentState
from app.services.gemini_service import GeminiService
import os

gemini_service = GeminiService()

async def sales_agent(state: AgentState):
    """
    Summarizes Mumbai bookstore sales.
    """
    # Mock curated sales data
    sales_data = [
        {"store": "Crossword", "offer": "Buy 2 Get 1 on Fiction", "location": "Kemps Corner"},
        {"store": "Title Waves", "offer": "Flat 20% off on Bestsellers", "location": "Bandra"}
    ]
    
    prompt_path = os.path.join("app", "prompts", "sales_prompt.txt")
    with open(prompt_path, "r") as f:
        system_prompt = f.read()
    
    sales_prompt = f"{system_prompt}\nSales: {sales_data}\nUser Query: {state.query}"
    response = await gemini_service.generate_content(sales_prompt)
    
    state.response = {"sales": response}
    return state
