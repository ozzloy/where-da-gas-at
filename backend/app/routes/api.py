from flask import Blueprint

api = Blueprint("api", __name__, url_prefix="/api")


@api.route("/up")
def up():
    return {"hello": "world"}
