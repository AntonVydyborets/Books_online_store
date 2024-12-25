from dataclasses import dataclass
from typing import Optional

from core.apps.books.entities import Book as BookEntity
from core.apps.common.exceptions import ServiceException


@dataclass(eq=False)
class BookNotFound(ServiceException):
    book_id: Optional[int] = None
    book_title: Optional[str] = None

    @property
    def message(self):
        return "A book is not found"


@dataclass(eq=False)
class BookInvalidRating(ServiceException):
    rating: float

    @property
    def message(self):
        return "Rating is not valid"


@dataclass(eq=False)
class SingleBookError(ServiceException):
    book: BookEntity

    @property
    def message(self):
        return "Book already exists"


@dataclass(eq=False)
class BookDoesNotExistError(ServiceException):
    book: BookEntity

    @property
    def message(self):
        return "Book does not exists"
