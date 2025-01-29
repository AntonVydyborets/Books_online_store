from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.services.books import BaseBookService
from core.apps.books.services.validators import BookExistValidatorService


@dataclass
class DeleteBookUseCase:
    book_service: BaseBookService
    book_exists_validation_service: BookExistValidatorService

    async def execute(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> None:

        await self.book_service.delete_book(
            book_id=book_id,
            session=session,
        )
