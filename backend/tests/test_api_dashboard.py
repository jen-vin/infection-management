import pytest
from fastapi.testclient import TestClient

def test_dashboard_stats_api(client):
    """Test dashboard statistics endpoint."""
    response = client.get("/stats/overview")
    
    assert response.status_code == 200
    data = response.json()
    
    # Check that the response contains expected fields
    assert "total_cases" in data
    assert "active_cases" in data
    assert "by_age_group" in data
    assert "by_location" in data
    
    # Check data types
    assert isinstance(data["total_cases"], int)
    assert isinstance(data["active_cases"], int)
    assert isinstance(data["by_age_group"], dict)
    assert isinstance(data["by_location"], dict)

def test_notifications_api(client):
    """Test notifications endpoint."""
    response = client.get("/notifications/")
    
    assert response.status_code == 200
    data = response.json()
    
    # Check that it returns a list
    assert isinstance(data, list)
    
    # If there are notifications, check their structure
    if len(data) > 0:
        notification = data[0]
        assert "type" in notification
        assert "message" in notification
        assert "level" in notification

def test_auth_login_api(client):
    """Test authentication login endpoint."""
    login_data = {
        "username": "testuser",
        "password": "testpassword"
    }
    
    response = client.post("/auth/login", json=login_data)
    
    assert response.status_code == 200
    data = response.json()
    
    # Check response structure
    assert "access_token" in data
    assert "token_type" in data
    assert data["token_type"] == "bearer"

def test_auth_login_invalid_credentials(client):
    """Test authentication with invalid credentials."""
    login_data = {
        "username": "",
        "password": ""
    }
    
    response = client.post("/auth/login", json=login_data)
    
    # Should return error for empty credentials
    assert response.status_code == 400

def test_measures_api(client):
    """Test measures endpoint."""
    response = client.get("/measures/")
    
    assert response.status_code == 200
    data = response.json()
    
    # Check that it returns a list
    assert isinstance(data, list)

def test_users_api(client):
    """Test users endpoint."""
    response = client.get("/users/")
    
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list) 