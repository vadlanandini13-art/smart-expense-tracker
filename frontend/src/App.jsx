import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import ExpenseForm from "./components/ExpenseForm";
function App() {
  const [expenses, setExpenses] = useState([]);

const fetchExpenses = () => {
  fetch("http://127.0.0.1:8000/expenses")
    .then((response) => response.json())
    .then((data) => setExpenses(data))
    .catch((error) => console.error(error));
};

useEffect(() => {
  fetchExpenses();
}, []);
  return (
    <div className="container">
      <Navbar />
      <p>Manage your income and expenses easily.</p>
      <div className="cards">
        <SummaryCard title="💰 Total Balance" amount="0" />
        <SummaryCard title="🟢 Income" amount="0" />
        <SummaryCard title="🔴 Expenses" amount="0" />
      </div>
      <button>+ Add New Expense</button>
      <ExpenseForm onExpenseAdded={fetchExpenses}/>
      <h2>Saved Expenses</h2>

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Date</th>
    </tr>
  </thead>

  <tbody>
    {expenses.map((expense) => (
      <tr key={expense.id}>
        <td>{expense.title}</td>
        <td>₹{expense.amount}</td>
        <td>{expense.category}</td>
        <td>{expense.date}</td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
}

export default App;