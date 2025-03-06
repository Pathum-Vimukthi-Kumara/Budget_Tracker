using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Controls.Primitives;
using System.Windows.Media;
using System.Collections.Generic;

namespace Budget_Tracker
{
    public partial class CalendarWindow : Window
    {
        public CalendarWindow()
        {
            InitializeComponent();
            LoadTransactionDates();
        }

        private static List<CalendarDayButton> FindChildren<CalendarDayButton>(DependencyObject parent) where CalendarDayButton : DependencyObject
        {
            List<CalendarDayButton> children = new List<CalendarDayButton>();

            if (parent == null) return children;

     
            for (int i = 0; i < VisualTreeHelper.GetChildrenCount(parent); i++)
            {
                var child = VisualTreeHelper.GetChild(parent, i);

                if (child is CalendarDayButton)
                {
                    children.Add((CalendarDayButton)child);
                }

             
                children.AddRange(FindChildren<CalendarDayButton>(child));
            }

            return children;
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

                 
                    var dateButtons = FindChildren<CalendarDayButton>(TransactionCalendar);

                
                    foreach (var transaction in transactions)
                    {
                       
                        foreach (var dateButton in dateButtons)
                        {
                            if (dateButton.DataContext is DateTime date && date.Date == transaction.Date.Date)
                            {
                                dateButton.Tag = transaction.Type; 
                            }
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

                using (var _dbContext = new TransactionDbContext())
                {
                    var transactions = _dbContext.Transactions
                        .AsNoTracking()
                        .Where(t => t.Date.Date == selectedDate.Date)
                        .ToList();

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
