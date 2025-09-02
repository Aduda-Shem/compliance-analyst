from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from pydantic_settings import BaseSettings
import os

# Define database config using Pydantic settings
class DatabaseSettings(BaseSettings):
    # db url
    database_url: str = "postgresql://postgres:password@localhost:5432/compliance_assistant"
    
    class Config:
        env_file = ".env"
        extra = "ignore"  

# Create Setting instance
settings = DatabaseSettings()

# create SQLAlchemy Engine
engine = create_engine(settings.database_url)

# session factory for DB operations
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all ORM models
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
