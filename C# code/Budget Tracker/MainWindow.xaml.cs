using System.Windows;

namespace Budget_Tracker
{
    public partial class OnboardingWindow : Window
    {
        public OnboardingWindow()
        {
            //InitializeComponent();
        }


      

        private void GetStartedButton_Click(object sender, RoutedEventArgs e)
        {
            LoginWindow loginWindow = new LoginWindow();
            loginWindow.Show();
            this.Close();
        }

        private void LoginButton_Click(object sender, RoutedEventArgs e)
        {

        }
    }

}
