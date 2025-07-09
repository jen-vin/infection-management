from dataclasses import dataclass
from datetime import datetime
from typing import Optional

@dataclass
class Measure:
    id: int
    case_id: int
    type: str
    status: str
    start_date: datetime
    end_date: Optional[datetime] = None
    notes: Optional[str] = None 