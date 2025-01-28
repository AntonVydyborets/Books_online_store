from abc import (
    ABC,
    abstractmethod,
)
from typing import Iterable

from sqlalchemy import (
    delete,
    func,
    select,
    update,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.api.filters import PaginationIn
from core.apps.orders.entities import Order as OrderEntity
from core.apps.orders.exceptions.order import OrderNotFound
from core.apps.orders.models import (
    Order as OrderModel,
    OrderBook,
)


# Implementations of Base classes
class BaseOderService(ABC):
    @abstractmethod
    async def get_order_list(
        self,
        pagination: PaginationIn,
        session: AsyncSession,
    ) -> Iterable[OrderEntity]: ...

    @abstractmethod
    async def get_order_count(
        self,
        session: AsyncSession,
    ) -> int: ...

    @abstractmethod
    async def get_by_id(
        self,
        order_id: int,
        session: AsyncSession,
    ) -> OrderEntity: ...

    @abstractmethod
    async def save_order(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> OrderEntity: ...

    @abstractmethod
    async def check_order_exists(
        self,
        order_id: int,
        session: AsyncSession,
    ) -> bool: ...

    @abstractmethod
    async def update_order(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> None: ...

    @abstractmethod
    async def update_order_items(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> None: ...


# Implementation of SQLAlchemy services
class ORMOrderService(BaseOderService):

    async def get_order_list(
        self,
        pagination: PaginationIn,
        session: AsyncSession,
    ) -> Iterable[OrderEntity]:
        query = (
            select(OrderModel)
            .options(selectinload(OrderModel.items))
            .offset(pagination.offset)
            .limit(pagination.limit)
        )

        result = await session.execute(query)
        query_set = result.scalars().all()

        return [order.to_entity() for order in query_set]

    async def get_order_count(
        self,
        session: AsyncSession,
    ) -> int:
        result = await session.execute(
            select(func.count()).select_from(OrderModel),
        )
        count = result.scalar()

        if count:
            return count
        else:
            return 0

    async def save_order(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> OrderEntity:
        order_dto = OrderModel.from_entity(entity=order)

        session.add(order_dto)
        await session.commit()

        return order_dto.to_entity()

    async def get_by_id(
        self,
        order_id: int,
        session: AsyncSession,
    ) -> OrderEntity:

        query = (
            select(OrderModel)
            .filter(OrderModel.id == order_id)
            .options(selectinload(OrderModel.items))
        )

        result = await session.execute(query)
        order_dto = result.scalar_one_or_none()

        if not order_dto:
            raise OrderNotFound(order_id=order_id)

        return order_dto.to_entity()

    async def check_order_exists(
        self,
        order_id: int,
        session: AsyncSession,
    ) -> bool:
        query = (
            select(OrderModel)
            .filter(
                OrderModel.id == order_id,
            )
            .options(selectinload(OrderModel.items))
        )

        result = await session.execute(query)
        return result.scalar() is not None

    async def update_order_items(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> None:

        await session.execute(
            delete(OrderBook).where(OrderBook.order_id == order.id),
        )

        for item in order.items:
            order_book = OrderBook.from_entity(item)
            order_book.order_id = order.id
            session.add(order_book)

        await session.commit()

    async def update_order(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> None:

        updated_data = {
            key: value
            for key, value in order.__dict__.items()
            if key not in ["created_at", "id", "items", "updated_at"]
        }

        query = (
            update(OrderModel)
            .where(OrderModel.id == order.id)
            .values(
                **updated_data, updated_at=func.now(),
            )  # Use func.now() for updating time of updation
            .execution_options(synchronize_session="fetch")
        )
        await session.execute(query)
        await session.commit()

        await self.update_order_items(order=order, session=session)
