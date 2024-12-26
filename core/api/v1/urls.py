from fastapi.routing import APIRouter

from core.api.v1.books.handlers import router as books_router
from core.api.v1.orders.handlers import router as orders_router


router = APIRouter()


router.include_router(books_router, tags=["books"])
router.include_router(orders_router, tags=["orders"])
