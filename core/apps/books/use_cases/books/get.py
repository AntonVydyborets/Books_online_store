from dataclasses import dataclass
from typing import (
    Iterable,
    Tuple,
)

from sqlalchemy.ext.asyncio import AsyncSession

from core.api.filters import (
    PaginationIn,
    PaginationOut,
)
from core.apps.books.entities import Book as BookEntity
from core.apps.books.filters.books import BookFilters as BookFiltersEntity
from core.apps.books.services.books import BaseBookService


@dataclass
class GetBookListUseCase:
    book_service: BaseBookService

    async def execute(
        self,
        filters: BookFiltersEntity,
        pagination_in: PaginationIn,
        session: AsyncSession,
    ) -> Tuple[Iterable[BookEntity], PaginationOut]:

        book_list = await self.book_service.get_book_list(
            filters=filters,
            pagination=pagination_in,
            session=session,
        )

        book_count = await self.book_service.get_book_count(
            filters=filters,
            session=session,
        )

        pagination_out = PaginationOut(
            offset=pagination_in.offset,
            limit=pagination_in.limit,
            total=book_count,
        )

        return (book_list, pagination_out)


@dataclass
class GetBookUseCase:
    order_service: BaseBookService

    async def execute(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> BookEntity:

        book = await self.order_service.get_by_id(
            book_id=book_id,
            session=session,
        )

        return book
