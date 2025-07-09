from app.models.contact import Contact
from datetime import datetime

contacts_db = {}
contact_id_counter = 1

def create_contact(db, obj_in):
    global contact_id_counter
    contact = Contact(
        id=contact_id_counter,
        case_id=obj_in.case_id,
        contact_name=obj_in.contact_name,
        contact_type=obj_in.contact_type,
        date=obj_in.date
    )
    contacts_db[contact.id] = contact
    contact_id_counter += 1
    return contact

def get_contact(db, id):
    return contacts_db.get(id)

def update_contact(db, db_obj, obj_in):
    for field in ['contact_name', 'contact_type', 'date']:
        value = getattr(obj_in, field, None)
        if value is not None:
            setattr(db_obj, field, value)
    return db_obj

def remove_contact(db, id):
    if id in contacts_db:
        del contacts_db[id]

def list_contacts(db):
    return list(contacts_db.values())
