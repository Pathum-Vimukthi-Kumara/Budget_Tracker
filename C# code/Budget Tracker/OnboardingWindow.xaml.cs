﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;

namespace Budget_Tracker
{
  
    public partial class OnboardingWindow : Window
    {
        public OnboardingWindow()
        {
           
        }

        private void GetStartedButton_Click(object sender, RoutedEventArgs e)
        {
            LoginWindow login= new LoginWindow();
            login.Show();
            this.Close();
            

        }
    }
}
