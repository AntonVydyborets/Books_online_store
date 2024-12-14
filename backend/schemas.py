from typing import (
    List,
    Optional,
)

from pydantic import BaseModel


class BookBase(BaseModel):
    name: str
    description: str
    author: str
    publisher: str
    price: int
    publication_year: int
    country_of_origin: str
    text_language: str
    genre: str
    rating: float
    is_available: Optional[bool] = True


class BookCreate(BookBase):
    is_available: Optional[bool] = True


class BookResponse(BookBase):
    id: int  # noqa
    rating: Optional[float] = 0.0

    class Config:
        from_attributes = True


class OrderBookCreate(BaseModel):
    book_id: int
    quantity: int


class OrderBookResponse(BaseModel):
    book_id: int
    quantity: int
    book_name: str

    class Config:
        from_attributes = True


class OrderCreate(BaseModel):
    email: str
    phone: str
    books: List[OrderBookCreate]


class OrderResponse(BaseModel):
    id: int  # noqa
    status: str
    total_price: float
    email: str
    phone: str
    books: List[OrderBookResponse]

    class Config:
        from_attributes = True
