from app.models import db, Station, undo_table, King
from .king import demo_email, emails


def seed_king_station():
    """
    add seeds for king-station table, aka saved stations
    """

    kings = King.query.filter(King.email.in_(emails)).all()
    stations = Station.query.all()

    demo = next(king for king in kings if king.email == demo_email)
    demo.saved_stations.extend(stations)

    others = [king for king in kings if king.email != demo_email]
    for index, king in enumerate(others):
        king.saved_stations.append(stations[index % len(stations)])

    db.session.commit()


def undo_king_station():
    """
    remove saved stations
    """
    undo_table("king_station")
