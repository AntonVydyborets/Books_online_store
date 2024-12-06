from sqlalchemy import Boolean, Integer, Column, String, Float, ForeignKey, Text
from sqlalchemy.orm import relationship
from backend.database import Base


class Book(Base):
    __tablename__ = "books"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), index=True, nullable=False)
    author = Column(String(50), nullable=False)
    publisher = Column(String(50), nullable=True)
    description = Column(Text, nullable=True)
    price = Column(Float, nullable=False)
    publication_year = Column(Integer, nullable=False)
    country_of_origin = Column(String(50), nullable=True)
    text_language = Column(String(50), nullable=True)
    genre = Column(String(50), nullable=False)
    rating = Column(Float, nullable=True, default=0.0)
    is_available = Column(Boolean, default=True)

    order_books = relationship("OrderBook", back_populates="book")


class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    status = Column(String(50), default="Pending")
    total_price = Column(Float, nullable=False)
    email = Column(String(100), nullable=False)
    phone = Column(String(15), nullable=False)

    items = relationship("OrderBook", back_populates="order")


class OrderBook(Base):
    __tablename__ = "order_books"

    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=False)
    book_id = Column(Integer, ForeignKey("books.id"), nullable=False)
    quantity = Column(Integer, default=1)

    order = relationship("Order", back_populates="items")
    book = relationship("Book", back_populates="order_books")
