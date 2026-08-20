from datetime import date, datetime

from pydantic import BaseModel, EmailStr, Field, ConfigDict


# =========================
# AUTH
# =========================

class UserCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)

    email: EmailStr

    password: str = Field(
        min_length=6,
        max_length=100
    )


class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


# =========================
# TRANSACTIONS
# =========================

class TransactionCreate(BaseModel):

    transaction_type: str

    name: str | None = None

    category: str

    amount: float = Field(
        gt=0
    )

    date: date


class TransactionResponse(BaseModel):

    id: int

    transaction_type: str

    name: str | None

    category: str

    amount: float

    date: date

    created_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )