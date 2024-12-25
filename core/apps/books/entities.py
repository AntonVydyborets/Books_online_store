from dataclasses import (
    dataclass,
    field,
)
from datetime import datetime
from typing import Optional


@dataclass
class Book:
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    title: str
    price: int

    description: str
    author: str
    publisher: str
    genre: str
    publication_year: int
    country_of_origin: str
    text_language: str

    rating: float
    is_available: Optional[bool]
    created_at: datetime = datetime.utcnow()
    updated_at: Optional[datetime] = None
