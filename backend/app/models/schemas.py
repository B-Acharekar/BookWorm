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

class ReviewRequest(BaseModel):
    user_id: str
    user_name: Optional[str] = "Anonymous"
    book_id: str
    rating: float = Field(..., ge=0, le=5)
    comment: str

class StatusUpdateRequest(BaseModel):
    user_id: str
    book_id: str
    status: str
    book_data: Optional[Dict[str, Any]] = None
    is_favorite: Optional[bool] = False

class FavoriteRequest(BaseModel):
    user_id: str
    book_id: str
    is_favorite: bool
