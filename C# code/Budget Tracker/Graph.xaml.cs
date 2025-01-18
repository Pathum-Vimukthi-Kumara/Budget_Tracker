using LiveCharts;
using LiveCharts.Wpf;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Windows;

namespace Budget_Tracker
{
    public partial class GraphWindow : Window
    {
        public SeriesCollection SeriesCollection { get; set; }
        public string[] Labels { get; set; }

        public GraphWindow()
        {
            InitializeComponent();
            RefreshGraph(); // Initialize the graph when the window loads
        }

        public void RefreshGraph()
        {
            using (var _dbContext = new TransactionDbContext())
            {
                var transactions = _dbContext.Transactions.AsNoTracking().ToList();

                // Calculate totals
                decimal totalIncome = transactions.Where(t => t.Type == "Income").Sum(t => t.Amount);
                decimal totalExpense = transactions.Where(t => t.Type == "Expense").Sum(t => t.Amount);
                decimal balance = totalIncome - totalExpense;

                // Update graph data
                SeriesCollection = new SeriesCollection
                {
                    new ColumnSeries
                    {
                        Title = "Amount",
                        Values = new ChartValues<double> { (double)totalIncome, (double)totalExpense, (double)balance }
                    }
                };

                Labels = new[] { "Total Income", "Total Expense", "Balance" };

                // Refresh bindings
                DataContext = this; // Ensure the DataContext is updated
            }
        }
    }
}
