from typing import Any, Dict
import requests
from sqlalchemy import inspect

from app.models import db
from app.models.king import King
from app.models.station import Station

python_types = {
    db.Integer: int,
    db.String: str,
    db.Float: float,
    db.Text: str,
}


def validate_response(
    response: requests.Response,
    status: int = 200,
    expect_json: bool = True,
) -> Dict[str, Any]:
    assert response.status_code == status

    if not expect_json:
        return {}

    content_type = response.headers.get("Content-Type", "").lower()
    assert content_type == "application/json"
    return response.json()


def validate_king(king):
    # {
    #     "id": 7,
    #     "email": "bcpnpcmomt@example.com",
    #     "nick": "kpjkecmicx",
    #     "saved_stations": [],
    # }

    mapper = inspect(King)
    relationships = [
        relationship.key for relationship in mapper.relationships
    ]
    columns = [
        column
        for column in King.__table__.columns
        if column.name != "password_hash"
    ]
    allowed_keys = [column.name for column in columns] + relationships
    required_keys = [
        column.name for column in columns if not column.nullable
    ]

    for key in required_keys:
        assert key in king
    for key in king:
        assert key in allowed_keys

    for column in columns:
        if column.name in king:
            python_type = python_types[type(column.type)]
            assert isinstance(king[column.name], python_type)


def validate_station(station):
    # {
    #     "id": 7,
    #     "name": "kpjkecmicx",
    #     "lat": -90,
    #     "lng": -180,
    #     "address": "zxcvasdfqw",
    #     "uri": "http://example.com/uiopjklmnh",
    #     "location_id": "qwertyuiop",
    #     "king_id": 5,
    #     "saved_by": [],
    # }

    mapper = inspect(Station)
    relationships = [
        relationship.key for relationship in mapper.relationships
    ]
    columns = [column for column in Station.__table__.columns]
    allowed_keys = [column.name for column in columns] + relationships
    required_keys = [
        column.name for column in columns if not column.nullable
    ]

    for key in required_keys:
        assert key in station
    for key in station:
        assert key in allowed_keys

    for column in columns:
        if column.name in station:
            python_type = python_types[type(column.type)]
            assert isinstance(station[column.name], python_type)


def validate_king_slice(king_slice):
    for king in king_slice.values():
        validate_king(king)


def validate_station_slice(station_slice):
    for station in station_slice.values():
        validate_station(station)


def validate_slice(state, slice_name):
    assert slice_name in state
    slice = state[slice_name]
    if slice_name == "king":
        return validate_king_slice(state["king"])
    if slice_name == "station":
        return validate_station_slice(state["station"])
    else:
        raise Exception(f"unknown slice name {slice_name}")


def validate_state(state, required_slices):
    assert isinstance(state, dict)
    for slice in required_slices:
        validate_slice(state, slice)
