from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import date

class ContactReportBase(BaseModel):
    name: Optional[str] = None
    contact_1_id: Optional[str] = None
    contact_2_id: Optional[str] = None
    region: Optional[str] = None
    contact_date: date = None
    risk: Optional[int] = None