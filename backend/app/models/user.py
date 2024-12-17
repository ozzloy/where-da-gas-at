from os import environ
from datetime import datetime

from sqlalchemy import Integer, String
from sqlalchemy.orm import Mapped, mapped_column, DeclarativeBase

from app import db


schema = environ.get("SCHEMA", "set SCHEMA in backend/.env")


class User(db.Model):
    __tablename__ = "user"

    if schema:
        __table_args__ = {"schema": schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column()
    email: Mapped[str] = mapped_column(nullable=False)
    user: Mapped[str] = mapped_column(unique=True)
    created: Mapped[datetime] = mapped_column(default=datetime.utcnow)
