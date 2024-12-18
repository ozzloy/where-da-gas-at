from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import (
    generate_password_hash,
    check_password_hash,
)
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = "user"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(40), nullable=False, unique=True)
    name = db.Column(db.String(40))
    email = db.Column(db.String(255), nullable=False, unique=True)
    password_hash = db.Column(db.String(255), nullable=False)

    stations = db.relationship("Station", back_populates="user")

    stations = db.relationship("Station", back_populates="user")
    
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
            "user": self.user,
            "email": self.email,
        }
