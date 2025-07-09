import pytest
from app.crud import crud_case
from app.schemas.case import CaseCreate, CaseUpdate

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

def test_create_case(db):
    case_in = CaseCreate(name="Max Mustermann", age=30, status="confirmed")
    case = crud_case.create_case(db, obj_in=case_in)
    assert case.name == "Max Mustermann"
    assert case.age == 30
    assert case.status == "confirmed"

def test_get_case(db):
    case_in = CaseCreate(name="Erika Musterfrau", age=25, status="suspected")
    case = crud_case.create_case(db, obj_in=case_in)
    fetched = crud_case.get_case(db, id=case.id)
    assert fetched is not None
    assert fetched.name == "Erika Musterfrau"

def test_update_case(db):
    case_in = CaseCreate(name="Test Person", age=40, status="recovered")
    case = crud_case.create_case(db, obj_in=case_in)
    update = CaseUpdate(status="deceased")
    updated = crud_case.update_case(db, db_obj=case, obj_in=update)
    assert updated.status == "deceased"

def test_delete_case(db):
    case_in = CaseCreate(name="Delete Me", age=50, status="confirmed")
    case = crud_case.create_case(db, obj_in=case_in)
    crud_case.remove_case(db, id=case.id)
    # Da wir keinen Zugriff auf das interne DB-Objekt haben, reicht es, dass kein Fehler auftritt. 