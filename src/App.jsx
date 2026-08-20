import { useEffect, useState } from "react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import Charts from "./components/Charts";

import Login from "./Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const [transactions, setTransactions] = useState([]);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // =========================
  // CHECK LOGIN
  // =========================

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    // Verify token with backend
    fetch("http://127.0.0.1:8000/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid token");
        }

        setIsLoggedIn(true);
      })
      .catch(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
      });
  }, []);

  // =========================
  // LOGIN
  // =========================

  const handleLogin = (data) => {
    localStorage.setItem("token", data.access_token);
    setIsLoggedIn(true);
  };

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("token");

    setTransactions([]);
    setFilter("all");
    setSearch("");

    setIsLoggedIn(false);
  };

  // =========================
  // ADD TRANSACTION
  // =========================

  const addTransaction = async (transaction) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(transaction),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add transaction");
      }

      const newTransaction = await response.json();

      setTransactions((previousTransactions) => [
        ...previousTransactions,
        newTransaction,
      ]);
    } catch (error) {
      console.error(error);
      alert("Could not add transaction");
    }
  };

  // =========================
  // DELETE TRANSACTION
  // =========================

  const deleteTransaction = async (id) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/transactions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      setTransactions((previousTransactions) =>
        previousTransactions.filter(
          (transaction) => transaction.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert("Could not delete transaction");
    }
  };

  // =========================
  // CALCULATIONS
  // =========================

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce(
      (total, transaction) =>
        total + Number(transaction.amount),
      0
    );

  const balance = totalIncome - totalExpenses;

  // =========================
  // FILTER
  // =========================

  const filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesFilter =
        filter === "all" ||
        transaction.type === filter;

      const title =
        transaction.title ||
        transaction.transaction_name ||
        "";

      const category =
        transaction.category || "";

      const matchesSearch =
        title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        category
          .toLowerCase()
          .includes(search.toLowerCase());

      return matchesFilter && matchesSearch;
    }
  );

  // =========================
  // SHOW LOGIN
  // =========================

  if (!isLoggedIn) {
    return (
      <Login
        onLogin={handleLogin}
      />
    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <div className="app">

      <Header onLogout={handleLogout} />

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