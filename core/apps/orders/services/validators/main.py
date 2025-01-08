from abc import ABC
from dataclasses import dataclass

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.orders.entities import Order as OrderEntity


# Base validator service
@dataclass
class BaseOrderValidatorService(ABC):

    async def validate(
        self,
        order: OrderEntity,
        session: AsyncSession,
    ): ...
