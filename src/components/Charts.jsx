import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function Charts({ transactions }) {

  // Expense by category
  const categoryTotals = {};

  transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .forEach((transaction) => {

      if (!categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] = 0;
      }

      categoryTotals[transaction.category] +=
        transaction.amount;

    });

  const categoryData = Object.entries(
    categoryTotals
  ).map(([category, amount]) => ({
    category,
    amount,
  }));

  // Income and expenses
  const totalIncome = transactions
    .filter(
      (transaction) =>
        transaction.type === "income"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const totalExpenses = transactions
    .filter(
      (transaction) =>
        transaction.type === "expense"
    )
    .reduce(
      (total, transaction) =>
        total + transaction.amount,
      0
    );

  const incomeExpenseData = [
    {
      name: "Finance",
      income: totalIncome,
      expenses: totalExpenses,
    },
  ];

  const COLORS = [
    "#6366f1",
    "#22c55e",
    "#f97316",
    "#ef4444",
    "#a855f7",
    "#14b8a6",
    "#eab308",
    "#ec4899",
    "#64748b",
  ];

  return (
    <div className="charts-container">

      {/* Expense Chart */}
      <div className="chart-card">

        <div className="chart-header">

          <h2>
            Expenses by Category
          </h2>

          <p>
            Where your money is going
          </p>

        </div>

        {categoryData.length === 0 ? (

          <div className="chart-empty">
            No expense data yet
          </div>

        ) : (

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={categoryData}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >

                {categoryData.map(
                  (entry, index) => (

                    <Cell
                      key={`cell-${index}`}
                      fill={
                        COLORS[
                          index % COLORS.length
                        ]
                      }
                    />

                  )
                )}

              </Pie>

              <Tooltip
                formatter={(value) =>
                  `₹${Number(value).toLocaleString(
                    "en-IN"
                  )}`
                }
              />

              <Legend />

            </PieChart>

          </ResponsiveContainer>

        )}

      </div>

      {/* Income vs Expense */}
      <div className="chart-card">

        <div className="chart-header">

          <h2>
            Income vs Expenses
          </h2>

          <p>
            Overall financial comparison
          </p>

        </div>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart
            data={incomeExpenseData}
          >

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="name"
            />

            <YAxis />

            <Tooltip
              formatter={(value) =>
                `₹${Number(value).toLocaleString(
                  "en-IN"
                )}`
              }
            />

            <Legend />

            <Bar
              dataKey="income"
              name="Income"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
            />

            <Bar
              dataKey="expenses"
              name="Expenses"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Charts;