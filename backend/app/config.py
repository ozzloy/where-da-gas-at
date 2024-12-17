from os import environ


class Config:
    SECRET_KEY = environ.get(
        "SECRET_KEY", "set SECRET_KEY in backend/.env"
    )
    SQLALCHEMY_DATABASE_URI = environ.get(
        "DATABASE_URL", "set DATABASE_URL in backend/.env"
    )
