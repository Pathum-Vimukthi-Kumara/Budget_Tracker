import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MessageBox from "./MessageBox";
import "./Header.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState(""); // State for message box
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State for login status
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status based on token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("You must be logged in to access this page."); // Show message box
      navigate("/login"); // Redirect to login page if not authenticated
      return;
    }

    setMenuOpen(false); // Close the dropdown menu
    navigate(path); // Navigate to the requested path
  };

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("token");
    setMessage("You have been logged out."); // Show message box
    setIsLoggedIn(false); // Update login status
    setMenuOpen(false); // Close the dropdown menu
    navigate("/login");
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          {/* Hamburger Menu for Mobile */}
          <button className="menu-button" onClick={toggleMenu}>
            ☰
          </button>
          <h1 id="logo">Budget Tracker</h1>
        </div>

        {/* Dropdown Navigation Menu */}
        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <ul className="btn">
            <li>
              <button onClick={() => handleNavigation("/profile")}>Dashboard</button>
            </li>
            <li>
              <button onClick={() => handleNavigation("/transactions")}>Transactions</button>
            </li>
            <li>
              <button onClick={() => handleNavigation("#settings")}>Settings</button>
            </li>
            {/* Show Logout Button Only If Logged In */}
            {isLoggedIn && (
              <li>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </header>

      {/* Message Box */}
      <MessageBox message={message} onClose={() => setMessage("")} />
    </>
  );
};

export default Header;
