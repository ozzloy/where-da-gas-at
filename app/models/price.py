from sqlalchemy import Column, Float, ForeignKey, Integer, String

from .db import add_prefix_for_prod, db, schema


class Price(db.Model):
    __tablename__ = "price"
    if schema:
        __table_args__ = {"schema": schema}

    id = Column(Integer, primary_key=True)

    price = Column(Float, nullable=False)
    station_id = Column(
        Integer,
        ForeignKey(add_prefix_for_prod("station.id")),
        nullable=False,
    )
    fuel_type = Column(String)
    user_id = Column(
        Integer,
        ForeignKey(add_prefix_for_prod("user.id")),
        nullable=False,
    )

    def to_dict(self):
        return {
            "id": self.id,
            "price": self.price,
            "station_id": self.station_id,
            "fuel_type": self.fuel_type,
            "user_id": self.user_id,
        }
