from datetime import datetime

from sqlalchemy import (
    Column,
    DateTime,
)
from sqlalchemy.orm import declarative_base
from sqlalchemy.sql import func


Base = declarative_base()


class TimedBaseModel(Base):
    __abstract__ = True

    created_at = Column(
        DateTime,
        server_default=func.now(),
        nullable=False,
        comment="Date of creating",
    )

    updated_at = Column(
        DateTime,
        server_default=func.now(),
        onupdate=datetime.now(),
        nullable=False,
        comment="Date of updating",
    )
