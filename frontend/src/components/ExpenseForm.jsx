import { useState } from "react";

function ExpenseForm({ onExpenseAdded }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  async function handleSubmit() {
    const expense = {
      title,
      amount,
      category,
      date,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
      });

      const data = await response.json();

      console.log(data);

      alert(data.message);

      // Refresh the expense list
      onExpenseAdded();

      // Clear the form
      setTitle("");
      setAmount("");
      setCategory("Food");
      setDate("");

    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="expense-form">
      <h2>Add Expense</h2>

      <input
        type="text"
        placeholder="Expense Title"
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
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Entertainment</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleSubmit}>Save Expense</button>
    </div>
  );
}

export default ExpenseForm;