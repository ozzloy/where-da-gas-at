from flask import Blueprint
from flask_login import login_required

from app.models.price import Price


price_routes = Blueprint("price", __name__)


@price_routes.route("/")
@login_required
def price():
    """
    get all prices
    """
    prices = Price.query.all()
    return {"price": {price.id: price.to_dict() for price in prices}}
