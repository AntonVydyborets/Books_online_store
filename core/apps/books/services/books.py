from abc import (
    ABC,
    abstractmethod,
)
from typing import Iterable

from sqlalchemy import (
    delete,
    func,
    or_,
    select,
    update,
)
from sqlalchemy.ext.asyncio import AsyncSession

from core.api.filters import PaginationIn
from core.apps.books.entities import Book as BookEntity
from core.apps.books.exceptions.books import BookNotFound
from core.apps.books.filters.books import BookFilters
from core.apps.books.models import Book as BookModel


# Implementations of Base classes
class BaseBookService(ABC):
    @abstractmethod
    async def get_book_list(
        self,
        filters: BookFilters,
        pagination: PaginationIn,
        session: AsyncSession,
    ) -> Iterable[BookEntity]: ...

    @abstractmethod
    async def get_book_count(
        self,
        filters: BookFilters,
        session: AsyncSession,
    ) -> int: ...

    @abstractmethod
    async def get_by_id(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> BookEntity: ...

    @abstractmethod
    async def get_by_title(
        self,
        book_title: str,
        session: AsyncSession,
    ) -> BookEntity: ...

    @abstractmethod
    async def check_book_exists_by_title(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> bool: ...

    @abstractmethod
    async def check_book_exists_by_id(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> bool: ...

    @abstractmethod
    async def save_book(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> BookEntity: ...

    @abstractmethod
    async def update_book(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> None: ...

    @abstractmethod
    async def delete_book(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> None: ...


# Implementation of SQLAlchemy services
class ORMBookService(BaseBookService):

    async def _build_book_query(
        self,
        filters: BookFilters,
    ) -> "select":
        query = select(BookModel).filter(BookModel.quantity > 0)
        if filters.search:
            query = query.filter(
                or_(
                    BookModel.title.ilike(f"%{filters.search}%"),
                    BookModel.description.ilike(f"%{filters.search}%"),
                ),
            )

        if filters.genres:
            query = query.filter(BookModel.genres == filters.genres)

        if filters.min_price is not None:
            query = query.filter(BookModel.price >= filters.min_price)

        if filters.max_price is not None:
            query = query.filter(BookModel.price <= filters.max_price)

        if filters.author:
            query = query.filter(BookModel.author == filters.author)

        if filters.publisher:
            query = query.filter(BookModel.publisher == filters.publisher)

        if filters.country_of_origin:
            query = query.filter(
                BookModel.country_of_origin == filters.country_of_origin,
            )

        if filters.text_language:
            query = query.filter(
                BookModel.text_language == filters.text_language,
            )

        if filters.min_publication_year is not None:
            query = query.filter(
                BookModel.publication_year >= filters.min_publication_year,
            )

        if filters.max_publication_year is not None:
            query = query.filter(
                BookModel.publication_year <= filters.max_publication_year,
            )

        if filters.min_rating is not None:
            query = query.filter(BookModel.rating >= filters.min_rating)

        if filters.max_rating is not None:
            query = query.filter(BookModel.rating <= filters.max_rating)

        return query

    async def get_book_list(
        self,
        filters: BookFilters,
        pagination: PaginationIn,
        session: AsyncSession,
    ) -> Iterable[BookEntity]:
        query = await self._build_book_query(filters)
        query = query.offset(pagination.offset).limit(pagination.limit)

        result = await session.execute(query)

        query_set = result.scalars().all()

        return [book.to_entity() for book in query_set]

    async def get_book_count(
        self,
        filters: BookFilters,
        session: AsyncSession,
    ) -> int:
        query = await self._build_book_query(filters)

        result = await session.execute(select(func.count()).select_from(query))
        count = result.scalar()

        if count:
            return count
        else:
            return 0

    async def get_by_id(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> BookEntity:
        query = select(BookModel).filter(BookModel.id == book_id)

        result = await session.execute(query)
        book_dto = result.scalar_one_or_none()

        if not book_dto:
            raise BookNotFound(book_id=book_id)

        return book_dto.to_entity()

    async def get_by_title(
        self,
        book_title: str,
        session: AsyncSession,
    ) -> BookEntity:
        query = select(BookModel).filter(BookModel.title == book_title)

        result = await session.execute(query)
        book_dto = result.scalar_one_or_none()

        if not book_dto:
            raise BookNotFound(
                book_title=book_title,
            )

        return book_dto.to_entity()

    async def check_book_exists_by_id(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> bool:
        query = select(BookModel).filter(
            BookModel.id == book_id,
        )

        result = await session.execute(query)
        return result.scalar() is not None

    async def check_book_exists_by_title(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> bool:
        query = select(BookModel).filter(
            BookModel.title == book.title,
        )

        result = await session.execute(query)
        return result.scalar() is not None

    async def save_book(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> BookEntity:
        book_dto = BookModel.from_entity(entity=book)
        book_dto.id = None

        session.add(book_dto)
        await session.commit()
        await session.refresh(book_dto)

        return book_dto.to_entity()

    async def update_book(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> None:

        updated_data = {
            key: value
            for key, value in book.__dict__.items()
            if key not in ["created_at", "id"]
        }

        query = (
            update(BookModel)
            .where(BookModel.id == book.id)
            .values(
                **updated_data, updated_at=func.now(),
            )  # Use func.now() for updating time of updation
            .execution_options(synchronize_session="fetch")
        )

        await session.execute(query)
        await session.commit()

    async def delete_book(
        self,
        book_id: int,
        session: AsyncSession,
    ) -> None:
        query = delete(BookModel).where(BookModel.id == book_id)

        await session.execute(query)
        await session.commit()
