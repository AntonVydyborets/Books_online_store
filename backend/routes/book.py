from typing import Optional, List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend import crud, schemas, models
from backend.database import async_session


router = APIRouter()


@router.get("/books", response_model=List[schemas.BookResponse])
async def get_book(
    genre: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    skip: int = 0,
    limit: int = 10,
    db: AsyncSession = Depends(async_session)):
    query = select(models.Book)

    if genre:
        query = query.filter(models.Book.genre == genre)
    if min_price is not None:
        query = query.filter(models.Book.price >= min_price)
    if max_price is not None:
        query = query.filter(models.Book.price <= max_price)

    result = await db.execute(query.offset(skip).limit(limit))
    books = result.scalars().all()
    return books


@router.post("/books", response_model=schemas.BookResponse, status_code=201)
async def create_book(book: schemas.BookCreate, db: AsyncSession = Depends(async_session)):
    existing_book_query = await db.execute(select(models.Book).filter(models.Book.name == book.name))
    existing_book = existing_book_query.scalars().first()

    if existing_book:
        raise HTTPException(status_code=400, detail="Book with this name already exists")

    new_book = models.Book(**book.dict())
    db.add(new_book)
    await db.commit()
    await db.refresh(new_book)
    return new_book
