import asyncio
import json
import shutil
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import (
    async_sessionmaker,
    AsyncSession,
    create_async_engine,
)

from core.apps.books.entities import Book
from core.apps.books.services.books import ORMBookService
from core.project.configs import APP_CONFIG


def get_engine():
    return create_async_engine(APP_CONFIG().POSTGRES_URI, pool_pre_ping=True)


SessionLocal = async_sessionmaker(
    bind=get_engine(),
    expire_on_commit=False,
    class_=AsyncSession,
)


async def get_session() -> AsyncGenerator[AsyncSession, None]:
    async with SessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def create_or_update_book(
    data: dict, session: AsyncSession, book_service: ORMBookService,
):

    # Пытаемся найти книгу по id
    is_book_exist = await book_service.check_book_exists_by_id(data["id"], session)
    if is_book_exist:
        existing_book = await book_service.get_by_id(data["id"], session)
    else:
        existing_book = None

    if existing_book:
        # Если книга существует, обновляем её
        existing_book.title = data["title"]
        existing_book.current_price = data["current_price"]
        existing_book.old_price = data["old_price"]
        existing_book.quantity = data["quantity"]
        existing_book.description = data["description"]
        existing_book.author = data["author"]
        existing_book.publisher = data["publisher"]
        existing_book.genres = [genre.strip() for genre in data["genres"].split(",")]
        existing_book.publication_year = data["publication_year"]
        existing_book.country_of_origin = data["country_of_origin"]
        existing_book.text_language = data["text_language"]
        existing_book.rating = data["rating"]
        existing_book.tags = [tag.strip() for tag in data["tags"].split(",")]

        # Сохраняем обновлённую книгу
        updated_book = await book_service.update_book(existing_book, session)
        updated_book = await book_service.get_by_id(data["id"], session)

        if "image_path" in data:
            image_path = data["image_path"]
            image_name = str(image_path).split("/")[-1]
            db_image_path = f"media/books/{image_name}"
            shutil.copy(f"core/project/tools/books_images/{image_name}", db_image_path)

            await book_service.save_image_path(updated_book.id, db_image_path, session)

        return updated_book

    else:
        # Если книга не существует, создаём её
        new_book = Book(
            title=data["title"],
            current_price=data["current_price"],
            old_price=data["old_price"],
            quantity=data["quantity"],
            description=data["description"],
            author=data["author"],
            publisher=data["publisher"],
            genres=[genre.strip() for genre in data["genres"].split(",")],
            publication_year=data["publication_year"],
            country_of_origin=data["country_of_origin"],
            text_language=data["text_language"],
            rating=data["rating"],
            tags=[tag.strip() for tag in data["tags"].split(",")],
        )

        # Сохраняем новую книгу
        saved_book = await book_service.save_book(new_book, session)

        if "image_path" in data:
            image_path = data["image_path"]
            image_name = str(image_path).split("/")[-1]
            db_image_path = f"media/books/{image_name}"
            shutil.copy(f"core/project/tools/books_images/{image_name}", db_image_path)

            await book_service.save_image_path(saved_book.id, db_image_path, session)

        return saved_book


async def load_books_from_json(file_path: str) -> list:
    with open(file_path, "r", encoding="utf-8") as f:
        return json.load(f)


async def main():
    async for session in get_session():
        book_service = ORMBookService()
        books_data = await load_books_from_json(
            "/app/core/project/tools/books_data.json",
        )

        for book_data in books_data:
            saved_book = await create_or_update_book(book_data, session, book_service)
            print(
                f"Book '{saved_book.title}' successfully saved or updated in the database!",
            )


asyncio.run(main())
