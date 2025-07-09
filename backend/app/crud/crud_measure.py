from app.models.measure import Measure
from datetime import datetime

measures_db = {}
measure_id_counter = 1

def create_measure(db, obj_in):
    global measure_id_counter
    measure = Measure(
        id=measure_id_counter,
        case_id=obj_in.case_id,
        type=obj_in.type,
        status=obj_in.status,
        start_date=obj_in.start_date,
        end_date=obj_in.end_date,
        notes=obj_in.notes
    )
    measures_db[measure.id] = measure
    measure_id_counter += 1
    return measure

def get_measure(db, id):
    return measures_db.get(id)

def update_measure(db, db_obj, obj_in):
    for field in ['type', 'status', 'start_date', 'end_date', 'notes']:
        value = getattr(obj_in, field, None)
        if value is not None:
            setattr(db_obj, field, value)
    return db_obj

def remove_measure(db, id):
    if id in measures_db:
        del measures_db[id]

def list_measures(db):
    return list(measures_db.values()) 