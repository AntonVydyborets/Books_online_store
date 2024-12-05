from pydantic import BaseModel
from typing import List, Optional

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
    is_available: bool

class BookCreate(BookBase):
    pass

class BookResponse(BookBase):
    id: int
    rating: Optional[float] = 0.0

    class Config: 
        orm_mode = True 

class OrderBookCreate(BaseModel):
    book_id: int
    quantity: int

class OrderCreate(BaseModel):
    email: str
    phone: int
    books: List[OrderBookCreate] 

class OrderResponse(BaseModel):
    id: int
    status: str
    total_price: float
    email: str
    phone: int
    books: List[OrderBookCreate]

    class Config:
        orm_mode = True


