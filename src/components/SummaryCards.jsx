function SummaryCards({
  totalIncome,
  totalExpenses,
  balance,
  transactionCount,
}) {
  return (
    <section className="summary-grid">

      {/* Income */}
      <div className="summary-card income-card">

        <div className="summary-icon">
          ↑
        </div>

        <div>
          <p className="summary-title">
            Total Income
          </p>

          <h2>
            ₹{totalIncome.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>

      {/* Expenses */}
      <div className="summary-card expense-card">

        <div className="summary-icon">
          ↓
        </div>

        <div>
          <p className="summary-title">
            Total Expenses
          </p>

          <h2>
            ₹{totalExpenses.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>

      {/* Balance */}
      <div className="summary-card balance-card">

        <div className="summary-icon">
          ₹
        </div>

        <div>
          <p className="summary-title">
            Current Balance
          </p>

          <h2>
            ₹{balance.toLocaleString("en-IN")}
          </h2>
        </div>

      </div>

      {/* Transactions */}
      <div className="summary-card transaction-card">

        <div className="summary-icon">
          #
        </div>

        <div>
          <p className="summary-title">
            Transactions
          </p>

          <h2>
            {transactionCount}
          </h2>
        </div>

      </div>

    </section>
  );
}

export default SummaryCards;