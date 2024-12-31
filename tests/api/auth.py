import requests
from typing import Any, Dict, Tuple
from .config import DEMO_USER, get_full_url, make_station, make_user
from .validators import validate_response, validate_state


def create_session() -> requests.Session:
    session = requests.Session()
    # get csrf and session cookies
    session.get(get_full_url("auth/"))
    return session


def create_authenticated_session(user=DEMO_USER) -> requests.Session:
    session = create_session()
    login_response = session.post(
        get_full_url("auth/login"),
        json=user,
        headers={"Content-Type": "application/json"},
    )

    if login_response.status_code != 200:
        raise Exception("failed to authenticate")

    return session


def create_user(session: requests.Session):
    """
    create a brand new user in db

    given a session that already has csrf and session cookies
    return dict with fields filled with random values
    """
    user = make_user()
    password = user["password"]
    signup_response = session.post(
        get_full_url("auth/signup"), json=user
    )
    validate_response(signup_response)

    state = signup_response.json()
    validate_state(state, ["user"])

    user_slice = state["user"]
    if len(user_slice) != 1:
        raise Exception(f"{len(user_slice) = }")

    user = next(iter(user_slice.values()))
    user["password"] = password
    return user


def create_station(session: requests.Session, user_id: int):
    """
    create a station in db

    given session that is authenticated
    return station dict with fields filled with random values
    """

    station = make_station(user_id)
    create_station_response = session.post(
        get_full_url("station"), json=station
    )
    validate_response(create_station_response)

    state = create_station_response.json()
    validate_state(state, ["station"])

    station_slice = state["station"]
    if len(station_slice) != 1:
        raise Exception(f"{len(station_slice) = }")

    station = next(iter(station_slice.values()))
    return station
