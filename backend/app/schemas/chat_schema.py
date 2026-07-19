from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str


class Source(BaseModel):
    filename: str
    page: int


class ChatResponse(BaseModel):
    answer: str
    sources: list[Source]