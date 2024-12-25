from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from core.api.v1.urls import router as main_router


def create_app() -> FastAPI:
    app = FastAPI(
        title="Books Store API",
        description="API для управління книгами та замовленнями в магазині книг",
        version="1.0.0",
        docs_url="/docs",
    )

    origins = [
        "http://localhost",
        "http://localhost:8000",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(main_router, prefix="/api/v1")

    return app
