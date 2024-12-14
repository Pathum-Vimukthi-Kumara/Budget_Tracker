import React, { useState } from "react";
import "./Transactions.css";

const Transactions = ({ transactions, addTransaction }) => {
  const [formData, setFormData] = useState({ title: "", amount: "", type: "income" });
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.title || !formData.amount || parseFloat(formData.amount) <= 0) {
      setError("Please provide a valid title and amount.");
      return;
    }

    // Add transaction
    addTransaction({ ...formData, amount: parseFloat(formData.amount) });
    setFormData({ title: "", amount: "", type: "income" });
    setError(""); // Clear any previous errors
  };

  return (
    <div className="transaction">
      <h2>Transactions</h2>
      <form onSubmit={handleSubmit} className="transaction-form">
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          aria-label="Transaction Title"
        />
        <input
          type="number"
          placeholder="Amount"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          aria-label="Transaction Amount"
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          aria-label="Transaction Type"
        >
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <button type="submit">Add Transaction</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <ul className="transaction-list">
        {transactions.map((t) => (
          <li key={t.id} className={`transaction-item ${t.type}`}>
            <span className="transaction-title">{t.title}</span>
            <span className="transaction-amount">${t.amount.toFixed(2)}</span>
            <span className="transaction-type">({t.type})</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Transactions;
