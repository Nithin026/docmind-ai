from pathlib import Path
import shutil
from app.services.embedding_service import embedding_service
from app.services.vector_service import vector_service
from fastapi import UploadFile
from app.services.chunk_service import chunk_service
from app.core.config import settings
from app.core.constants import (
    SUPPORTED_FILE_TYPES,
    MAX_FILE_SIZE_MB,
)
from app.core.logging import logger
from app.services.pdf_extract_service import pdf_extract_service


class PDFService:

    def __init__(self):
        self.upload_dir = Path(settings.UPLOAD_FOLDER)
        self.upload_dir.mkdir(
            parents=True,
            exist_ok=True,
        )

    def save_pdf(
        self,
        file: UploadFile,
    ):

        extension = Path(file.filename).suffix.lower()

        if extension not in SUPPORTED_FILE_TYPES:
            raise ValueError(
                "Only PDF files are allowed."
            )

        file.file.seek(0, 2)
        size = file.file.tell()
        file.file.seek(0)

        if size > MAX_FILE_SIZE_MB * 1024 * 1024:
            raise ValueError(
                "File exceeds maximum size."
            )

        destination = self.upload_dir / file.filename

        with destination.open("wb") as buffer:
            shutil.copyfileobj(
                file.file,
                buffer,
            )

        logger.info(
            f"Saved PDF: {file.filename}"
        )

        # Extract text
        pages = pdf_extract_service.extract_text(
            str(destination)
        )

        # Create chunks
        chunks = chunk_service.create_chunks(
            pages=pages,
            filename=file.filename,
        )

        # Generate embeddings
        texts = [
            chunk["text"]
            for chunk in chunks
        ]

        embeddings = embedding_service.generate_embeddings(
            texts
        )

        # Store in ChromaDB
        vector_service.add_chunks(
            chunks=chunks,
            embeddings=embeddings,
        )

        return {
            "filename": file.filename,
            "size_kb": round(size / 1024, 2),
            "pages": len(pages),
            "chunks": len(chunks),
            "message": "PDF Indexed Successfully",
        }


pdf_service = PDFService()