from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import cases, contacts, measure, users, dashboard, notifications, auth, contact_reports
from sqlalchemy.orm import Session
from .models.db_base import SessionLocal, engine, Base
from .models.user import User
app = FastAPI()
Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3030",
    "http://localhost",
    "http://localhost:8000",
    "http://frontend/*",
]

# CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Erlaubt Anfragen vom React-Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(cases.router)
app.include_router(contacts.router)
app.include_router(measure.router)
app.include_router(users.router)
app.include_router(dashboard.router)
app.include_router(notifications.router)
app.include_router(auth.router)
app.include_router(contact_reports.router)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Infection Management System API"} 