from dataclasses import field
from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from core.apps.books.entities import Book as BookEntity


class BookSchema(BaseModel):
    id: int  # noqa
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
    is_available: Optional[bool] = True
    created_at: datetime
    updated_at: Optional[datetime] = None

    @staticmethod
    def from_entity(entity: BookEntity) -> "BookSchema":
        return BookSchema(
            id=entity.id,
            title=entity.title,
            price=entity.price,
            description=entity.description,
            author=entity.author,
            publisher=entity.publisher,
            genre=entity.genre,
            publication_year=entity.publication_year,
            country_of_origin=entity.country_of_origin,
            text_language=entity.text_language,
            rating=entity.rating,
            is_available=entity.is_available,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )


class BookInSchema(BaseModel):
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
    is_available: Optional[bool] = True

    def to_entity(self):
        return BookEntity(
            id=self.id,
            title=self.title,
            price=self.price,
            description=self.description,
            author=self.author,
            publisher=self.publisher,
            genre=self.genre,
            publication_year=self.publication_year,
            country_of_origin=self.country_of_origin,
            text_language=self.text_language,
            rating=self.rating,
            is_available=self.is_available,
        )


class BookOutSchema(BookInSchema):
    id: int  # noqa
    created_at: datetime
    updated_at: datetime | None

    @classmethod
    def from_entity(cls, entity: BookEntity) -> "BookOutSchema":
        return cls(
            id=entity.id,  # noqa
            title=entity.title,
            price=entity.price,
            description=entity.description,
            author=entity.author,
            publisher=entity.publisher,
            genre=entity.genre,
            publication_year=entity.publication_year,
            country_of_origin=entity.country_of_origin,
            text_language=entity.text_language,
            rating=entity.rating,
            is_available=entity.is_available,
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )
