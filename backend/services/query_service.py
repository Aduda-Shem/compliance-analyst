from utils.prompt_builder import build_prompt
from domain.interfaces import LLMClientInterface
from services.chat_service import ChatService
from sqlalchemy.orm import Session
from typing import Optional

class QueryService:
    def __init__(self, llm_client: LLMClientInterface, chat_service: ChatService):
        self.llm_client = llm_client
        self.chat_service = chat_service

    async def get_answer(self, question: str, session_id: Optional[int] = None) -> tuple[str, int]:
        # If no session_id, create a new session
        if not session_id:
            session_title = question[:50] + "..." if len(question) > 50 else question
            session = self.chat_service.create_session(session_title)
            session_id = session.id
        
        # Add user message to session
        self.chat_service.add_message(session_id, question, is_user=True)
        
        # Get conversation history for context
        messages = self.chat_service.get_session_messages(session_id)
        conversation_history = []
        for msg in messages[:-1]: 
            role = "user" if msg.is_user else "assistant"
            conversation_history.append(f"{role}: {msg.content}")
        
        # Build prompt with conversation history
        prompt = build_prompt(question, conversation_history)
        
        # Get answer from LLM
        answer = self.llm_client.generate_answer(prompt)
        
        # Add assistant response to session
        self.chat_service.add_message(session_id, answer, is_user=False)
        
        return answer, session_id

