const mysql = require('mysql2');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Default MySQL username
  password: '', // Default MySQL password
  database: 'test' // Ensure the database already exists
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL server:', err);
    return;
  }
  console.log('Connected to MySQL server.');

  // Create the transactions_and_budget table
  const createTransactionsAndBudgetTable = `
    CREATE TABLE IF NOT EXISTS transactions_and_budget (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      type ENUM('budget', 'transaction') NOT NULL,
      date DATE DEFAULT NULL,
      category VARCHAR(255) DEFAULT NULL,
      amount DECIMAL(10, 2) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  connection.query(createTransactionsAndBudgetTable, (err, result) => {
    if (err) {
      console.error('Error creating transactions_and_budget table:', err);
      return;
    }
    console.log('Transactions and Budget table created or already exists.');

    // Insert default budget if not exists
    const insertDefaultBudget = `
      INSERT INTO transactions_and_budget (type, user_id, amount)
      SELECT 'budget', 1, 9000
      WHERE NOT EXISTS (
        SELECT 1 FROM transactions_and_budget WHERE type = 'budget' AND user_id = 1
      );
    `;

    connection.query(insertDefaultBudget, (err, result) => {
      if (err) {
        console.error('Error inserting default budget:', err);
        return;
      }
      console.log('Default budget inserted or already exists.');
      connection.end();
    });
  });
});
