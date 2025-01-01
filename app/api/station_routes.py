from flask import Blueprint, jsonify, request
from flask_login import current_user as current_king, login_required

from app.forms import EditStationForm, StationForm
from app.models import Station, db

station_routes = Blueprint("station", __name__)


@station_routes.route("/", methods=["GET"])
@login_required
def read_stations():
    stations = Station.query.all()
    return {
        "station": {
            station.id: station.to_dict()
            for station in stations
            if station.king_id == current_king.id
        }
    }


@station_routes.route("/<int:id>", methods=["GET"])
@login_required
def read_station(id):
    station = Station.query.get(id)
    return {"station": {station.id: station.to_dict()}}


@station_routes.route("/", methods=["POST"])
@login_required
def create_station():
    form = StationForm()
    form["csrf_token"].data = request.cookies["csrf_token"]
    if form.validate_on_submit():
        station = Station(
            name=form.data["name"],
            lat=form.data["lat"],
            lng=form.data["lng"],
            address=form.data["address"],
            uri=form.data["uri"],
            location_id=form.data["location_id"],
            king_id=current_king.id,
        )
        print(station)
        db.session.add(station)
        db.session.commit()
        return {"station": {str(station.id): station.to_dict()}}
    return form.errors, 401


@station_routes.route("/<int:id>", methods=["PUT"])
@login_required
def update_station(id):
    data = request.get_json()

    station = Station.query.get(id)

    if not station:
        return {"error": f"station {id} not found"}, 401

    station.name = data.get("name", station.name)
    station.lat = data.get("lat", station.lat)
    station.lng = data.get("lng", station.lng)
    station.address = data.get("address", station.address)
    station.uri = data.get("uri", station.uri)
    station.location_id = data.get("location_id", station.location_id)

    db.session.commit()
    return {"station": {str(station.id): station.to_dict()}}


@station_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_station(id):
    if current_king.id:
        station = Station.query.get(id)
        if station and station.king_id == current_king.id:
            db.session.delete(station)
            db.session.commit()
            return {
                "message": f"deleted station {station.id} successfully"
            }
    return {"error": "Station not found or unauthorized"}, 401
