import punq

from core.apps.orders.services.validators.items import (
    OrderItemsExistValidatorService,
    OrderTotalPriceValidatorService,
)
from core.apps.orders.services.validators.orders import (
    BaseOrderValidatorService,
    ComposedOrderValidatorService,
    OrderEmailValidatorService,
    OrderExistValidatorService,
    OrderPhoneValidatorService,
)


def register_validators(container: punq.Container):
    container.register(OrderExistValidatorService)
    container.register(OrderPhoneValidatorService)
    container.register(OrderEmailValidatorService)
    container.register(OrderItemsExistValidatorService)
    container.register(OrderTotalPriceValidatorService)

    # Initialize composed validators fabrics
    def build_orders_validators() -> BaseOrderValidatorService:
        return ComposedOrderValidatorService(
            validators=[
                container.resolve(OrderExistValidatorService),
                container.resolve(OrderPhoneValidatorService),
                container.resolve(OrderEmailValidatorService),
                container.resolve(OrderItemsExistValidatorService),
                container.resolve(OrderTotalPriceValidatorService),
            ],
        )

    # Register Composed validators
    container.register(
        BaseOrderValidatorService,
        factory=build_orders_validators,
    )
