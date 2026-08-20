import { useState } from "react";

function TransactionForm({ addTransaction }) {
  const [type, setType] = useState("income");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Salary");

  const incomeCategories = ["Salary", "Other"];

  const expenseCategories = [
    "Food",
    "Transport",
    "Shopping",
    "Bills",
    "Entertainment",
    "Health",
    "Other",
  ];

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;

    setType(selectedType);
    setTitle("");

    if (selectedType === "income") {
      setCategory("Salary");
    } else {
      setCategory("Food");
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);

    // Clear transaction name when changing away from Other
    if (event.target.value !== "Other") {
      setTitle("");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    /*
      Transaction name is required when:
      1. Type is expense
      2. Type is income AND category is Other
    */
    const needsTransactionName =
      type === "expense" ||
      (type === "income" && category === "Other");

    if (needsTransactionName && !title.trim()) {
      alert("Please enter a transaction name.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction = {
      id: Date.now(),

      /*
        For Salary income:
        title = Salary

        For Other income:
        title = whatever user entered

        For expenses:
        title = whatever user entered
      */
      title:
        type === "income" && category === "Salary"
          ? "Salary"
          : title,

      amount: Number(amount),

      type,

      category,

      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);

    // Reset form
    setTitle("");
    setAmount("");

    if (type === "income") {
      setCategory("Salary");
    } else {
      setCategory("Food");
    }
  };

  /*
    Show transaction name when:
    - Expense
    OR
    - Income + Other
  */
  const showTransactionName =
    type === "expense" ||
    (type === "income" && category === "Other");

  const categories =
    type === "income"
      ? incomeCategories
      : expenseCategories;

  return (
    <div className="transaction-form">

      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>

        {/* TYPE */}
        <div className="form-group">
          <label>Type</label>

          <select
            value={type}
            onChange={handleTypeChange}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={handleCategoryChange}
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* TRANSACTION NAME */}
        {showTransactionName && (
          <div className="form-group">
            <label>Transaction Name</label>

            <input
              type="text"
              placeholder={
                type === "income"
                  ? "e.g. Freelance"
                  : "e.g. Groceries"
              }
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />
          </div>
        )}

        {/* AMOUNT */}
        <div className="form-group">
          <label>Amount</label>

          <div className="amount-input">
            <span>₹</span>

            <input
              type="number"
              min="0"
              placeholder="Enter amount"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className={
            type === "income"
              ? "add-button income-button"
              : "add-button expense-button"
          }
        >
          {type === "income"
            ? "Add Income"
            : "Add Expense"}
        </button>

      </form>
    </div>
  );
}

export default TransactionForm;