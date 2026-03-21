from app.models.schemas import AgentState

async def router_node(state: AgentState):
    """
    Decides which agent to route the query to based on intent.
    Simple keyword-based routing to save Gemini requests, 
    but can be upgraded to LLM-based if complex.
    """
    query = state.query.lower()
    
    if any(k in query for k in ["recommend", "suggest", "read like", "similar to"]):
        state.intent = "recommendation"
    elif any(k in query for k in ["event", "fair", "festival", "litfest", "signing"]):
        state.intent = "events"
    else:
        state.intent = "recommendation" # Default to recommendation
    
    return state
