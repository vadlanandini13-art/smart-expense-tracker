import { useState, useEffect } from "react";

function ExpenseForm({ onExpenseAdded, editingExpense }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Expense");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount);
      setType(editingExpense.type);
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
    }
  }, [editingExpense]);

  async function handleSubmit() {
    console.log("Save button clicked");
    try {
      const expense = {
        title,
        amount,
        type,
        category,
        date,
      };

      let response;

      if (editingExpense) {
        response = await fetch(`https://smart-expense-tracker-mnse.onrender.com/expense/${editingExpense.id}`
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(expense),
          }
        );
      } else {
        response = await fetch(
          "https://smart-expense-tracker-mnse.onrender.com/expense",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(expense),
          }
        );
      }
      console.log(response.status);
      const data = await response.json();

      alert(data.message);

      onExpenseAdded();

      // Clear form
      setTitle("");
      setAmount("");
      setType("Expense");
      setCategory("Food");
      setDate("");

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="expense-form">
      <h2>
        {editingExpense ? "Edit Transaction" : "New Transaction"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option>Expense</option>
        <option>Income</option>
      </select>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Entertainment</option>
        <option>Salary</option>
        <option>Freelance</option>
        <option>Investment</option>
        <option>Other</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editingExpense ? "Update Transaction" : "Save Transaction"}
      </button>
    </div>
  );
}

export default ExpenseForm;