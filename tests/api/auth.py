import requests
from typing import Any, Dict, Tuple
from .config import DEMO_USER, get_full_url


def create_authenticated_session() -> requests.Session:
    session = requests.Session()

    session.get(get_full_url("auth/"))

    login_response = session.post(
        get_full_url("auth/login"),
        json=DEMO_USER,
        headers={"Content-Type": "application/json"},
    )

    if login_response.status_code != 200:
        raise Exception("failed to authenticate")

    return session
