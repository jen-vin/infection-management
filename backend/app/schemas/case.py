from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date

class CaseBase(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    status: Optional[str] = None
    date_reported: Optional[date] = None
    region: Optional[str] = None
    symptoms: Optional[List[str]] = None
    contacts: Optional[int] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None
    address: Optional[str] = None
    user_app_id: Optional[str] = None
    test_date: Optional[date] = None
    test_result: Optional[str] = None
    notes: Optional[str] = None
    contact_history: Optional[List[dict]] = None
    measures: Optional[List[dict]] = None


class CaseCreate(CaseBase):
    name: str
    age: int
    status: str
    date_reported: date
    region: str
    user_app_id: str

    class Config:
        from_attributes = True

class CaseUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    user_app_id: Optional[str] = None
    status: Optional[str] = None
    symptoms: Optional[List[str]] = None
    locations: Optional[List[str]] = None
