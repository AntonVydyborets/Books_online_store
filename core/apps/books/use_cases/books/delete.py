from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.entities import Book as BookEntity
from core.apps.books.services.books import (
    BaseBookService,
    BookExistValidatorService,
)


@dataclass
class DeleteBookUseCase:
    book_service: BaseBookService
    book_exists_validation_service: BookExistValidatorService

    async def execute(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> None:

        await self.book_exists_validation_service.validate(
            book=book,
            session=session,
        )

        await self.book_service.delete_book(
            book=book,
            session=session,
        )
