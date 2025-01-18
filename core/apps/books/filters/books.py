from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class BookFilters:
    search: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None

    genres: Optional[str] = None
    author: Optional[str] = None
    publisher: Optional[str] = None
    country_of_origin: Optional[str] = None
    text_language: Optional[str] = None

    min_publication_year: Optional[int] = None
    max_publication_year: Optional[int] = None

    min_rating: Optional[float] = None
    max_rating: Optional[float] = None

    tags: Optional[str] = None
