from langchain_text_splitters import RecursiveCharacterTextSplitter
import uuid

from app.core.constants import (
    CHUNK_SIZE,
    CHUNK_OVERLAP,
)


class ChunkService:

    def __init__(self):

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=CHUNK_SIZE,
            chunk_overlap=CHUNK_OVERLAP,
            separators=[
                "\n\n",
                "\n",
                ". ",
                " ",
                "",
            ],
        )

    def create_chunks(
        self,
        pages: list[dict],
        filename: str,
    ):

        chunks = []

        

        for page in pages:

            split_text = self.text_splitter.split_text(
                page["text"]
            )

            for text in split_text:

                chunks.append(
                    {
                        "chunk_id": str(uuid.uuid4()),
                        "filename": filename,
                        "page": page["page"],
                        "text": text,
                    }
                )

                

        return chunks


chunk_service = ChunkService()