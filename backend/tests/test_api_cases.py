import pytest
from fastapi.testclient import TestClient

def test_create_case_api(client, sample_case_data):
    response = client.post("/cases/", json=sample_case_data)
    assert response.status_code == 200
    data = response.json()
    assert data["name"] == sample_case_data["name"]
    assert data["age"] == sample_case_data["age"]
    assert data["status"] == sample_case_data["status"]

def test_invalid_case_data_api(client):
    invalid_data = {
        "name": "",
        "age": -5,
        "status": "invalid_status"
    }
    response = client.post("/cases/", json=invalid_data)
    assert response.status_code == 422

def test_nonexistent_case_api(client):
    response = client.get("/cases/99999")
    assert response.status_code == 404 

def test_case_name_too_short(client, sample_case_data):
    data = sample_case_data.copy()
    data["name"] = "A"
    response = client.post("/cases/", json=data)
    assert response.status_code == 422
    assert "Name muss mindestens 2 Zeichen lang sein" in response.text

def test_case_name_invalid_characters(client, sample_case_data):
    data = sample_case_data.copy()
    data["name"] = "Max123!"
    response = client.post("/cases/", json=data)
    assert response.status_code == 422
    assert "Name darf nur Buchstaben" in response.text

def test_case_age_too_low(client, sample_case_data):
    data = sample_case_data.copy()
    data["age"] = -1
    response = client.post("/cases/", json=data)
    assert response.status_code == 422
    assert "Alter muss zwischen 0 und 120 liegen" in response.text

def test_case_age_too_high(client, sample_case_data):
    data = sample_case_data.copy()
    data["age"] = 130
    response = client.post("/cases/", json=data)
    assert response.status_code == 422
    assert "Alter muss zwischen 0 und 120 liegen" in response.text

def test_case_date_reported_in_future(client, sample_case_data):
    from datetime import date, timedelta
    data = sample_case_data.copy()
    data["date_reported"] = (date.today() + timedelta(days=2)).isoformat()
    response = client.post("/cases/", json=data)
    assert response.status_code == 422
    assert "Das Erkrankungsdatum darf nicht in der Zukunft liegen" in response.text

def test_case_test_date_before_reported(client, sample_case_data):
    data = sample_case_data.copy()
    data["date_reported"] = "2024-01-15"
    data["test_date"] = "2024-01-10"
    response = client.post("/cases/", json=data)
    assert response.status_code == 422
    assert "Testdatum darf nicht vor Erkrankungsdatum liegen" in response.text

def test_case_invalid_phone(client, sample_case_data):
    data = sample_case_data.copy()
    data["phone"] = "123-abc-456"
    response = client.post("/cases/", json=data)
    assert response.status_code == 422
    assert "Telefonnummer darf nur Ziffern" in response.text

def test_case_invalid_email(client, sample_case_data):
    data = sample_case_data.copy()
    data["email"] = "not-an-email"
    response = client.post("/cases/", json=data)
    assert response.status_code == 422
    assert "value is not a valid email address" in response.text 

# Test: Liste aller Fälle enthält die neu angelegten Fälle
# (Debug-Ausgaben helfen, Fehlerquellen zu finden)
def test_list_cases_api(client, sample_case_data):
    # Ersten Fall anlegen
    case1_data = sample_case_data.copy()
    case1_data["name"] = "Case 1"
    response1 = client.post("/cases/", json=case1_data)
    print("POST 1 response:", response1.status_code, response1.json())
    # Zweiten Fall anlegen
    case2_data = sample_case_data.copy()
    case2_data["name"] = "Case 2"
    response2 = client.post("/cases/", json=case2_data)
    print("POST 2 response:", response2.status_code, response2.json())
    # Alle Fälle abrufen
    response = client.get("/cases/")
    print("GET response:", response.status_code, response.json())
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2
    case_names = [case["name"] for case in data]
    assert "Case 1" in case_names
    assert "Case 2" in case_names 