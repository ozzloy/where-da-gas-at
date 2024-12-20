from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import db, User

user_routes = Blueprint("user", __name__)


# create user is in .auth_routes


@user_routes.route("/", methods=["GET"])
@login_required
def read_users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {"user": {user.id: user.to_dict() for user in users}}


@user_routes.route("/<int:id>", methods=["GET"])
@login_required
def read_user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return {"user": {user.id: user.to_dict()}}


@user_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    if not user:
        return {"message": f"user {id} not found"}, 404
    if not user.id == id:
        return {
            "message": "forbidden, can't update someone else"
        }, 403

    data = request.get_json()
    if "id" in data:
        return {
            "message": "forbidden, cannot update your own id"
        }, 403

    for key, value in data.items():
        setattr(user, key, value)
    db.session.commit()
    return {"user": {user.id: user.to_dict()}}
