import React from "react";
import "./MessageBox.css";

const MessageBox = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="onborad"
    style={{
      width: '100vw',
      height: '100vh',
      backgroundColor:'#EBF5FB',
      backgroundSize: 'cover',
     
    }}
      >
  
 
    <div className="message-box">
      <div className="message-box-content">
        <p>{message}</p>
        <button onClick={onClose} className="close-button">
          Close
        </button>
      </div>
    </div>
    </div>
  );
};

export default MessageBox;
