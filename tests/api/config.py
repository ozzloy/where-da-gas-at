from typing import Dict, Any
import random
from random import uniform
from string import ascii_lowercase

from app.seeds.user import user_seeds

PROTOCOL = "http"
HOST = "localhost"
PORT = 8000
PATH_PREFIX = "/api"

DEMO_USER = user_seeds[0]


def make_random_string(length: int = 10) -> str:
    return "".join(random.choices(ascii_lowercase, k=length))


def make_user(overrides: Dict[str, Any] = None) -> Dict[str, Any]:
    user_data = {
        "nick": make_random_string(),
        "email": f"{make_random_string()}@example.com",
        "password": "password",
    }
    if overrides:
        user_data.update(overrides)
    return user_data


def modify_user(data):
    return {
        "nick": "a" + data["nick"],
        "email": "a" + data["email"],
        "password": "apassword",
    }


def make_station(user_id: int) -> Dict[str, Any]:
    station_data = {
        "name": make_random_string(),
        "lat": uniform(-90, 90),
        "lng": uniform(-180, 180),
        "address": make_random_string(),
        "uri": f"http://example.com/{make_random_string()}",
        "location_id": make_random_string(),
        "user_id": user_id,
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
