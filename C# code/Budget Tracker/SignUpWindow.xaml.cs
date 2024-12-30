using Microsoft.Data.Sqlite;
using System;
using System.Data.SqlClient;
using SQLitePCL;
using System.Windows;

namespace Budget_Tracker
{
    public partial class SignUpWindow : Window
    {
        public SignUpWindow()
        {
            InitializeComponent();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show();
            this.Close();
        }

        private void SignUpButton_Click(object sender, RoutedEventArgs e)
        {
            string username = UsernameTextBox.Text;
            string email = EmailTextBox.Text;
            string password = PasswordBox.Password;
            string confirmPassword = ConfirmPasswordBox.Password;

            if (string.IsNullOrEmpty(username) || string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password) || string.IsNullOrEmpty(confirmPassword))
            {
                MessageTextBlock.Text = "All fields are required.";
                return;
            }

            if (password != confirmPassword)
            {
                MessageTextBlock.Text = "Passwords do not match.";
                return;
            }

            string connectionString = "Data Source=C:\\Users\\hp\\Documents\\Budget Tracker\\Budget_Tracker\\C# code\\Budget Tracker\\Budget.db;";

            try
            {
                using (SqliteConnection connection = new SqliteConnection(connectionString))
                {
                    connection.Open();

                    string query = "INSERT INTO Users (Username, Email, Password) VALUES (@Username, @Email, @Password)";
                    using (SqliteCommand command = new SqliteCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Username", username);
                        command.Parameters.AddWithValue("@Email", email);
                        command.Parameters.AddWithValue("@Password", password);

                        int result = command.ExecuteNonQuery();
                        if (result > 0)
                        {
                            MessageBox.Show("Registration successful!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);

                            // Redirect to login
                            LoginWindow loginWindow = new LoginWindow();
                            loginWindow.Show();
                            this.Close();
                        }
                        else
                        {
                            MessageTextBlock.Text = "Registration failed.";
                        }
                    }
                }
            }
            catch (SqliteException sqlEx)
            {
                if (sqlEx.SqliteErrorCode == 19)
                {
                    MessageTextBlock.Text = "Email is already registered.";
                }
                else
                {
                    MessageBox.Show($"Database Error: {sqlEx.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Unexpected Error: {ex.Message}", "Error", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}

