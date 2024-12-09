from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.models import Book, Order, OrderBook
from backend.schemas import BookCreate, OrderCreate


async def get_book(db: AsyncSession, skip: int = 0, limit: int = 10):
    result = await db.execute(select(Book).offset(skip).limit(limit))
    return result.scalars().all()


async def create_book(db: AsyncSession, book: BookCreate):
    db_book = Book(**book.model_dump())
    db.add(db_book)
    await db.commit()
    await db.refresh(db_book)
    return db_book


async def get_book_by_name(db: AsyncSession, name: str) -> Book:
    result = await db.execute(select(Book).filter(Book.name == name))
    return result.scalars().first()


async def create_order(db: AsyncSession, order: OrderCreate):
    total_price = 0
    items = []

    for item in order.books:
        result = await db.execute(select(Book).filter(Book.id == item.book_id))
        book = result.scalars().first()
        if not book:
            raise ValueError(f"Book with ID {item.book_id} not found")

        total_price += book.price * item.quantity

        items.append(
            OrderBook(
                book_id=item.book_id,
                quantity=item.quantity
            )
        )

    db_order = Order(
        total_price=total_price,
        email=order.email,
        phone=order.phone
    )
    db.add(db_order)
    await db.commit()
    await db.refresh(db_order)

    for item in items:
        item.order_id = db_order.id
        db.add(item)

    await db.commit()
    await db.refresh(db_order)
    return db_order
