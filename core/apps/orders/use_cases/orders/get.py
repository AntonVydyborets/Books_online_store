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
from core.apps.orders.entities import Order as OrderEntity
from core.apps.orders.services.orders import BaseOderService


@dataclass
class GetOrderListUseCase:
    order_service: BaseOderService

    async def execute(
        self,
        pagination_in: PaginationIn,
        session: AsyncSession,
    ) -> Tuple[Iterable[OrderEntity], PaginationOut]:

        order_list = await self.order_service.get_order_list(
            pagination=pagination_in,
            session=session,
        )

        order_count = await self.order_service.get_order_count(
            session=session,
        )

        pagination_out = PaginationOut(
            offset=pagination_in.offset,
            limit=pagination_in.limit,
            total=order_count,
        )

        return (order_list, pagination_out)


@dataclass
class GetOrderUseCase:
    order_service: BaseOderService

    async def execute(
        self,
        order_id: int,
        session: AsyncSession,
    ) -> OrderEntity:

        order = await self.order_service.get_by_id(
            order_id=order_id,
            session=session,
        )

        return order
