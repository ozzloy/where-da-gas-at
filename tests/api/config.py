from typing import Dict, Any

from app.seeds.user import user_seeds

PROTOCOL = "http"
HOST = "localhost"
PORT = 8000
PATH_PREFIX = "/api"

DEMO_USER = user_seeds[0]


def get_base_url() -> str:
    return f"{PROTOCOL}://{HOST}:{PORT}{PATH_PREFIX}"


def get_full_url(endpoint: str) -> str:
    base = get_base_url()
    # make leading slash optional
    # example:
    #  get_full_url("auth") == get_full_url("/auth")
    endpoint = endpoint.lstrip("/")
    return f"{base}/{endpoint}"
