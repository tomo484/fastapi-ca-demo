from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import task, done
from app.migrate_db import reset_database
from config import settings

app = FastAPI(debug=settings.DEBUG)

@app.on_event("startup")
async def startup_event():
    reset_database()

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(task.router)
app.include_router(done.router)
