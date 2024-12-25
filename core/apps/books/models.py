from sqlalchemy import (
    Boolean,
    Column,
    Float,
    Integer,
    String,
    Text,
)

from core.apps.books.entities import Book as BookEntity
from core.apps.common.models import TimedBaseModel


class Book(TimedBaseModel):
    __tablename__ = "books"

    id = Column(  # noqa
        Integer,
        primary_key=True,
        index=True,
        nullable=False,
        autoincrement=True,
    )  # noqa
    title = Column(String(100), index=True, nullable=False)
    price = Column(Float, nullable=False)

    description = Column(Text, nullable=True)
    author = Column(String(50), nullable=False)
    publisher = Column(String(50), nullable=True)
    genre = Column(String(50), nullable=False)
    publication_year = Column(Integer, nullable=False)
    country_of_origin = Column(String(50), nullable=True)
    text_language = Column(String(50), nullable=True)

    rating = Column(Float, nullable=True, default=0.0)
    is_available = Column(Boolean, default=True)

    def to_entity(self) -> BookEntity:
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
            created_at=self.created_at,
            updated_at=self.updated_at,
        )

    @classmethod
    def from_entity(cls, entity: BookEntity) -> "Book":
        return cls(
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
