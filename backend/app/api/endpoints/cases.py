from fastapi import APIRouter, HTTPException, Depends
from app.api.deps import get_db
from app.schemas.case import CaseCreate, CaseUpdate
from app.models.case import Case
from app.crud import crud_case
from sqlalchemy.orm import Session
from typing import List

router = APIRouter()

@router.get("/cases/")
def list_cases(db: Session = Depends(get_db)):
    return crud_case.list_cases(db)

@router.post("/cases/")
def create_case(case_in: CaseCreate, db: Session = Depends(get_db)):
    return crud_case.create_case(db, case_in)


@router.get("/cases/{case_id}", response_model=CaseCreate)
def get_case(case_id: int):
    db = get_db()
    case = crud_case.get_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case

@router.put("/cases/{case_id}", response_model=CaseCreate)
def update_case(case_id: int, case_update: CaseUpdate):
    db = get_db()
    case = crud_case.get_case(db, case_id)
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    updated = crud_case.update_case(db, case, case_update)
    if not updated:
        raise HTTPException(status_code=400, detail="No changes applied")
    return updated

@router.delete("/cases/{case_id}")
def delete_case(case_id: int):
    db = get_db()
    crud_case.remove_case(db, case_id)
    return {"ok": True}
