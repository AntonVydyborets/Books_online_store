from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.entities import Book as BookEntity
from core.apps.books.services.books import BaseBookService
from core.apps.books.services.validators import (
    BaseBookValidatorService,
    SingleBookValidatorService,
)


@dataclass
class CreateBookUseCase:
    book_service: BaseBookService
    single_book_validator_service: SingleBookValidatorService
    main_validator_service: BaseBookValidatorService

    async def execute(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> BookEntity:

        await self.single_book_validator_service.validate(
            book=book,
            session=session,
        )

        await self.main_validator_service.validate(
            book=book,
            session=session,
        )

        saved_book = await self.book_service.save_book(
            book=book,
            session=session,
        )

        return saved_book
