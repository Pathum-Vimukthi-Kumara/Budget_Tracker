import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import "./ChartSection.css";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const ChartSection = () => {
  const [transactions, setTransactions] = useState([]);
  const [overallChartData, setOverallChartData] = useState({
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [0, 0], // Initial data
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  });
  const [dailyExpenseChartData, setDailyExpenseChartData] = useState({
    labels: [], // Daily dates
    datasets: [
      {
        label: "Daily Expenses",
        data: [], // Initial data
        backgroundColor: "#22c703",
      },
    ],
  });
  const [dailyIncomeChartData, setDailyIncomeChartData] = useState({
    labels: [], // Daily dates
    datasets: [
      {
        label: "Daily Income",
        data: [], // Initial data
        backgroundColor: "#22c703",
      },
    ],
  })

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch("http://localhost:3011/api/v1/transactions", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setTransactions(data);
        } else {
          console.error("Failed to fetch transactions.");
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    // Calculate overall income and expenses
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    // Update pie chart data
    setOverallChartData({
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [income, expenses],
          backgroundColor: ["#22c703", "#f44336"],
        },
      ],
    });

    // Calculate daily expenses
    const dailyExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const date = new Date(t.date).toLocaleDateString(); // Format the date
        acc[date] = (acc[date] || 0) + parseFloat(t.amount);
        return acc;
      }, {});

    // Prepare data for daily expense bar chart
    const dailyExpenseLabels = Object.keys(dailyExpenses).sort();
    const dailyExpenseData = dailyExpenseLabels.map((date) => dailyExpenses[date]);

    setDailyExpenseChartData({
      labels: dailyExpenseLabels,
      datasets: [
        {
          label: "Daily Expenses",
          data: dailyExpenseData,
          backgroundColor: "#f44336",
        },
      ],
    });

    // Calculate daily income
    const dailyIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => {
        const date = new Date(t.date).toLocaleDateString(); // Format the date
        acc[date] = (acc[date] || 0) + parseFloat(t.amount);
        return acc;
      }, {});

    // Prepare data for daily income bar chart
    const dailyIncomeLabels = Object.keys(dailyIncome).sort();
    const dailyIncomeData = dailyIncomeLabels.map((date) => dailyIncome[date]);

    setDailyIncomeChartData({
      labels: dailyIncomeLabels,
      datasets: [
        {
          label: "Daily Income",
          data: dailyIncomeData,
          backgroundColor: "#22c703",
        },
      ],
    });
  }, [transactions]); // Dependency array ensures updates when `transactions` changes

  return (
    <div className="chart-section">
      <h2>Budget Analysis</h2>

      <div className="chart-container">
        <div className="pie_chart">
          <h3>Overall Budget Breakdown</h3>
          <Pie data={overallChartData} />
        </div>

        <div className="bar_chart">
          <h3>Daily Expenses</h3>
          <Bar
            data={dailyExpenseChartData}
            options={{
              responsive: true,
              plugins: { legend: { display: true } },
              scales: {
                x: {
                  ticks: {
                    color: "white", // Set X-axis label color
                  },
                  grid: {
                    color: "rgba(255, 255, 255, 0.2)", // Set X-axis grid line color
                  },
                },
                y: {
                  ticks: {
                    color: "white", // Set Y-axis label color
                  },
                  grid: {
                    color: "rgba(255, 255, 255, 0.2)", // Set Y-axis grid line color
                  },
                },
              },
            }}
          />
        </div>

        <div className="bar_chart">
          <h3>Daily Income</h3>
          <Bar
            data={dailyIncomeChartData}
            options={{
              responsive: true,
              plugins: { legend: { display: true } },
              scales: {
                x: {
                  ticks: {
                    color: "white", // Set X-axis label color
                  },
                  grid: {
                    color: "rgba(255, 255, 255, 0.2)", // Set X-axis grid line color
                  },
                },
                y: {
                  ticks: {
                    color: "white", // Set Y-axis label color
                  },
                  grid: {
                    color: "rgba(255, 255, 255, 0.2)", // Set Y-axis grid line color
                  },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
