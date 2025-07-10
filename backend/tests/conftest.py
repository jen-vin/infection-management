import pytest
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from fastapi.testclient import TestClient

# PostgreSQL Testdatenbank (z.B. via Docker)
SQLALCHEMY_DATABASE_URL = "postgresql://testuser:testpass@localhost:5433/testdb"

# Setze die Umgebungsvariable für das App-Backend
os.environ["DATABASE_URL"] = SQLALCHEMY_DATABASE_URL

from app.models.db_base import Base
from app.main import app
from app.api.deps import get_db

# Test-Engine und Session
engine = create_engine(SQLALCHEMY_DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function")
def db():
    """Erstellt eine frische Datenbank für jeden Test."""
    # Tabellen anlegen
    Base.metadata.create_all(bind=engine)
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()
        # Tabellen nach Test löschen
        Base.metadata.drop_all(bind=engine)

@pytest.fixture(scope="function")
def client(db):
    """TestClient mit DB-Dependency-Override."""
    def override_get_db():
        try:
            yield db
        finally:
            pass
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()

@pytest.fixture
def sample_user_data():
    return {
        "username": "testuser",
        "password": "testpassword",
        "role": "health_worker"
    }

@pytest.fixture
def sample_case_data():
    return {
        "name": "Max Mustermann",
        "age": 30,
        "status": "Aktiv",
        "date_reported": "2024-01-15",
        "region": "Berlin",
        "user_app_id": "test_user_123",
        "symptoms": ["Fieber", "Husten"],
        "phone": "+49123456789",
        "email": "max@example.com",
        "address": "Musterstraße 1, 12345 Berlin",
        "contacts": 0,
        "test_date": "2024-01-16",
        "test_result": "Positiv",
        "notes": "",
        "contact_history": [],
        "measures": []
    }

@pytest.fixture
def sample_contact_data():
    return {
        "case_id": 1,
        "contact_name": "Kontaktperson A",
        "contact_type": "close",
        "date": "2024-01-10T12:00:00"
    } 