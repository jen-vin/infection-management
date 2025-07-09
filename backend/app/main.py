from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.endpoints import cases, contacts, measure, users, dashboard, notifications, auth

app = FastAPI()

# CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Erlaubt Anfragen vom React-Frontend
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

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Infection Management System API"} 