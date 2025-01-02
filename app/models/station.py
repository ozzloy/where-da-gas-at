from sqlalchemy.orm import relationship

from .db import (
    add_prefix_for_prod,
    db,
    environment,
    SchemaMixin,
)
from .king_station import king_station


class Station(db.Model, SchemaMixin):
    __tablename__ = "station"

    id = db.Column(db.String(255), nullable=False, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    uri = db.Column(db.Text, nullable=False)

    king_id = db.Column(
        db.Integer,
        db.ForeignKey(
            add_prefix_for_prod("king.id"), ondelete="CASCADE"
        ),
        nullable=False,
    )

    saved_by = db.relationship(
        "King",
        secondary=king_station,
        back_populates="saved_stations",
    )

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "lat": self.lat,
            "lng": self.lng,
            "address": self.address,
            "uri": self.uri,
            "saved_by": [king.id for king in self.saved_by],
            "king_id": self.king_id,
        }
