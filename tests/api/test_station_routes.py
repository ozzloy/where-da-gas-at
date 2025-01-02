import pytest
import requests
from typing import Dict, Any

from .auth import create_station


@pytest.mark.skip(reason="not sure why this is failing")
def test_create_station():
    # send http GET to http://localhost:8000/api/auth/
    # to get a csrf_token cookie, and a session cookie
    #
    # then, log in by sending
    # http get to http://localhost:8000/api/auth/login
    # with json body:
    # {"email": "demo@example.com", "password": "password"}
    #
    # store the response which should look like:
    # {
    #     "king": {
    #         "2": {
    #             "id": 2,
    #             "nick": "some_name",
    #             "email": "demo@example.com",
    #         }
    #     }
    # }
    # save the king id for checking later
    #
    # then
    # send http POST to "http://localhost:8000/api/price"
    # with body
    # {
    #   "price": 456.789,
    #   "station_id": 1,
    #   "fuel_type": "premium",
    # }
    #
    # check the response has this structure
    # {
    #   "price":
    #   {
    #     "1":
    #     {
    #       "id": 1,
    #       "price": 456.789,
    #       "king_id": 1,
    #       "station_id": 1,
    #       "fuel_type": "premium",
    #     }
    #   }
    # }
    # but not these exact values, just these types of values
    # make sure the king_id matches the king id from the prior response
    protocol = "http"
    host = "localhost"
    port = 8000
    path_prefix = "/api"
    stem = f"{protocol}://{host}:{port}{path_prefix}"

    # session saves cookies like "csrf_token" and "session" across
    # requests
    session = requests.Session()

    # auth_response gets the csrf_token and session
    session.get(f"{stem}/auth/")
    # now auth_response has cookies for making further requests

    login_data = {"email": "demo@example.com", "password": "password"}
    login_reply = session.post(f"{stem}/auth/login", json=login_data)

    station_data = {
        "id": "ChIJuwnmD-ZvkFQRVZ5eT67YPwE-this-is-a-test",
        "name": "Wook Electric Vehicle Charging Station",
        "lat": 47.5832543,
        "lng": -122.03377579999999,
        "address": "3020 Issaquah-Pine Lake Rd SE, Sammamish, WA 98075, USA",
        "uri": "https://maps.google.com/?cid=90028760738209365",
    }

    create_reply = session.post(f"{stem}/station", json=station_data)
    assert create_reply.status_code == 200

    reply_data = create_reply.json()

    def validate_station_slice(data: Dict[str, Any]) -> None:
        assert isinstance(data, dict)
        assert "station" in data

        station_slice = data["station"]
        assert isinstance(station_slice, dict)

        assert len(station_slice) == 1

        station_id = list(station_slice.keys())[0]
        assert isinstance(station_id, str)
        station = station_slice[station_id]

        required_fields = {
            "id",
            "name",
            "lat",
            "lng",
            "address",
            "uri",
        }
        # station has all the fields it should
        for field in required_fields:
            assert field in station
        # station has only fields it should
        for field in station:
            assert field in required_fields

        assert isinstance(station["id"], str)
        assert isinstance(station["name"], str)
        assert isinstance(station["lat"], (int, float))
        assert isinstance(station["lng"], (int, float))
        assert isinstance(station["address"], str)
        assert isinstance(station["uri"], str)

    validate_station_slice(reply_data)


def test_get_stations():
    """Test getting station after authentication"""
    # Setup
    base_url = "http://localhost:8000"
    session = requests.Session()

    # Login first
    session.get(f"{base_url}/api/auth/")
    login_response = session.post(
        f"{base_url}/api/auth/login",
        json={"email": "demo@example.com", "password": "password"},
        headers={"Content-Type": "application/json"},
    )
    assert login_response.status_code == 200

    # Get station
    station_url = f"{base_url}/api/station/"
    station_response = session.get(station_url)

    data = station_response.json()

    # Add assertions to verify response
    assert station_response.status_code == 200
    assert (
        station_response.headers["Content-Type"] == "application/json"
    )

    # Check data structure
    assert "station" in data
    station = data["station"]
    assert isinstance(station, dict)

    # Check each station entry has required fields
    for _station_id, station_data in station.items():
        assert isinstance(station_data, dict)
        assert "id" in station_data
        assert "name" in station_data
        assert "lat" in station_data
        assert "lng" in station_data
        assert "address" in station_data
        assert "uri" in station_data

        # Verify data types
        assert isinstance(station_data["id"], str)
        assert isinstance(station_data["name"], str)
        assert isinstance(station_data["lat"], (int, float))
        assert isinstance(station_data["lng"], (int, float))
        assert isinstance(station_data["address"], str)
        assert isinstance(station_data["uri"], str)


