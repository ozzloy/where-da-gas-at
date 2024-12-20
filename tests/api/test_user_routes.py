import pytest
import requests

from .auth import create_authenticated_session
from .config import DEMO_USER, get_full_url, make_user, modify_user


def test_create_user_fail_duplicate_email():
    session = requests.Session()
    get_auth_response = session.get(get_full_url("auth/"))
    assert get_auth_response.status_code == 200

    post_auth_signup_response = session.post(
        get_full_url("auth/signup"), json=DEMO_USER
    )
    # 401
    # {
    #     "email": ["Email address is already in use."],
    #     "user": ["Username is already in use."],
    # }
    assert post_auth_signup_response.status_code == 401
    assert (
        post_auth_signup_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    errors = post_auth_signup_response.json()
    required_keys = ["email", "user"]
    assert all(key in errors for key in required_keys)
    assert all(key in required_keys for key in errors)


def test_create_user():
    session = requests.Session()
    get_auth_response = session.get(get_full_url("auth/"))
    assert get_auth_response.status_code == 200

    post_auth_signup_response = session.post(
        get_full_url("auth/signup"), json=make_user()
    )
    assert post_auth_signup_response.status_code == 200

    assert (
        post_auth_signup_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    state = post_auth_signup_response.json()
    # {
    #     "user": {
    #         "7": {
    #             "email": "bcpnpcmomt@example.com",
    #             "id": 7,
    #             "user": "kpjkecmicx",
    #         }
    #     }
    # }
    assert "user" in state

    user_slice = state["user"]
    assert len(user_slice) == 1
    user = next(iter(user_slice.values()))
    required_keys = ["email", "id", "user"]
    assert all(key in user for key in required_keys)
    assert all(key in required_keys for key in user)

    assert isinstance(user["email"], str)
    assert isinstance(user["id"], int)
    assert isinstance(user["user"], str)

    # attempt to delete this user.  it's ok if this fails
    # TODO:
    # session.delete(get_full_url(""))


def test_update_user():
    # create a user, so that we can update that user
    # then update that user
    # finally, delete that user
    session = requests.Session()
    get_auth_response = session.get(get_full_url("auth/"))

    post_auth_signup_response = session.post(
        get_full_url("auth/signup"), json=make_user()
    )

    assert (
        post_auth_signup_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    state = post_auth_signup_response.json()
    user_slice = state["user"]
    user = next(iter(user_slice.values()))

    user_update = modify_user(user)
    update_user_response = session.put(
        get_full_url(f"user/{user['id']}"), json=user_update
    )
    assert update_user_response.status_code == 200
    # ..update_user_response = <Response [200]>
    # updated_user =
    # {
    #     "user": {
    #         "19": {
    #             "email": "aanrdcjmxfn@example.com",
    #             "id": 19,
    #             "user": "ablklfffoln",
    #         }
    #     }
    # }

    assert (
        update_user_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    state = update_user_response.json()
    assert "user" in state
    user_slice = state["user"]
    assert len(user_slice) == 1
    updated_user = next(iter(user_slice.values()))
    required_keys = ["email", "id", "user"]

    assert all(key in updated_user for key in required_keys)
    assert all(key in required_keys for key in updated_user)

    assert isinstance(user["email"], str)
    assert isinstance(user["id"], int)
    assert isinstance(user["user"], str)

    assert updated_user["id"] == user["id"]
    assert updated_user["email"] == user_update["email"]
    assert updated_user["user"] == user_update["user"]

    # attempt to delete this user.  it's ok if this fails.  it's just
    #   to try to keep the db clean
    # TODO:
    # session.delete(get_full_url(""))


def test_delete_user():
    session = requests.Session()
    get_auth_response = session.get(get_full_url("auth/"))

    post_auth_signup_response = session.post(
        get_full_url("auth/signup"), json=make_user()
    )

    assert (
        post_auth_signup_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    state = post_auth_signup_response.json()
    user_slice = state["user"]
    user = next(iter(user_slice.values()))

    delete_user_response = session.delete(get_full_url("user/"))
    assert delete_user_response.status_code == 200
    assert (
        delete_user_response.headers.get("Content-Type").lower()
        == "application/json"
    )
    data = delete_user_response.json()
    assert "message" in data
    assert (
        data["message"] == f"deleted user {user['id']} successfully"
    )
