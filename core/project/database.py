from contextlib import AbstractAsyncContextManager
from functools import lru_cache
from typing import (
    Any,
    Generator,
)

from sqlalchemy.ext.asyncio import (
    async_sessionmaker,
    AsyncSession,
    create_async_engine,
)

from core.project.configs import APP_CONFIG


@lru_cache(maxsize=1)
def get_engine():
    return create_async_engine(APP_CONFIG().POSTGRES_URI, pool_pre_ping=True)


SessionLocal = async_sessionmaker(
    bind=get_engine(), expire_on_commit=False, class_=AsyncSession,
)


async def get_session() -> (
    Generator[Any, Any, AbstractAsyncContextManager[AsyncSession]]
):
    async with SessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
