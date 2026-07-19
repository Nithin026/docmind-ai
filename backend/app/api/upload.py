from typing import List

from fastapi import (
    APIRouter,
    File,
    HTTPException,
    UploadFile,
)

from app.schemas.upload_schema import UploadResponse
from app.services.pdf_service import pdf_service

router = APIRouter(
    prefix="/upload",
    tags=["Upload"],
)


@router.post(
    "/",
    response_model=List[UploadResponse],
)
async def upload_pdfs(
    files: List[UploadFile] = File(...),
):
    uploaded = []

    for file in files:

        try:

            result = pdf_service.save_pdf(file)

            uploaded.append(result)

        except ValueError as e:

            raise HTTPException(
                status_code=400,
                detail=str(e),
            )

    return uploaded