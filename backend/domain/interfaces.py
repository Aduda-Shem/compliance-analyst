from abc import ABC, abstractmethod

class LLMClientInterface(ABC):
    @abstractmethod
    async def generate_answer(self, prompt: str) -> str:
        pass

# Gemini
class GeminiLLMClient(LLMClientInterface):
    async def generate_answer(self, prompt: str) -> str:
        return f"Gemini response to: {prompt}"


# OpenAI
class OpenAILLMClient(LLMClientInterface):
    async def generate_answer(self, prompt: str) -> str:
        return f"OpenAI response to: {prompt}"


# Anthropic
class AnthropicLLMClient(LLMClientInterface):
    async def generate_answer(self, prompt: str) -> str:
        return f"Anthropic response to: {prompt}"
