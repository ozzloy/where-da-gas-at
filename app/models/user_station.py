from sqlalchemy import Table

from .db import add_prefix_for_prod, db

user_station = Table(
    "user_station",
    db.Model.metadata,
    db.Column(
        "user_id",
        db.Integer,
        db.ForeignKey(
            add_prefix_for_prod("user.id"), ondelete="CASCADE"
        ),
        primary_key=True,
    ),
    db.Column(
        "station_id",
        db.Integer,
        db.ForeignKey(
            add_prefix_for_prod("station.id"), ondelete="CASCADE"
        ),
        primary_key=True,
    ),
)
