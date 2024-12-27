import React from "react";

// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Onboard from "./Onboard";
import Header from "./Header";
import TransactionsTable from "./TransactionsTable";
import "./Dashboard.css";
import "./Header.css";
import "./TransactionsTable.css";




const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <main>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/transactions" element={<TransactionsTable />} />
          <Route path="/" element={<Onboard />} />
        </Routes>
        </main>
       
      </Router>
    </div>
  );
};

// A wrapper for the Header to conditionally render it

export default App;
