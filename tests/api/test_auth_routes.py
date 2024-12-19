import requests


def test_login_flow():
    """Test login flow using running server"""
    # Setup
    base_url = "http://localhost:8000"
    session = requests.Session()

    # Get CSRF token and session cookie
    auth_response = session.get(f"{base_url}/api/auth/")
    assert auth_response.status_code == 401
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
    assert data["email"] == "demo@example.com"
    assert "id" in data
    assert data["user"] == "Demo"
