import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FCF", "#FF6361"];

// Base URL for the backend
axios.defaults.baseURL = "http://localhost:3011";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("token")}`;

const Dashboard = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch budget
        const budgetResponse = await axios.get("/api/budget");
        setBudget(budgetResponse.data.budget);

        // Fetch transactions
        const transactionsResponse = await axios.get("/api/transactions");
        setTransactions(transactionsResponse.data);
        calculateExpenses(transactionsResponse.data);
        generatePieData(transactionsResponse.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  // Calculate total expenses
  const calculateExpenses = (transactions) => {
    const total = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setExpenses(total);
  };

  // Generate data for the pie chart
  const generatePieData = (transactions) => {
    const categoryTotals = transactions.reduce((acc, transaction) => {
      acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
      return acc;
    }, {});

    const pieDataArray = Object.entries(categoryTotals).map(([name, value]) => ({
      name,
      value,
    }));
    setPieData(pieDataArray);
  };

  // Handle budget update
  const handleBudgetChange = () => {
    const newBudget = parseInt(prompt("Enter new budget:"), 10);
    if (!isNaN(newBudget) && newBudget > 0) {
      axios
        .put("/api/budget", { budget: newBudget })
        .then(() => {
          setBudget(newBudget);
        })
        .catch((err) => console.error("Error updating budget:", err));
    } else {
      alert("Invalid budget value!");
    }
  };

  // Add a new transaction
  const handleAddTransaction = () => {
    const date = prompt("Enter date (YYYY-MM-DD):", new Date().toISOString().split("T")[0]);
    const category = prompt("Enter category (e.g., Food, Shopping):");
    const amount = parseFloat(prompt("Enter amount:"));

    if (date && category && !isNaN(amount) && amount > 0) {
      const newTransaction = { date, category, amount };

      axios
        .post("/api/transactions", newTransaction)
        .then((response) => {
          const updatedTransactions = [...transactions, response.data];
          setTransactions(updatedTransactions);
          calculateExpenses(updatedTransactions);
          generatePieData(updatedTransactions);
        })
        .catch((err) => console.error("Error adding transaction:", err));
    } else {
      alert("Invalid input for transaction.");
    }
  };

  // Delete a transaction
  const handleDeleteTransaction = (id) => {
    axios
      .delete(`/api/transactions/${id}`)
      .then(() => {
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
        setTransactions(updatedTransactions);
        calculateExpenses(updatedTransactions);
        generatePieData(updatedTransactions);
      })
      .catch((err) => console.error("Error deleting transaction:", err));
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="summary">
          <h1>Expenso</h1>
          <div className="card expenses">
            <p>Expenses</p>
            <h2>Rs. {expenses}</h2>
            <p>{transactions.length} transactions</p>
          </div>
          <div className="card budget">
            <p>Budget</p>
            <h2>Rs. {budget - expenses}</h2>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(expenses / budget) * 100}%` }}
              ></div>
            </div>
            <button onClick={handleBudgetChange}>Edit Budget</button>
          </div>
        </div>
      </div>

      <div className="main-content">
        <div className="chart-container">
          <h2>Monthly Expenses</h2>
          <BarChart width={600} height={300} data={transactions}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="amount" fill="#8884d8" />
          </BarChart>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </div>

        <div className="transactions">
          <h2>Transactions</h2>
          <button onClick={handleAddTransaction}>Add Transaction</button>
          <ul>
            {transactions.map((transaction) => (
              <li key={transaction.id} className="transaction-item">
                {transaction.date} - {transaction.category} - Rs. {transaction.amount}
                <button
                  onClick={() => handleDeleteTransaction(transaction.id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
