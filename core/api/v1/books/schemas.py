from datetime import datetime
from typing import Optional

from pydantic import BaseModel

from core.apps.books.entities import Book as BookEntity


class BookSchema(BaseModel):
    id: int  # noqa
    title: str
    current_price: int
    old_price: Optional[int] = None
    quantity: int

    description: str
    author: str
    publisher: str
    genres: str
    publication_year: int
    country_of_origin: str
    text_language: str

    rating: float
    tags: str = ""
    created_at: datetime
    updated_at: Optional[datetime] = None

    @staticmethod
    def from_entity(entity: BookEntity) -> "BookSchema":
        return BookSchema(
            id=entity.id,
            title=entity.title,
            current_price=entity.current_price,
            old_price=entity.old_price,
            quantity=entity.quantity,
            description=entity.description,
            author=entity.author,
            publisher=entity.publisher,
            genres=",".join(entity.genres),
            publication_year=entity.publication_year,
            country_of_origin=entity.country_of_origin,
            text_language=entity.text_language,
            rating=entity.rating,
            tags=",".join(entity.tags),
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )


class BookInSchema(BaseModel):
    id: int  # noqa
    title: str
    current_price: int
    old_price: Optional[int] = None
    quantity: int

    description: str
    author: str
    publisher: str
    genres: str
    publication_year: int
    country_of_origin: str
    text_language: str

    rating: float
    tags: str = ""

    def to_entity(self):
        return BookEntity(
            id=self.id,
            title=self.title,
            current_price=self.current_price,
            old_price=self.old_price,
            quantity=self.quantity,
            description=self.description,
            author=self.author,
            publisher=self.publisher,
            genres=self.genres.replace(" ", "").split(","),
            publication_year=self.publication_year,
            country_of_origin=self.country_of_origin,
            text_language=self.text_language,
            rating=self.rating,
            tags=self.tags.replace(" ", "").split(","),
        )


class BookOutSchema(BookInSchema):
    created_at: datetime
    updated_at: Optional[datetime] = None

    @classmethod
    def from_entity(cls, entity: BookEntity) -> "BookOutSchema":
        return cls(
            id=entity.id,
            title=entity.title,
            current_price=entity.current_price,
            old_price=entity.old_price,
            quantity=entity.quantity,
            description=entity.description,
            author=entity.author,
            publisher=entity.publisher,
            genres=",".join(entity.genres),
            publication_year=entity.publication_year,
            country_of_origin=entity.country_of_origin,
            text_language=entity.text_language,
            rating=entity.rating,
            tags=",".join(entity.tags),
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )
