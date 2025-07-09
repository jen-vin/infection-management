from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class CaseHistoryEntrySchema(BaseModel):
    status: str
    timestamp: datetime

class CaseCreate(BaseModel):
    name: str
    age: int
    status: str
    symptoms: Optional[List[str]] = []
    locations: Optional[List[str]] = []
    history: Optional[List[CaseHistoryEntrySchema]] = []

class CaseUpdate(BaseModel):
    name: Optional[str] = None
    age: Optional[int] = None
    status: Optional[str] = None
    symptoms: Optional[List[str]] = None
    locations: Optional[List[str]] = None
    history: Optional[List[CaseHistoryEntrySchema]] = None
