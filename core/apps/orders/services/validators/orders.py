import re
from dataclasses import dataclass
from typing import List

from sqlalchemy.ext.asyncio import AsyncSession

from core.apps.orders.entities import Order as OrderEntity
from core.apps.orders.exceptions.order import (
    MissingOrderEmail,
    MissingOrderPhone,
    NotValidOrderEmail,
    NotValidOrderPhone,
    OrderDoesNotExistError,
)
from core.apps.orders.services.orders import BaseOderService
from core.apps.orders.services.validators.main import BaseOrderValidatorService


# Implementations of validators
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
