from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class QueryRequest(BaseModel):
    question: str
    session_id: Optional[int] = None

class QueryResponse(BaseModel):
    answer: str
    session_id: int

class ChatMessageCreate(BaseModel):
    content: str
    is_user: bool = True

class ChatMessageResponse(BaseModel):
    id: int
    content: str
    is_user: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class ChatSessionCreate(BaseModel):
    title: str

class ChatSessionResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: Optional[datetime]
    is_active: bool
    messages: List[ChatMessageResponse] = []
    
    class Config:
        from_attributes = True

class ChatSessionListResponse(BaseModel):
    id: int
    title: str
    created_at: datetime
    updated_at: Optional[datetime]
    message_count: int
    
    class Config:
        from_attributes = True
