"""Add extra fields in BookModel

Revision ID: 3356c3d1519d
Revises: 2c019781510e
Create Date: 2025-01-15 15:44:30.957850

"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "3356c3d1519d"
down_revision: Union[str, None] = "2c019781510e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("books", sa.Column("current_price", sa.Float(), nullable=True))
    op.add_column("books", sa.Column("old_price", sa.Float(), nullable=True))
    op.add_column(
        "books",
        sa.Column(
            "quantity",
            sa.Integer(),
            nullable=False,
            server_default="0",
        ),
    )
    op.alter_column("books", "quantity", server_default=None)
    op.add_column("books", sa.Column("genres", sa.ARRAY(sa.String()), nullable=True))
    op.add_column("books", sa.Column("tags", sa.ARRAY(sa.String()), nullable=True))

    op.execute("UPDATE books SET current_price = price")
    op.execute("UPDATE books SET genres = ARRAY['default_genre'] WHERE genres IS NULL")

    # Теперь делаем current_price обязательным (NOT NULL)
    op.alter_column("books", "current_price", nullable=False)
    op.alter_column("books", "genres", nullable=False)

    op.drop_column("books", "genre")
    op.drop_column("books", "is_available")
    op.drop_column("books", "price")
    op.drop_constraint("order_books_order_id_fkey", "order_books", type_="foreignkey")
    op.drop_constraint("order_books_book_id_fkey", "order_books", type_="foreignkey")
    op.create_foreign_key(
        None, "order_books", "orders", ["order_id"], ["id"], ondelete="CASCADE"
    )
    op.create_foreign_key(
        None, "order_books", "books", ["book_id"], ["id"], ondelete="CASCADE"
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###

    # Add the price column back
    op.add_column(
        "books",
        sa.Column(
            "price",
            sa.DOUBLE_PRECISION(precision=53),
            autoincrement=False,
            nullable=True,  # Temporarily allow NULL values to avoid the IntegrityError
        ),
    )

    # Copy data from current_price back to price, making sure no row has NULL in price
    op.execute("UPDATE books SET price = COALESCE(current_price, 0)")

    # Now set the price column to NOT NULL
    op.alter_column("books", "price", nullable=False)

    # Check if the genre column exists and only add it if it doesn't
    op.execute(
        """
        DO $$
        BEGIN
            IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='books' AND column_name='genre') THEN
                ALTER TABLE books ADD COLUMN genre VARCHAR(50) NOT NULL DEFAULT 'default_genre';
            END IF;
        END $$;
    """
    )

    # # Update genre to a default value if it has NULL values
    op.execute("UPDATE books SET genre = 'default_genre' WHERE genre IS NULL")

    # Now set the genre column to NOT NULL
    op.alter_column("books", "genre", nullable=False)

    # Drop columns added during upgrade
    op.drop_column("books", "current_price")
    op.drop_column("books", "old_price")
    op.drop_column("books", "quantity")
    op.drop_column("books", "genres")
    op.drop_column("books", "tags")

    # Restore old columns and constraints
    op.add_column(
        "books",
        sa.Column("is_available", sa.BOOLEAN(), autoincrement=False, nullable=True),
    )
    op.add_column(
        "books",
        sa.Column("genre", sa.VARCHAR(length=50), autoincrement=False, nullable=False),
    )

    # Restore old foreign key constraints
    op.drop_constraint(None, "order_books", type_="foreignkey")
    op.drop_constraint(None, "order_books", type_="foreignkey")
    op.create_foreign_key(
        "order_books_book_id_fkey", "order_books", "books", ["book_id"], ["id"]
    )
    op.create_foreign_key(
        "order_books_order_id_fkey", "order_books", "orders", ["order_id"], ["id"]
    )
    # ### end Alembic commands ###
