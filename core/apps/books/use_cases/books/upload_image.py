import os
from dataclasses import dataclass
from pathlib import Path

from fastapi import UploadFile

import aiofiles
from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.exceptions.books import BookDoesNotExistError
from core.apps.books.services.books import BaseBookService


@dataclass
class UploadImageUseCase:
    book_service: BaseBookService

    async def execute(
        self,
        book_id: int,
        image_file: UploadFile,
        session: AsyncSession,
    ) -> None:

        if await self.book_service.check_book_exists_by_id(
            book_id=book_id,
            session=session,
        ):
            image_path = f"media/books/{book_id}_{image_file.filename}"
            Path(os.path.dirname(image_path)).mkdir(
                parents=True,
                exist_ok=True,
            )

            async with aiofiles.open(image_path, "wb") as f:
                content = await image_file.read()
                await f.write(content)

            await self.book_service.save_image_path(
                book_id=book_id,
                image_path=image_path,
                session=session,
            )
        else:
            raise BookDoesNotExistError(book_id=book_id)
