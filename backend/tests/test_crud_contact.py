import pytest
from app.crud import crud_contact
from app.schemas.contact import ContactCreate, ContactUpdate

class DummySession:
    def __init__(self):
        pass
    def add(self, obj):
        pass
    def commit(self):
        pass
    def refresh(self, obj):
        pass
    def query(self, model):
        return self
    def filter(self, *args, **kwargs):
        return self
    def first(self):
        return None
    def all(self):
        return []
    def delete(self, obj):
        pass

@pytest.fixture
def db():
    return DummySession()

def test_create_contact(db):
    contact_in = ContactCreate(case_id=1, contact_name="Kontakt A", contact_type="household")
    contact = crud_contact.create_contact(db, obj_in=contact_in)
    assert contact.contact_name == "Kontakt A"
    assert contact.contact_type == "household"

def test_get_contact(db):
    contact_in = ContactCreate(case_id=2, contact_name="Kontakt B", contact_type="work")
    contact = crud_contact.create_contact(db, obj_in=contact_in)
    fetched = crud_contact.get_contact(db, id=contact.id)
    assert fetched is not None
    assert fetched.contact_name == "Kontakt B"

def test_update_contact(db):
    contact_in = ContactCreate(case_id=3, contact_name="Kontakt C", contact_type="other")
    contact = crud_contact.create_contact(db, obj_in=contact_in)
    update = ContactUpdate(contact_type="household")
    updated = crud_contact.update_contact(db, db_obj=contact, obj_in=update)
    assert updated.contact_type == "household"

def test_delete_contact(db):
    contact_in = ContactCreate(case_id=4, contact_name="Kontakt D", contact_type="work")
    contact = crud_contact.create_contact(db, obj_in=contact_in)
    crud_contact.remove_contact(db, id=contact.id)
    # Da wir keinen Zugriff auf das interne DB-Objekt haben, reicht es, dass kein Fehler auftritt. 