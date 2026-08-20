from fastapi import (
    APIRouter,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from ..database import get_db

from ..models import (
    User,
    Transaction
)

from ..schemas import (
    TransactionCreate,
    TransactionResponse
)

from .auth import get_current_user


router = APIRouter(
    prefix="/transactions",
    tags=["Transactions"]
)


# =========================
# ADD TRANSACTION
# =========================

@router.post(
    "",
    response_model=TransactionResponse,
    status_code=201
)
def create_transaction(
    transaction_data: TransactionCreate,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db)
):

    transaction_type = (
        transaction_data.transaction_type
        .lower()
    )

    if transaction_type not in [
        "income",
        "expense"
    ]:

        raise HTTPException(
            status_code=400,
            detail="Transaction type must be income or expense"
        )

    # Transaction name rules
    if transaction_type == "expense":

        if not transaction_data.name:

            raise HTTPException(
                status_code=400,
                detail="Transaction name is required for expenses"
            )

    if (
        transaction_type == "income"
        and transaction_data.category.lower() == "other"
        and not transaction_data.name
    ):

        raise HTTPException(
            status_code=400,
            detail="Transaction name is required for Other income"
        )

    transaction = Transaction(
        user_id=current_user.id,
        transaction_type=transaction_type,
        name=transaction_data.name,
        category=transaction_data.category,
        amount=transaction_data.amount,
        date=transaction_data.date
    )

    db.add(transaction)

    db.commit()

    db.refresh(transaction)

    return transaction


# =========================
# GET TRANSACTIONS
# =========================

@router.get(
    "",
    response_model=list[TransactionResponse]
)
def get_transactions(
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db)
):

    transactions = db.query(
        Transaction
    ).filter(
        Transaction.user_id == current_user.id
    ).order_by(
        Transaction.date.desc()
    ).all()

    return transactions


# =========================
# DELETE TRANSACTION
# =========================

@router.delete(
    "/{transaction_id}"
)
def delete_transaction(
    transaction_id: int,
    current_user: User = Depends(
        get_current_user
    ),
    db: Session = Depends(get_db)
):

    transaction = db.query(
        Transaction
    ).filter(
        Transaction.id == transaction_id,
        Transaction.user_id == current_user.id
    ).first()

    if not transaction:

        raise HTTPException(
            status_code=404,
            detail="Transaction not found"
        )

    db.delete(transaction)

    db.commit()

    return {
        "message": "Transaction deleted successfully"
    }