import TransactionItem from './TransactionItem';

function TransactionList({
     transactions,
     deleteTransaction,
     filter,
     setFilter,
     search,
     setSearch
}) {
    return (
        <section className="transaction-card">
            <div className="transaction-header">
                <div>
                    <h2>Transactions</h2>

                    <p>
                        Your recent financial activity
                    </p>
                </div>

            </div>
            {/*Filters*/}
        <div className="filters">

            <input
                type="text"
                placeholder="Search transactions..."
                value={search}
                onChange={(event) =>
                    setSearch(event.target.value)
                }
            />      

            <div className="filter-buttons">

                <button
                    className={filter === "all" ? "active-filter" : ""}
                    onClick={() => setFilter("all")}
                >
                    All
                </button>

                <button
                    className={filter === "income" ? "active-filter" : ""}
                    onClick={() => setFilter("income")}
                >
                    Income
                </button>

                <button
                    className={filter === "expense" ? "active-filter" : ""}
                    onClick={() => setFilter("expense")}
                >
                    Expenses
                </button>
            </div>

        </div>

        {/* Transactions*/}
        <div className="transaction-list">
            {transactions.length === 0 ? (
                <div className="empty-state">
                    <div className="empty-icon">
                        📭
                    </div>

                    <h3>
                        No transactions found
                    </h3>

                    <p>
                        Add your first transaction to get started.
                    </p>
                </div>
            ) : (
                transactions.slice().reverse().map((transaction) => (
                    <TransactionItem
                        key={transaction.id}
                        transaction={transaction}
                        deleteTransaction={deleteTransaction}
                    />
                ))
            )}
        </div>
        </section>
    );
}   

export default TransactionList;