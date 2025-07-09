from fastapi import APIRouter
from typing import List, Dict

router = APIRouter()

@router.get("/notifications/", response_model=List[Dict])
def get_notifications():
    # Dummy-Warnungen
    return [
        {"type": "threshold", "message": "Incidence in Berlin exceeds 100!", "level": "warning"},
        {"type": "capacity", "message": "ICU capacity in Munich below 10%", "level": "critical"}
    ] 