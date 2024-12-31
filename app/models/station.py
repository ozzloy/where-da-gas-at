from sqlalchemy.orm import relationship

from .db import (
    add_prefix_for_prod,
    db,
    environment,
    SchemaMixin,
)
from .user_station import user_station


class Station(db.Model, SchemaMixin):
    __tablename__ = "station"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    lat = db.Column(db.Float, nullable=False)
    lng = db.Column(db.Float, nullable=False)
    address = db.Column(db.String(255), nullable=False)
    uri = db.Column(db.Text, nullable=False)
    location_id = db.Column(db.String(255), nullable=False)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey(
            add_prefix_for_prod("user.id"), ondelete="CASCADE"
        ),
        nullable=False,
    )
    saved_by = db.relationship(
        "User",
        secondary=user_station,
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
            "location_id": self.location_id,
            "user_id": self.user_id,
            "saved_by": [user.id for user in self.saved_by],
        }
