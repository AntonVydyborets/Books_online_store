from dataclasses import dataclass
from typing import Optional

from core.apps.common.exceptions import ServiceException
from core.apps.orders.entities import Order as OrderEntity


@dataclass(eq=False)
class OrderNotFound(ServiceException):
    order_id: Optional[int] = None

    @property
    def message(self):
        return "An order is not found"


@dataclass(eq=False)
class OrderDoesNotExistError(ServiceException):
    order: OrderEntity

    @property
    def message(self):
        return "Order does not exists"


@dataclass(eq=False)
class MissingOrderPhone(ServiceException):
    phone: str

    @property
    def message(self):
        return "An order phone missing"


@dataclass(eq=False)
class NotValidOrderPhone(ServiceException):
    phone: str

    @property
    def message(self):
        return "A phone number is not valid"


@dataclass(eq=False)
class MissingOrderEmail(ServiceException):
    email: str

    @property
    def message(self):
        return "An order email missing"


@dataclass(eq=False)
class NotValidOrderEmail(ServiceException):
    email: str

    @property
    def message(self):
        return "An email is not valid"


@dataclass(eq=False)
class MissingOrderItems(ServiceException):
    order: OrderEntity

    @property
    def message(self):
        return "An items missing"


@dataclass(eq=False)
class NotValidOrderItemsQuantity(ServiceException):
    order: OrderEntity

    @property
    def message(self):
        return "A quantity of order items is not valid"


@dataclass
class IncorrectOrderTotalPrice(ServiceException):
    order: OrderEntity
    expected_total_price: float
    actual_total_price: float

    @property
    def message(self):
        return "Order total price is not correct"
