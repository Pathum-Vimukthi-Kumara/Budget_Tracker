const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet()); // Add security headers

// Create MySQL connection
const db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'',
  database:'test',
});

// Connect to MySQL database
db.connect((err) => {
  if (err) {
    console.error('Could not connect to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

// JWT Secret Key
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// Register Route (Sign Up)
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields (name, email, password) are required.' });
  }

  // Check if the email already exists
  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (results.length > 0) {
      return res.status(400).json({ message: 'Email is already in use.' });
    }

    // Hash password before saving to DB
    const hashedPassword = bcrypt.hashSync(password, 8);

    // Insert new user into the database
    db.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword],
      (err, results) => {
        if (err) {
          console.error('Error inserting user:', err);
          return res.status(500).json({ message: 'Error registering user' });
        }
        return res.status(201).json({ message: 'User registered successfully!' });
      }
    );
  });
});

// Login Route
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


// 1. Get Budget
app.get("/api/budget", authenticateJWT, (req, res) => {
  const query = "SELECT amount FROM transactions_and_budget WHERE type = 'budget' ORDER BY id DESC LIMIT 1";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching budget:", err);
      return res.status(500).json({ message: "Error retrieving budget" });
    }
    res.json({ budget: results[0]?.amount || 0 });
  });
});

// 2. Update Budget
app.put("/api/budget", authenticateJWT, (req, res) => {
  const { budget } = req.body;
  if (budget === undefined || budget < 0) {
    return res.status(400).json({ message: "Please provide a valid budget!" });
  }

  const query = "INSERT INTO transactions_and_budget (type, user_id, amount) VALUES ('budget', ?, ?)";
  db.query(query, [req.user.id, budget], (err) => {
    if (err) {
      console.error("Error updating budget:", err);
      return res.status(500).json({ message: "Error updating budget" });
    }
    res.status(200).json({ message: "Budget updated successfully!", budget });
  });
});

// 3. Get Transactions
app.get("/api/transactions", authenticateJWT, (req, res) => {
  const query = "SELECT id, date, category, amount FROM transactions_and_budget WHERE type = 'transaction' AND user_id = ?";
  db.query(query, [req.user.id], (err, results) => {
    if (err) {
      console.error("Error fetching transactions:", err);
      return res.status(500).json({ message: "Error retrieving transactions" });
    }
    res.json(results);
  });
});

// 4. Add Transaction
app.post("/api/transactions", authenticateJWT, (req, res) => {
  const { date, category, amount } = req.body;
  if (!date || !category || !amount) {
    return res.status(400).json({ message: "Please fill in all fields!" });
  }

  const query = "INSERT INTO transactions_and_budget (type, user_id, date, category, amount) VALUES ('transaction', ?, ?, ?, ?)";
  db.query(query, [req.user.id, date, category, amount], (err, results) => {
    if (err) {
      console.error("Error adding transaction:", err);
      return res.status(500).json({ message: "Error adding transaction" });
    }
    res.status(201).json({ message: "Transaction added successfully!", transactionId: results.insertId });
  });
});

// 5. Delete Transaction
app.delete("/api/transactions/:id", authenticateJWT, (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM transactions_and_budget WHERE id = ? AND user_id = ?";
  db.query(query, [id, req.user.id], (err) => {
    if (err) {
      console.error("Error deleting transaction:", err);
      return res.status(500).json({ message: "Error deleting transaction" });
    }
    res.status(200).json({ message: "Transaction deleted successfully!" });
  });
});


const PORT = process.env.PORT || 3011;




const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please choose a different port.`);
  } else {
    console.error('Server error:', err);
  }
});
