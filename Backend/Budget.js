const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// JWT secret key
const JWT_SECRET = "your-secret-key";

// Middleware for JWT authentication
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied, token missing." });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token." });
    req.user = user;
    next();
  });
};

// API routes
app.get("/api/budget", authenticateJWT, (req, res) => {
  const query = "SELECT amount FROM transactions_and_budget WHERE type = 'budget' ORDER BY id DESC LIMIT 1";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ message: "Error retrieving budget" });
    res.json({ budget: results[0]?.amount || 0 });
  });
});

app.put("/api/budget", authenticateJWT, (req, res) => {
  const { budget } = req.body;
  const query = "INSERT INTO transactions_and_budget (type, user_id, amount) VALUES ('budget', ?, ?)";
  db.query(query, [req.user.id, budget], (err) => {
    if (err) return res.status(500).json({ message: "Error updating budget" });
    res.status(200).json({ message: "Budget updated successfully", budget });
  });
});

app.get("/api/transactions", authenticateJWT, (req, res) => {
  const query = "SELECT * FROM transactions_and_budget WHERE type = 'transaction' AND user_id = ?";
  db.query(query, [req.user.id], (err, results) => {
    if (err) return res.status(500).json({ message: "Error retrieving transactions" });
    res.json(results);
  });
});

app.post("/api/transactions", authenticateJWT, (req, res) => {
  const { date, category, amount } = req.body;
  const query =
    "INSERT INTO transactions_and_budget (type, user_id, date, category, amount) VALUES ('transaction', ?, ?, ?, ?)";
  db.query(query, [req.user.id, date, category, amount], (err, results) => {
    if (err) return res.status(500).json({ message: "Error adding transaction" });
    res.status(201).json({ id: results.insertId, date, category, amount });
  });
});

app.delete("/api/transactions/:id", authenticateJWT, (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM transactions_and_budget WHERE id = ? AND user_id = ?";
  db.query(query, [id, req.user.id], (err) => {
    if (err) return res.status(500).json({ message: "Error deleting transaction" });
    res.status(200).json({ message: "Transaction deleted successfully" });
  });
});

const PORT = 3010;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
