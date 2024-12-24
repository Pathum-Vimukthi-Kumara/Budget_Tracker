using System.Windows;

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

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {
            // Retrieve input from fields
            string email = EmailTextBox.Text.Trim();
            string password = PasswordBox.Password;

            // Validate inputs
            if (string.IsNullOrEmpty(email))
            {
                ShowMessage("Email is required.");
                return;
            }

            if (string.IsNullOrEmpty(password))
            {
                ShowMessage("Password is required.");
                return;
            }

            // Simulate user authentication (replace this with real authentication logic)
            if (AuthenticateUser(email, password))
            {
                // Redirect to main application window after successful login
                MainWindow mainWindow = new MainWindow();
                mainWindow.Show();
                this.Close(); // Close the login window
            }
            else
            {
                ShowMessage("Invalid email or password.");
            }
        }

        private void ShowMessage(string message)
        {
            MessageTextBlock.Text = message;
        }

        private bool AuthenticateUser(string email, string password)
        {
            // Replace this logic with database or API authentication
            // For now, simulate a hardcoded user
            string hardcodedEmail = "user@example.com";
            string hardcodedPassword = "password123";

            return email == hardcodedEmail && password == hardcodedPassword;
        }
    }
}
