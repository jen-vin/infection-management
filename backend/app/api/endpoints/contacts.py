from fastapi import APIRouter, HTTPException
from app.schemas.contact import ContactCreate, ContactUpdate
from app.models.contact import Contact
from app.crud import crud_contact
from typing import List

router = APIRouter()

def get_db():
    return None

@router.get("/contacts/", response_model=List[ContactCreate])
def list_contacts():
    db = get_db()
    return crud_contact.list_contacts(db)

@router.post("/contacts/", response_model=ContactCreate)
def create_contact(contact_in: ContactCreate):
    db = get_db()
    return crud_contact.create_contact(db, contact_in)

@router.get("/contacts/{contact_id}", response_model=ContactCreate)
def get_contact(contact_id: int):
    db = get_db()
    contact = crud_contact.get_contact(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    return contact

@router.put("/contacts/{contact_id}", response_model=ContactCreate)
def update_contact(contact_id: int, contact_update: ContactUpdate):
    db = get_db()
    contact = crud_contact.get_contact(db, contact_id)
    if not contact:
        raise HTTPException(status_code=404, detail="Contact not found")
    updated = crud_contact.update_contact(db, contact, contact_update)
    return updated

@router.delete("/contacts/{contact_id}")
def delete_contact(contact_id: int):
    db = get_db()
    crud_contact.remove_contact(db, contact_id)
    return {"ok": True}
