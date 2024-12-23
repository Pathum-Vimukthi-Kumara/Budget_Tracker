import React, { useState, useEffect } from "react";
import axios from "axios";
import Transaction from "./Components/Transactions";
import "./Components/Transactions.css";
import ChartSection from "./Components/ChartSection";
import BudgetCard from "./Components/BudgetCard";
import Expenses from "./Components/Expenses";
import "./Dashboard.css";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState({ income: 0, expenses: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const transactionsData = await axios.get("http://localhost:3011/transactions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const budgetData = await axios.get("http://localhost:3011/api/budget", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTransactions(transactionsData.data);
      setBudget(budgetData.data);
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post("http://localhost:3011/transactions", transaction, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Transaction added:", response.data); // Log the response
      setTransactions((prev) => [...prev, response.data]); // Update state
      updateBudget(transaction);
    } catch (error) {
      console.error("Error adding transaction:", error.response ? error.response.data : error.message);
    }
  };
  

  const updateBudget = async (transaction) => {
    try {
      const token = localStorage.getItem("token");
      const newBudget = { ...budget };
      if (transaction.type === "income") {
        newBudget.income += transaction.amount;
      } else {
        newBudget.expenses += transaction.amount;
      }
      await axios.put("http://localhost:3011/api/budget", newBudget, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBudget(newBudget);
    } catch (error) {
      console.error("Error updating budget:", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="dashboard">
      <BudgetCard budget={budget} />
      <Expenses budget={budget} />
      <ChartSection transactions={transactions} />
      <Transaction transactions={transactions} addTransaction={addTransaction} />
    </div>
  );
};

export default Dashboard;
