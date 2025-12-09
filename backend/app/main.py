from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from .database import connect_to_mongodb, close_mongodb_connection
from .routers import (
    portfolio,
    experiences,
    skills,
    education,
    publications,
    achievements,
    certifications,
    contact,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await connect_to_mongodb()
    yield
    # Shutdown
    await close_mongodb_connection()


app = FastAPI(
    title="Portfolio API",
    description="FastAPI backend for portfolio website serving data from MongoDB",
    version="1.0.0",
    lifespan=lifespan,
)

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(portfolio.router)
app.include_router(experiences.router)
app.include_router(skills.router)
app.include_router(education.router)
app.include_router(publications.router)
app.include_router(achievements.router)
app.include_router(certifications.router)
app.include_router(contact.router)


@app.get("/")
async def root():
    return {"message": "Portfolio API is running", "docs": "/docs"}


@app.get("/health")
async def health_check():
    return {"status": "healthy"}
