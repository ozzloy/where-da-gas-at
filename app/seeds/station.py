from app.models import db, Station, environment, SCHEMA
from sqlalchemy.sql import text


def seed_station():
    first = Station(
        id=1,
        name="Electric Vehicle Charging Station",
        lat=47.5832543,
        lng=-122.03377579999999,
        address="3020 Issaquah-Pine Lake Rd SE, Sammamish, WA 98075, USA",
        uri="https://maps.google.com/?cid=90028760738209365",
        location_id="ChIJuwnmD-ZvkFQRVZ5eT67YPwE",
        user_id=1,
    )
    second = Station(
        id=2,
        name="Shell",
        lat=47.615336899999996,
        lng=-122.0374069,
        address="22631 NE Inglewood Hill Rd, Sammamish, WA 98074, USA",
        uri="https://maps.google.com/?cid=1862383325217865551",
        location_id="ChIJ6atYSPRxkFQRT784V8SD2Bk",
        user_id=2,
    )
    third = Station(
        id=3,
        name="Tesla Supercharger",
        lat=47.6164997,
        lng=-122.0332938,
        address="430-710 228th Ave NE, Sammamish, WA 98074, USA",
        uri="https://maps.google.com/?cid=4681353172202683726",
        location_id="ChIJ6atYSPRxkFQRT784V8SD2Bk",
        user_id=3,
    )

    db.session.add(first)
    db.session.add(second)
    db.session.add(third)
    db.session.commit()


def undo_station():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.station RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM station"))

    db.session.commit()
