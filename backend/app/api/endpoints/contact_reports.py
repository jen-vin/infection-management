from fastapi import APIRouter, Depends, Query
from app.api.deps import get_db
from app.schemas.contact_report import ContactReportBase
from app.crud import crud_contact_report
from sqlalchemy.orm import Session
from typing import List, Optional

router = APIRouter()

@router.get("/reports/", response_model=List[ContactReportBase])
def read_reports(
    user_app_id: Optional[str] = Query(None),
    db: Session = Depends(get_db) 
):
    if user_app_id:
        return crud_contact_report.get_by_user_app_id(db, user_app_id)
    return crud_contact_report.list_contact_reports(db)


@router.delete("/reports/{report_id}")
def delete_report(report_id: int):
    db: Session = Depends(get_db) 
    crud_contact_report.remove_contact_report(db, report_id)
    return {"ok": True}