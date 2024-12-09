from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend import crud, schemas
from backend.database import get_db

router = APIRouter()


@router.post("/orders", response_model=schemas.OrderResponse, status_code=201)
async def create_order(order: schemas.OrderCreate, db: AsyncSession = Depends(get_db)):
    try:
        new_order = await crud.create_order(db, order)
        return new_order
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
