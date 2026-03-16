from app.models.schemas import AgentState
from app.services.gemini_service import GeminiService
import os

gemini_service = GeminiService()

async def chat_agent(state: AgentState):
    """
    General purpose chat assistant.
    """
    prompt_path = os.path.join("app", "prompts", "chat_prompt.txt")
    with open(prompt_path, "r") as f:
        system_prompt = f.read()
    
    chat_prompt = f"{system_prompt}\nUser Query: {state.query}"
    if state.context:
         chat_prompt += f"\nContext: {state.context}"
         
    response = await gemini_service.generate_content(chat_prompt)
    
    state.response = {"answer": response}
    return state
