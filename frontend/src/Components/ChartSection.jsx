import React, { useEffect, useState } from "react";
import { Pie, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import "./ChartSection.css";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const ChartSection = () => {
  const [transactions, setTransactions] = useState([]);
  const [overallChartData, setOverallChartData] = useState({
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [0, 0],
        backgroundColor: ["#ffffff", "#ffffff"],
      },
    ],
  });
  const [dailyExpenseChartData, setDailyExpenseChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Daily Expenses",
        data: [],
        borderColor: "#DC143C",
        backgroundColor: "rgba(220, 20, 60, 0.2)", 
        tension: 0.3,
        fill: true,
      },
    ],
  });
  const [dailyIncomeChartData, setDailyIncomeChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Daily Income",
        data: [],
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76, 175, 80, 0.2)", 
        tension: 0.3,
        fill: true,
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

    
    setOverallChartData({
      labels: ["Income", "Expenses"],
      datasets: [
        {
          data: [income, expenses],
          backgroundColor: ["#22c703", "#DC143C"],
        },
      ],
    });

 
    const dailyExpensesMap = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        const date = new Date(t.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + parseFloat(t.amount);
        return acc;
      }, {});
    const dailyExpenseLabels = Object.keys(dailyExpensesMap).sort();
    const dailyExpenseData = dailyExpenseLabels.map((date) => dailyExpensesMap[date]);

    setDailyExpenseChartData({
      labels: dailyExpenseLabels,
      datasets: [
        {
          label: "Daily Expenses",
          data: dailyExpenseData,
          borderColor: "#DC143C",
          backgroundColor: "rgba(220, 20, 60, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    });

   
    const dailyIncomeMap = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => {
        const date = new Date(t.date).toLocaleDateString();
        acc[date] = (acc[date] || 0) + parseFloat(t.amount);
        return acc;
      }, {});
    const dailyIncomeLabels = Object.keys(dailyIncomeMap).sort();
    const dailyIncomeData = dailyIncomeLabels.map((date) => dailyIncomeMap[date]);

    setDailyIncomeChartData({
      labels: dailyIncomeLabels,
      datasets: [
        {
          label: "Daily Income",
          data: dailyIncomeData,
          borderColor: "#4CAF50",
          backgroundColor: "rgba(76, 175, 80, 0.2)",
          tension: 0.3,
          fill: true,
        },
      ],
    });
  }, [transactions]);


  const commonLineOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "black",
        },
      },
    },
    scales: {
      x: {
        ticks: { color: "black" },
        grid: { color: "rgba(0,0,0,0.1)" },
      },
      y: {
        ticks: { color: "black" },
        grid: { color: "rgba(0,0,0,0.1)" },
      },
    },
  };

  return (
    
    <div className="chart-section">
      <h2>Budget Analysis</h2>

      <div className="chart-container">
      
        <div className="chart-card">
          <h3>Overall Budget Breakdown</h3>
          <Pie
            data={overallChartData}
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: "black",
                  },
                },
              },
            }}
          />
        </div>
      
        <div className="chart-card">
          <h3>Daily Expenses</h3>
          <Line data={dailyExpenseChartData} options={commonLineOptions} />
        </div>

       
        <div className="chart-card">
          <h3>Daily Income</h3>
          <Line data={dailyIncomeChartData} options={commonLineOptions} />
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
