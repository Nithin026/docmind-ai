import chromadb

from app.core.config import settings
from app.core.constants import TOP_K_RESULTS
from app.core.logging import logger


class VectorService:

    def __init__(self):

        self.client = chromadb.PersistentClient(
            path=settings.CHROMA_DB
        )

        self.collection = self.client.get_or_create_collection(
            name="documents"
        )

        logger.info("ChromaDB Ready")

    def add_chunks(
        self,
        chunks: list,
        embeddings: list,
    ):

        self.collection.add(
            ids=[
                chunk["chunk_id"]
                for chunk in chunks
            ],

            documents=[
                chunk["text"]
                for chunk in chunks
            ],

            embeddings=embeddings,

            metadatas=[
                {
                    "chunk_id": chunk["chunk_id"],
                    "filename": chunk["filename"],
                    "page": chunk["page"],
                }
                for chunk in chunks
            ],
        )

        logger.info(
            f"{len(chunks)} chunks stored in ChromaDB."
        )

    def search(
        self,
        embedding,
        top_k: int = TOP_K_RESULTS,
    ):

        return self.collection.query(
            query_embeddings=[embedding],
            n_results=top_k,
        )


vector_service = VectorService()