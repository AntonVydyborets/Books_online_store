import punq

from core.apps.books.use_cases.books.create import CreateBookUseCase
from core.apps.books.use_cases.books.delete import DeleteBookUseCase
from core.apps.books.use_cases.books.get import (
    GetBookListUseCase,
    GetBookUseCase,
)
from core.apps.books.use_cases.books.put import UpdateBookUseCase


def register_use_cases(container: punq.Container):
    container.register(GetBookListUseCase)
    container.register(GetBookUseCase)
    container.register(CreateBookUseCase)
    container.register(UpdateBookUseCase)
    container.register(DeleteBookUseCase)
