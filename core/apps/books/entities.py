from dataclasses import dataclass, field
from datetime import datetime
from typing import Optional, List

@dataclass
class Book:
    title: str
    current_price: int
    description: str 
    author: str
    publisher: str
    publication_year: int
    country_of_origin: str
    text_language: str
    rating: float = 0.0
    tags: List[str] = field(default_factory=list)
    quantity: int = 0
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    old_price: Optional[int] = None
    genres: List[str] = field(default_factory=list)
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None

@dataclass
class OrderBook:
    book_id: int = field(kw_only=True)
    
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    order_id: Optional[int] = field(default=None, kw_only=True)
    quantity: int = 1
