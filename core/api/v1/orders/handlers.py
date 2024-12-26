from fastapi import (
    APIRouter,
    Depends,
    HTTPException,
)

from sqlalchemy.ext.asyncio import AsyncSession

from core.api.filters import PaginationIn
from core.api.schemas import (
    APIResponse,
    ListPaginationResponse,
)
from core.api.v1.orders.schemas import (
    OrderInSchema,
    OrderOutSchema,
)
from core.apps.common.exceptions import ServiceException
from core.apps.orders.use_cases.orders.create import CreateOrderUseCase
from core.apps.orders.use_cases.orders.get import (
    GetOrderListUseCase,
    GetOrderUseCase,
)
from core.apps.orders.use_cases.orders.put import UpdateOrderUseCase
from core.project.containers import get_container
from core.project.database import get_session


router = APIRouter(tags=["orders"], prefix="/orders")


@router.get(
    "/",
    response_model=APIResponse[ListPaginationResponse[OrderOutSchema]],
)
async def get_order_list_handler(
    pagination_in: PaginationIn = Depends(),
    session: AsyncSession = Depends(get_session),
) -> APIResponse[ListPaginationResponse[OrderOutSchema]]:

    container = get_container()
    use_case: GetOrderListUseCase = container.resolve(GetOrderListUseCase)

    try:
        items, pagination_out = await use_case.execute(
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
            items=[OrderOutSchema.from_entity(item) for item in items],
            pagination=pagination_out,
        ),
    )


@router.get("/{order_id}", response_model=APIResponse[OrderOutSchema])
async def get_order(
    order_id: int,
    session: AsyncSession = Depends(get_session),
) -> APIResponse[OrderOutSchema]:

    container = get_container()
    use_case: GetOrderUseCase = container.resolve(GetOrderUseCase)

    try:
        order = await use_case.execute(
            order_id=order_id,
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return APIResponse(data=OrderOutSchema.from_entity(order))


@router.post(
    "/",
    response_model=APIResponse[OrderOutSchema],
    operation_id="create_order",
)
async def create_order(
    schema: OrderInSchema,
    session: AsyncSession = Depends(get_session),
) -> APIResponse[OrderOutSchema]:
    container = get_container()
    use_case: CreateOrderUseCase = container.resolve(CreateOrderUseCase)

    try:
        result = await use_case.execute(
            order=schema.to_entity(),
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return APIResponse(data=OrderOutSchema.from_entity(entity=result))


@router.put("/", response_model=APIResponse[OrderOutSchema])
async def update_order(
    schema: OrderInSchema,
    session: AsyncSession = Depends(get_session),
) -> APIResponse[OrderOutSchema]:
    container = get_container()
    use_case: UpdateOrderUseCase = container.resolve(UpdateOrderUseCase)

    try:
        order = await use_case.execute(
            order=schema.to_entity(),
            session=session,
        )
    except ServiceException as error:
        raise HTTPException(
            status_code=400,
            detail=error.message,
        )

    return APIResponse(data=OrderOutSchema.from_entity(entity=order))
