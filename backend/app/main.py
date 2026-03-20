from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import recommendation_routes
from app.routes import books
from app.config import settings

import uvicorn
from dotenv import load_dotenv
import os
from pathlib import Path

# Load env
env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

print("ENV PATH:", os.getenv("FIREBASE_CREDENTIAL_PATH"))
print("KEY DEBUG:", os.getenv("GEMINI_API_KEY"))
app = FastAPI(title="Bookworm Backend API")

# 🔥🔥🔥 ADD THIS (CORS FIX)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # ⚠️ For dev only (later restrict)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(recommendation_routes.router)
app.include_router(books.router, prefix="/api/books", tags=["Books"])

@app.get("/")
async def root():
    return {"message": "Welcome to Bookworm Backend API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)