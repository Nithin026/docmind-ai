from pydantic import BaseModel


class UploadResponse(BaseModel):
    filename: str
    size_kb: float
    pages: int
    chunks: int
    message: str