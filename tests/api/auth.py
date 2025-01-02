import requests
from typing import Any, Dict, Tuple

from .config import DEMO_KING, get_full_url, make_station, make_king
from .validators import validate_response, validate_state


def create_session() -> requests.Session:
    session = requests.Session()
    # get csrf and session cookies
    session.get(get_full_url("auth/"))
    return session


def create_authenticated_session(king=DEMO_KING) -> requests.Session:
    session = create_session()
    login_response = session.post(
        get_full_url("auth/login"),
        json=king,
        headers={"Content-Type": "application/json"},
    )

    if login_response.status_code != 200:
        raise Exception("failed to authenticate")

    return session


def create_king(session: requests.Session):
    """
    create a brand new king in db

    given a session that already has csrf and session cookies
    return dict with fields filled with random values
    """
    king = make_king()
    password = king["password"]
    signup_response = session.post(
        get_full_url("auth/signup"), json=king
    )
    validate_response(signup_response)

    state = signup_response.json()
    validate_state(state, ["king"])

    king_slice = state["king"]
    if len(king_slice) != 1:
        raise Exception(f"{len(king_slice) = }")

    king = next(iter(king_slice.values()))
    king["password"] = password
    return king


def create_station(session: requests.Session, king_id: int):
    """
    create a station in db

    given session that is authenticated
    return station dict with fields filled with random values
    """

    station = make_station(king_id)
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
