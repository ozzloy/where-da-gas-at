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
    if not all(
        key in data for key in ["name", "email", "user", "password"]
    ):
        return jsonify({"error": "missing required fields"})

    try:
        user = User(
            name=data["name"], email=data["email"], user=data["user"]
        )
        print(f"TODO: handle pw")
        db.session.add(user)
        db.session.commit()

        return (
            jsonify(
                {
                    "user": {
                        user.id: {
                            "id": user.id,
                            "name": user.name,
                            "user": user.user,
                        }
                    }
                }
            ),
            201,
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@user.route("/<int:user_id>", methods=["GET"])
def read_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return (
                jsonify({"error": f"user {user_id} not found"}),
                404,
            )

        return jsonify(
            {
                "user": {
                    user.id: {
                        "id": user.id,
                        "name": user.name,
                        "user": user.user,
                    }
                }
            }
        )
    except Exception as e:
        return jsonify({"error": str(e)})


@user.route("/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    # read json body
    # store in the users table
    # {
    #   "name": "john smith",
    #   "email": "john.smith@example.com",
    #   "user": "johnsmith",
    #   "password": "secret password"
    # }
    try:
        user = User.query.get(user_id)
        if not user:
            return (
                jsonify({"error": f"user {user_id} not found"}),
                404,
            )

        data = request.get_json()

        if "name" in data:
            user.name = data["name"]
        if "email" in data:
            user.email = data["email"]
        if "user" in data:
            user.user = data["user"]
        if "password" in data:
            print(f"TODO: handle pw")
        db.session.commit()

        return jsonify(
            {
                "user": {
                    user.id: {
                        "id": user.id,
                        "name": user.name,
                        "user": user.user,
                    }
                }
            }
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)})


@user.route("/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    try:
        user = User.query.get(user_id)
        if not user:
            return (
                jsonify({"error": f"user {user_id} not found"}),
                404,
            )
        db.session.delete(user)
        db.session.commit()

        return jsonify(
            {"message": f"deleted user {user_id} successfully"}
        )
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
