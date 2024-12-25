from typing import Optional

from pydantic import BaseModel


class BookFilters(BaseModel):
    search: Optional[str] = None
    genre: Optional[str] = None
    min_price: Optional[float] = None
    max_price: Optional[float] = None
