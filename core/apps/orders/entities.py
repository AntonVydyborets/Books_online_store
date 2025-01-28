from dataclasses import (
    dataclass,
    field,
)
from datetime import datetime
from typing import (
    Iterable,
    Optional,
)

from core.apps.books.entities import OrderBook as OrderBookEntity


@dataclass
class Order:
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    total_price: Optional[int]

    status: str
    email: str
    phone: str

    created_at: datetime = datetime.utcnow()
    updated_at: Optional[datetime] = None

    items: Iterable[OrderBookEntity] = field(kw_only=True)
