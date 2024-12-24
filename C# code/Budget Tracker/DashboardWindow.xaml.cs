using System;
using System.Collections.ObjectModel;
using System.Linq; // Added for LINQ methods
using System.Windows;

namespace Budget_Tracker
{
    public partial class DashboardWindow : Window
    {
        // ObservableCollection to bind to the UI
        public ObservableCollection<Transaction> Transactions { get; set; }

        public DashboardWindow()
        {
            InitializeComponent();
            Transactions = new ObservableCollection<Transaction>();
            LoadTransactions(); // Load initial transactions
            DataContext = this; // Set data context for data binding
        }

        // Load initial transactions (Simulated - replace with database logic)
        private void LoadTransactions()
        {
            Transactions.Add(new Transaction { Id = 1, Date = "2024-10-19", Category = "Food - Breakfast", Type = "Expense", Amount = 200 });
            Transactions.Add(new Transaction { Id = 2, Date = "2024-10-19", Category = "Entertainment - Movie", Type = "Expense", Amount = 200 });
        }

        // Add a new transaction
        public void AddTransaction(string date, string category, string type, decimal amount)
        {
            var newTransaction = new Transaction
            {
                Id = Transactions.Count + 1, // Generate a new ID
                Date = date,
                Category = category,
                Type = type,
                Amount = amount
            };

            Transactions.Add(newTransaction);

            // Save to database logic here (if applicable)
        }

        // Update an existing transaction
        public void UpdateTransaction(int id, string category, decimal amount)
        {
            var transaction = Transactions.FirstOrDefault(t => t.Id == id);
            if (transaction != null)
            {
                transaction.Category = category;
                transaction.Amount = amount;

                // Update in database logic here (if applicable)
            }
        }

        // Remove a transaction
        public void RemoveTransaction(int id)
        {
            var transaction = Transactions.FirstOrDefault(t => t.Id == id);
            if (transaction != null)
            {
                Transactions.Remove(transaction);

                // Remove from database logic here (if applicable)
            }
        }

        // Event handler for text changes in DateTextBox (if needed)
        private void DateTextBox_TextChanged(object sender, System.Windows.Controls.TextChangedEventArgs e)
        {
            // Handle logic for DateTextBox text changes (if applicable)
        }
    }

    // Transaction class for data binding
    public class Transaction
    {
        public int Id { get; set; } // Unique identifier for each transaction
        public string Date { get; set; } // Date of the transaction
        public string Category { get; set; } // Category (e.g., Food, Entertainment)
        public string Type { get; set; } // Type (e.g., Income, Expense)
        public decimal Amount { get; set; } // Transaction amount
    }
}
