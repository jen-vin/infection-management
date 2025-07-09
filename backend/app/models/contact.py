from dataclasses import dataclass
from datetime import datetime

@dataclass
class Contact:
    id: int
    case_id: int
    contact_name: str
    contact_type: str
    date: datetime