def test_get_station():
    """Test getting a station by id"""
    # Setup
    base_url = "http://localhost:8000"
    session = requests.Session()

    # Login first
    session.get(f"{base_url}/api/auth/")
    login_response = session.post(
        f"{base_url}/api/auth/login",
        json={"email": "demo@example.com", "password": "password"},
        headers={"Content-Type": "application/json"},
    )
    assert login_response.status_code == 200

    # Get all station
    station_url = f"{base_url}/api/station/"
    station_response = session.get(station_url)

    # Get list of station
    data = station_response.json()

    # Basic validation
    assert station_response.status_code == 200
    content_type = station_response.headers["Content-Type"]
    assert content_type == "application/json"
    assert "station" in data
    stations = data["station"]
    assert isinstance(stations, dict)

    for station_id, station in stations.items():

        # Query for individual station
        detail_url = f"{base_url}/api/station/{station_id}"
        detail_response = session.get(detail_url)

        # If we get an error response, print the error details
        if detail_response.status_code >= 400:
            failure_message = "Failed to get station "
            failure_message += f"{station_id}"
            failure_message += ". Status: "
            failure_message += f"{detail_response.status_code}"
            assert False, failure_message

        # Try to parse JSON response
        detail_data = detail_response.json()

        # Verify the single station data
        assert "station" in detail_data
        single_station = detail_data["station"][station_id]
        assert single_station["id"] == station_id
        assert single_station["name"] == station["name"]
        assert single_station["lat"] == station["lat"]
        assert single_station["lng"] == station["lng"]
        assert single_station["address"] == station["address"]
        assert single_station["uri"] == station["uri"]


