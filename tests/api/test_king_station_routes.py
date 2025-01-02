from .auth import create_session, create_station, create_king
from .config import get_full_url
from .validators import validate_response


def test_create_king_station():
    session = create_session()
    king = create_king(session)
    station = create_station(session, king["id"])

    endpoint = get_full_url(f"king/current/station/{station['id']}")
    response = session.post(endpoint)

    validate_response(response, 201, expect_json=False)


def test_delete_king_station():
    session = create_session()
    king = create_king(session)
    station = create_station(session, king["id"])

    endpoint = get_full_url(f"king/current/station/{station['id']}")
    session.post(endpoint)

    response = session.delete(endpoint)
    validate_response(response, 204, expect_json=False)
