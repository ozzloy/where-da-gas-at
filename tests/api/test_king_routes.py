import pytest
import requests

from .auth import create_authenticated_session
from .config import DEMO_KING, get_full_url, make_king, modify_king
from .validators import validate_state


def test_create_king_fail_duplicate_email():
    session = requests.Session()
    get_auth_response = session.get(get_full_url("auth/"))

    post_auth_signup_response = session.post(
        get_full_url("auth/signup"), json=DEMO_KING
    )
    # 401
    # {
    #     "email": ["email address is already in use."],
    #     "nick": ["nickname is already in use."],
    # }
    assert post_auth_signup_response.status_code == 401
    assert (
        post_auth_signup_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    errors = post_auth_signup_response.json()
    required_keys = ["email", "nick"]
    assert all(key in errors for key in required_keys)
    assert all(key in required_keys for key in errors)


def test_create_king():
    session = requests.Session()
    get_auth_response = session.get(get_full_url("auth/"))

    post_auth_signup_response = session.post(
        get_full_url("auth/signup"), json=make_king()
    )
    assert post_auth_signup_response.status_code == 200

    assert (
        post_auth_signup_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    state = post_auth_signup_response.json()
    # {
    #     "king": {
    #         "7": {
    #             "email": "bcpnpcmomt@example.com",
    #             "id": 7,
    #             "nick": "kpjkecmicx",
    #         }
    #     }
    # }
    validate_state(state, ["king"])

    king_slice = state["king"]
    assert len(king_slice) == 1


def test_update_king():
    # create a king, so that we can update that king
    # then update that king
    # finally, delete that king
    session = requests.Session()
    get_auth_response = session.get(get_full_url("auth/"))

    post_auth_signup_response = session.post(
        get_full_url("auth/signup"), json=make_king()
    )

    assert (
        post_auth_signup_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    state = post_auth_signup_response.json()
    king_slice = state["king"]
    king = next(iter(king_slice.values()))

    king_update = modify_king(king)
    update_king_response = session.put(
        get_full_url(f"king/{king['id']}"), json=king_update
    )
    assert update_king_response.status_code == 200
    # ..update_king_response = <Response [200]>
    # updated_king =
    # {
    #     "king": {
    #         "19": {
    #             "email": "aanrdcjmxfn@example.com",
    #             "id": 19,
    #             "nick": "ablklfffoln",
    #         }
    #     }
    # }

    assert (
        update_king_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    state = update_king_response.json()
    validate_state(state, ["king"])
    king_slice = state["king"]
    assert len(king_slice) == 1
    updated_king = next(iter(king_slice.values()))

    assert updated_king["id"] == king["id"]
    assert updated_king["email"] == king_update["email"]
    assert updated_king["nick"] == king_update["nick"]


def test_delete_king():
    session = requests.Session()
    get_auth_response = session.get(get_full_url("auth/"))

    post_auth_signup_response = session.post(
        get_full_url("auth/signup"), json=make_king()
    )

    assert (
        post_auth_signup_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    state = post_auth_signup_response.json()
    king_slice = state["king"]
    king = next(iter(king_slice.values()))

    delete_king_response = session.delete(get_full_url("king/"))
    assert delete_king_response.status_code == 200
    assert (
        delete_king_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    data = delete_king_response.json()
    assert "message" in data
    assert (
        data["message"] == f"deleted king {king['id']} successfully"
    )
