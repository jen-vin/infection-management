from app.models.case import Case, CaseHistoryEntry
from datetime import datetime

cases_db = {}
case_id_counter = 1

def create_case(db, obj_in):
    global case_id_counter
    history = obj_in.history or []
    if not history:
        history = [CaseHistoryEntry(status=obj_in.status, timestamp=datetime.now())]
    case = Case(
        id=case_id_counter,
        name=obj_in.name,
        age=obj_in.age,
        status=obj_in.status,
        history=history,
        symptoms=obj_in.symptoms or [],
        locations=obj_in.locations or []
    )
    cases_db[case.id] = case
    case_id_counter += 1
    return case

def get_case(db, id):
    return cases_db.get(id)

def update_case(db, db_obj, obj_in):
    updated = False
    if obj_in.status and obj_in.status != db_obj.status:
        db_obj.status = obj_in.status
        db_obj.history.append(CaseHistoryEntry(status=obj_in.status, timestamp=datetime.now()))
        updated = True
    for field in ['name', 'age', 'symptoms', 'locations']:
        value = getattr(obj_in, field, None)
        if value is not None:
            setattr(db_obj, field, value)
            updated = True
    return db_obj if updated else None

def remove_case(db, id):
    if id in cases_db:
        del cases_db[id]

def list_cases(db):
    return list(cases_db.values())
