import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartSection = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        data: [income, expenses],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };

  useEffect(() => {
    // Cleanup previous charts when the component unmounts or updates
    return () => {
      const charts = Object.values(ChartJS.instances || {});
      charts.forEach((chart) => chart.destroy());
    };
  }, [transactions]);

  return (
    <div className="chart-section">
      <h2>Budget Breakdown</h2>
      <Pie data={data} />
    </div>
  );
};

export default ChartSection;
