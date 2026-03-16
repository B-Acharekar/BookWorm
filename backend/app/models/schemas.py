from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class BookRecommendation(BaseModel):
    title: str
    author: str
    cover_id: Optional[str] = None
    reason: str

class RecommendationResponse(BaseModel):
    recommendations: List[BookRecommendation]

class BookEvent(BaseModel):
    title: str
    location: str
    date: str
    description: str
    relevance_score: float

class EventsResponse(BaseModel):
    events: List[BookEvent]

class SaleDeal(BaseModel):
    store: str
    description: str
    deal_type: str
    link: Optional[str] = None

class SalesResponse(BaseModel):
    sales: List[SaleDeal]

class ChatResponse(BaseModel):
    answer: str
    context: Optional[Dict[str, Any]] = None

class AgentState(BaseModel):
    query: str
    intent: Optional[str] = None
    history: Optional[List[Dict[str, str]]] = None
    context: Optional[Dict[str, Any]] = {}
    response: Optional[Dict[str, Any]] = None
