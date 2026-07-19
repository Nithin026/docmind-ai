from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    # ------------------------
    # Application
    # ------------------------
    APP_NAME: str = "DocMind AI"
    APP_VERSION: str = "1.0.0"

    HOST: str = "127.0.0.1"
    PORT: int = 8000

    # ------------------------
    # PDF Storage
    # ------------------------
    UPLOAD_FOLDER: str = "uploaded_pdfs"

    # ------------------------
    # ChromaDB
    # ------------------------
    CHROMA_DB: str = "chroma_db"

    # ------------------------
    # Embedding Model
    # ------------------------
    EMBEDDING_MODEL: str = "BAAI/bge-small-en-v1.5"

    # ------------------------
    # Ollama
    # ------------------------
    OLLAMA_MODEL: str = "qwen3"

    model_config = SettingsConfigDict(
        env_file=".env",
        case_sensitive=True,
    )


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()