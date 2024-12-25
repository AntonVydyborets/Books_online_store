from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)
from fastapi.responses import JSONResponse

from sqlalchemy.ext.asyncio import AsyncSession

from core.api.filters import (
    PaginationIn,
    PaginationOut,
)
from core.api.schemas import (
    APIResponse,
    ListPaginationResponse,
)
from core.api.v1.books.filters import BookFilters
from core.api.v1.books.schemas import (
    BookInSchema,
    BookOutSchema,
    BookSchema,
)
from core.apps.books.filters.books import BookFilters as BookFiltersEntity
from core.apps.books.services.books import BaseBookService
from core.apps.books.use_cases.books.create import CreateBookUseCase
from core.apps.books.use_cases.books.delete import DeleteBookUseCase
from core.apps.books.use_cases.books.put import UpdateBookUseCase
from core.apps.common.exceptions import ServiceException
from core.project.containers import get_container
from core.project.database import get_session


router = APIRouter(tags=["books"], prefix="/books")


@router.get(
    "/",
    response_model=APIResponse[ListPaginationResponse[BookSchema]],
)
async def get_book_list_handler(
    filters: BookFilters = Depends(),
    pagination_in: PaginationIn = Depends(),
    session: AsyncSession = Depends(get_session),
) -> APIResponse[ListPaginationResponse[BookSchema]]:

    container = get_container()
    service: BaseBookService = container.resolve(BaseBookService)

    book_list = await service.get_book_list(
        filters=BookFiltersEntity(
            search=filters.search,
            genre=filters.genre,
            min_price=filters.min_price,
            max_price=filters.max_price,
        ),
        pagination=pagination_in,
        session=session,
    )
    book_count = await service.get_book_count(
        filters=BookFiltersEntity(
            search=filters.search,
            genre=filters.genre,
            min_price=filters.min_price,
            max_price=filters.max_price,
        ),
        session=session,
    )
    items = [BookSchema.from_entity(obj) for obj in book_list]
    pagination_out = PaginationOut(
        offset=pagination_in.offset,
        limit=pagination_in.limit,
        total=book_count,
    )

    return APIResponse(
        data=ListPaginationResponse(
            items=items,
            pagination=pagination_out,
        ),
    )


@router.post(
    "/",
    response_model=APIResponse[BookOutSchema],
    operation_id="create_book",
)
async def create_book(
    schema: BookInSchema,
    session: AsyncSession = Depends(get_session),
) -> APIResponse[BookOutSchema]:
    container = get_container()
    use_case: CreateBookUseCase = container.resolve(CreateBookUseCase)

    try:
        result = await use_case.execute(
            book=schema.to_entity(),
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return APIResponse(data=BookOutSchema.from_entity(entity=result))


@router.put("/", response_model=APIResponse[BookOutSchema])
async def update_book(
    schema: BookInSchema,
    session: AsyncSession = Depends(get_session),
) -> APIResponse[BookOutSchema]:
    container = get_container()
    use_case: UpdateBookUseCase = container.resolve(UpdateBookUseCase)

    try:
        result = await use_case.execute(
            book=schema.to_entity(),
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return APIResponse(data=BookOutSchema.from_entity(entity=result))


@router.delete("/")
async def delete_book(
    schema: BookInSchema,
    session: AsyncSession = Depends(get_session),
):
    container = get_container()
    use_case: DeleteBookUseCase = container.resolve(DeleteBookUseCase)

    try:
        await use_case.execute(
            book=schema.to_entity(),
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return JSONResponse(
        status_code=200,
        content={"message": "Book successfully deleted"},
    )
