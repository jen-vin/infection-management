from fastapi import APIRouter
from typing import Dict

router = APIRouter()

@router.get("/stats/overview")
def get_stats_overview() -> Dict:
    # Dummy-Statistiken
    return {
        "total_cases": 123,
        "active_cases": 45,
        "by_age_group": {"0-18": 10, "19-65": 100, "65+": 13},
        "by_location": {"Berlin": 50, "Munich": 30}
    }
