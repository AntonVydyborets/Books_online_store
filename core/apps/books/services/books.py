from abc import (
    ABC,
    abstractmethod,
)
from dataclasses import dataclass
from typing import (
    Iterable,
    List,
)

from sqlalchemy import (
    func,
    or_,
    select,
    update,
)
from sqlalchemy.ext.asyncio import AsyncSession

from core.api.filters import PaginationIn
from core.apps.books.entities import Book as BookEntity
from core.apps.books.exceptions.books import (
    BookDoesNotExistError,
    BookInvalidRating,
    BookNotFound,
    SingleBookError,
)
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
    ) -> BookEntity: ...

    @abstractmethod
    async def delete_book(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> None: ...


class BaseBookValidatorService(ABC):

    async def validate(
        self,
        book: BookEntity,
        session: AsyncSession,
    ): ...


# Implementation of SQLAlchemy services
class ORMBookService(BaseBookService):

    async def _build_book_query(
        self,
        filters: BookFilters,
        session: AsyncSession,
    ) -> "select":
        query = select(BookModel).filter(BookModel.is_available)
        if filters.search:
            query = query.filter(
                or_(
                    BookModel.title.ilike(f"%{filters.search}%"),
                    BookModel.description.ilike(f"%{filters.search}%"),
                ),
            )

        if filters.genre:
            query = query.filter(BookModel.genre == filters.genre)

        if filters.min_price is not None:
            query = query.filter(BookModel.price >= filters.min_price)

        if filters.max_price is not None:
            query = query.filter(BookModel.price <= filters.max_price)

        return query

    async def get_book_list(
        self,
        filters: BookFilters,
        pagination: PaginationIn,
        session: AsyncSession,
    ) -> Iterable[BookEntity]:
        query = await self._build_book_query(filters, session)
        query = query.offset(pagination.offset).limit(pagination.limit)

        result = await session.execute(query)

        query_set = result.scalars().all()

        return [book.to_entity() for book in query_set]

    async def get_book_count(
        self,
        filters: BookFilters,
        session: AsyncSession,
    ) -> int:
        query = await self._build_book_query(filters, session)

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

    # TODO think more about update realization
    async def update_book(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> BookEntity:
        existing_book = await session.execute(
            select(BookModel).filter(BookModel.id == book.id),
        )
        existing_book = existing_book.scalars().first()

        updated_data = {
            key: value
            for key, value in book.__dict__.items()
            if key not in ["created_at", "id"]
        }

        query = (
            update(BookModel)
            .where(BookModel.id == book.id)
            .values(updated_data)
            .execution_options(synchronize_session="fetch")
        )

        await session.execute(query)
        await session.commit()

        updated_book = await session.execute(
            select(BookModel).filter(BookModel.id == book.id),
        )
        updated_book = updated_book.scalars().first()
        return updated_book.to_entity()

    async def delete_book(
        self,
        book: BookEntity,
        session: AsyncSession,
    ) -> None:
        existing_book = await session.execute(
            select(BookModel).filter(BookModel.id == book.id),
        )
        existing_book = existing_book.scalars().first()

        await session.delete(existing_book)
        await session.commit()


class BookRatingValidatorService(BaseBookValidatorService):
    async def validate(
        self,
        book: BookEntity,
        *args,
        **kwargs,
    ):
        # TODO: Use constants
        if not 0 <= book.rating <= 5:
            raise BookInvalidRating(rating=book.rating)


@dataclass
class SingleBookValidatorService(BaseBookValidatorService):
    service: BaseBookService

    async def validate(
        self,
        book: BookEntity,
        session: AsyncSession,
        *args,
        **kwargs,
    ):
        if await self.service.check_book_exists_by_title(
            book=book,
            session=session,
        ):
            raise SingleBookError(book=book)


@dataclass
class BookExistValidatorService(BaseBookValidatorService):
    service: BaseBookService

    async def validate(
        self,
        book: BookEntity,
        session: AsyncSession,
        *args,
        **kwargs,
    ):
        if not await self.service.check_book_exists_by_id(
            book_id=book.id,
            session=session,
        ):
            raise BookDoesNotExistError(book=book)


# Composed Services
@dataclass
class ComposedBookValidatorService(BaseBookValidatorService):
    validators: List[BaseBookValidatorService]

    async def validate(
        self,
        book: BookEntity,
        session: AsyncSession,
    ):
        for validator in self.validators:
            await validator.validate(book=book, session=session)
