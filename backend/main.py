from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from core.logger import logger
from core.database import engine, Base
from api.v1.query_router import router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Compliance Assistant",
    description="AI-powered compliance assistant for SMEs with chat history",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api/v1", tags=["Query"])

logger.info("FastAPI app started.")
