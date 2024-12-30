from typing import Dict, Any
import random
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
        "user": make_random_string(),
        "email": f"{make_random_string()}@example.com",
        "password": "password",
    }
    if overrides:
        user_data.update(overrides)
    return user_data


def modify_user(data):
    return {
        "user": "a" + data["user"],
        "email": "a" + data["email"],
        "password": "apassword",
    }


def get_base_url() -> str:
    return f"{PROTOCOL}://{HOST}:{PORT}{PATH_PREFIX}"


def get_full_url(endpoint: str) -> str:
    base = get_base_url()
    # make leading slash optional
    # example:
    #  get_full_url("auth") == get_full_url("/auth")
    endpoint = endpoint.lstrip("/")
    return f"{base}/{endpoint}"
