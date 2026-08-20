import { useState } from "react";

function TransactionForm({ addTransaction }) {

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (event) => {

    event.preventDefault();

    if (!title.trim()) {
      alert("Please enter a transaction name.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: title.trim(),
      amount: Number(amount),
      type: type,
      category: category,
      date: new Date().toISOString(),
    };

    addTransaction(newTransaction);

    // Reset form
    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
  };

  return (
    <section className="form-card">

      <div className="section-heading">

        <div>
          <h2>Add Transaction</h2>
          <p>
            Record your income or expense
          </p>
        </div>

        <span className="plus-icon">
          +
        </span>

      </div>

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <div className="form-group">

          <label>
            Transaction Name
          </label>

          <input
            type="text"
            placeholder="Example: Grocery shopping"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
          />

        </div>

        {/* Amount */}
        <div className="form-group">

          <label>
            Amount
          </label>

          <div className="amount-input">

            <span>₹</span>

            <input
              type="number"
              placeholder="0"
              min="0"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
            />

          </div>

        </div>

        {/* Type */}
        <div className="form-group">

          <label>
            Type
          </label>

          <select
            value={type}
            onChange={(event) =>
              setType(event.target.value)
            }
          >

            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>

          </select>

        </div>

        {/* Category */}
        <div className="form-group">

          <label>
            Category
          </label>

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >

            <option value="Food">
              🍔 Food
            </option>

            <option value="Transport">
              🚗 Transport
            </option>

            <option value="Shopping">
              🛍️ Shopping
            </option>

            <option value="Bills">
              💡 Bills
            </option>

            <option value="Entertainment">
              🎬 Entertainment
            </option>

            <option value="Health">
              ❤️ Health
            </option>

            <option value="Education">
              📚 Education
            </option>

            <option value="Salary">
              💼 Salary
            </option>

            <option value="Other">
              📦 Other
            </option>

          </select>

        </div>

        <button
          type="submit"
          className="add-button"
        >
          + Add Transaction
        </button>

      </form>

    </section>
  );
}

export default TransactionForm;