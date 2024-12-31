from flask_login import UserMixin
from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
)

from .db import add_prefix_for_prod, db, environment, SchemaMixin
from .user_station import user_station


class User(db.Model, UserMixin, SchemaMixin):
    __tablename__ = "user"

    id = db.Column(db.Integer, primary_key=True)
    nick = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(40))
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)
    saved_stations = db.relationship(
        "Station",
        secondary=user_station,
        back_populates="saved_by",
    )

    @property
    def password(self):
        return self.password_hash

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "nick": self.nick,
            "email": self.email,
            "saved_stations": [
                station.id for station in self.saved_stations
            ],
        }
