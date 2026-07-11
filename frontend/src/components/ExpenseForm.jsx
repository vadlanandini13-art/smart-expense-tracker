import { useState } from "react";
function ExpenseForm() {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [date, setDate] = useState("");

  function handleSubmit() {
    console.log("Title:", title);
    console.log("Amount:", amount);
    console.log("Category:", category);
    console.log("Date:", date);
}
 
  return (
    <div className="expense-form">
      <h2>Add Expense</h2>

      <input type="text" placeholder="Expense Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
      <p>{title}</p>
      <input type="number" placeholder="Amount" />

      <select>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Entertainment</option>
      </select>

      <input type="date" />

      <button onClick={handleSubmit}>Save Expense</button>
    </div>
  );
}

export default ExpenseForm;