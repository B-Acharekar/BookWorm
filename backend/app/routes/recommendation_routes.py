from fastapi import APIRouter
from app.models.schemas import AgentState
from app.agents.graph import bookworm_graph

router = APIRouter()

@router.get("/recommendations")
async def get_recommendations(user_id: str = "test_user"):
    state = AgentState(query="Give me book recommendations", context={"user_id": user_id})
    result = await bookworm_graph.ainvoke(state)
    return result["response"]

@router.get("/events")
async def get_events(query: str = "Upcoming book events in Mumbai"):
    state = AgentState(query=query)
    result = await bookworm_graph.ainvoke(state)
    return result["response"]

@router.get("/book-sales")
async def get_sales(query: str = "Mumbai bookstore sales"):
    state = AgentState(query=query)
    result = await bookworm_graph.ainvoke(state)
    return result["response"]

@router.post("/chat")
async def chat(query: str, user_id: str = "test_user"):
    state = AgentState(query=query, context={"user_id": user_id})
    result = await bookworm_graph.ainvoke(state)
    return result["response"]
