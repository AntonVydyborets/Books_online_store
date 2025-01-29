from dataclasses import field
from datetime import datetime
from typing import (
    Iterable,
    Optional,
)

from pydantic import BaseModel

from core.apps.books.entities import OrderBook as OrderBookEntity
from core.apps.orders.entities import Order as OrderEntity


class OrderBookSchema(BaseModel):
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    order_id: Optional[int] = field(default=None, kw_only=True)
    book_id: int = field(kw_only=True)
    quantity: int = 1

    @staticmethod
    def from_entity(entity: OrderBookEntity) -> "OrderBookSchema":
        return OrderBookSchema(
            id=entity.id,
            order_id=entity.order_id,
            book_id=entity.book_id,
            quantity=entity.quantity,
        )

    def to_entity(self):
        return OrderBookEntity(
            id=self.id,
            order_id=self.order_id,
            book_id=self.book_id,
            quantity=self.quantity,
        )


class OrderSchema(BaseModel):
    id: int  # noqa
    total_price: int

    status: str
    email: str
    phone: str

    created_at: datetime
    updated_at: Optional[datetime] = None

    items: Iterable[OrderBookSchema]

    @staticmethod
    def from_entity(entity: OrderEntity) -> "OrderSchema":
        return OrderSchema(
            id=entity.id,
            total_price=entity.total_price,
            status=entity.status,
            email=entity.email,
            phone=entity.phone,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
            items=[
                OrderBookSchema.from_entity(order_book) for order_book in entity.items
            ],
        )


class OrderInSchema(BaseModel):
    id: Optional[int] = field(default=None, kw_only=True)  # noqa
    total_price: Optional[int] = field(default=None, kw_only=True)

    status: str
    email: str
    phone: str

    items: Iterable[OrderBookSchema]

    def to_entity(self):
        return OrderEntity(
            id=self.id,
            total_price=self.total_price,
            status=self.status,
            email=self.email,
            phone=self.phone,
            items=[order_book.to_entity() for order_book in self.items],
        )


class OrderOutSchema(OrderInSchema):
    created_at: datetime
    updated_at: datetime | None

    @classmethod
    def from_entity(cls, entity: OrderEntity) -> "OrderOutSchema":
        return cls(
            id=entity.id,
            total_price=entity.total_price,
            status=entity.status,
            email=entity.email,
            phone=entity.phone,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
            items=[
                OrderBookSchema.from_entity(order_book) for order_book in entity.items
            ],
        )
