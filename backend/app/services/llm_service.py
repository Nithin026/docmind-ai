from ollama import chat

from app.core.config import settings
from app.core.logging import logger
from app.services.memory_service import memory_service


class LLMService:

    def generate_answer(
        self,
        question: str,
        context: str,
    ) -> str:

        history = memory_service.get_history()

        messages = [
            {
                "role": "system",
                "content": (
                    "You are a helpful AI assistant that answers questions ONLY "
                    "using the provided document context.\n\n"
                    "Rules:\n"
                    "1. Do not use outside knowledge.\n"
                    "2. If the answer is not present in the context, reply exactly:\n"
                    "'I couldn't find the answer in the uploaded documents.'\n"
                    "3. Keep answers clear and concise.\n"
                    "4. Do not invent facts or page numbers.\n"
                    "5. If multiple sources support the answer, combine the information."
                ),
            }
        ]

        messages.extend(history)

        messages.append(
            {
                "role": "user",
                "content": f"""
Context:
{context}

Question:
{question}
""",
            }
        )

        response = chat(
            model=settings.OLLAMA_MODEL,
            messages=messages,
            think=False,
            options={
                "temperature": 0.1,
                "num_predict": 1024,
            },
        )

       

        logger.info("Answer generated successfully.")

        return response["message"]["content"]


llm_service = LLMService()