from .auth import create_session, create_station, create_user
from .config import get_full_url
from .validators import validate_response


def test_create_user_station():
    session = create_session()
    user = create_user(session)
    station = create_station(session, user["id"])

    endpoint = get_full_url(f"user/current/station/{station['id']}")
    response = session.post(endpoint)
    validate_response(response, 201, expect_json=False)


def test_delete_user_station():
    session = create_session()
    user = create_user(session)
    station = create_station(session, user["id"])

    endpoint = get_full_url(f"user/current/station/{station['id']}")
    session.post(endpoint)

    response = session.delete(endpoint)
    validate_response(response, 204, expect_json=False)
