from .auth import create_session, create_station, create_user
from .config import get_full_url
from .validators import validate_response


def test_create_user_station():
    session = create_session()

    # create a user
    user = create_user(session)

    # create a station
    # save the station id
    station = create_station(session, user["id"])

    user_station_post_response = session.post(
        get_full_url(f"user/current/station/{station['id']}"),
    )
    validate_response(
        user_station_post_response, 201, expect_json=False
    )
