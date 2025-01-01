from sqlalchemy import Table

from .db import add_prefix_for_prod, db

king_station = Table(
    "king_station",
    db.Model.metadata,
    db.Column(
        "king_id",
        db.Integer,
        db.ForeignKey(
            add_prefix_for_prod("king.id"), ondelete="CASCADE"
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
