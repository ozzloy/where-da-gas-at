import pytest
import requests
import json
from typing import Dict, Any


def test_create_review():
    protocol = "http"
    host = "localhost"
    port = 8000
    path_prefix = "/api"
    # http://localhost:8000/api
    stem = f"{protocol}://{host}:{port}{path_prefix}"

    # session saves cookies like "csrf_token" and "session" across
    # requests
    session = requests.Session()

    # auth_response gets the csrf_token and session
    session.get(f"{stem}/auth/")
    # now auth_response has cookies for making further requests

    login_data = {"email": "demo@example.com", "password": "password"}
    session.post(f"{stem}/auth/login", json=login_data)

    # TODO: dynamically create station_id by creating a station
    #       with a known id, and use that id here
    review_data = {
        "text": "good place",
        "station_id": "ChIJuwnmD-ZvkFQRVZ5eT67YPwE",
    }

    create_reply = session.post(f"{stem}/review", json=review_data)
    assert create_reply.status_code == 200

    # reply_data = create_reply.json()

    # def validate_review_slice(data: Dict[str, Any]) -> None:
    #     assert isinstance(data, dict)
    #     assert "text" in data

    #     review_slice = data["text"]
    #     assert isinstance(review_slice, dict)

    #     assert len(review_slice) == 1

    #     review_id = list(review_slice.keys())[0]
    #     assert isinstance(int(review_id), int)
    #     review = review_slice[review_id]

    #     required_fields = {
    #         "id",
    #         "text",
    #         "user_id",
    #         "station_id",
    #     }
    #     # review has all the fields it should
    #     assert all(field in review for field in required_fields)
    #     # review has only fields it should
    #     assert all(field in required_fields for field in review)

    #     assert isinstance(review["id"], int)
    #     assert isinstance(review["text"], str)
    #     assert isinstance(review["user_id"], int)
    #     assert isinstance(review["station_id"], int)

    # validate_review_slice(reply_data)
