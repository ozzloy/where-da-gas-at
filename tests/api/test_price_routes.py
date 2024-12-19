import pytest
import requests
import json


def test_price_endpoint():
    """Test getting prices after authentication"""
    # Setup
    base_url = "http://localhost:8000"
    session = requests.Session()

    # Login first
    session.get(f"{base_url}/api/auth/")
    login_response = session.post(
        f"{base_url}/api/auth/login",
        json={"email": "demo@example.com", "password": "password"},
        headers={"Content-Type": "application/json"},
    )
    assert login_response.status_code == 200

    # Get prices
    price_url = f"{base_url}/api/price/"
    print(f"\nMaking GET request to: {price_url}")
    price_response = session.get(price_url)

    print("\n=== Price Response ===")
    print(f"Status: {price_response.status_code}")
    print(f"URL after redirect (if any): {price_response.url}")
    print("Headers:")
    for header, value in price_response.headers.items():
        print(f"{header}: {value}")
    print("\nBody:")
    try:
        data = price_response.json()
        print(json.dumps(data, indent=2))

        # Add assertions to verify response
        assert price_response.status_code == 200
        assert (
            price_response.headers["Content-Type"]
            == "application/json"
        )

        # Check data structure
        assert "price" in data
        prices = data["price"]
        assert isinstance(prices, dict)

        # Check each price entry has required fields
        for _price_id, price_data in prices.items():
            assert isinstance(price_data, dict)
            assert "id" in price_data
            assert "fuel_type" in price_data
            assert "price" in price_data
            assert "station_id" in price_data
            assert "user_id" in price_data

            # Verify data types
            assert isinstance(price_data["id"], int)
            assert isinstance(price_data["fuel_type"], str)
            assert isinstance(price_data["price"], (int, float))
            assert isinstance(price_data["station_id"], int)
            assert isinstance(price_data["user_id"], int)

    except json.JSONDecodeError:
        print(
            f"Non-JSON response (Content-Type: {price_response.headers.get('Content-Type')})"
        )
        print("First 500 characters of response:")
        print(price_response.text[:500])
        raise
