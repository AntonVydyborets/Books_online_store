from pydantic import BaseModel

from core.project.configs import APP_CONFIG


config = APP_CONFIG()


class PaginationOut(BaseModel):
    offset: int
    limit: int
    total: int


class PaginationIn(BaseModel):
    offset: int = config.OFFSET
    limit: int = config.LIMIT
