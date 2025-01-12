from datetime import datetime
from typing import Optional, List

from pydantic import BaseModel

from core.apps.books.entities import Book as BookEntity


class BookSchema(BaseModel):
    title: str
    current_price: int
    old_price: Optional[int] = None
    quantity: int

    description: str
    author: str
    publisher: str
    genres: List[str]
    publication_year: int
    country_of_origin: str
    text_language: str

    rating: float
    tags: List[str] = []
    is_available: Optional[bool] = True
    created_at: datetime
    updated_at: Optional[datetime] = None

    @staticmethod
    def from_entity(entity: BookEntity) -> "BookSchema":
        print("Debug: Converting entity to BookSchema", entity)
        return BookSchema(
            title=entity.title,
            current_price=entity.price,
            old_price=entity.old_price,
            quantity=entity.quantity,
            description=entity.description,
            author=entity.author,
            publisher=entity.publisher,
            genres=entity.genres,
            publication_year=entity.publication_year,
            country_of_origin=entity.country_of_origin,
            text_language=entity.text_language,
            rating=entity.rating,
            tags=entity.tags,
            is_available=entity.is_available,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )


class BookInSchema(BaseModel):
    title: str
    current_price: int
    old_price: Optional[int] = None
    quantity: int

    description: str
    author: str
    publisher: str
    genres: List[str]
    publication_year: int
    country_of_origin: str
    text_language: str

    rating: float
    tags: List[str] = []
    is_available: Optional[bool] = True

    def to_entity(self):
        print("Debug: Converting BookInSchema to entity", self)
        return BookEntity(
            title=self.title,
            price=self.current_price,
            old_price=self.old_price,
            quantity=self.quantity,
            description=self.description,
            author=self.author,
            publisher=self.publisher,
            genres=self.genres,
            publication_year=self.publication_year,
            country_of_origin=self.country_of_origin,
            text_language=self.text_language,
            rating=self.rating,
            tags=self.tags,
            is_available=self.is_available,
        )


class BookOutSchema(BookInSchema):
    created_at: datetime
    updated_at: Optional[datetime] = None

    @classmethod
    def from_entity(cls, entity: BookEntity) -> "BookOutSchema":
        print("Debug: Converting entity to BookOutSchema", entity)
        return cls(
            title=entity.title,
            current_price=entity.price,
            old_price=entity.old_price,
            quantity=entity.quantity,
            description=entity.description,
            author=entity.author,
            publisher=entity.publisher,
            genres=entity.genres,
            publication_year=entity.publication_year,
            country_of_origin=entity.country_of_origin,
            text_language=entity.text_language,
            rating=entity.rating,
            tags=entity.tags,
            is_available=entity.is_available,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )
