function ExpenseForm() {
  return (
    <div className="expense-form">
      <h2>Add Expense</h2>

      <input type="text" placeholder="Expense Title" />

      <input type="number" placeholder="Amount" />

      <select>
        <option>Food</option>
        <option>Transport</option>
        <option>Shopping</option>
        <option>Entertainment</option>
      </select>

      <input type="date" />

      <button>Save Expense</button>
    </div>
  );
}

export default ExpenseForm;