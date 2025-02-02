import punq

from core.apps.books.use_cases.books.create import CreateBookUseCase
from core.apps.books.use_cases.books.delete import DeleteBookUseCase
from core.apps.books.use_cases.books.get import (
    GetBookListUseCase,
    GetBookUseCase,
)
from core.apps.books.use_cases.books.get_image import GetBookImageUseCase
from core.apps.books.use_cases.books.put import UpdateBookUseCase
from core.apps.books.use_cases.books.upload_image import UploadImageUseCase


def register_use_cases(container: punq.Container):
    container.register(GetBookListUseCase)
    container.register(GetBookUseCase)
    container.register(CreateBookUseCase)
    container.register(UpdateBookUseCase)
    container.register(DeleteBookUseCase)
    container.register(UploadImageUseCase)
    container.register(GetBookImageUseCase)
