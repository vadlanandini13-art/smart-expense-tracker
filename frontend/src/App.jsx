import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import ExpenseForm from "./components/ExpenseForm";
function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const totalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount),0);
  const totalIncome = 0;

const totalBalance = totalIncome - totalExpenses;
const fetchExpenses = () => {
  fetch("http://127.0.0.1:8000/expenses")
    .then((response) => response.json())
    .then((data) => setExpenses(data))
    .catch((error) => console.error(error));
};
const deleteExpense = async (id) => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/expense/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    alert(data.message);

    fetchExpenses();

  } catch (error) {
    console.error(error);
    alert("Delete failed!");
  }
};
useEffect(() => {
  fetchExpenses();
}, []);
  return (
    <div className="container">
      <Navbar />
      <p>Manage your income and expenses easily.</p>
      <div className="cards">
        <SummaryCard title="💰 Total Balance" amount={`₹${totalBalance}`} />
        <SummaryCard title="🟢 Income" amount={`₹${totalIncome}`} />
        <SummaryCard title="🔴 Expenses" amount={`₹${totalExpenses}`} />
      </div>
      <button>+ Add New Expense</button>
      <input type="text" placeholder="Search expenses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
      <ExpenseForm onExpenseAdded={fetchExpenses} editingExpense={editingExpense}/>
      <h2>Saved Expenses</h2>

<table>
  <thead>
    <tr>
      <th>Title</th>
      <th>Amount</th>
      <th>Category</th>
      <th>Date</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  </thead>

  <tbody>
  {expenses
    .filter((expense) =>
      expense.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((expense) => (
      <tr key={expense.id}>
        <td>{expense.title}</td>
        <td>₹{expense.amount}</td>
        <td>{expense.category}</td>
        <td>{expense.date}</td>
        <td>
          <button onClick={() => setEditingExpense(expense)}>
            Edit
          </button>
        </td>
        <td>
          <button onClick={() => deleteExpense(expense.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
</tbody>
</table>
    </div>
  );
}

export default App;