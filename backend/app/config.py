import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

class Settings(BaseSettings):
    GEMINI_API_KEY: str
    FIREBASE_CREDENTIAL_PATH: Optional[str] = "/etc/secrets/firebase-service-account.json"
    MODEL_NAME: str = "gemini-1.5-flash-lite"
    PORT: int = 8000

    # Pydantic Settings will look for these in the environment
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
