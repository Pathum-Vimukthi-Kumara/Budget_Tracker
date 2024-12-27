import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboard.css';

const Onboard = () => {
  const navigate = useNavigate();

  return (
    <div className="onboard-container">
      <h1>Welcome to Your Budget Tracker!</h1>
      <p>Welcome to your Budget Tracker! This personal finance companion is designed to simplify how you manage your money. Whether you're saving for a special occasion, paying off debt, or just looking to understand your spending habits better, our tool is here to help. Let’s take this journey to financial wellness together!</p>
      <p>Please sign up or log in to continue</p>
      <div className="button-container">
        <button onClick={() => navigate('/signup')} className="signup-button">
          Sign Up
        </button>
        <button onClick={() => navigate('/login')} className="login-button">
          Login
        </button>
      </div>
    </div>
  );
};

export default Onboard;
