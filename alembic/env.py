from logging.config import fileConfig
from backend.database import Base
from alembic import context
from backend.database import DATABASE_URL
from sqlalchemy.ext.asyncio import create_async_engine, AsyncEngine
import asyncio
from sqlalchemy import inspect

engine = create_async_engine(DATABASE_URL, echo=True, future=True)
config = context.config


if config.config_file_name is not None:
    fileConfig(config.config_file_name)


target_metadata = Base.metadata


def run_migrations_offline() -> None:
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_async_migrations():

    async with engine.connect() as connection:
        await connection.begin()  #
        context.configure(
            connection=connection,
            target_metadata=target_metadata
        )
        await context.run_migrations()  


def run_migrations_online():
    connectable = create_async_engine(DATABASE_URL, echo=True)

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,
            compare_server_default=True,
        )

        connection.run_sync(lambda conn: inspect(conn).has_table('your_version_table'))
        with context.begin_transaction():
            context.run_migrations()