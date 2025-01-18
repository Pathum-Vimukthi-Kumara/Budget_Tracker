using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

namespace Budget_Tracker
{
    public class TransactionDbContext : DbContext
    {
        public DbSet<Transaction> Transactions { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            // Use the path/name of your .db file
            optionsBuilder.UseSqlite(@"Data Source=C:\Users\hp\Documents\new BudgetTracker\Budget Tracker\Transactions_Add.db");
        }
    }
}
