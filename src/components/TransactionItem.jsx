function TransactionItem({
  transaction,
  deleteTransaction,
}) {

  const isIncome =
    transaction.type === "income";

  const formattedDate =
    new Date(transaction.date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  return (
    <div className="transaction-item">

      <div className="transaction-left">

        <div
          className={
            isIncome
              ? "transaction-icon income"
              : "transaction-icon expense"
          }
        >
          {isIncome ? "↑" : "↓"}
        </div>

        <div>

          <h3>
            {transaction.title}
          </h3>

          <div className="transaction-details">

            <span>
              {transaction.category}
            </span>

            <span>
              •
            </span>

            <span>
              {formattedDate}
            </span>

          </div>

        </div>

      </div>

      <div className="transaction-right">

        <strong
          className={
            isIncome
              ? "income-text"
              : "expense-text"
          }
        >
          {isIncome ? "+" : "-"}₹
          {transaction.amount.toLocaleString(
            "en-IN"
          )}
        </strong>

        <button
          className="delete-button"
          onClick={() =>
            deleteTransaction(transaction.id)
          }
          title="Delete transaction"
        >
          🗑️
        </button>

      </div>

    </div>
  );
}

export default TransactionItem;