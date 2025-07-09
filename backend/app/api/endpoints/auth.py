from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

class LoginRequest(BaseModel):
    username: str
    password: str

@router.post("/auth/login")
def login(data: LoginRequest):
    # Dummy-Login: akzeptiert alles
    if not data.username or not data.password:
        raise HTTPException(status_code=400, detail="Missing credentials")
    # In echt: User-DB prüfen, Passwort-Hash vergleichen
    return {"access_token": "dummy-token-for-" + data.username, "token_type": "bearer"} 