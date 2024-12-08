const express = require('express');
// This is where 'app' is defined

const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();

// Create Express app
const app = express();
app.use(express.json());
app.use(cors());

// Create MySQL connection
const db = mysql.createConnection({
  host: 'localhost',   // Update if needed
  user: 'root',        // MySQL user
  password:'', // MySQL password
  database:'test', // Database name
  
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

// Example protected route: Get user profile (requires valid JWT token)
app.get('/profile', authenticateJWT, (req, res) => {
  res.json({ message: 'Profile info', user: req.user });
});


const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle errors explicitly
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please choose a different port.`);
  } else {
    console.error('Server error:', err);
  }
});
