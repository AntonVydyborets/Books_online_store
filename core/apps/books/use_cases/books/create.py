from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.entities import Book as BookEntity
from core.apps.books.services.books import (
    BaseBookService,
    BaseBookValidatorService,
)


@dataclass
class CreateBookUseCase:
    book_service: BaseBookService
    validator_service: BaseBookValidatorService

    async def execute(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> BookEntity:

        await self.validator_service.validate(
            book=book,
            session=session,
        )

        saved_book = await self.book_service.save_book(
            book=book,
            session=session,
        )

        return saved_book
