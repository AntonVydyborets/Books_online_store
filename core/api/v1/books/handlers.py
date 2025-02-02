from fastapi import (
    APIRouter,
    Depends,
    File,
    HTTPException,
    UploadFile,
)
from fastapi.responses import (
    FileResponse,
    JSONResponse,
)

from sqlalchemy.ext.asyncio import AsyncSession

from core.api.filters import PaginationIn
from core.api.schemas import (
    APIResponse,
    ListPaginationResponse,
)
from core.api.v1.books.filters import BookFilters
from core.api.v1.books.schemas import (
    BookInSchema,
    BookOutSchema,
)
from core.apps.books.filters.books import BookFilters as BookFiltersEntity
from core.apps.books.use_cases.books.create import CreateBookUseCase
from core.apps.books.use_cases.books.delete import DeleteBookUseCase
from core.apps.books.use_cases.books.get import (
    GetBookListUseCase,
    GetBookUseCase,
)
from core.apps.books.use_cases.books.get_image import GetBookImageUseCase
from core.apps.books.use_cases.books.put import UpdateBookUseCase
from core.apps.books.use_cases.books.upload_image import UploadImageUseCase
from core.apps.common.exceptions import ServiceException
from core.project.container.containers import get_container
from core.project.database import get_session


router = APIRouter(tags=["books"], prefix="/books")


@router.get(
    "/",
    response_model=APIResponse[ListPaginationResponse[BookOutSchema]],
)
async def get_book_list_handler(
    filters: BookFilters = Depends(),
    pagination_in: PaginationIn = Depends(),
    session: AsyncSession = Depends(get_session),
) -> APIResponse[ListPaginationResponse[BookOutSchema]]:

    container = get_container()
    use_case: GetBookListUseCase = container.resolve(GetBookListUseCase)

    try:
        items, pagination_out = await use_case.execute(
            filters=BookFiltersEntity(
                search=filters.search,
                min_price=filters.min_price,
                max_price=filters.max_price,
                min_quantity=filters.min_quantity,
                genres=filters.genres,
                author=filters.author,
                publisher=filters.publisher,
                country_of_origin=filters.country_of_origin,
                text_language=filters.text_language,
                min_publication_year=filters.min_publication_year,
                max_publication_year=filters.max_publication_year,
                min_rating=filters.min_rating,
                max_rating=filters.max_rating,
                tags=filters.tags,
            ),
            pagination_in=pagination_in,
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return APIResponse(
        data=ListPaginationResponse(
            items=[BookOutSchema.from_entity(item) for item in items],
            pagination=pagination_out,
        ),
    )


@router.get("/{book_id}", response_model=APIResponse[BookOutSchema])
async def get_book(
    book_id: int,
    session: AsyncSession = Depends(get_session),
) -> APIResponse[BookOutSchema]:

    container = get_container()
    use_case: GetBookUseCase = container.resolve(GetBookUseCase)

    try:
        book = await use_case.execute(
            book_id=book_id,
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return APIResponse(data=BookOutSchema.from_entity(book))


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
    book_entity = schema.to_entity()
    try:
        result = await use_case.execute(
            book=book_entity,
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


@router.delete("/{book_id}")
async def delete_book(
    book_id: int,
    session: AsyncSession = Depends(get_session),
):
    container = get_container()
    use_case: DeleteBookUseCase = container.resolve(DeleteBookUseCase)

    try:
        await use_case.execute(
            book_id=book_id,
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


@router.post("/{book_id}/upload_image/")
async def upload_book_image(
    book_id: int,
    image_file: UploadFile = File(...),
    session: AsyncSession = Depends(get_session),
):
    container = get_container()
    use_case: UploadImageUseCase = container.resolve(UploadImageUseCase)

    try:
        await use_case.execute(
            book_id=book_id,
            image_file=image_file,
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return JSONResponse(
        status_code=200,
        content={"message": "Image successfully saved"},
    )


@router.get("/{book_id}/image/")
async def get_book_image(
    book_id: int,
    session: AsyncSession = Depends(get_session),
):
    container = get_container()
    use_case: GetBookImageUseCase = container.resolve(GetBookImageUseCase)

    try:
        image_path = await use_case.execute(book_id=book_id, session=session)
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return FileResponse(image_path)
