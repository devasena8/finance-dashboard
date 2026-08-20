import { useEffect, useState } from "react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("transactions");

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // Save transactions whenever they change
  useEffect(() => {
    localStorage.setItem(
      "transactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  // Add transaction
  const addTransaction = (transaction) => {
    setTransactions((previousTransactions) => [
      ...previousTransactions,
      transaction,
    ]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions((previousTransactions) =>
      previousTransactions.filter(
        (transaction) => transaction.id !== id
      )
    );
  };

  // Calculate income
  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  // Calculate expenses
  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

  // Calculate balance
  const balance = totalIncome - totalExpenses;

  // Filter transactions
  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesFilter =
        filter === "all" ||
        transaction.type === filter;

      const matchesSearch =
        transaction.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        transaction.category
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    }
  );

  return (
    <div className="app">

      <Header />

      <main className="container">

        <SummaryCards
          totalIncome={totalIncome}
          totalExpenses={totalExpenses}
          balance={balance}
          transactionCount={transactions.length}
        />

        <div className="dashboard-grid">

          <TransactionForm
            addTransaction={addTransaction}
          />

          <div className="charts-section">
            <Charts
              transactions={transactions}
            />
          </div>

        </div>

        <TransactionList
          transactions={filteredTransactions}
          deleteTransaction={deleteTransaction}
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />

      </main>

    </div>
  );
}

export default App;