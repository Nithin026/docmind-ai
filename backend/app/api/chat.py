from fastapi import APIRouter

from app.schemas.chat_schema import (
    ChatRequest,
    ChatResponse,
)
from app.services.chat_service import chat_service
from app.services.memory_service import memory_service

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.post(
    "/",
    response_model=ChatResponse,
)
async def ask_question(
    request: ChatRequest,
):

    return chat_service.ask(
        request.question
    )

@router.delete("/history")
async def clear_history():

    memory_service.clear()

    return {
        "message": "Chat history cleared."
    }