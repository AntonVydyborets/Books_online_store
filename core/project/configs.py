from pydantic import Field
from pydantic_settings import BaseSettings


class APP_CONFIG(BaseSettings):
    # Database
    POSTGRES_DB: str = Field(alias="POSTGRES_DB")
    POSTGRES_USER: str = Field(alias="POSTGRES_USER")
    POSTGRES_PASSWORD: str = Field(alias="POSTGRES_PASSWORD")
    POSTGRES_PORT: str = Field(alias="POSTGRES_PORT")
    POSTGRES_HOST: str = Field(alias="POSTGRES_HOST")

    @property
    def POSTGRES_URI(self) -> str:
        return (
            f"postgresql+asyncpg://{self.POSTGRES_USER}:{self.POSTGRES_PASSWORD}"
            f"@{self.POSTGRES_HOST}:{self.POSTGRES_PORT}/{self.POSTGRES_DB}"
        )

    # Auth
    # SECRET_KEY: str = "secret" # noqa
    # ACCESS_TOKEN_EXPIRE_MINUTES: int = (
    #     60 * 24 * 30
    # )  # 60 minutes * 24 hours * 30 days = 30 days

    # CORS
    # BACKEND_CORS_ORIGINS: List[str] = ["*"] # noqa

    # Search query
    OFFSET: int = Field(alias="PAGE_OFFSET")
    LIMIT: int = Field(alias="PAGE_LIMIT")

    class Config:
        env_file = ".env"
        extra = "allow"
