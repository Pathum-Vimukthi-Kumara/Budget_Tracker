using System;

namespace Budget_Tracker
{
    public class Transaction
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public string Type { get; set; } // "Income" or "Expense"
        public DateTime Date { get; set; } // Transaction date
    }

}
