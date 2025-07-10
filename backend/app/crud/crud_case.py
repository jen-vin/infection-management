from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from typing import List, Optional

from app.models.case import Case
from app.schemas.case import CaseCreate, CaseUpdate 

def create_case(db: Session, obj_in: CaseCreate) -> Case:
    db_case = Case(
        name=obj_in.name,
        age=obj_in.age,
        status=obj_in.status,
        date_reported=obj_in.date_reported,
        region=obj_in.region,
        symptoms=",".join(obj_in.symptoms) if obj_in.symptoms else "",
        contacts=obj_in.contacts,
        phone=obj_in.phone,
        email=obj_in.email,
        address=obj_in.address,
        test_date=obj_in.test_date,
        test_result=obj_in.test_result,
        notes=obj_in.notes,
        contact_history=obj_in.contact_history,
        measures=obj_in.measures,
    )
    db.add(db_case)
    db.commit()
    db.refresh(db_case)
    return db_case

def get_case(db: Session, case_id: int) -> Optional[Case]:
    return db.query(Case).filter(Case.id == case_id).first()

def list_cases(db: Session) -> List[Case]:
    return db.query(Case).all()

def update_case(db: Session, case_id: int, obj_in: CaseUpdate) -> Optional[Case]:
    db_case = db.query(Case).filter(Case.id == case_id).first()
    if not db_case:
        return None

    update_data = obj_in.dict(exclude_unset=True)
    for field, value in update_data.items():
        if field == "symptoms" and isinstance(value, list):
            value = ",".join(value)
        setattr(db_case, field, value)

    db.commit()
    db.refresh(db_case)
    return db_case

def remove_case(db: Session, case_id: int) -> bool:
    db_case = db.query(Case).filter(Case.id == case_id).first()
    if not db_case:
        return False
    db.delete(db_case)
    db.commit()
    return True
