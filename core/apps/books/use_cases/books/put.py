from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.entities import Book as BookEntity
from core.apps.books.services.books import BaseBookService
from core.apps.books.services.validators import (
    BaseBookValidatorService,
    BookExistValidatorService,
)


@dataclass
class UpdateBookUseCase:
    book_service: BaseBookService
    main_validation_service: BaseBookValidatorService
    book_exists_validation_service: BookExistValidatorService

    async def execute(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> BookEntity:

        await self.book_exists_validation_service.validate(
            book=book,
            session=session,
        )

        await self.main_validation_service.validate(
            book=book,
            session=session,
        )

        await self.book_service.update_book(
            book=book,
            session=session,
        )

        updated_book = await self.book_service.get_by_id(
            book_id=book.id,
            session=session,
        )

        return updated_book
