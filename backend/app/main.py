from fastapi import FastAPI
from app.routes import recommendation_routes
from app.config import settings
import uvicorn

from dotenv import load_dotenv
import os

from pathlib import Path

env_path = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=env_path)

print("ENV PATH:", os.getenv("FIREBASE_CREDENTIAL_PATH"))
app = FastAPI(title="Bookworm Backend API")

# For simplicity, I'm mounting all routes in one file as per the pattern
app.include_router(recommendation_routes.router)

@app.get("/")
async def root():
    return {"message": "Welcome to Bookworm Backend API"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=settings.PORT, reload=True)
