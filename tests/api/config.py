from typing import Dict, Any
import random
from random import uniform
from string import ascii_lowercase

from app.seeds.king import king_seeds

PROTOCOL = "http"
HOST = "localhost"
PORT = 8000
PATH_PREFIX = "/api"

DEMO_KING = king_seeds[0]


def make_random_string(length: int = 10) -> str:
    return "".join(random.choices(ascii_lowercase, k=length))


def make_king(overrides: Dict[str, Any] = None) -> Dict[str, Any]:
    king_data = {
        "nick": make_random_string(),
        "email": f"{make_random_string()}@example.com",
        "password": "password",
    }
    if overrides:
        king_data.update(overrides)
    return king_data


def modify_king(data):
    return {
        "nick": "a" + data["nick"],
        "email": "a" + data["email"],
        "password": "apassword",
    }


def make_station(king_id: int) -> Dict[str, Any]:
    station_data = {
        "name": make_random_string(),
        "lat": uniform(-90, 90),
        "lng": uniform(-180, 180),
        "address": make_random_string(),
        "uri": f"http://example.com/{make_random_string()}",
        "location_id": make_random_string(),
        "king_id": king_id,
    }
    return station_data


def get_base_url() -> str:
    return f"{PROTOCOL}://{HOST}:{PORT}{PATH_PREFIX}"


def get_full_url(endpoint: str) -> str:
    base = get_base_url()
    # make leading slash optional
    # example:
    #  get_full_url("auth") == get_full_url("/auth")
    endpoint = endpoint.lstrip("/")
    return f"{base}/{endpoint}"
