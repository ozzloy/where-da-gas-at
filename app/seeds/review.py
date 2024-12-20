from sqlalchemy.sql import text

from app.models import db, dialect, Review, schema
from app.models.station import Station
from app.models.user import User
from app.seeds.user import user_seeds
from app.seeds.station import station_seeds


user_emails = [user_seed["email"] for user_seed in user_seeds]
station_uris = [station_seed["uri"] for station_seed in station_seeds]


review_seeds = [
    {
        "user_id": 1,
        "station_id": 1,
        "review": """
          Great place for premium gas,
          but the line can get long during rush hour.
        """,
    },
    {
        "user_id": 1,
        "station_id": 3,
        "review": """
          Love this place!
          The charging speed is awesome,
          and the restroom is always clean.
        """,
    },
    {
        "user_id": 2,
        "station_id": 2,
        "review": """
          Best fuel stop in town!
          The air pump works great and the staff is super friendly.
        """,
    },
    {
        "user_id": 2,
        "station_id": 1,
        "review": """
          Excellent experience!
          Staff is friendly, and the charging process is seamless.
        """,
    },
    {
        "user_id": 3,
        "station_id": 3,
        "review": """
          Charging works well, but the place is often crowded.
          Needs more space for parking.
        """,
    },
    {
        "user_id": 3,
        "station_id": 1,
        "review": """
          Excellent experience!
          Staff is friendly, and the charging process is seamless.
        """,
    },
]


def seed_review():
    users = User.query.filter(User.email.in_(user_emails)).all()
    stations = Station.query.filter(
        Station.uri.in_(station_uris)
    ).all()

    for review_seed in review_seeds:
        review = Review(
            review=review_seed["review"],
            user_id=users[review_seed["user_id"] - 1].id,
            station_id=stations[review_seed["station_id"] - 1].id,
        )
        db.session.add(review)

    db.session.commit()


def undo_review():
    sql = ""
    table = "review"
    if schema:
        table = f'{schema}."{table}"'
    if dialect in ["postgresql"]:
        sql = f"TRUNCATE {table} RESTART IDENTITY CASCADE"
    elif dialect in ["sqlite"]:
        sql = f"DELETE FROM {table}"
    else:
        raise Exception(f"unknown db dialect: {dialect}")

    db.session.execute(sql)
    db.session.commit()
