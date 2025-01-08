import punq

from core.apps.orders.use_cases.orders.create import CreateOrderUseCase
from core.apps.orders.use_cases.orders.get import (
    GetOrderListUseCase,
    GetOrderUseCase,
)
from core.apps.orders.use_cases.orders.put import UpdateOrderUseCase


def register_use_cases(container: punq.Container):
    container.register(GetOrderListUseCase)
    container.register(GetOrderUseCase)
    container.register(CreateOrderUseCase)
    container.register(UpdateOrderUseCase)
