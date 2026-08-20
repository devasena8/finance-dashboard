from fastapi import FastAPI

from fastapi.middleware.cors import CORSMiddleware

from .database import Base, engine

from .routers import auth, transactions


# Create database tables
Base.metadata.create_all(
    bind=engine
)


app = FastAPI(
    title="Personal Finance Dashboard API",
    description="Backend API for personal finance management",
    version="1.0.0"
)


# =========================
# CORS
# =========================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# =========================
# ROUTERS
# =========================

app.include_router(
    auth.router
)

app.include_router(
    transactions.router
)


# =========================
# ROOT
# =========================

@app.get("/")
def root():

    return {
        "message": "Finance Dashboard API is running"
    }


@app.get("/health")
def health():

    return {
        "status": "healthy"
    }