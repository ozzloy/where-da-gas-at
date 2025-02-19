from flask import Blueprint, request
from flask_jwt_extended import get_jwt_identity, jwt_required

from app.models import db, King, Station

king_routes = Blueprint("king", __name__)


# create king is in .auth_routes


@king_routes.route("/", methods=["GET"])
@jwt_required()
def read_kings():
    """
    Query for all kings and returns them in a list of king dictionaries
    """
    kings = King.query.all()
    return {"king": {king.id: king.to_dict() for king in kings}}


@king_routes.route("/<int:id>", methods=["GET"])
@jwt_required()
def read_king(id):
    """
    Query for a king by id and returns that king in a dictionary
    """
    king = King.query.get(id)
    return {"king": {king.id: king.to_dict()}}


@king_routes.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_king(id):
    """
    Query for a king by id and returns that king in a dictionary
    """
    king = King.query.get(id)
    if not king:
        return {"message": f"king {id} not found"}, 404
    if not king.id == id:
        return {
            "message": "forbidden, can't update someone else"
        }, 403

    data = request.get_json()
    if "id" in data:
        return {
            "message": "forbidden, cannot update your own id"
        }, 403

    for key, value in data.items():
        setattr(king, key, value)
    db.session.commit()
    return {"king": {king.id: king.to_dict()}}


@king_routes.route("/", methods=["DELETE"])
@jwt_required()
def delete_king():
    """
    delete and log out currently logged in king
    """

    king_id = int(get_jwt_identity())
    current_king = King.query.get(king_id)
    db.session.delete(current_king)
    db.session.commit()

    return {"message": f"deleted king {king_id} successfully"}


@king_routes.route(
    "/current/station/<string:station_id>", methods=["POST"]
)
@jwt_required()
def create_current_king_station(station_id):
    """
    save a station for the current king
    """
    king_id = int(get_jwt_identity())
    current_king = King.query.get(king_id)
    # make sure there is a station with station id.
    station = Station.query.get(station_id)

    # if there is not, return an error indicating that there is no
    #  such station
    if not station:
        return {"error": f"station {station_id} does not exist"}, 404

    # add the station to the king's list of saved stations
    stations = current_king.saved_stations
    if station not in stations:
        stations.append(station)

    # put that change in the db
    db.session.commit()

    # indicate success
    return "", 201


@king_routes.route("/current/stations", methods=["GET"])
@jwt_required()
def get_current_king_stations():
    """
    get all stations for the current king
    """
    king_id = int(get_jwt_identity())
    current_king = King.query.get(king_id)
    # make sure there is a station with station id.
    stations = current_king.saved_stations

    # return the station details
    return {
        "stations": [station.to_dict() for station in stations]
    }, 200


@king_routes.route(
    "/current/station/<string:station_id>", methods=["DELETE"]
)
@jwt_required()
def delete_current_king_station(station_id):
    """
    delete a station for the current king
    """
    king_id = int(get_jwt_identity())
    current_king = King.query.get(king_id)
    # make sure there is a station with station id.
    station = Station.query.get(station_id)

    # if there is not, return an error indicating that there is no
    #  such station
    if not station:
        return {"error": f"station {station_id} does not exist"}, 404

    # remove the station from the king's list of saved stations
    stations = current_king.saved_stations

    if station not in stations:
        message = (
            "station "
            + str(station_id)
            + " not in king "
            + str(current_king.id)
            + "'s saved stations"
        )
        return {"error": message}, 404

    stations.remove(station)

    # put that change in the db
    db.session.commit()

    # indicate success
    return "", 204
