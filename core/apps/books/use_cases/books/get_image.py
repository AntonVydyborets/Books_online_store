import os
from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.exceptions.books import ImageNotFoundError
from core.apps.books.services.books import BaseBookService


@dataclass
class GetBookImageUseCase:
    book_service: BaseBookService

    async def execute(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> str:
        book_image = await self.book_service.get_book_image(
            book_id=book_id,
            session=session,
        )

        if book_image and book_image.image_path:
            image_path = book_image.image_path

            if not os.path.exists(image_path):
                raise ImageNotFoundError(image_path=image_path, book_id=book_id)

            return image_path
        else:
            raise ImageNotFoundError(book_id=book_id)
