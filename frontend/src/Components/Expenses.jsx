import React from "react";
import "./Expenses.css";

const Expenses = ({ budget }) => {
  return (
    <div className="expenses">
      <h2>Expenses</h2>
      <p>Total Expenses: ${budget.expenses}</p>
    </div>
  );
};

export default Expenses;
