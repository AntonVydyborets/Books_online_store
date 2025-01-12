from dataclasses import (
    dataclass,
    field,
)
from datetime import datetime
from typing import Optional, List

@dataclass
class Book:
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    title: str
    current_price: int
    old_price: Optional[int] = None
    quantity: int = 0

    description: str
    author: str
    publisher: str
    genres: List[str] = field(default_factory=list)
    publication_year: int
    country_of_origin: str
    text_language: str

    rating: float = 0.0
    tags: List[str] = field(default_factory=list)
    is_available: Optional[bool] = True
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

@dataclass
class OrderBook:
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    order_id: Optional[int] = field(default=None, kw_only=True)
    book_id: int = field(kw_only=True)
    quantity: int = 1
