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
    elif any(k in query for k in ["event", "fair", "festival", "litfest", "signing", "mumbai"]):
        state.intent = "events"
    elif any(k in query for k in ["sale", "deal", "discount", "promotion", "crossword", "title waves"]):
        state.intent = "sales"
    else:
        state.intent = "chat"
    
    return state
