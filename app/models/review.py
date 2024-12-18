from .db import db, environment, SCHEMA, add_prefix_for_prod


class Review(db.Model):
    __tablename__ = "reviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    station_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("stations.id")), nullable=False)
    review = db.Column(db.Text, nullable=False)

    user = db.relationship("User", back_populates="reviews")
    station = db.relationship("Station", back_populates="reviews")



def to_dic(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        "station_id": self.station_id,
        "review": self.review

    }