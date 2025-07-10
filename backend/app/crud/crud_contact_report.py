from sqlalchemy.orm import Session
from sqlalchemy.exc import NoResultFound
from typing import List, Optional

from app.models.contact_report import ContactReport

def get_contact_report(db: Session, contact_report: int) -> Optional[ContactReport]:
    return db.query(ContactReport).filter(ContactReport.id == contact_report).first()

def list_contact_reports(db: Session) -> List[ContactReport]:
    return db.query(ContactReport).all()

def remove_contact_report(db: Session, contact_report_id: int) -> bool:
    db_contact_report = db.query(ContactReport).filter(ContactReport.id == contact_report_id).first()
    if not db_contact_report:
        return False
    db.delete(db_contact_report)
    db.commit()
    return True

def get_by_user_app_id(db: Session, user_app_id: str):
    return db.query(ContactReport).filter(
        (ContactReport.contact_1_id == user_app_id) | 
        (ContactReport.contact_2_id == user_app_id)
    ).all()

def get_all(db: Session):
    return db.query(ContactReport).all()