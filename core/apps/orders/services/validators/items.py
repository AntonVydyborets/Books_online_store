from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.books.services.books import BaseBookService
from core.apps.orders.entities import Order as OrderEntity
from core.apps.orders.exceptions.order import (
    IncorrectOrderTotalPrice,
    MissingOrderItems,
    NotValidOrderItemsQuantity,
)
from core.apps.orders.services.validators.main import BaseOrderValidatorService


class OrderItemsExistValidatorService(BaseOrderValidatorService):
    async def validate(
        self,
        order: OrderEntity,
        *args,
        **kwargs,
    ):
        if not order.items:
            raise MissingOrderItems(order=order)


@dataclass
class OrderTotalPriceValidatorService(BaseOrderValidatorService):
    book_service: BaseBookService

    async def validate(
        self,
        order: OrderEntity,
        session: AsyncSession,
        *args,
        **kwargs,
    ):
        calculated_total_price = 0.0

        for item in order.items:
            if item.quantity <= 0:
                raise NotValidOrderItemsQuantity(order=order)

            book = await self.book_service.get_by_id(
                book_id=item.book_id,
                session=session,
            )

            calculated_total_price += book.price * item.quantity

        if (
            not abs(order.total_price - calculated_total_price) < 1e-6
        ):  # Account for floating-point precision
            raise IncorrectOrderTotalPrice(
                order=order,
                expected_total_price=calculated_total_price,
                actual_total_price=order.total_price,
            )
