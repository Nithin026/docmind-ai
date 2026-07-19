from pathlib import Path
import fitz  # PyMuPDF

from app.core.logging import logger


class PDFExtractService:
    """
    Extract text from PDF files while preserving page numbers.
    """

    def extract_text(self, pdf_path: str) -> list[dict]:
        pages = []

        try:
            document = fitz.open(pdf_path)

            for page_number, page in enumerate(document, start=1):
                text = page.get_text("text").strip()

                if text:
                    pages.append(
                        {
                            "page": page_number,
                            "text": text
                        }
                    )

            document.close()

            logger.info(
                f"Extracted {len(pages)} pages from {Path(pdf_path).name}"
            )

            return pages

        except Exception as e:
            logger.error(str(e))
            raise


pdf_extract_service = PDFExtractService()