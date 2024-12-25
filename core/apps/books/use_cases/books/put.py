from dataclasses import dataclass
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.entities import Book as BookEntity
from core.apps.books.services.books import (
    BaseBookService,
    BookExistValidatorService,
    BookRatingValidatorService,
)


@dataclass
class UpdateBookUseCase:
    book_service: BaseBookService
    rating_validation_service: BookRatingValidatorService
    book_exists_validation_service: BookExistValidatorService

    async def execute(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> BookEntity:

        # TODO think more about update realization
        book.updated_at = datetime.utcnow()

        await self.book_exists_validation_service.validate(
            book=book,
            session=session,
        )

        await self.rating_validation_service.validate(
            book=book,
            session=session,
        )

        updated_book = await self.book_service.update_book(
            book=book,
            session=session,
        )
        return updated_book
