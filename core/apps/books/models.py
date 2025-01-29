from sqlalchemy import (
    ARRAY,
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
    current_price = Column(Float, nullable=False)
    old_price = Column(Float, nullable=True)
    quantity = Column(Integer, nullable=False, default=0)

    description = Column(Text, nullable=True)
    author = Column(String(50), nullable=False)
    publisher = Column(String(50), nullable=True)
    genres = Column(ARRAY(String), nullable=False)
    publication_year = Column(Integer, nullable=False)
    country_of_origin = Column(String(50), nullable=True)
    text_language = Column(String(50), nullable=True)

    rating = Column(Float, nullable=True, default=0.0)
    tags = Column(ARRAY(String), nullable=True)

    def to_entity(self) -> BookEntity:
        return BookEntity(
            id=self.id,
            title=self.title,
            current_price=self.current_price,
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
            created_at=self.created_at,
            updated_at=self.updated_at,
        )

    @classmethod
    def from_entity(cls, entity: BookEntity) -> "Book":
        return cls(
            id=entity.id,
            title=entity.title,
            current_price=entity.current_price,
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
            created_at=entity.created_at,
            updated_at=entity.updated_at,
        )
