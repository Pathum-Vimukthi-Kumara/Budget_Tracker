using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Windows;

namespace Budget_Tracker
{
    public partial class DashboardWindow : Window
    {
        
        private GraphWindow graphWindow;

        public DashboardWindow()
        {
            InitializeComponent();
            LoadData();
        }

        private void LoadData()
        {
            using (var _dbContext = new TransactionDbContext())
            {
                var transactions = _dbContext.Transactions.AsNoTracking().ToList();
                TransactionGrid.ItemsSource = transactions;

                decimal totalIncome = transactions.Where(t => t.Type == "Income").Sum(t => t.Amount);
                decimal totalExpense = transactions.Where(t => t.Type == "Expense").Sum(t => t.Amount);
                decimal balance = totalIncome - totalExpense;

               
                TotalIncomeText.Text = $"Rs.{totalIncome:0.00}";
                TotalExpenseText.Text = $"Rs.{totalExpense:0.00}";
                BalanceText.Text = $"Rs.{balance:0.00}";
            }
        }

        private void AddTransaction_Click(object sender, RoutedEventArgs e)
        {
            Transaction newTransaction = new Transaction();
            TransactionAddWindow addWindow = new TransactionAddWindow(newTransaction);
            if (addWindow.ShowDialog() == true)
            {
                using (var _dbContext = new TransactionDbContext())
                {
                    _dbContext.Transactions.Add(newTransaction);
                    _dbContext.SaveChanges();
                }
                LoadData();
                RefreshGraphWindow(); 
            }
        }

        private void EditTransaction_Click(object sender, RoutedEventArgs e)
        {
            if (TransactionGrid.SelectedItem is Transaction selected)
            {
                using (var _dbContext = new TransactionDbContext())
                {
                    _dbContext.Attach(selected);
                    TransactionAddWindow editWindow = new TransactionAddWindow(selected);
                    if (editWindow.ShowDialog() == true)
                    {
                        _dbContext.SaveChanges();
                    }
                    else
                    {
                        _dbContext.Entry(selected).State = EntityState.Detached;
                    }
                }
                LoadData();
                RefreshGraphWindow(); 
            }
            else
            {
                MessageBox.Show("Please select a transaction to edit.");
            }
        }

        private void DeleteTransaction_Click(object sender, RoutedEventArgs e)
        {
            if (TransactionGrid.SelectedItem is Transaction toDelete)
            {
                var result = MessageBox.Show($"Delete '{toDelete.Title}'?",
                                             "Confirm",
                                             MessageBoxButton.YesNo);

                if (result == MessageBoxResult.Yes)
                {
                    using (var _dbContext = new TransactionDbContext())
                    {
                        _dbContext.Transactions.Remove(toDelete);
                        _dbContext.SaveChanges();
                    }
                    LoadData();
                    RefreshGraphWindow(); 
                }
            }
            else
            {
                MessageBox.Show("Please select a transaction to delete.");
            }
        }

        private void ViewGraph_Click(object sender, RoutedEventArgs e)
        {
            if (graphWindow == null || !graphWindow.IsLoaded)
            {
                graphWindow = new GraphWindow(); 
                graphWindow.Show();
            }
            else
            {
                graphWindow.Focus(); 
            }
        }
        private void ViewCalendar_Click(object sender, RoutedEventArgs e)
        {
            CalendarWindow calendarWindow = new CalendarWindow();
            calendarWindow.Show();
        }

        private void RefreshGraphWindow()
        {
            if (graphWindow != null && graphWindow.IsLoaded)
            {
                graphWindow.RefreshGraph();
            }
        }
    }
}
