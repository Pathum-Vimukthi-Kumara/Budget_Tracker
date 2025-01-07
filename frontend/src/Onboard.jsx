import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboard.css';

const Onboard = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="onboard-page"
      style={{
        width: '100vw',
        height: '100vh',
        backgroundImage: `url(${process.env.PUBLIC_URL + '/back3.webp'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed', 
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0',
        padding: '0',
        backdropFilter: 'blur(10px)', // Glassmorphic effect
        WebkitBackdropFilter: 'blur(18px)', // For Safari compatibility
        backgroundColor: 'rgba(255, 255, 255, 6)', // Semi-transparent white overlay
        borderRadius: '20px', // Optional for rounded edges
        boxShadow: '0 4px 6px rgba(0, 0, 0, 6)', // Soft shadow for depth
        border: '1px solid rgba(255, 255, 255, 6)' // Soft border for more glass effect
      }}
    >
      <div className="onboard-container">
        <img src={`${process.env.PUBLIC_URL}/onboard.png`} alt="logo" className="budget" />
        <h1>Welcome to Your Budget Tracker!</h1>
        <p className='para'>Welcome to your Budget Tracker! This personal finance companion is designed to simplify how you manage your money.</p>
        <p className="demo">Please sign up or log in to continue</p>
        <div className="button-container">
          <button onClick={() => navigate('/signup')} className="signup-button">
            Sign Up
          </button>
          <button onClick={() => navigate('/login')} className="login-button">
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboard;
