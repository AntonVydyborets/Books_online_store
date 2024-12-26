from typing import List

from sqlalchemy import (
    Column,
    Float,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import (
    Mapped,
    relationship,
)

from core.apps.books.entities import OrderBook as OrderBookEntity
from core.apps.books.models import Book
from core.apps.common.models import TimedBaseModel
from core.apps.orders.entities import Order as OrderEntity


class OrderBook(TimedBaseModel):
    __tablename__ = "order_books"

    id = Column(Integer, primary_key=True, index=True)  # noqa
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    quantity = Column(Integer, default=1)

    order = relationship("Order", back_populates="items")
    book = relationship(Book)

    def to_entity(self) -> OrderBookEntity:
        return OrderBookEntity(
            id=self.id,
            order_id=self.order_id,
            book_id=self.book_id,
            quantity=self.quantity,
        )

    @staticmethod
    def from_entity(entity: OrderBookEntity) -> "OrderBook":
        return OrderBook(
            order_id=entity.order_id,
            book_id=entity.book_id,
            quantity=entity.quantity,
        )


class Order(TimedBaseModel):
    __tablename__ = "orders"

    id = Column(  # noqa
        Integer,
        primary_key=True,
        index=True,
        autoincrement=True,
        nullable=False,
    )  # noqa
    status = Column(String(50), default="Pending")
    total_price = Column(Float, nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)

    items: Mapped[List[OrderBook]] = relationship(
        "OrderBook",
        back_populates="order",
    )

    def to_entity(
        self,
    ) -> OrderEntity:
        return OrderEntity(
            id=self.id,
            total_price=self.total_price,
            status=self.status,
            email=self.email,
            phone=self.phone,
            created_at=self.created_at,
            updated_at=self.updated_at,
            items=[order_book.to_entity() for order_book in self.items],
        )

    @staticmethod
    def from_entity(entity: OrderEntity) -> "Order":
        return Order(
            total_price=entity.total_price,
            status=entity.status,
            email=entity.email,
            phone=entity.phone,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
            items=[OrderBook.from_entity(order_book) for order_book in entity.items],
        )
