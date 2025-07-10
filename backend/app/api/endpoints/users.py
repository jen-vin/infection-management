from fastapi import APIRouter, HTTPException
from typing import List, Optional
from pydantic import BaseModel
from app.models.user import User
from app.crud import crud_user
from app.models.db_base import SessionLocal

class UserCreate(BaseModel):
    username: str
    password: str
    role: str

class UserUpdate(BaseModel):
    username: Optional[str] = None
    password: Optional[str] = None
    role: Optional[str] = None
    is_active: Optional[bool] = None

class UserOut(BaseModel):
    id: int
    username: str
    role: str
    is_active: bool

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/users/", response_model=List[UserOut])
def list_users():
    db = get_db()
    return crud_user.list_users(db)

@router.post("/users/", response_model=UserOut)
def create_user(user_in: UserCreate):
    db = get_db()
    return crud_user.create_user(db, user_in)

@router.get("/users/{user_id}", response_model=UserOut)
def get_user(user_id: int):
    db = get_db()
    user = crud_user.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.put("/users/{user_id}", response_model=UserOut)
def update_user(user_id: int, user_update: UserUpdate):
    db = get_db()
    user = crud_user.get_user(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    updated = crud_user.update_user(db, user, user_update)
    return updated

@router.delete("/users/{user_id}")
def delete_user(user_id: int):
    db = get_db()
    crud_user.remove_user(db, user_id)
    return {"ok": True}
