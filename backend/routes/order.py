from fastapi import APIRouter, Depends
from backend import crud, schemas
from backend.database import async_session
from sqlalchemy.orm import Session

router = APIRouter()

@router.post("/orders", response_model=schemas.OrderResponse)
async def create_order(order: schemas.OrderCreate, db: Session = Depends(async_session)):
    return await crud.create_order(db, order)
