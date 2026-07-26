import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Zoom Clone"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./zoom.db")
    BACKEND_CORS_ORIGINS = [
        "http://localhost:3000",
        "https://your-project.vercel.app",
    ]
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
