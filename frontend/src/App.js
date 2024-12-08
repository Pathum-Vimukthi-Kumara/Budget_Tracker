import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import Login from './Login';
import './Login.css';  
import SignUp from './SignUp'; 
import './SignUp.css'
import Dashboard from './Dashboard'; 
import './Dashboard.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
