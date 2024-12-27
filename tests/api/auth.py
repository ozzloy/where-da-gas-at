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


def get_user_id_from_resposne(response: Dict[str, Any]) -> int:
    try:
        user = response["user"]
        user_id = next(iter(user_data.values()))["id"]
        return user_id
    except (KeyError, StopIteration) as e:
        raise ValueError(
            f"could not extract user id from response: {e}"
        )
