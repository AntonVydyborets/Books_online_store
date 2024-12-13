from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend import crud, schemas, models
from backend.database import get_db
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/admin/books", response_model=schemas.BookResponse)
async def create_book(book: schemas.BookCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_book(db, book)


@router.put("/admin/books/{book_id}", response_model=schemas.BookResponse)
async def update_book(
    book_id: int, book: schemas.BookCreate, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(models.Book).filter(models.Book.id == book_id))
    db_book = result.scalars().first()
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    for key, value in book.model_dump().items():
        setattr(db_book, key, value)
    db.add(db_book)
    await db.commit()
    await db.refresh(db_book)
    return db_book


@router.delete("/admin/books/{book_id}")
async def delete_book(book_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(models.Book).filter(models.Book.id == book_id))
    db_book = result.scalars().first()
    if not db_book:
        raise HTTPException(status_code=404, detail="Book not found")
    await db.delete(db_book)
    await db.commit()
    return {"message": "Book deleted"}


@router.get("/admin/orders/", response_model=list[schemas.OrderResponse])
async def get_orders(
    skip: int = 0, limit: int = 10, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(models.Order).offset(skip).limit(limit))
    return result.scalars().all()


@router.put("/admin/orders/{order_id}", response_model=schemas.OrderResponse)
async def update_order_status(
    order_id: int, status: str, db: AsyncSession = Depends(get_db)
):
    result = await db.execute(select(models.Order).filter(models.Order.id == order_id))
    db_order = result.scalars().first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Order not found")
    db_order.status = status
    db.add(db_order)
    await db.commit()
    await db.refresh(db_order)
    return db_order


@router.get("/healthcheck")
async def healthcheck(db: AsyncSession = Depends(get_db)):
    logger.info("Healthcheck endpoint was called")
    return {"status": "OK"}
