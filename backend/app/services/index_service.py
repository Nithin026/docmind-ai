from app.services.pdf_extract_service import pdf_extract_service
from app.services.chunk_service import chunk_service
from app.services.embedding_service import embedding_service
from app.services.vector_service import vector_service


class IndexService:

    def index_pdf(
        self,
        pdf_path: str,
        filename: str,
    ):

        pages = pdf_extract_service.extract_text(pdf_path)

        chunks = chunk_service.create_chunks(
            pages=pages,
            filename=filename,
        )

        embeddings = [
            embedding_service.generate_embedding(
                chunk["text"]
            )
            for chunk in chunks
        ]

        vector_service.add_chunks(
            chunks=chunks,
            embeddings=embeddings,
        )

        return {
            "pages": len(pages),
            "chunks": len(chunks),
        }


index_service = IndexService()