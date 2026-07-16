import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ExpenseChart({ expenses }) {
  const expenseData = expenses.filter(
    (expense) => expense.type === "Expense"
  );

  const categoryTotals = {};

  expenseData.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += Number(expense.amount);
    } else {
      categoryTotals[expense.category] = Number(expense.amount);
    }
  });

  const data = Object.keys(categoryTotals).map((category) => ({
    name: category,
    value: categoryTotals[category],
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FF4560",
    "#775DD0",
    "#26A69A",
  ];

  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Expense Breakdown by Category
        </h2>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={130}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;