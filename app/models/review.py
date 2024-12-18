from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "review"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("user.id")), nullable=False)
    # station_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("station.id")), nullable=False)
    review = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates="reviews", cascade="all, delete-orphan")
    # station = db.relationship("Station", back_populates="reviews", cascade="all, delete-orphan")



def to_dict(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        # "station_id": self.station_id,
        "review": self.review

    }

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

    # user = db.relationship("User", back_populates="reviews")
    # station = db.relationship("Station", back_populates="reviews")


def to_dic(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        "station_id": self.station_id,
        "review": self.review,
    }

