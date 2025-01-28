from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.orders.entities import Order as OrderEntity
from core.apps.orders.services.orders import BaseOderService
from core.apps.orders.services.validators.main import BaseOrderValidatorService
from core.apps.orders.services.validators.orders import OrderExistValidatorService


@dataclass
class UpdateOrderUseCase:
    order_service: BaseOderService
    main_validator_service: BaseOrderValidatorService
    order_exists_validation_service: OrderExistValidatorService

    async def execute(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ) -> OrderEntity:

        await self.order_exists_validation_service.validate(
            order=order,
            session=session,
        )

        await self.main_validator_service.validate(
            order=order,
            session=session,
        )

        await self.order_service.update_order(
            order=order,
            session=session,
        )

        updated_order = await self.order_service.get_by_id(
            order_id=order.id, session=session,
        )
        return updated_order
