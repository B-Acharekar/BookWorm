from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any, Optional
from app.services.firebase_service import FirebaseService
from pydantic import BaseModel

router = APIRouter(prefix="/api/admin", tags=["Admin"])
firebase = FirebaseService()

class RoleUpdate(BaseModel):
    email: str
    role: str

class EventCreate(BaseModel):
    title: str
    description: str
    location: str
    date: str
    link: Optional[str] = None
    createdBy: str

# --- USER MANAGEMENT ---

@router.get("/users")
async def get_all_users():
    """List all registered users and their roles."""
    try:
        return firebase.list_all_users()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/role/{uid}")
async def get_user_role(uid: str):
    """Fetch a user's role by UID. Public-ish for AuthContext."""
    try:
        role = firebase.get_user_role(uid)
        return {"uid": uid, "role": role}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/users/{uid}/role")
async def update_user_role(uid: str, data: RoleUpdate):
    """Update a user's role (admin/user)."""
    try:
        firebase.set_user_role(uid, data.email, data.role)
        return {"message": f"Role updated to {data.role} for {data.email}"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- EVENT MANAGEMENT ---

@router.get("/events")
async def get_admin_events():
    """Fetch all manually created events."""
    try:
        return firebase.get_manual_events()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/events")
async def create_new_event(event: EventCreate):
    """Create a new literary event manually."""
    try:
        event_id = firebase.create_event(event.dict())
        return {"message": "Event created successfully", "id": event_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/events/{eid}")
async def delete_event(eid: str):
    """Remove an event record."""
    try:
        firebase.delete_event(eid)
        return {"message": "Event deleted"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
