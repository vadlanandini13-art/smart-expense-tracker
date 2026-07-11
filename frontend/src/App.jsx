import "./App.css";
import Navbar from "./components/Navbar";
import SummaryCard from "./components/SummaryCard";
import ExpenseForm from "./components/ExpenseForm";
function App() {
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
      <ExpenseForm />
    </div>
  );
}

export default App;