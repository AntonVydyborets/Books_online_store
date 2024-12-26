from functools import lru_cache

import punq

from core.apps.books.services.books import (
    BaseBookService,
    BaseBookValidatorService,
    BookExistValidatorService,
    BookRatingValidatorService,
    ComposedBookValidatorService,
    ORMBookService,
    SingleBookValidatorService,
)
from core.apps.books.use_cases.books.create import CreateBookUseCase
from core.apps.books.use_cases.books.delete import DeleteBookUseCase
from core.apps.books.use_cases.books.get import (
    GetBookListUseCase,
    GetBookUseCase,
)
from core.apps.books.use_cases.books.put import UpdateBookUseCase
from core.apps.orders.services.orders import (
    BaseOderService,
    BaseOrderValidatorService,
    ComposedOrderValidatorService,
    OrderEmailValidatorService,
    OrderExistValidatorService,
    OrderItemsValidatorService,
    OrderPhoneValidatorService,
    ORMOrderService,
)
from core.apps.orders.use_cases.orders.create import CreateOrderUseCase
from core.apps.orders.use_cases.orders.get import (
    GetOrderListUseCase,
    GetOrderUseCase,
)
from core.apps.orders.use_cases.orders.put import UpdateOrderUseCase


# Dependency injector container implementation


# TODO Make better container splitting
@lru_cache(1)
def get_container() -> punq.Container:
    return _initialize_container()


def _initialize_container() -> punq.Container:
    container = punq.Container()

    # Initialize Services
    container.register(BaseBookService, ORMBookService)
    container.register(BaseOderService, ORMOrderService)

    # Initialize Book validators
    container.register(SingleBookValidatorService)
    container.register(BookExistValidatorService)
    container.register(BookRatingValidatorService)

    # Initialize Order validators
    container.register(OrderPhoneValidatorService)
    container.register(OrderEmailValidatorService)
    container.register(OrderItemsValidatorService)
    container.register(OrderExistValidatorService)

    # Initialize composed validators fabrics
    def build_books_validators() -> BaseBookValidatorService:
        return ComposedBookValidatorService(
            validators=[
                container.resolve(SingleBookValidatorService),
                container.resolve(BookRatingValidatorService),
            ],
        )

    def build_orders_validators() -> BaseOrderValidatorService:
        return ComposedOrderValidatorService(
            validators=[
                container.resolve(OrderPhoneValidatorService),
                container.resolve(OrderEmailValidatorService),
                container.resolve(OrderItemsValidatorService),
            ],
        )

    container.register(BaseBookValidatorService, factory=build_books_validators)
    container.register(BaseOrderValidatorService, factory=build_orders_validators)

    # Initialize Book use cases
    container.register(GetBookListUseCase)
    container.register(GetBookUseCase)
    container.register(CreateBookUseCase)
    container.register(UpdateBookUseCase)
    container.register(DeleteBookUseCase)

    # Initialize Order use cases
    container.register(GetOrderListUseCase)
    container.register(GetOrderUseCase)
    container.register(CreateOrderUseCase)
    container.register(UpdateOrderUseCase)

    return container
