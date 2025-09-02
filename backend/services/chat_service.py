from sqlalchemy.orm import Session
from domain.models import ChatSession, ChatMessage
from schemas.query import ChatSessionCreate, ChatSessionResponse, ChatMessageResponse, ChatSessionListResponse
from typing import List, Optional
from datetime import datetime

class ChatService:
    def __init__(self, db: Session):
        # Inject database session
        self.db = db
    
    def create_session(self, title: str) -> ChatSessionResponse:
        # Create a new chat session
        session = ChatSession(title=title)
        self.db.add(session)
        self.db.commit()
        self.db.refresh(session)
        return ChatSessionResponse.from_orm(session)
    
    def get_session(self, session_id: int) -> Optional[ChatSessionResponse]:
        # Fetch a single session
        session = self.db.query(ChatSession).filter(ChatSession.id == session_id).first()
        if session:
            return ChatSessionResponse.from_orm(session)
        return None
    
    def get_all_sessions(self) -> List[ChatSessionListResponse]:
        # Get all active sessions, ordered by last update
        sessions = (
            self.db.query(ChatSession)
            .filter(ChatSession.is_active == True)
            .order_by(ChatSession.updated_at.desc())
            .all()
        )
        result = []
        for session in sessions:
            message_count = len(session.messages) 
            result.append(ChatSessionListResponse(
                id=session.id,
                title=session.title,
                created_at=session.created_at,
                updated_at=session.updated_at,
                message_count=message_count
            ))
        return result
    
    def add_message(self, session_id: int, content: str, is_user: bool = True) -> ChatMessageResponse:
        # Add a message to a chat session
        message = ChatMessage(
            session_id=session_id,
            content=content,
            is_user=is_user
        )
        self.db.add(message)
        
        # Update session's last updated timestamp
        session = self.db.query(ChatSession).filter(ChatSession.id == session_id).first()
        if session:
            session.updated_at = datetime.utcnow()
        
        self.db.commit()
        self.db.refresh(message)
        return ChatMessageResponse.from_orm(message)
    
    def get_session_messages(self, session_id: int) -> List[ChatMessageResponse]:
        # Get all messages from a given session, ordered by creation time
        messages = (
            self.db.query(ChatMessage)
            .filter(ChatMessage.session_id == session_id)
            .order_by(ChatMessage.created_at)
            .all()
        )
        return [ChatMessageResponse.from_orm(msg) for msg in messages]
    
    def delete_session(self, session_id: int) -> bool:
        # delete a session
        session = self.db.query(ChatSession).filter(ChatSession.id == session_id).first()
        if session:
            session.is_active = False
            self.db.commit()
            return True
        return False 
