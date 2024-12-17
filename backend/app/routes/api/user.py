from flask import Blueprint, request, jsonify

from app import db
from app.models.user import User

user = Blueprint("user", __name__, url_prefix="/user")


@user.route("/up")
def up():
    return {"hello": "world"}


@user.route("/", methods=["POST"])
def create_user():
    data = request.get_json()
    if not all(key in data for key in ["name", "email", "user"]):
        return jsonify({"error": "missing required fields"})

    try:
        user = User(
            name=data["name"], email=data["email"], user=data["user"]
        )
        db.session.add(user)
        db.session.commit()

        return (
            jsonify(
                {
                    "id": user.id,
                    "name": user.name,
                    "user": user.user,
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@user.route("/<int:user_id>", methods=["GET"])
def get_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return jsonify({"error": "user not found"}), 404

        return jsonify(
            {
                "id": user.id,
                "name": user.name,
                "user": user.user,
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)})
