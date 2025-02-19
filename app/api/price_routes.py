from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.models import db
from app.models.price import Price


price_routes = Blueprint("price", __name__)


@price_routes.route("/", methods=["POST"])
@jwt_required()
def create_price():
    """
    create a new price for logged in king.
    request body requires keys: fuel_type, price, station_id
    """
    king_id = int(get_jwt_identity())
    # get current logged in king's id
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
        and column.name not in ["id", "king_id"]
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
        king_id=king_id,
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
          "king_id": 1,
          "station_id": 1,
          "fuel_type": "one of: electric, unleaded, leaded, or premium",
          "created": "2021-11-19 20:39:36",
          "updated": "2021-11-19 20:39:36"
        }
      }
    }
    """


@price_routes.route("/")
def read_prices():
    """
    get all prices
    """
    prices = Price.query.all()
    return {"price": {price.id: price.to_dict() for price in prices}}


@price_routes.route("/<int:id>")
def read_price(id):
    """
    get price by id
    """
    price = Price.query.get(id)
    return {"price": {price.id: price.to_dict()}}


@price_routes.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_price(id):
    king_id = int(get_jwt_identity())
    price = Price.query.get(id)
    if not price.king_id == king_id:
        return {"message": "forbidden"}, 403

    # otherwise, get the info from the request's json
    data = request.get_json()
    # and merge it into the price
    for key, value in data.items():
        setattr(price, key, value)
    # then make sure the price is saved to the db
    db.session.commit()
    # and finally, return {"price": {str(id):price.to_dict()}}
    return {"price": {str(id): price.to_dict()}}


@price_routes.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_price(id):
    king_id = int(get_jwt_identity())
    price = Price.query.get(id)
    if not price:
        return {"message": f"price {id} not found"}, 404

    if not price.king_id == king_id:
        return {"message": "forbidden"}, 403

    # otherwise, delete the price
    db.session.delete(price)
    # then make sure the price is saved to the db
    db.session.commit()

    # and finally, return {"message": f}
    return {"message": f"deleted price {price.id} successfully"}
