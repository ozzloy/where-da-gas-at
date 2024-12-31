from app.models import db, Station, undo_table, User
from .user import demo_email, emails


def seed_user_station():
    """
    add seeds for user-station table, aka saved stations
    """

    users = User.query.filter(User.email.in_(emails)).all()
    stations = Station.query.all()

    demo = next(user for user in users if user.email == demo_email)
    demo.saved_stations.extend(stations)

    others = [user for user in users if user.email != demo_email]
    for index, user in enumerate(others):
        user.saved_stations.append(stations[index % len(stations)])

    db.session.commit()


def undo_user_station():
    """
    remove saved stations
    """
    undo_table("user_station")
