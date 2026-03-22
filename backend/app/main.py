from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from dotenv import load_dotenv
import os
from pathlib import Path

from app.routes import recommendation_routes, books, admin
from app.config import settings

# Load environment variables
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

app = FastAPI(title="Bookworm Backend API")

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # No 403 blocks during initial Render rollout
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(recommendation_routes.router)
app.include_router(books.router, prefix="/api/books", tags=["Books"])
app.include_router(admin.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Bookworm Backend API"}

@app.get("/health")
async def health_check():
    return {"status": "ok"}

if __name__ == "__main__":
    # Ensure the app reads from os.environ.get("PORT", 8000) via settings
    port = int(os.environ.get("PORT", settings.PORT))
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)