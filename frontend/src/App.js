import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";
import Onboard from "./Onboard";
import Header from "./Header";
import TransactionsTable from "./TransactionsTable";
import Calendar from "./Calendar";  // <-- Import your new Calendar component

import "./Dashboard.css";
import "./Header.css";
import "./TransactionsTable.css";
// import "./Calendar.css"; // If you created a separate CSS for the calendar, import it here

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
            <Route path="/calendar" element={<Calendar />} />  {/* New route */}
            <Route path="/" element={<Onboard />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
};

export default App;
