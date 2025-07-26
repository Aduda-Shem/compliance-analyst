from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    LLM_API_KEY: str
    LLM_MODEL: str
    LLM_API_BASE: str

    class Config:
        env_file = ".env"

settings = Settings()
