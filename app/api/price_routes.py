from flask import Blueprint, request
from flask_login import login_required, current_user

from app.models import db
from app.models.price import Price


price_routes = Blueprint("price", __name__)


@price_routes.route("/", methods=["POST"])
@login_required
def create_price():
    """
    create a new price for logged in user.
    request body requires keys: fuel_type, price, station_id
    """
    # get current logged in user's id
    # use that to create a price object
    # the fields fuel_type, price, and station_id should
    # come from the body's json
    # after creating the price, make sure it's in the db
    # the return object should look like this
    data = request.get_json()
    required_fields = [
        column.name
        for column in Price.__table__.columns
        if not column.nullable
        and column.name not in ["id", "user_id"]
    ]

    missing_fields = [
        field for field in required_fields if field not in data
    ]
    if missing_fields:
        return {
            "error": f"missing required fields: {missing_fields}"
        }, 400

    price = Price(
        price=data["price"],
        station_id=data["station_id"],
        fuel_type=data["fuel_type"],
        user_id=current_user.id,
    )

    db.session.add(price)
    db.session.commit()

    return {"price": {price.id: price.to_dict()}}
    """
    {
      "price":
      {
        "1":
        {
          "id": 1,
          "price": 456.789,
          "user_id": 1,
          "station_id": 1,
          "fuel_type": "one of: electric, unleaded, leaded, or premium",
          "created": "2021-11-19 20:39:36",
          "updated": "2021-11-19 20:39:36"
        }
      }
    }
    """


    """
    get all prices
    """
    prices = Price.query.all()
    return {"price": {price.id: price.to_dict() for price in prices}}
