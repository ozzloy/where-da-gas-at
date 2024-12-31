import requests

from .config import DEMO_USER


def test_login_flow():
    """Test login flow using running server"""
    # Setup
    base_url = "http://localhost:8000"
    session = requests.Session()

    # Get CSRF token and session cookie
    session.get(f"{base_url}/api/auth/")
    assert "csrf_token" in session.cookies
    assert "session" in session.cookies

    # Login request
    login_data = {"email": "demo@example.com", "password": "password"}
    headers = {"Content-Type": "application/json"}

    # The session will automatically send both csrf_token and session
    # cookies
    login_response = session.post(
        f"{base_url}/api/auth/login", json=login_data, headers=headers
    )

    # Verify login succeeded
    assert login_response.status_code == 200
    data = login_response.json()
    assert data["email"] == DEMO_USER["email"]
    assert "id" in data
    assert data["user"] == DEMO_USER["user"]
