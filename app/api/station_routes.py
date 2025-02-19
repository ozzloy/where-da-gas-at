from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required

from app.forms import EditStationForm, StationForm
from app.models import Station, db

station_routes = Blueprint("station", __name__)


@station_routes.route("/", methods=["GET"])
def read_stations():
    stations = Station.query.all()
    return {
        "station": {
            station.id: station.to_dict() for station in stations
        }
    }


@station_routes.route("/<string:id>", methods=["GET"])
def read_station(id):
    """
    get a station by id
    """
    station = Station.query.get(id)
    if not station:
        return {"error": f"station {id} does not exist"}, 404
    return {"station": {station.id: station.to_dict()}}


@station_routes.route("/", methods=["POST"])
@jwt_required()
def create_station():
    """insert new station, or update extant station"""
    form = StationForm()

    if not form.validate():
        return form.errors, 400

    created_status = 201
    updated_ok_status = 200

    status = created_status

    station = Station.query.get(form.data["id"])
    if station:
        station.name = form.data["name"]
        station.lat = form.data["lat"]
        station.lng = form.data["lng"]
        station.address = form.data["address"]
        station.uri = form.data["uri"]
        status = updated_ok_status
    else:
        station = Station(
            id=form.data["id"],
            name=form.data["name"],
            lat=form.data["lat"],
            lng=form.data["lng"],
            address=form.data["address"],
            uri=form.data["uri"],
        )
        db.session.add(station)

    db.session.commit()
    return {"station": {station.id: station.to_dict()}}, status


@station_routes.route("/<string:id>", methods=["PUT"])
@jwt_required()
def update_station(id):
    data = request.get_json()

    station = Station.query.get(id)

    if not station:
        return {"error": f"station {id} not found"}, 401

    station.id = data.get("id", station.id)
    station.name = data.get("name", station.name)
    station.lat = data.get("lat", station.lat)
    station.lng = data.get("lng", station.lng)
    station.address = data.get("address", station.address)
    station.uri = data.get("uri", station.uri)

    db.session.commit()
    return {"station": {station.id: station.to_dict()}}


@station_routes.route("/<string:id>", methods=["DELETE"])
@jwt_required()
def delete_station(id):
    station = Station.query.get(id)

    if not station:
        return {"error": "Station not found"}, 401

    db.session.delete(station)
    db.session.commit()
    return {"message": f"deleted station {station.id} successfully"}
