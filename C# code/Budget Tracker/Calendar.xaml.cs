using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;

namespace Budget_Tracker
{
    public partial class CalendarWindow : Window
    {
        public CalendarWindow()
        {
            InitializeComponent();
            LoadTransactionDates();
        }

        private void LoadTransactionDates()
        {
            if (TransactionCalendar.DisplayDate != null)
            {
                var startOfMonth = new DateTime(TransactionCalendar.DisplayDate.Year, TransactionCalendar.DisplayDate.Month, 1);
                var endOfMonth = startOfMonth.AddMonths(1).AddDays(-1);

                using (var _dbContext = new TransactionDbContext())
                {
                    var transactions = _dbContext.Transactions
                        .AsNoTracking()
                        .Where(t => t.Date.Date >= startOfMonth && t.Date.Date <= endOfMonth)
                        .ToList();

                    foreach (var transaction in transactions)
                    {
                        var dateButton = TransactionCalendar.FindChildren<CalendarDayButton>()
                            .FirstOrDefault(btn => btn.DataContext is DateTime date && date.Date == transaction.Date.Date);

                        if (dateButton != null)
                        {
                            dateButton.Tag = transaction.Type; // Use "Income" or "Expense"
                        }
                    }
                }
            }
        }

        private void TransactionCalendar_SelectedDatesChanged(object sender, SelectionChangedEventArgs e)
        {
            if (TransactionCalendar.SelectedDate.HasValue)
            {
                DateTime selectedDate = TransactionCalendar.SelectedDate.Value;

                // Load transactions for the selected date
                using (var _dbContext = new TransactionDbContext())
                {
                    var transactions = _dbContext.Transactions
                        .AsNoTracking()
                        .Where(t => t.Date.Date == selectedDate.Date)
                        .ToList();

                    // Bind transactions to DataGrid
                    TransactionGrid.ItemsSource = transactions;
                }
            }
        }

        private DateTime? _lastLoadedMonth = null;

        private void TransactionCalendar_DisplayDateChanged(object sender, RoutedEventArgs e)
        {
            var currentMonth = new DateTime(TransactionCalendar.DisplayDate.Year, TransactionCalendar.DisplayDate.Month, 1);

            if (_lastLoadedMonth == null || _lastLoadedMonth != currentMonth)
            {
                _lastLoadedMonth = currentMonth;
                LoadTransactionDates();
            }
        }

    }
}
