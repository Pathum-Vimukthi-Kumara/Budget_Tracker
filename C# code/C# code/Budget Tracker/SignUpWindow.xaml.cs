using System.Windows;

namespace Budget_Tracker
{
    /// <summary>
    /// Interaction logic for SignUpWindow.xaml
    /// </summary>
    public partial class SignUpWindow : Window
    {
        public SignUpWindow()
        {
            InitializeComponent();
        }

        private void SignUpButton_Click(object sender, RoutedEventArgs e)
        {
            // Retrieve input from fields
            string username = UsernameTextBox.Text.Trim();
            string email = EmailTextBox.Text.Trim();
            string password = PasswordBox.Password;
            string confirmPassword = ConfirmPasswordBox.Password;

            // Validate inputs
            if (string.IsNullOrEmpty(username))
            {
                ShowMessage("Username is required.");
                return;
            }

            if (string.IsNullOrEmpty(email) || !IsValidEmail(email))
            {
                ShowMessage("A valid email is required.");
                return;
            }

            if (string.IsNullOrEmpty(password))
            {
                ShowMessage("Password is required.");
                return;
            }

            if (password != confirmPassword)
            {
                ShowMessage("Passwords do not match.");
                return;
            }

            // Simulate saving user data (replace this with real database logic)
            SaveUserData(username, email, password);

            // Show success message
            MessageBox.Show("Sign up successful!", "Success", MessageBoxButton.OK, MessageBoxImage.Information);

            // Open the Login Window
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show();

            // Close the Sign Up Window
            this.Close();
        }

        private void ShowMessage(string message)
        {
            MessageTextBlock.Text = message;
        }

        private bool IsValidEmail(string email)
        {
            // Use regex to validate email format
            string emailPattern = @"^[^@\s]+@[^@\s]+\.[^@\s]+$";
            return System.Text.RegularExpressions.Regex.IsMatch(email, emailPattern);
        }

        private void SaveUserData(string username, string email, string password)
        {
            // Placeholder for saving user data
            // Replace this logic with database insertion or file storage
            Console.WriteLine($"Saving User: {username}, Email: {email}, Password: {password}");

            // In a real-world scenario, hash the password before saving
        }
    }
}
