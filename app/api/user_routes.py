from flask import Blueprint, request
from flask_login import current_user, login_required, logout_user

from app.models import db, Station, User

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


@user_routes.route("/", methods=["DELETE"])
@login_required
def delete_user():
    """
    delete and log out currently logged in user
    """

    db.session.delete(current_user)
    db.session.commit()

    user_id = current_user.id
    logout_user()
    return {"message": f"deleted user {user_id} successfully"}


@user_routes.route(
    "/current/station/<int:station_id>", methods=["POST"]
)
@login_required
def create_current_user_station(station_id):
    """
    save a station for the current user
    """
    # make sure there is a station with station id.
    station = Station.query.get(station_id)

    # if there is not, return an error indicating that there is no
    #  such station
    if not station:
        return {"error": f"station {station_id} does not exist"}, 404

    # add the station to the user's list of saved stations
    stations = current_user.saved_stations
    if station not in stations:
        stations.append(station)

    # put that change in the db
    db.session.commit()

    # indicate success
    return "", 201
