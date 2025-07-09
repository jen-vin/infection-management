from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class ContactCreate(BaseModel):
    case_id: int
    contact_name: str
    contact_type: str
    date: datetime

class ContactUpdate(BaseModel):
    contact_name: Optional[str] = None
    contact_type: Optional[str] = None
    date: Optional[datetime] = None
