import httpx
from fastapi import HTTPException
from core.config import settings
from domain.interfaces import LLMClientInterface
from core.logger import logger

class GeminiLLMClient(LLMClientInterface):
    def generate_answer(self, prompt: str) -> str:
        url = f"{settings.LLM_API_BASE}/{settings.LLM_MODEL}:generateContent"
        headers = {"Content-Type": "application/json"}
        payload = {
            "contents": [{"parts": [{"text": prompt}]}]
        }

        try:
            with httpx.Client(timeout=30.0) as client:
                response = client.post(
                    url, 
                    headers=headers, 
                    json=payload, 
                    params={"key": settings.LLM_API_KEY}
                )
                response.raise_for_status()
                data = response.json()
                return data["candidates"][0]["content"]["parts"][0]["text"]
        except Exception as e:
            logger.exception("LLM request failed")
            raise HTTPException(status_code=500, detail="LLM service unavailable")
