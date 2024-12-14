import React from "react";
import "./BudgetCard.css";

const BudgetCard = ({ budget }) => {
  return (
    <div className="budget-card">
      <h2>Budget Summary</h2>
      <p>Total Income: ${budget.income}</p>
      <p>Total Expenses: ${budget.expenses}</p>
      <p>Balance: ${budget.income - budget.expenses}</p>
    </div>
  );
};

export default BudgetCard;