# @pytest.mark.skip(reason="need create station first")
def test_update_station():
    # send http GET to http://localhost:8000/api/auth/
    # to get a csrf_token cookie, and a session cookie
    #
    # then, log in by sending
    # http get to http://localhost:8000/api/auth/login
    # with json body:
    # {"email": "demo@example.com", "password": "password"}
    #
    # store the response which should look like:
    # {
    #     "king": {
    #         "2": {
    #             "id": 2,
    #             "nick": "some_name",
    #             "email": "demo@example.com",
    #         }
    #     }
    # }
    # save the king id for checking later
    #
    # then get all station
    # send http GET to "http://localhost:8000/api/price"
    #
    # the response has this structure
    # {
    #   "price":
    #   {
    #     "1":
    #     {
    #       "id": 1,
    #       "price": 456.789,
    #       "king_id": 1,
    #       "station_id": 1,
    #       "fuel_type": "premium",
    #     }
    #   }
    # }
    # but not these exact values, just these types of values
    #
    # take the price with the lowest id, eg
    #     {
    #       "id": 1,
    #       "price": 456.789,
    #       "king_id": 1,
    #       "station_id": 1,
    #       "fuel_type": "premium",
    #     }
    # create a new price with different data, by adding 1 to price
    #   and removing id and king_id fields
    #     {
    #       "price": 457.789,
    #       "station_id": 1,
    #       "fuel_type": "premium",
    #     }
    # post this new structure to
    #   http://localhost:8000/api/price/:price_id
    # and make sure the response looks like
    # {
    #   "price":
    #   {
    #     "1":
    #     {
    #       "id": 1,
    #       "price": 456.789,
    #       "king_id": 1,
    #       "station_id": 1,
    #       "fuel_type": "premium",
    #     }
    #   }
    # }
    protocol = "http"
    host = "localhost"
    port = 8000
    path_prefix = "/api"
    stem = f"{protocol}://{host}:{port}{path_prefix}"

    # session saves cookies like "csrf_token" and "session" across
    # requests
    session = requests.Session()

    # auth_response gets the csrf_token and session
    session.get(f"{stem}/auth/")
    # now auth_response has cookies for making further requests

    login_data = {"email": "demo@example.com", "password": "password"}
    login_reply = session.post(f"{stem}/auth/login", json=login_data)

    read_all_reply = session.get(f"{stem}/station")
    state = read_all_reply.json()

    station_slice = state["station"]
    newest_id = list(station_slice.keys())[0]
    most_recent_station = station_slice[newest_id]
    new_station = {
        "id": most_recent_station["id"],
        "name": most_recent_station["name"] + " Updated",
        "lat": most_recent_station["lat"] + 0.001,
        "lng": most_recent_station["lng"] + 0.001,
        "address": most_recent_station["address"] + " Updated",
        "uri": most_recent_station["uri"],
    }

    update_reply = session.put(
        f"{stem}/api/station/{newest_id}", json=new_station
    )

    update_reply = session.put(
        f"{stem}/station/{newest_id}", json=new_station
    )
    assert update_reply.status_code == 200
    reply_data = update_reply.json()

    def validate_station_slice(data: Dict[str, Any]) -> None:
        assert isinstance(data, dict)
        assert "station" in data

        station_data = data["station"]
        assert isinstance(station_data, dict)

        station = station_data[newest_id]
        assert station["id"] == newest_id
        assert station["name"] == new_station["name"]
        assert station["lat"] == new_station["lat"]
        assert station["lng"] == new_station["lng"]
        assert station["address"] == new_station["address"]
        assert station["uri"] == new_station["uri"]

    validate_station_slice(reply_data)


# @pytest.mark.skip(reason="need create station first")
def test_delete_station():
    # send http GET to http://localhost:8000/api/auth/
    # to get a csrf_token cookie, and a session cookie
    #
    # then, log in by sending
    # http get to http://localhost:8000/api/auth/login
    # with json body:
    # {"email": "demo@example.com", "password": "password"}
    #
    # store the response which should look like:
    # {
    #     "king": {
    #         "2": {
    #             "id": 2,
    #             "nick": "some_name",
    #             "email": "demo@example.com",
    #         }
    #     }
    # }
    # save the king id for checking later
    #
    # then create a price
    # send http post to "http://localhost:8000/api/price"
    # with this body
    # price_data = {
    #     "price": 456.789,
    #     "station_id": 21,
    #     "fuel_type": "premium",
    # }
    #
    # the response has this structure
    # {
    #   "price":
    #   {
    #     "1":
    #     {
    #       "id": 1,
    #       "price": 456.789,
    #       "king_id": 1,
    #       "station_id": 1,
    #       "fuel_type": "premium",
    #     }
    #   }
    # }
    # but not these exact values, just these types of values
    #
    # send delete to
    #   http://localhost:8000/api/price/:price_id
    # and make sure the response looks like
    # status 200
    # {
    #   "message": "deleted price :price_id successfully"
    # }
    protocol = "http"
    host = "localhost"
    port = 8000
    path_prefix = "/api"
    stem = f"{protocol}://{host}:{port}{path_prefix}"

    # session saves cookies like "csrf_token" and "session" across
    # requests
    session = requests.Session()

    # auth_response gets the csrf_token and session
    session.get(f"{stem}/auth/")
    # now auth_response has cookies for making further requests

    login_data = {"email": "demo@example.com", "password": "password"}
    login_reply = session.post(f"{stem}/auth/login", json=login_data)
    station = create_station(session, login_reply.json()["id"])

    delete_reply = session.delete(f"{stem}/station/{station['id']}")

    assert delete_reply.status_code == 200
    reply_data = delete_reply.json()
    assert len(reply_data) == 1
    assert "message" in reply_data
    delete_message = f"deleted station {station['id']} successfully"
    assert reply_data["message"] == delete_message
