import re
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
    select,
    update,
)
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from core.api.filters import PaginationIn
from core.apps.orders.entities import Order as OrderEntity
from core.apps.orders.exceptions.order import (
    MissingOrderEmail,
    MissingOrderItems,
    MissingOrderPhone,
    NotValidOrderEmail,
    NotValidOrderItemsQuantity,
    NotValidOrderPhone,
    OrderDoesNotExistError,
    OrderNotFound,
)
from core.apps.orders.models import Order as OrderModel


# TODO make better service splitting
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
    ) -> OrderEntity: ...


@dataclass
class BaseOrderValidatorService(ABC):

    async def validate(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ): ...


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

    # TODO think more about update realization
    async def update_order(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> OrderEntity:
        existing_order = await session.execute(
            select(OrderModel)
            .filter(OrderModel.id == order.id)
            .options(selectinload(OrderModel.items)),
        )
        existing_order = existing_order.scalars().first()

        updated_data = {
            key: value
            for key, value in order.__dict__.items()
            if key not in ["created_at", "id", "items"]
        }

        query = (
            update(OrderModel)
            .where(OrderModel.id == order.id)
            .values(updated_data)
            .execution_options(synchronize_session="fetch")
        )
        await session.execute(query)
        await session.commit()

        updated_book = await session.execute(
            select(OrderModel)
            .filter(OrderModel.id == order.id)
            .options(selectinload(OrderModel.items)),
        )
        updated_book = updated_book.scalars().first()
        return updated_book.to_entity()


class OrderPhoneValidatorService(BaseOrderValidatorService):
    async def validate(
        self,
        order: OrderEntity,
        *args,
        **kwargs,
    ):
        if not order.phone:
            raise MissingOrderPhone(phone=order.phone)

        phone = order.phone.replace(" ", "").replace("-", "")

        # Check if number valid for Ukraine
        pattern = r"^\+380\d{9}$|^380\d{9}$"

        if not re.match(pattern, phone):
            raise NotValidOrderPhone(phone=order.phone)


class OrderEmailValidatorService(BaseOrderValidatorService):
    async def validate(
        self,
        order: OrderEntity,
        *args,
        **kwargs,
    ):
        if not order.email:
            raise MissingOrderEmail(email=order.email)

        # Check if email is valid
        pattern = r"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"

        if not re.match(pattern, order.email):
            raise NotValidOrderEmail(email=order.email)


class OrderItemsValidatorService(BaseOrderValidatorService):
    async def validate(
        self,
        order: OrderEntity,
        *args,
        **kwargs,
    ):
        if not order.items:
            raise MissingOrderItems(order=order)

        for item in order.items:
            if item.quantity <= 0:
                raise NotValidOrderItemsQuantity(order=order)


@dataclass
class OrderExistValidatorService(BaseOrderValidatorService):
    service: BaseOderService

    async def validate(
        self,
        order: OrderEntity,
        session: AsyncSession,
        *args,
        **kwargs,
    ) -> None:
        if not await self.service.check_order_exists(
            order_id=order.id,
            session=session,
        ):
            raise OrderDoesNotExistError(order=order)


@dataclass
class ComposedOrderValidatorService(BaseOrderValidatorService):
    validators: List[BaseOrderValidatorService]

    async def validate(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ):
        for validator in self.validators:
            await validator.validate(order=order, session=session)
