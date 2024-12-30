import pytest
import requests
import json
from typing import Dict, Any


# TODO: test failure to create due to not being logged in

# TODO: test failure to update because review was created by another
# user

# TODO: add test for read: review not found

# TODO: add test for delete: review not found



def test_create_review():
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
    # then
    # send http POST to "http://localhost:8000/api/review"
    # with body
    # {
    #   "review": "what a good place",
    #   "station_id": 1,
    # }
    #
    # check the response has this structure
    # {
    #   "review":
    #   {
    #     "1":
    #     {
    #       "id": 1,
    #       "user_id": 1,
    #       "station_id": 1,
    #       "review": "what a good place",
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
    session.post(f"{stem}/auth/login", json=login_data)

    review_data = {
        "review": "good ",
        "station_id": 1,
    }

    create_reply = session.post(f"{stem}/review", json=review_data)
    assert create_reply.status_code == 200

    reply_data = create_reply.json()

    def validate_review_slice(data: Dict[str, Any]) -> None:
        assert isinstance(data, dict)
        assert "review" in data

        review_slice = data["review"]
        assert isinstance(review_slice, dict)

        assert len(review_slice) == 1

        review_id = list(review_slice.keys())[0]
        assert isinstance(int(review_id), int)
        review = review_slice[review_id]

        required_fields = {
            "id",
            "review",
            "user_id",
            "station_id",
        }
        # review has all the fields it should
        assert all(field in review for field in required_fields)
        # review has only fields it should
        assert all(field in required_fields for field in review)

        assert isinstance(review["id"], int)
        assert isinstance(review["review"], str)
        assert isinstance(review["user_id"], int)
        assert isinstance(review["station_id"], int)
     

    validate_review_slice(reply_data)


def test_get_reviews():
    """Test getting reviews after authentication"""
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

    # Get reviews
    review_url = f"{base_url}/api/review/"
    review_response = session.get(review_url)

    data = review_response.json()

    # Add assertions to verify response
    assert review_response.status_code == 200
    assert (
        review_response.headers["Content-Type"] == "application/json"
    )

    # Check data structure
    assert "review" in data
    reviews = data["review"]
    assert isinstance(reviews, dict)

    # Check each review entry has required fields
    for _review_id, review_data in reviews.items():
        assert isinstance(review_data, dict)
        assert "id" in review_data
        assert "review" in review_data
        assert "station_id" in review_data
        assert "user_id" in review_data

        # Verify data types
        assert isinstance(review_data["id"], int)
        assert isinstance(review_data["review"], str)
        assert isinstance(review_data["station_id"], int)
        assert isinstance(review_data["user_id"], int)


def test_get_review():
    """Test getting a review by id"""
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

#     # Get all reviews
    review_url = f"{base_url}/api/review/"
    review_response = session.get(review_url)

    # Get list of reviews
    data = review_response.json()

    # Basic validation
    assert review_response.status_code == 200
    content_type = review_response.headers["Content-Type"]
    assert content_type == "application/json"
    assert "review" in data
    reviews = data["review"]
    assert isinstance(reviews, dict)

    for review_id, review in reviews.items():

        # Query for individual review
        detail_url = f"{base_url}/api/review/{review_id}"
        detail_response = session.get(detail_url)

        # If we get an error response, print the error details
        if detail_response.status_code >= 400:
            failure_message = "Failed to get review "
            failure_message += f"{review_id}"
            failure_message += f". Status: "
            failure_message += f"{detail_response.status_code}"
            assert False, failure_message

        # Try to parse JSON response
        detail_data = detail_response.json()

        # Verify the single review data
        assert "review" in detail_data
        single_review = detail_data["review"][str(review_id)]
        assert single_review["id"] == int(review_id)
        assert single_review["review"] == review["review"]
        assert single_review["station_id"] == review["station_id"]
        assert single_review["user_id"] == review["user_id"]


def test_update_review():
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
    # then get all reviews
    # send http GET to "http://localhost:8000/api/review"
    #
    # the response has this structure
    # {
    #   "review":
    #   {
    #     "1":
    #     {
    #       "id": 1,
    #       "user_id": 1,
    #       "station_id": 1,
    #       "review": "what a pretty place",
    #     }
    #   }
    # }
    # but not these exact values, just these types of values
    #
    # take the review with the lowest id, eg
    #     {
    #       "id": 1,
    #       "user_id": 1,
    #       "station_id": 1,
    #       "review": "what a pretty place",
    #     }
    # create a new review with different data, by adding 1 to review
    #   and removing id and user_id fields
    #     {
    #       "station_id": 1,
    #       "review": "what a pretty place",
    #     }
    # post this new structure to
    #   http://localhost:8000/api/review/:review_id
    # and make sure the response looks like
    # {
    #   "review":
    #   {
    #     "1":
    #     {
    #       "id": 1,
    #       "user_id": 1,
    #       "station_id": 1,
    #       "review": "what a pretty place",
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

    read_all_reply = session.get(f"{stem}/review")
    state = read_all_reply.json()

    review_slice = state["review"]
    lowest_id = min(int(id_) for id_ in review_slice.keys())
    old_review = review_slice[str(lowest_id)]

    
    new_review_data = {
        "review": old_review["review"] + ' updated review',
        "station_id": old_review["station_id"],
    }


    create_reply = session.post(f"{stem}/review", json=new_review_data)
    review_id = list(create_reply.json()["review"].keys())[0]

    new_review_data["review"] = " new onee"

    put_reply = session.put(f"{stem}/review/{review_id}", json=new_review_data)

    assert put_reply.status_code == 200
    reply_data = put_reply.json()

    def validate_review_slice(data: Dict[str, Any]) -> None:
        assert isinstance(data, dict)
        assert "review" in data

        review_slice = data["review"]
        assert isinstance(review_slice, dict)

        assert len(review_slice) == 1

        review_id = list(review_slice.keys())[0]
        assert isinstance(int(review_id), int)
        review = review_slice[review_id]

        required_fields = {
            "id",
            "review",
            "user_id",
            "station_id",
        }
        # review has all the fields it should
        assert all(field in review for field in required_fields)
        # review has only fields it should
        assert all(field in required_fields for field in review)

        assert isinstance(review["id"], int)
        assert isinstance(review["review"], str)
        assert isinstance(review["user_id"], int)
        assert isinstance(review["station_id"], int)


    validate_review_slice(reply_data)


def test_delete_review():
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

    review_data = {
        "review": "Great place for premium gas, but the line can get long during rush hour.",
        "station_id": 1,
    }

    create_reply = session.post(f"{stem}/review", json=review_data)
    state = create_reply.json()

    review_slice = state["review"]
    review_id = list(review_slice.keys())[0]

    delete_reply = session.delete(f"{stem}/review/{review_id}")

    assert delete_reply.status_code == 200
    reply_data = delete_reply.json()
    assert len(reply_data) == 1
    assert "message" in reply_data
    delete_message = f"deleted review {review_id} successfully"
    assert reply_data["message"] == delete_message