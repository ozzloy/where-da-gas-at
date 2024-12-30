from sqlalchemy.sql import text

from app.models import db, Review, undo_table
from app.models.station import Station
from app.models.king import King
from app.seeds.king import king_seeds
from app.seeds.station import station_seeds


king_emails = [king_seed["email"] for king_seed in king_seeds]
station_uris = [station_seed["uri"] for station_seed in station_seeds]


review_seeds = [
    {
        "king_id": 1,
        "station_id": 1,
        "text": """
          Great place for premium gas,
          but the line can get long during rush hour.
        """,
    },
    {
        "king_id": 1,
        "station_id": 3,
        "text": """
          Love this place!
          The charging speed is awesome,
          and the restroom is always clean.
        """,
    },
    {
        "king_id": 2,
        "station_id": 2,
        "text": """
          Best fuel stop in town!
          The air pump works great and the staff is super friendly.
        """,
    },
    {
        "king_id": 2,
        "station_id": 1,
        "text": """
          Excellent experience!
          Staff is friendly, and the charging process is seamless.
        """,
    },
    {
        "king_id": 3,
        "station_id": 3,
        "text": """
          Charging works well, but the place is often crowded.
          Needs more space for parking.
        """,
    },
    {
        "king_id": 3,
        "station_id": 1,
        "text": """
          Excellent experience!
          Staff is friendly, and the charging process is seamless.
        """,
    },
]


def seed_review():
    kings = King.query.filter(King.email.in_(king_emails)).all()
    stations = Station.query.filter(
        Station.uri.in_(station_uris)
    ).all()

    for review_seed in review_seeds:
        review = Review(
            text=review_seed["text"],
            king_id=kings[review_seed["king_id"] - 1].id,
            station_id=stations[review_seed["station_id"] - 1].id,
        )
        db.session.add(review)

    db.session.commit()


def undo_review():
    undo_table("review")
