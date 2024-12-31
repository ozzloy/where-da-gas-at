from sqlalchemy.sql import text

from app.models import db, undo_table
from app.models.price import Price
from app.models.station import Station
from app.models.user import User
from app.seeds.station import station_seeds
from app.seeds.user import user_seeds

user_emails = [user_seed["email"] for user_seed in user_seeds]
station_uris = [station_seed["uri"] for station_seed in station_seeds]

fuel_types = [
    "premium",
    "unleaded",
    "leaded",
    "Unleaded Regular (87 octane)",
    "Unleaded Mid-grade/Plus (89 octane)",
    "Unleaded Premium (91-93 octane)",
    "Diesel (for diesel engines)",
    "E85 (85% ethanol, 15% gasoline blend)",
    "E15 (15% ethanol blend)",
    "Racing fuel (100+ octane, at specialty stations)",
    "Marine fuel (for boats)",
    "Aviation fuel (at airports)",
    "120V",
    "240V",
    "CCS",
    "CHAdeMO",
    "Tesla Supercharger",
]

price_seeds = [
    {
        "price": 123.45,
        "station_id": 1,
        "fuel_type": fuel_types[0],
        "user_id": 1,
    },
    {
        "price": 234.56,
        "station_id": 2,
        "fuel_type": fuel_types[1],
        "user_id": 3,
    },
    {
        "price": 1,
        "station_id": 2,
        "fuel_type": fuel_types[2],
        "user_id": 2,
    },
    {
        "price": 0.01,
        "station_id": 3,
        "fuel_type": fuel_types[-1],
        "user_id": 2,
    },
]


def seed_price():
    users = User.query.filter(User.email.in_(user_emails)).all()
    stations = Station.query.filter(
        Station.uri.in_(station_uris)
    ).all()

    for price_seed in price_seeds:
        price = Price(
            price=price_seed["price"],
            station_id=stations[price_seed["station_id"] - 1].id,
            fuel_type=price_seed["fuel_type"],
            user_id=users[price_seed["user_id"] - 1].id,
        )
        db.session.add(price)

    db.session.commit()


def undo_price():
    undo_table("price")
