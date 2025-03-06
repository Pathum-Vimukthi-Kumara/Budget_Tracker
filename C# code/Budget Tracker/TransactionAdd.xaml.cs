using System;
using System.Windows;
using System.Windows.Controls;

namespace Budget_Tracker
{
    public partial class TransactionAddWindow : Window
    {
        public Transaction Transaction { get; private set; }

        public TransactionAddWindow(Transaction transaction)
        {
            InitializeComponent();
            Transaction = transaction;

           
            TitleTextBox.Text = Transaction.Title;
            AmountTextBox.Text = Transaction.Amount.ToString();
            DatePickerControl.SelectedDate = Transaction.Date == default ? DateTime.Now : Transaction.Date;

          
            if (!string.IsNullOrEmpty(Transaction.Type))
            {
                foreach (var item in TypeComboBox.Items)
                {
                    if (item is ComboBoxItem comboItem && comboItem.Content.ToString() == Transaction.Type)
                    {
                        TypeComboBox.SelectedItem = comboItem;
                        break;
                    }
                }
            }
        }

        private void Save_Click(object sender, RoutedEventArgs e)
        {
            try
            {
                
                Transaction.Title = TitleTextBox.Text;

               
                if (decimal.TryParse(AmountTextBox.Text, out decimal result))
                {
                    Transaction.Amount = result;
                }
                else
                {
                    MessageBox.Show("Invalid amount entered.");
                    return;
                }

               
                Transaction.Date = DatePickerControl.SelectedDate ?? DateTime.Now;

                
                if (TypeComboBox.SelectedItem is ComboBoxItem comboItem)
                {
                    Transaction.Type = comboItem.Content.ToString();
                }
                else
                {
                    Transaction.Type = "Income";
                }

                DialogResult = true;
                this.Close();
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error saving transaction: " + ex.Message);
            }
        }

        private void Cancel_Click(object sender, RoutedEventArgs e)
        {
            DialogResult = false;
            this.Close();
        }
    }
}
