from sentence_transformers import SentenceTransformer

from app.core.config import settings
from app.core.logging import logger


class EmbeddingService:

    def __init__(self):

        logger.info("Loading embedding model...")

        self.model = SentenceTransformer(
            settings.EMBEDDING_MODEL
        )

        logger.info("Embedding model loaded.")

    # For search queries
    def generate_embedding(
        self,
        text: str,
    ):
        return self.model.encode(
            text,
            normalize_embeddings=True,
        ).tolist()

    # For indexing documents
    def generate_embeddings(
        self,
        texts: list[str],
    ):
        return self.model.encode(
            texts,
            batch_size=32,
            normalize_embeddings=True,
            show_progress_bar=True,
        ).tolist()


embedding_service = EmbeddingService()