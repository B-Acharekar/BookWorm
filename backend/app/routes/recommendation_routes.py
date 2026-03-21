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
async def get_events(location: str = "Mumbai"):
    state = AgentState(query=f"Upcoming book events in {location}", context={"location": location})
    result = await bookworm_graph.ainvoke(state)
    return result["response"]
