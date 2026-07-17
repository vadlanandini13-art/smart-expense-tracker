import "./App.css";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseChart from "./components/ExpenseChart";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All");

  // Fetch expenses
  const fetchExpenses = () => {
    fetch("https://smart-expense-tracker-kle9.onrender.com/expenses")
      .then((response) => response.json())
      .then((data) => setExpenses(data))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Delete transaction
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(
        `https://smart-expense-tracker-kle9.onrender.com/expense/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();
      alert(data.message);
      fetchExpenses();
    } catch (error) {
      console.error(error);
      alert("Delete failed!");
    }
  };

  // Summary Cards
  const totalIncome = expenses
    .filter((expense) => expense.type === "Income")
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const totalExpenses = expenses
    .filter((expense) => expense.type === "Expense")
    .reduce((sum, expense) => sum + Number(expense.amount), 0);

  const totalBalance = totalIncome - totalExpenses;

  return (
    <div className="container">
      <Navbar />

      <p>Manage your income and expenses easily.</p>

      <div className="cards">
        <SummaryCard title="💰 Total Balance" amount={totalBalance} />
        <SummaryCard title="🟢 Income" amount={totalIncome} />
        <SummaryCard title="🔴 Expenses" amount={totalExpenses} />
      </div>

      <h2>Add Transaction</h2>

      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
      >
        <option>All</option>
        <option>Income</option>
        <option>Expense</option>
      </select>

      <ExpenseForm
        onExpenseAdded={fetchExpenses}
        editingExpense={editingExpense}
      />

      <h2>Saved Transactions</h2>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Date</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
          {expenses
            .filter((expense) =>
              expense.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            )
            .filter((expense) =>
              filterType === "All"
                ? true
                : expense.type === filterType
            )
            .map((expense) => (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>₹{expense.amount}</td>
                <td>{expense.type}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>

                <td>
                  <button
                    style={{
                      background: "#ffc107",
                      color: "black",
                    }}
                    onClick={() => setEditingExpense(expense)}
                  >
                    Edit
                  </button>
                </td>

                <td>
                  <button
                    style={{
                      background: "#dc3545",
                      color: "white",
                    }}
                    onClick={() => deleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      <ExpenseChart expenses={expenses} />
    </div>
  );
}

export default App;