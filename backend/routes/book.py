from fastapi import APIRouter, Depends, HTTPException
from backend import crud, schemas
from backend.database import async_session
from sqlalchemy.orm import Session

router = APIRouter()

@router.get("/books", response_model=schemas.BookResponse)
async def get_book(skip: int=0, limit: int=0, db: Session = Depends(async_session)):
    return await crud.get_book(db, skip=skip, limit=limit)

@router.post("/books", response_model=schemas.BookResponse, status_code=201)
async def create_book(book: schemas.BookCreate, db: Session = Depends(async_session)):
    existing_book = crud.get_book_by_name(db, name=book.name)
    if existing_book:
        raise HTTPException(status_code=400, detail="Book with this name already exists")
    new_book = crud.create_book(db, book)
    return new_book
