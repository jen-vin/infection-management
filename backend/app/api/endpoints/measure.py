from fastapi import APIRouter, HTTPException
from app.schemas.measure import MeasureCreate, MeasureUpdate, MeasureOut
from app.models.measure import Measure
from app.crud import crud_measure
from typing import List

router = APIRouter()

def get_db():
    return None

@router.get("/measures/", response_model=List[MeasureOut])
def list_measures():
    db = get_db()
    return crud_measure.list_measures(db)

@router.post("/measures/", response_model=MeasureOut)
def create_measure(measure_in: MeasureCreate):
    db = get_db()
    return crud_measure.create_measure(db, measure_in)

@router.get("/measures/{measure_id}", response_model=MeasureOut)
def get_measure(measure_id: int):
    db = get_db()
    measure = crud_measure.get_measure(db, measure_id)
    if not measure:
        raise HTTPException(status_code=404, detail="Measure not found")
    return measure

@router.put("/measures/{measure_id}", response_model=MeasureOut)
def update_measure(measure_id: int, measure_update: MeasureUpdate):
    db = get_db()
    measure = crud_measure.get_measure(db, measure_id)
    if not measure:
        raise HTTPException(status_code=404, detail="Measure not found")
    updated = crud_measure.update_measure(db, measure, measure_update)
    return updated

@router.delete("/measures/{measure_id}")
def delete_measure(measure_id: int):
    db = get_db()
    crud_measure.remove_measure(db, measure_id)
    return {"ok": True} 