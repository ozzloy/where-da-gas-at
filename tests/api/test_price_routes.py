import pytest
import requests
import json
from typing import Dict, Any


# TODO: test failure to create due to not being logged in

# TODO: test failure to update because price was created by another
# user

# TODO: add test for read: price not found

# TODO: add test for delete: price not found


@pytest.mark.skip(reason="need create station first")
def test_create_price():
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
    #     "user": {
    #         "2": {
    #             "id": 2,
    #             "nick": "some_name",
    #             "email": "demo@example.com",
    #         }
    #     }
    # }
    # save the user id for checking later
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
    #       "user_id": 1,
    #       "station_id": 1,
    #       "fuel_type": "premium",
    #     }
    #   }
    # }
    # but not these exact values, just these types of values
    # make sure the user_id matches the user id from the prior response
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

    price_data = {
        "price": 456.789,
        "station_id": 21,
        "fuel_type": "premium",
    }

    create_reply = session.post(f"{stem}/price", json=price_data)
    assert create_reply.status_code == 200

    reply_data = create_reply.json()

    def validate_price_slice(data: Dict[str, Any]) -> None:
        assert isinstance(data, dict)
        assert "price" in data

        price_slice = data["price"]
        assert isinstance(price_slice, dict)

        assert len(price_slice) == 1

        price_id = list(price_slice.keys())[0]
        assert isinstance(int(price_id), int)
        price = price_slice[price_id]

        required_fields = {
            "id",
            "price",
            "user_id",
            "station_id",
            "fuel_type",
        }
        # price has all the fields it should
        assert all(field in price for field in required_fields)
        # price has only fields it should
        assert all(field in required_fields for field in price)

        assert isinstance(price["id"], int)
        assert isinstance(price["price"], (int, float))
        assert isinstance(price["user_id"], int)
        assert isinstance(price["station_id"], int)
        assert isinstance(price["fuel_type"], str)

    validate_price_slice(reply_data)


def test_get_prices():
    """Test getting prices after authentication"""
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

    # Get prices
    price_url = f"{base_url}/api/price/"
    price_response = session.get(price_url)

    data = price_response.json()

    # Add assertions to verify response
    assert price_response.status_code == 200
    assert (
        price_response.headers["Content-Type"] == "application/json"
    )

    # Check data structure
    assert "price" in data
    prices = data["price"]
    assert isinstance(prices, dict)

    # Check each price entry has required fields
    for _price_id, price_data in prices.items():
        assert isinstance(price_data, dict)
        assert "id" in price_data
        assert "fuel_type" in price_data
        assert "price" in price_data
        assert "station_id" in price_data
        assert "user_id" in price_data

        # Verify data types
        assert isinstance(price_data["id"], int)
        assert isinstance(price_data["fuel_type"], str)
        assert isinstance(price_data["price"], (int, float))
        assert isinstance(price_data["station_id"], int)
        assert isinstance(price_data["user_id"], int)


def test_get_price():
    """Test getting a price by id"""
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

    # Get all prices
    price_url = f"{base_url}/api/price/"
    price_response = session.get(price_url)

    # Get list of prices
    data = price_response.json()

    # Basic validation
    assert price_response.status_code == 200
    content_type = price_response.headers["Content-Type"]
    assert content_type == "application/json"
    assert "price" in data
    prices = data["price"]
    assert isinstance(prices, dict)

    for price_id, price in prices.items():

        # Query for individual price
        detail_url = f"{base_url}/api/price/{price_id}"
        detail_response = session.get(detail_url)

        # If we get an error response, print the error details
        if detail_response.status_code >= 400:
            failure_message = "Failed to get price "
            failure_message += f"{price_id}"
            failure_message += f". Status: "
            failure_message += f"{detail_response.status_code}"
            assert False, failure_message

        # Try to parse JSON response
        detail_data = detail_response.json()

        # Verify the single price data
        assert "price" in detail_data
        single_price = detail_data["price"][str(price_id)]
        assert single_price["id"] == int(price_id)
        assert single_price["fuel_type"] == price["fuel_type"]
        assert single_price["price"] == price["price"]
        assert single_price["station_id"] == price["station_id"]
        assert single_price["user_id"] == price["user_id"]


@pytest.mark.skip(reason="need create station first")
def test_update_price():
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
    #     "user": {
    #         "2": {
    #             "id": 2,
    #             "nick": "some_name",
    #             "email": "demo@example.com",
    #         }
    #     }
    # }
    # save the user id for checking later
    #
    # then get all prices
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
    #       "user_id": 1,
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
    #       "user_id": 1,
    #       "station_id": 1,
    #       "fuel_type": "premium",
    #     }
    # create a new price with different data, by adding 1 to price
    #   and removing id and user_id fields
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
    #       "user_id": 1,
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

    read_all_reply = session.get(f"{stem}/price")
    state = read_all_reply.json()

    price_slice = state["price"]
    lowest_id = min(int(id_) for id_ in price_slice.keys())
    old_price = price_slice[str(lowest_id)]

    new_price = old_price | {"price": old_price["price"] + 1}
    del new_price["id"]
    del new_price["user_id"]

    update_reply = session.put(
        f"{stem}/price/{lowest_id}", json=new_price
    )
    assert update_reply.status_code == 200
    reply_data = update_reply.json()

    def validate_price_slice(data: Dict[str, Any]) -> None:
        assert isinstance(data, dict)
        assert "price" in data

        price_slice = data["price"]
        assert isinstance(price_slice, dict)

        assert len(price_slice) == 1

        price_id = list(price_slice.keys())[0]
        assert isinstance(int(price_id), int)
        price = price_slice[price_id]

        required_fields = {
            "id",
            "price",
            "user_id",
            "station_id",
            "fuel_type",
        }
        # price has all the fields it should
        assert all(field in price for field in required_fields)
        # price has only fields it should
        assert all(field in required_fields for field in price)

        assert isinstance(price["id"], int)
        assert isinstance(price["price"], (int, float))
        assert isinstance(price["user_id"], int)
        assert isinstance(price["station_id"], int)
        assert isinstance(price["fuel_type"], str)

    validate_price_slice(reply_data)


@pytest.mark.skip(reason="need create station first")
def test_delete_price():
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
    #     "user": {
    #         "2": {
    #             "id": 2,
    #             "user": "some_name",
    #             "email": "demo@example.com",
    #         }
    #     }
    # }
    # save the user id for checking later
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
    #       "user_id": 1,
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

    price_data = {
        "price": 456.789,
        "station_id": 21,
        "fuel_type": "premium",
    }

    create_reply = session.post(f"{stem}/price", json=price_data)
    state = create_reply.json()

    price_slice = state["price"]
    price_id = list(price_slice.keys())[0]

    delete_reply = session.delete(f"{stem}/price/{price_id}")

    assert delete_reply.status_code == 200
    reply_data = delete_reply.json()
    assert len(reply_data) == 1
    assert "message" in reply_data
    delete_message = f"deleted price {price_id} successfully"
    assert reply_data["message"] == delete_message
