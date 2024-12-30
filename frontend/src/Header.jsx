import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MessageBox from "./MessageBox";
import "./Header.css"; // Update/replace with your own sidebar CSS

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState(""); 
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check login status based on token in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("token");
    setMessage("You have been logged out.");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      {/* Header Bar with Logo + Hamburger (optional) */}
      <header className="header-bar">
      <div className="header-left">
    {/* Put the menu button first */}
    <button className="hamburger" onClick={toggleMenu}>
      ☰
    </button>

    <img
      src={`${process.env.PUBLIC_URL}/onboard.png`}
      alt="logo"
      className="logo-image"
    />
    <h1 className="app-title">Budget Tracker</h1>
  </div>
      </header>

      {/* Sidebar / Drawer */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/overview" onClick={() => setMenuOpen(false)}>
                Overview
              </Link>
            </li>
            <li>
              <Link to="/transactions" onClick={() => setMenuOpen(false)}>
                Transactions
              </Link>
            </li>
            <li>
              <Link to="/scheduled-transactions" onClick={() => setMenuOpen(false)}>
                Scheduled Transactions
              </Link>
            </li>
            <li>
              <Link to="/accounts" onClick={() => setMenuOpen(false)}>
                Accounts
              </Link>
            </li>
            <li>
              <Link to="/credit-cards" onClick={() => setMenuOpen(false)}>
                Credit Cards
              </Link>
            </li>
            <li>
              <Link to="/budgets" onClick={() => setMenuOpen(false)}>
                Budgets
              </Link>
            </li>
            <li>
              <Link to="/debts" onClick={() => setMenuOpen(false)}>
                Debts
              </Link>
            </li>
            <li>
              <Link to="/charts" onClick={() => setMenuOpen(false)}>
                Charts
              </Link>
            </li>
            <li>
              <Link to="/categories" onClick={() => setMenuOpen(false)}>
                Categories
              </Link>
            </li>
            <li>
              <Link to="/time" onClick={() => setMenuOpen(false)}>
                Time
              </Link>
            </li>
            <li>
              <Link to="/time-future" onClick={() => setMenuOpen(false)}>
                Time (Future)
              </Link>
            </li>
            <li>
              <Link to="/forecasts" onClick={() => setMenuOpen(false)}>
                Forecasts
              </Link>
            </li>
            <li>
              <Link to="/calendar" onClick={() => setMenuOpen(false)}>
                Calendar
              </Link>
            </li>
            <li>
              <Link to="/import-export" onClick={() => setMenuOpen(false)}>
                Import/Export
              </Link>
            </li>
            <li>
              <Link to="/preferences" onClick={() => setMenuOpen(false)}>
                Preferences
              </Link>
            </li>
            {/* Only show the logout link if logged in */}
            {isLoggedIn && (
              <li>
                <Link
                  to="/login"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Optional main content area, if needed */}
      <main className="main-content">
        {/* Your main page content goes here */}
      </main>

      {/* Message Box */}
      <MessageBox message={message} onClose={() => setMessage("")} />
    </>
  );
};

export default Header;
