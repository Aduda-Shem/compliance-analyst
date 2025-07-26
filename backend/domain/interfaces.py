from abc import ABC, abstractmethod

class LLMClientInterface(ABC):
    @abstractmethod
    async def generate_answer(self, prompt: str) -> str:
        pass
