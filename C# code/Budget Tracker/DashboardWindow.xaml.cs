using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Media;
using Microsoft.Data.Sqlite;

namespace Budget_Tracker
{
    public partial class DashboardWindow : Window
    {
        public DashboardWindow()
        {
            InitializeComponent();
        }
    

        private void DashboardButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Dashboard button clicked!", "Dashboard", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void TransactionButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("Transaction button clicked!", "Transaction", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void SettingButton_Click(object sender, RoutedEventArgs e)
        {
            MessageBox.Show("LogOut button clicked!", "LogOut", MessageBoxButton.OK, MessageBoxImage.Information);
        }

        private void AddTransaction_Click(object sender, RoutedEventArgs e)
        {
            string title = TitleTextBox.Text;
            string amountText = AmountTextBox.Text;
            DateTime? selectedDate = TransactionDatePicker.SelectedDate;
            string type = (TypeComboBox.SelectedItem as ComboBoxItem)?.Content.ToString();

            if (string.IsNullOrWhiteSpace(title) || string.IsNullOrWhiteSpace(amountText) || !selectedDate.HasValue || string.IsNullOrWhiteSpace(type))
            {
                MessageBox.Show("Please fill in all fields.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            if (!decimal.TryParse(amountText, out decimal amount))
            {
                MessageBox.Show("Please enter a valid amount.", "Validation Error", MessageBoxButton.OK, MessageBoxImage.Warning);
                return;
            }

            try
            {
                InsertTransaction(title, amount, selectedDate.Value, type);
                MessageBox.Show("Transaction added successfully.", "Success", MessageBoxButton.OK, MessageBoxImage.Information);
                ClearTransactionForm();
                LoadTransactions();
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error adding transaction: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void InsertTransaction(string title, decimal amount, DateTime date, string type)
        {
            string connectionString = "Data Source=C:\\Users\\hp\\Documents\\Budget Tracker\\Budget_Tracker\\C# code\\Budget Tracker\\Transaction.db;";

            string query = @"
                INSERT INTO Transactions (Title, Amount, Date, Type) 
                VALUES (@Title, @Amount, @Date, @Type);";

            using (SqliteConnection connection = new SqliteConnection(connectionString))
            {
                connection.Open();

                using (SqliteCommand command = new SqliteCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Title", title);
                    command.Parameters.AddWithValue("@Amount", amount);
                    command.Parameters.AddWithValue("@Date", date.ToString("yyyy-MM-dd"));
                    command.Parameters.AddWithValue("@Type", type);

                    command.ExecuteNonQuery();
                }
            }
        }

        private void LoadTransactions()
        {
            // Method to load transactions from the database
            string connectionString = "Data Source=C:\\Users\\hp\\Documents\\Budget Tracker\\Budget_Tracker\\C# code\\Budget Tracker\\Transaction.db;";
            string query = "SELECT Title, Amount, Date, Type FROM Transactions";

            try
            {
                using (SqliteConnection connection = new SqliteConnection(connectionString))
                {
                    connection.Open();

                    using (SqliteCommand command = new SqliteCommand(query, connection))
                    using (SqliteDataReader reader = command.ExecuteReader())
                    {
                        TransactionsList.Items.Clear(); // Assuming TransactionsList is your ItemsControl name

                        while (reader.Read())
                        {
                            string title = reader.GetString(0);
                            decimal amount = reader.GetDecimal(1);
                            DateTime date = DateTime.Parse(reader.GetString(2));
                            string type = reader.GetString(3);

                            // Add to your ItemsControl (e.g., TransactionsList)
                            TransactionsList.Items.Add(new
                            {
                                Title = title,
                                Amount = amount,
                                Date = date.ToString("yyyy-MM-dd"),
                                Type = type
                            });
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Error loading transactions: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        private void ClearTransactionForm()
        {
            TitleTextBox.Text = string.Empty;
            AmountTextBox.Text = string.Empty;
            TransactionDatePicker.SelectedDate = null;
            TypeComboBox.SelectedItem = null;
        }

        private void TextBox_GotFocus(object sender, RoutedEventArgs e)
        {
            var textBox = sender as TextBox;
            if (textBox != null && (string)textBox.Tag == "Placeholder")
            {
                textBox.Text = "";
                textBox.Foreground = Brushes.White; // Set to normal text color
                textBox.Tag = null; // Clear the placeholder tag
            }
        }

        private void TextBox_LostFocus(object sender, RoutedEventArgs e)
        {
            var textBox = sender as TextBox;
            if (textBox != null && string.IsNullOrWhiteSpace(textBox.Text))
            {
                textBox.Text = "Enter " + textBox.Name.Replace("TextBox", ""); // Placeholder text
                textBox.Foreground = Brushes.Gray; // Placeholder color
                textBox.Tag = "Placeholder"; // Mark as placeholder
            }
        }
    }
}
