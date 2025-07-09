from typing import List, Dict, Optional
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class CaseHistoryEntry:
    status: str
    timestamp: datetime

@dataclass
class Case:
    id: int
    name: str
    age: int
    status: str
    history: List[CaseHistoryEntry] = field(default_factory=list)
    symptoms: Optional[List[str]] = field(default_factory=list)
    locations: Optional[List[str]] = field(default_factory=list)
