from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # gemini authenticating key
    GEMINI_API_KEY: str
    # Default LLM model
    LLM_MODEL: str = "gemini-1.5-flash"
    # Base LLM url
    LLM_API_BASE: str = "https://generativelanguage.googleapis.com/v1beta/models"

    class Config:
        env_file = ".env"
        extra = "allow"
        
settings = Settings()
