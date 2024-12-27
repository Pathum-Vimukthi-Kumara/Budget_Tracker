import React, { useState, useEffect, useCallback } from "react";
import "./Transactions.css";
import { FaTrash, FaSearch, FaEdit } from "react-icons/fa";

const Transactions = () => {
  const [formData, setFormData] = useState({ title: "", amount: "", type: "income", date: "" });
  const [editFormData, setEditFormData] = useState(null);
  const [error, setError] = useState("");
  const [apiError, setApiError] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const calculateTotals = useCallback(() => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);

    setTotalIncome(income);
    setTotalExpense(expense);
    setBalance(income - expense);
  }, [transactions]);

  useEffect(() => {
    calculateTotals();
  }, [transactions, calculateTotals]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3011/api/v1/transactions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data)) {
          setTransactions(data);
        } else {
          console.error("Expected an array but got:", data);
          setTransactions([]);
          setApiError("Invalid API response format.");
        }
      } else {
        const error = await response.json();
        setApiError(error.message || "Failed to fetch transactions");
      }
    } catch (error) {
      setApiError("An unexpected error occurred while fetching transactions.");
    }
  };

  const addTransaction = async (transaction) => {
    try {
      const response = await fetch("http://localhost:3011/api/v1/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(transaction),
      });

      if (response.ok) {
        await fetchTransactions();
      } else {
        const error = await response.json();
        setApiError(error.message || "Failed to add transaction");
      }
    } catch (error) {
      setApiError("An unexpected error occurred while adding the transaction.");
    }
  };

  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`http://localhost:3011/api/v1/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        await fetchTransactions();
      } else {
        const error = await response.json();
        setApiError(error.message || "Failed to delete transaction");
      }
    } catch (error) {
      setApiError("An unexpected error occurred while deleting the transaction.");
    }
  };

  const updateTransaction = async (id, updatedTransaction) => {
    try {
      const response = await fetch(`http://localhost:3011/api/v1/transactions/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedTransaction),
      });

      if (response.ok) {
        await fetchTransactions();
        setEditFormData(null);
      } else {
        const error = await response.json();
        setApiError(error.message || "Failed to update transaction");
      }
    } catch (error) {
      setApiError("An unexpected error occurred while updating the transaction.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.amount || parseFloat(formData.amount) <= 0 || !formData.date) {
      setError("Please provide a valid title, amount, and date.");
      return;
    }

    addTransaction({ ...formData, amount: parseFloat(formData.amount) });
    setFormData({ title: "", amount: "", type: "income", date: "" });
    setError("");
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!editFormData.title || !editFormData.amount || parseFloat(editFormData.amount) <= 0 || !editFormData.date) {
      setError("Please provide a valid title, amount, and date.");
      return;
    }

    updateTransaction(editFormData.id, { ...editFormData, amount: parseFloat(editFormData.amount) });
  };

  const filteredTransactions = Array.isArray(transactions)
    ? transactions.filter((t) => t.title?.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="transactions">
      <h2>Transactions</h2>

      {apiError && <p className="error">{apiError}</p>}

      <div className="summary">
        <div className="summary-box income">
          <h3>Total Income</h3>
          <p>Rs.{totalIncome.toFixed(2)}</p>
        </div>
        <div className="summary-box expense">
          <h3>Total Expense</h3>
          <p>Rs.{totalExpense.toFixed(2)}</p>
        </div>
        <div className="summary-box balance">
          <h3>Balance</h3>
          <p>Rs.{balance.toFixed(2)}</p>
        </div>
      </div>

      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {editFormData ? (
        <form onSubmit={handleEditSubmit} className="transaction-form">
          <input
            type="text"
            placeholder="Title"
            value={editFormData.title}
            onChange={(e) => setEditFormData({ ...editFormData, title: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            value={editFormData.amount}
            onChange={(e) => setEditFormData({ ...editFormData, amount: e.target.value })}
          />
          <input
            type="date"
            value={editFormData.date}
            onChange={(e) => setEditFormData({ ...editFormData, date: e.target.value })}
          />
          <select
            value={editFormData.type}
            onChange={(e) => setEditFormData({ ...editFormData, type: e.target.value })}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          <button type="submit">Update Transaction</button>
          <button onClick={() => setEditFormData(null)}>Cancel</button>
        </form>
      ) : (
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
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
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
      )}

      {error && <p className="error">{error}</p>}

      <div className="transaction-list">
        {filteredTransactions.map((t) => (
          <div key={t.id} className={`transaction-item ${t.type}`}>
            <div className="transaction-details">
              <span className="transaction-title">{t.title}</span>
              <span className="transaction-date">{t.date}</span>
              <span className="transaction-amount">Rs.{t.amount}</span>
            </div>
            <div className="transaction-actions">
              <button onClick={() => deleteTransaction(t.id)}>
                <FaTrash />
              </button>
              <button onClick={() => setEditFormData(t)}>
                <FaEdit />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
