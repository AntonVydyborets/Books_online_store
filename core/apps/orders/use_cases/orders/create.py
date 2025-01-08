from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.orders.entities import Order as OrderEntity
from core.apps.orders.services.orders import BaseOderService
from core.apps.orders.services.validators.main import BaseOrderValidatorService


@dataclass
class CreateOrderUseCase:
    order_service: BaseOderService
    validator_service: BaseOrderValidatorService

    async def execute(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> OrderEntity:

        await self.validator_service.validate(
            order=order,
            session=session,
        )

        saved_order = await self.order_service.save_order(
            order=order,
            session=session,
        )

        return saved_order
