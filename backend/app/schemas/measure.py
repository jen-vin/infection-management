from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MeasureCreate(BaseModel):
    case_id: int
    type: str
    status: str
    start_date: datetime
    end_date: Optional[datetime] = None
    notes: Optional[str] = None

class MeasureUpdate(BaseModel):
    type: Optional[str] = None
    status: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    notes: Optional[str] = None

class MeasureOut(BaseModel):
    id: int
    case_id: int
    type: str
    status: str
    start_date: datetime
    end_date: Optional[datetime] = None
    notes: Optional[str] = None 