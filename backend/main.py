from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routes import book, order


app = FastAPI(
    title="Books Store API",
    description="API для управління книгами та замовленнями в магазині книг.",
    version="1.0.0"
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

app.include_router(book.router, prefix="/api/v1")
app.include_router(order.router, prefix="/api/v1")
