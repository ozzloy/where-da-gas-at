from .db import add_prefix_for_prod, db, environment, schema


class Review(db.Model):
    __tablename__ = "review"
    if schema:
        __table_args__ = {"schema": schema}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("user.id")),
        nullable=False,
    )
    station_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("station.id")),
        nullable=False,
    )
    review = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates="review")
    station = db.relationship("Station", back_populates="review")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "station_id": self.station_id,
            "review": self.review,
        }
