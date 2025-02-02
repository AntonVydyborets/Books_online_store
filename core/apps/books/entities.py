from dataclasses import (
    dataclass,
    field,
)
from datetime import datetime
from typing import (
    List,
    Optional,
)


@dataclass
class Book:
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    title: str
    current_price: int
    old_price: Optional[int] = field(default=None, kw_only=True)
    quantity: int = field(default=0, kw_only=True)

    description: str
    author: str
    publisher: str
    genres: List[str] = field(default_factory=list, kw_only=True)

    publication_year: int
    country_of_origin: str
    text_language: str
    rating: float = 0.0
    tags: List[str] = field(default_factory=list, kw_only=True)

    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: Optional[datetime] = None


@dataclass
class OrderBook:
    id: Optional[int] = field(default=None, kw_only=True)  # noqa

    book_id: int = field(kw_only=True)
    order_id: Optional[int] = field(default=None, kw_only=True)
    quantity: int = 1
