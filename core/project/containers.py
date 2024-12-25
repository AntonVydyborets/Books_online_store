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
from core.apps.books.use_cases.books.put import UpdateBookUseCase


# Dependency injector container implementation


@lru_cache(1)
def get_container() -> punq.Container:
    return _initialize_container()


def _initialize_container() -> punq.Container:
    container = punq.Container()

    # Initialize books
    container.register(BaseBookService, ORMBookService)

    container.register(SingleBookValidatorService)
    container.register(BookExistValidatorService)
    container.register(BookRatingValidatorService)

    def build_validators() -> BaseBookValidatorService:
        return ComposedBookValidatorService(
            validators=[
                container.resolve(SingleBookValidatorService),
                container.resolve(BookRatingValidatorService),
            ],
        )

    container.register(BaseBookValidatorService, factory=build_validators)
    container.register(CreateBookUseCase)
    container.register(UpdateBookUseCase)
    container.register(DeleteBookUseCase)

    return container
