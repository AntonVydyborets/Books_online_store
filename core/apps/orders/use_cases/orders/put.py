from dataclasses import dataclass
from datetime import datetime

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.orders.entities import Order as OrderEntity
from core.apps.orders.services.orders import (
    BaseOderService,
    BaseOrderValidatorService,
    OrderExistValidatorService,
)


@dataclass
class UpdateOrderUseCase:
    order_service: BaseOderService
    validator_service: BaseOrderValidatorService
    order_exists_validation_service: OrderExistValidatorService

    async def execute(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> OrderEntity:

        # TODO think more about update realization
        order.updated_at = datetime.utcnow()

        await self.order_exists_validation_service.validate(
            order=order,
            session=session,
        )

        await self.validator_service.validate(
            order=order,
            session=session,
        )

        updated_order = await self.order_service.update_order(
            order=order,
            session=session,
        )
        return updated_order
