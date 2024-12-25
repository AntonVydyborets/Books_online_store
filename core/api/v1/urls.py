from fastapi.routing import APIRouter

from core.api.v1.books.handlers import router as books_router


router = APIRouter()


router.include_router(books_router, tags=["books"])
