from dataclasses import dataclass
from typing import Optional


@dataclass(frozen=True)
class BookFilters:
    search: Optional[str] = None
    genre: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
