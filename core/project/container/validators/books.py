import punq

from core.apps.books.services.validators import (
    BaseBookValidatorService,
    BookAuthorValidatorService,
    BookCountryOfOriginValidatorService,
    BookExistValidatorService,
    BookPriceValidatorService,
    BookQuantityValidatorService,
    BookRatingValidatorService,
    BookTextLanguageValidatorService,
    ComposedBookValidatorService,
    SingleBookValidatorService,
)


def register_validators(container: punq.Container):
    container.register(SingleBookValidatorService)
    container.register(BookExistValidatorService)

    container.register(BookQuantityValidatorService)
    container.register(BookPriceValidatorService)
    container.register(BookAuthorValidatorService)
    container.register(BookTextLanguageValidatorService)
    container.register(BookCountryOfOriginValidatorService)

    container.register(BookRatingValidatorService)

    # Initialize composed validators fabrics
    def build_books_validators() -> BaseBookValidatorService:
        return ComposedBookValidatorService(
            validators=[
                container.resolve(BookPriceValidatorService),
                container.resolve(BookQuantityValidatorService),
                container.resolve(BookAuthorValidatorService),
                container.resolve(BookTextLanguageValidatorService),
                container.resolve(BookRatingValidatorService),
                container.resolve(BookCountryOfOriginValidatorService),
            ],
        )

    # Register Composed validators
    container.register(
        BaseBookValidatorService,
        factory=build_books_validators,
    )
