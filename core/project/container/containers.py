from functools import lru_cache

import punq

from core.apps.books.services.books import (
    BaseBookService,
    ORMBookService,
)
from core.apps.orders.services.orders import (
    BaseOderService,
    ORMOrderService,
)
from core.project.container.use_cases.books import register_use_cases as register_books_use_cases
from core.project.container.use_cases.orders import register_use_cases as register_orders_use_cases
from core.project.container.validators.books import register_validators as register_books_validators
from core.project.container.validators.orders import register_validators as register_orders_validators


# Dependency injector container implementation
@lru_cache(1)
def get_container() -> punq.Container:
    return _initialize_container()


def _initialize_container() -> punq.Container:
    container = punq.Container()

    # Initialize Services
    container.register(BaseBookService, ORMBookService)
    container.register(BaseOderService, ORMOrderService)

    # Initialize Book validators
    register_books_validators(container)

    # Initialize Order validators
    register_orders_validators(container)

    # Initialize Book use cases
    register_books_use_cases(container)
    # Initialize Order use cases
    register_orders_use_cases(container)

    return container
