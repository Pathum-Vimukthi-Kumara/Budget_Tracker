import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartSection = () => {
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState({
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [0, 0], // Initial data
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  });

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
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);

    // Update chart data
    setChartData({
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [income, expenses],
          backgroundColor: ["#4caf50", "#f44336"],
        },
      ],
    });
  }, [transactions]); // Dependency array ensures updates when `transactions` changes

  return (
    <div className="chart-section">
      <h2>Budget Breakdown</h2>
      <Pie data={chartData} />
    </div>
  );
};

export default ChartSection;
