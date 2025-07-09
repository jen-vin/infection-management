import pytest
from app.services.contact_tracing import find_close_contacts

class DummyCase:
    def __init__(self, id, name):
        self.id = id
        self.name = name

class DummyContact:
    def __init__(self, case_id, contact_name):
        self.case_id = case_id
        self.contact_name = contact_name

def test_find_close_contacts():
    cases = [DummyCase(1, "Max"), DummyCase(2, "Erika")]
    contacts = [
        DummyContact(1, "Erika"),
        DummyContact(2, "Max"),
        DummyContact(1, "Paul")
    ]
    result = find_close_contacts(cases, contacts, case_id=1)
    assert "Erika" in result
    assert "Paul" in result
    assert "Max" not in result 