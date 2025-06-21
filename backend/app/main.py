from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Infection Management System")

# CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Erlaubt Anfragen vom React-Frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Welcome to the Infection Management System API"}

# Hier werden später die API-Router eingebunden
# from .api.endpoints import cases, contacts, users
# app.include_router(users.router, prefix="/api/v1", tags=["users"])
# app.include_router(cases.router, prefix="/api/v1", tags=["cases"])
# app.include_router(contacts.router, prefix="/api/v1", tags=["contacts"]) 