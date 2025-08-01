from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from schemas.query import QueryRequest, QueryResponse, ChatSessionCreate, ChatSessionResponse, ChatSessionListResponse
from services.query_service import QueryService
from services.chat_service import ChatService
from infrastructure.llm_client import GeminiLLMClient
from core.database import get_db

router = APIRouter()

#Router functions 
def get_query_service(db: Session = Depends(get_db)):
    chat_service = ChatService(db)
    return QueryService(llm_client=GeminiLLMClient(), chat_service=chat_service)

def get_chat_service(db: Session = Depends(get_db)):
    return ChatService(db)

@router.post("/query", response_model=QueryResponse)
async def ask_question(payload: QueryRequest, service: QueryService = Depends(get_query_service)):
    answer, session_id = await service.get_answer(payload.question, payload.session_id)
    return QueryResponse(answer=answer, session_id=session_id)

@router.post("/sessions", response_model=ChatSessionResponse)
async def create_session(payload: ChatSessionCreate, service: ChatService = Depends(get_chat_service)):
    return service.create_session(payload.title)

@router.get("/sessions", response_model=list[ChatSessionListResponse])
async def get_sessions(service: ChatService = Depends(get_chat_service)):
    return service.get_all_sessions()

@router.get("/sessions/{session_id}", response_model=ChatSessionResponse)
async def get_session(session_id: int, service: ChatService = Depends(get_chat_service)):
    session = service.get_session(session_id)
    return session

@router.delete("/sessions/{session_id}")
async def delete_session(session_id: int, service: ChatService = Depends(get_chat_service)):
    success = service.delete_session(session_id)
    return {"message": "Session deleted successfully"}

