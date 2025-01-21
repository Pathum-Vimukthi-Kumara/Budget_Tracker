import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Onboard.css';

const Onboard = () => {
  const navigate = useNavigate();

  return (
    <div className='onboard-bg'

    style={{
      width: '100vw',
      height: '100vh',
      marginTop: '50px',
      backgroundColor: '#fefefe',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
      backgroundImage: `url(${process.env.PUBLIC_URL + '/background.jpg'})`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%) scale(1)', // Default scale
      transition: 'transform 0.5s ease', // Smooth transition
    }}
  
    
  
  >

  
    <div className="onboard">
      <div className="onboard-page">
        <div className="content-side">
          <div className="glass-overlay">
            <h1 className='welcome'>Welcome to Your Budget Tracker!</h1>
            <p className="para">
              Get an overview of your finances at a glance—track budgets,
              view transactions, and see easy-to-read graphs to stay in control.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="get-started-button"
            >
              Get Started
            </button>
          </div>
        </div>
      
        
      
      </div>
    </div>
    </div>
  );
};

export default Onboard;
