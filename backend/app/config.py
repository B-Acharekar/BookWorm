import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    FIREBASE_CREDENTIAL_PATH = os.getenv("FIREBASE_CREDENTIAL_PATH")
    MODEL_NAME = os.getenv("MODEL_NAME", "gemini-1.5-flash-lite")
    PORT = int(os.getenv("PORT", 8000))

settings = Config()
