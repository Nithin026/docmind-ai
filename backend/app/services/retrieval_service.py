from app.services.embedding_service import embedding_service
from app.services.vector_service import vector_service
from app.core.constants import TOP_K_RESULTS


class RetrievalService:

    def search(
        self,
        question: str,
    ):

        query_embedding = embedding_service.generate_embedding(
            question
        )

        results = vector_service.search(
            embedding=query_embedding,
            top_k=TOP_K_RESULTS,
        )

        return results


retrieval_service = RetrievalService()