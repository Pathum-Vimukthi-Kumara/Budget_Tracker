const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
const Joi = require("joi"); // Validation library
require("dotenv").config();

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Create MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error("Could not connect to the database:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// JWT Secret Key

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Middleware to authenticate JWT




// **Validation Schemas**
const userSchema = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const budgetSchema = Joi.object({
  budget: Joi.number().positive().required(),
});

const transactionSchema = Joi.object({
  date: Joi.date().required(),
  category: Joi.string().min(2).max(50).required(),
  amount: Joi.number().positive().required(),
});

// **Routes**

// Register Route
app.post("/register", async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("Error checking user existence:", err);
      return res.status(500).json({ message: "Internal server error." });
    }
    if (results.length > 0) {
      return res.status(400).json({ message: "Email is already in use." });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);
    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err) => {
        if (err) {
          console.error("Error inserting user:", err);
          return res.status(500).json({ message: "Error registering user." });
        }
        res.status(201).json({ message: "User registered successfully!" });
      }
    );
  });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Validate input fields
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  // Check if the user exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(400).json({ message: 'User not found' });
    }

    const user = results[0];

    // Compare password with hashed password in DB
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, {
      expiresIn: '1h',
    });

    return res.json({ message: 'Login successful', token });
  });
});

// Protect routes using JWT middleware (for example, to view user profile)
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(403).json({ message: 'Access denied, token missing.' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};


// Update Budget
// Update Budget
app.put("/api/budget", authenticateJWT, (req, res) => {
  const { error } = budgetSchema.validate(req.body); // Validate incoming data
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { budget } = req.body;
  const userId = req.user.id;

  // Use transactions to ensure data consistency
  db.beginTransaction((transactionErr) => {
    if (transactionErr) {
      console.error("Error starting transaction:", transactionErr);
      return res.status(500).json({ error: "Internal server error." });
    }

    // Insert or update budget
    db.query(
      "INSERT INTO budget (user_id, budget_amount) VALUES (?, ?) ON DUPLICATE KEY UPDATE budget_amount = budget_amount + ?, updated_at = NOW()",
      [userId, budget, budget],
      (err) => {
        if (err) {
          console.error("Error updating budget:", err);
          db.rollback(); // Rollback in case of error
          return res.status(500).json({ error: "Internal server error." });
        }

        db.commit((commitErr) => {
          if (commitErr) {
            console.error("Error committing transaction:", commitErr);
            return res.status(500).json({ error: "Internal server error." });
          }
          res.json({ message: "Budget updated successfully." });
        });
      }
    );
  });
});

// Get Transactions
app.get("/api/transactions", authenticateJWT, (req, res) => {
  const userId = req.user.id;
  db.query(
    "SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC",
    [userId],
    (err, results) => {
      if (err) {
        console.error("Error fetching transactions:", err);
        return res.status(500).json({ error: "Internal server error." });
      }
      res.json(results);
    }
  );
});


// Add Transaction
app.post("/api/transactions", authenticateJWT, (req, res) => {
  const { error } = transactionSchema.validate(req.body); // Validate request body
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { date, category, amount } = req.body;
  const userId = req.user.id;

  // Use transactions for data integrity
  db.beginTransaction((err) => {
    if (err) {
      console.error("Transaction start failed:", err);
      return res.status(500).json({ error: "Internal server error." });
    }
  
    db.query(
      "INSERT INTO transactions (user_id, date, category, amount) VALUES (?, ?, ?, ?)",
      [userId, date, category, amount],
      (err, results) => {
        if (err) {
          console.error("Error adding transaction:", err);
          db.rollback(); // Rollback on failure
          return res.status(500).json({ error: "Internal server error." });
        }
  
        db.commit((commitErr) => {
          if (commitErr) {
            console.error("Error committing transaction:", commitErr);
            return res.status(500).json({ error: "Internal server error." });
          }
          res.status(201).json({
            id: results.insertId,
            date,
            category,
            amount,
          });
        });
      }
    );
  });  
});

// Delete Transaction
app.delete("/api/transactions/:id", authenticateJWT, (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  db.query(
    "DELETE FROM transactions WHERE id = ? AND user_id = ?",
    [id, userId],
    (err, results) => {
      if (err) {
        console.error("Error deleting transaction:", err);
        return res.status(500).json({ error: "Internal server error." });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "Transaction not found or not authorized." });
      }

      res.json({ message: "Transaction deleted successfully." });
    }
  );
});


// Start Server
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
