from app.models import db, Station, undo_table
from app.models.king import King
from .king import emails


station_seeds = [
    {
        "id": "ChIJuwnmD-ZvkFQRVZ5eT67YPwE",
        "name": "Electric Vehicle Charging Station",
        "lat": 47.5832543,
        "lng": -122.03377579999999,
        "address": "3020 Issaquah-Pine Lake Rd SE, Sammamish, WA 98075, USA",
        "uri": "https://maps.google.com/?cid=90028760738209365",
    },
    {
        "id": "ChIJ6atYSPRxkFQRT784V8SD2Bk",
        "name": "Shell",
        "lat": 47.615336899999996,
        "lng": -122.0374069,
        "address": "22631 NE Inglewood Hill Rd, Sammamish, WA 98074, USA",
        "uri": "https://maps.google.com/?cid=1862383325217865551",
    },
    {
        "id": "0-example-location-id",
        "name": "Tesla Supercharger",
        "lat": 47.6164997,
        "lng": -122.0332938,
        "address": "430-710 228th Ave NE, Sammamish, WA 98074, USA",
        "uri": "https://maps.google.com/?cid=4681353172202683726",
    },
]


def seed_station():
    kings = King.query.filter(King.email.in_(emails)).all()
    for king, station_seed in zip(kings, station_seeds):
        station = Station(
            id=station_seed["id"],
            name=station_seed["name"],
            lat=station_seed["lat"],
            lng=station_seed["lng"],
            address=station_seed["address"],
            uri=station_seed["uri"],
        )
        db.session.add(station)
    db.session.commit()


def undo_station():
    undo_table("station")
