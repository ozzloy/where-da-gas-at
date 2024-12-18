"""create station table

Revision ID: 72636fc7cbea
Revises: ffdc0a98111c
Create Date: 2024-12-17 22:52:10.177479

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "72636fc7cbea"
down_revision = "ffdc0a98111c"
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table(
        "station",
        sa.Column("id", sa.Integer(), nullable=False),
        sa.Column("name", sa.String(length=255), nullable=False),
        sa.Column("lat", sa.Float(), nullable=False),
        sa.Column("lng", sa.Float(), nullable=False),
        sa.Column("address", sa.String(length=255), nullable=False),
        sa.Column("uri", sa.Text(), nullable=False),
        sa.Column(
            "location_id", sa.String(length=255), nullable=False
        ),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(
            ["user_id"],
            ["user.id"],
        ),
        sa.PrimaryKeyConstraint("id"),
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table("station")
    # ### end Alembic commands ###
