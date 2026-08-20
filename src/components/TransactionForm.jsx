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

    // Reset category when switching type
    if (selectedType === "income") {
      setCategory("Salary");
      setTitle("");
    } else {
      setCategory("Food");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!amount) {
      alert("Please enter an amount.");
      return;
    }

    // Expense requires a transaction name
    if (type === "expense" && !title.trim()) {
      alert("Please enter a transaction name.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: type === "income" ? category : title,
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

  const categories =
    type === "income"
      ? incomeCategories
      : expenseCategories;

  return (
    <div className="transaction-form">
      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>

        {/* Type FIRST */}
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

        {/* Transaction name ONLY for expense */}
        {type === "expense" && (
          <div className="form-group">
            <label>Transaction Name</label>

            <input
              type="text"
              placeholder="e.g. Groceries"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
            />
          </div>
        )}

        {/* Category */}
        <div className="form-group">
          <label>Category</label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="form-group">
          <label>Amount</label>

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

        <button
          type="submit"
          className={
            type === "income"
            ? "add-button income-button"
            : "add-button expense-button"
        }
      >
        {type === "income" ? "Add Income" : "Add Expense"}
      </button>  

      </form>
    </div>
  );
}

export default TransactionForm;