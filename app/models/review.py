from .db import add_prefix_for_prod, db, environment, SchemaMixin


class Review(db.Model, SchemaMixin):
    __tablename__ = "review"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(
            add_prefix_for_prod("user.id"), ondelete="CASCADE"
        ),
        nullable=False,
    )
    station_id = db.Column(
        db.Integer,
        db.ForeignKey(
            add_prefix_for_prod("station.id"), ondelete="CASCADE"
        ),
        nullable=False,
    )
    review = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "station_id": self.station_id,
            "review": self.review,
        }
