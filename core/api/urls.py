from fastapi.routing import APIRouter

from core.api.v1.urls import router as api_v1_router


router = APIRouter()


router.include_router(api_v1_router, tags=["v1"])
