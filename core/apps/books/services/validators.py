from abc import ABC
from dataclasses import dataclass
from typing import List

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.entities import Book as BookEntity
from core.apps.books.exceptions.books import (
    BookDoesNotExistError,
    BookInvalidAuthorError,
    BookInvalidPriceError,
    BookInvalidRating,
    BookInvalidTextLanguageError,
    SingleBookError,
    BookInvalidQuantityError,
    BookInvalidCountryOfOrigin,
)
from core.apps.books.services.books import BaseBookService


# Base validator service
class BaseBookValidatorService(ABC):

    async def validate(
        self,
        book: BookEntity,
        session: AsyncSession,
    ): ...


# Implemented validator services
class BookRatingValidatorService(BaseBookValidatorService):
    async def validate(
        self,
        book: BookEntity,
        *args,
        **kwargs,
    ):
        # TODO: Use constants
        if not 0 <= book.rating <= 5:
            raise BookInvalidRating(rating=book.rating)


@dataclass
class SingleBookValidatorService(BaseBookValidatorService):
    service: BaseBookService

    async def validate(
        self,
        book: BookEntity,
        session: AsyncSession,
        *args,
        **kwargs,
    ):
        if await self.service.check_book_exists_by_title(
            book=book,
            session=session,
        ):
            raise SingleBookError(book=book)


@dataclass
class BookExistValidatorService(BaseBookValidatorService):
    service: BaseBookService

    async def validate(
        self,
        book: BookEntity,
        session: AsyncSession,
        *args,
        **kwargs,
    ):
        if not await self.service.check_book_exists_by_id(
            book_id=book.id,
            session=session,
        ):
            raise BookDoesNotExistError(book=book)


class BookPriceValidatorService(BaseBookValidatorService):
    async def validate(
        self,
        book: BookEntity,
        *args,
        **kwargs,
    ):
        if book.current_price < 0:
            raise BookInvalidPriceError(book=book)


class BookAuthorValidatorService(BaseBookValidatorService):
    async def validate(
        self,
        book: BookEntity,
        *args,
        **kwargs,
    ):
        if not book.author or len(book.author) < 3:
            raise BookInvalidAuthorError(book=book)


class BookTextLanguageValidatorService(BaseBookValidatorService):
    async def validate(
        self,
        book: BookEntity,
        *args,
        **kwargs,
    ):
        if not book.text_language or len(book.text_language) < 2:
            raise BookInvalidTextLanguageError(book=book)

class BookQuantityValidatorService(BaseBookValidatorService):
    async def validate(
        self, 
        book: BookEntity,
        *args,
        **kwargs, 
    ):
        if book.quantity <= 0:
            raise BookInvalidQuantityError(book=book)

class BookCountryOfOriginValidatorService(BaseBookValidatorService):
    async def validate(
        self, 
        book: BookEntity,
        *args,
        **kwargs, 
    ):
        if not book.country_of_origin or len(book.country_of_origin) < 2:
            raise BookInvalidCountryOfOrigin(book=book)

# Composed Services
@dataclass
class ComposedBookValidatorService(BaseBookValidatorService):
    validators: List[BaseBookValidatorService]

    async def validate(
        self,
        book: BookEntity,
        session: AsyncSession,
    ):
        for validator in self.validators:
            await validator.validate(book=book, session=session)
