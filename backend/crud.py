from sqlalchemy.orm import Session
from backend.models import Book, Order
from backend.schemas import BookCreate, OrderCreate, OrderBookCreate


async def get_book(db: Session, skip: int=0, limit: int=10):
    return db.query(Book).offset(skip).limit(limit).all()


async def create_book(db: Session, book: BookCreate):
    db_book = Book(book.model_dump())
    db.add(db_book)
    await db.commit()
    await db.refresh(db_book)
    return db_book


async def create_order(db: Session, order: OrderCreate):
    total_price = 0
    items = []
    for item in order.books:
        book = db.query(Book).filter(Book.id == item.book_id).first()
        total_price += book.price * item.quantity
        items.append(OrderBookCreate(book_id=item.book_id, quantity=item.quantity))
    db_order = Order(total_price=total_price, email=order.email, phone=order.phone, items=items)
    db.add(db_order)
    await db.commit()
    await db.refresh(db_order)
    return db_order
