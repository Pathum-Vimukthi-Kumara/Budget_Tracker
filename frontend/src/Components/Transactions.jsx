import React, { useState } from "react";
import "./Transactions.css";

const Transactions = ({ transactions, setTransactions }) => {
  const [formData, setFormData] = useState({ title: "", amount: "", type: "income" });
  const [error, setError] = useState("");

  const addTransaction = async (transaction) => {
    try {
      const response = await fetch("http://localhost:3011/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        const newTransaction = await response.json();
        setTransactions([newTransaction, ...transactions]);
      } else {
        console.error("Failed to add transaction");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || parseFloat(formData.amount) <= 0) {
      setError("Please provide a valid title and amount.");
      return;
    }

    addTransaction({ ...formData, amount: parseFloat(formData.amount) });
    setFormData({ title: "", amount: "", type: "income" });
    setError("");
  };

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>
      {error && <p className="error">{error}</p>}
      <ul className="transaction-list">
        {transactions.map((t) => (
          <li key={t.id} className={`transaction-item ${t.type}`}>
            <span>{t.title}</span>
            <span>${t.amount.toFixed(2)}</span>
            <span>{t.type}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
