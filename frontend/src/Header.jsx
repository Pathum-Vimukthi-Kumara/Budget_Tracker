import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import MessageBox from "./MessageBox";
import "./Header.css";

import {
  FaBars,
  FaTachometerAlt,
  FaExchangeAlt,
  FaChartPie,
  FaCalendarAlt,
  FaSignOutAlt,
  FaSignInAlt,
} from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token")); // Initialize based on localStorage
  const navigate = useNavigate();

  // Function to check login status
  const checkLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setMessage("You have been logged out.");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  const handleNavigation = (path) => {
    if (!isLoggedIn) {
      setMessage("You need to log in first.");
      navigate("/login");
    } else {
      navigate(path);
    }
    setMenuOpen(false);
  };

  // Listen for changes in localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      checkLoginStatus();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      {/* Fixed Header Bar */}
      <header className="header-bar">
        <div className="header-left">
          <button className="hamburger" onClick={toggleMenu}>
            <FaBars className="icon-hamburger" />
          </button>
          <img
            src={`${process.env.PUBLIC_URL}/budget.png`}
            alt="logo"
            className="logo-image"
          />
          <h1 className="app-title">Budget Tracker</h1>
        </div>

        {/* Only show the profile icon if logged in */}
        <div className="header-right">
          {isLoggedIn && (
            <Link to="/profile" className="profile-icon">
              👤
            </Link>
          )}
        </div>
      </header>

      {/* Sidebar for Navigation */}
      <aside className={`sidebar ${menuOpen ? "open" : ""}`}>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link
                to="/dashboard"
                onClick={() => handleNavigation("/dashboard")}
                className="nav-link"
              >
                <FaTachometerAlt className="nav-icon" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/transactions"
                onClick={() => handleNavigation("/transactions")}
                className="nav-link"
              >
                <FaExchangeAlt className="nav-icon" />
                <span>Transactions</span>
              </Link>
            </li>
            <li>
              <Link
                to="/charts"
                onClick={() => handleNavigation("/charts")}
                className="nav-link"
              >
                <FaChartPie className="nav-icon" />
                <span>Charts</span>
              </Link>
            </li>
            <li>
              <Link
                to="/calendar"
                onClick={() => handleNavigation("/calendar")}
                className="nav-link"
              >
                <FaCalendarAlt className="nav-icon" />
                <span>Calendar</span>
              </Link>
            </li>
            {isLoggedIn ? (
              <li>
                <Link
                  to="/login"
                  className="logout-button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLogout();
                  }}
                >
                  <FaSignOutAlt className="nav-icon" />
                  <span>Logout</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="login-button"
                  onClick={() => {
                    setMenuOpen(false);
                  }}
                >
                  <FaSignInAlt className="nav-icon" />
                  <span>Login</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </aside>

      {/* Message Box Component */}
      <MessageBox message={message} onClose={() => setMessage("")} />
    </>
  );
};

export default Header;
