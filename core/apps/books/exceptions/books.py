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
    book: Optional[BookEntity] = None
    book_id: Optional[int] = None

    @property
    def message(self):
        return "Book does not exists"


@dataclass(eq=False)
class BookInvalidAuthorError(ServiceException):
    book: BookEntity

    @property
    def message(self):
        return "Book author is not valid"


@dataclass(eq=False)
class BookInvalidPriceError(ServiceException):
    book: BookEntity

    @property
    def message(self):
        return "Book price is not valid"


@dataclass(eq=False)
class BookInvalidTextLanguageError(ServiceException):
    book: BookEntity

    @property
    def message(self):
        return "Book language text is not valid"


@dataclass(eq=False)
class BookInvalidQuantityError(ServiceException):
    book: BookEntity

    @property
    def message(self):
        return "Book quantity must be greater than 0"


@dataclass(eq=False)
class BookInvalidCountryOfOrigin(ServiceException):
    book: BookEntity

    @property
    def message(self):
        return "Book country of origin must be at least 2 characters long"


@dataclass(eq=False)
class ImageNotFoundError(ServiceException):
    book_id: Optional[int] = None
    image_path: Optional[str] = None

    @property
    def message(self):
        return "Image not found"
