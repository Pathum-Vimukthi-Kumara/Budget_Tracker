using System.Windows;
using System.Data.SqlClient;
using Microsoft.Data.Sqlite;
namespace Budget_Tracker
{
    /// <summary>
    /// Interaction logic for LoginWindow.xaml
    /// </summary>
    public partial class LoginWindow : Window
    {
        public LoginWindow()
        {
            InitializeComponent();
        }
        private void SignUpHyperlink_Click(object sender, EventArgs e)
        {
            SignUpWindow signUp = new SignUpWindow();
            signUp.Show();
            this.Close();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            string email = EmailTextBox.Text;
            string password = PasswordBox.Password;

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                MessageTextBlock.Text = "Please enter email and password.";
                return;
            }

            // SQLite connection string
            string connectionString = "Data Source=C:\\Users\\hp\\Documents\\Budget Tracker\\Budget_Tracker\\C# code\\Budget Tracker\\Budget.db;";

            try
            {
                using (SqliteConnection connection = new SqliteConnection(connectionString))
                {
                    connection.Open();
                    string query = "SELECT COUNT(*) FROM Users WHERE Email = @Email AND Password = @Password";

                    using (SqliteCommand command = new SqliteCommand(query, connection))
                    {
                        command.Parameters.AddWithValue("@Email", email);
                        command.Parameters.AddWithValue("@Password", password);

                        int userCount = Convert.ToInt32(command.ExecuteScalar());

                        if (userCount > 0)
                        {
                            MessageBox.Show("Login successful!");
                            DashboardWindow dashboard = new DashboardWindow();
                            dashboard.Show();
                            this.Close();
                        }
                        else
                        {
                            MessageTextBlock.Text = "Invalid email or password.";
                        }
                    }
                }
            }
            catch (SqliteException sqlEx)
            {
                MessageBox.Show($"Database Error: {sqlEx.Message}");
            }
            catch (Exception ex)
            {
                MessageBox.Show($"Unexpected Error: {ex.Message}");
            }
        }
    }
}