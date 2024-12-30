using System;
using Microsoft.Data.Sqlite;

namespace Budget_Tracker
{
    public class DatabaseHelper
    {
        private static string connectionString = "Data Source=C:\\Users\\hp\\Documents\\Budget Tracker\\Budget_Tracker\\C# code\\Budget Tracker\\Budget.db;";

        public static void CreateTransactionsTable()
        {
            string createTransactionsTable = @"
                CREATE TABLE IF NOT EXISTS Transactions (
                    Id INTEGER PRIMARY KEY AUTOINCREMENT,
                    Title TEXT NOT NULL,
                    Amount REAL NOT NULL,
                    Date TEXT NOT NULL,
                    Type TEXT NOT NULL
                );";

            try
            {
                using (SqliteConnection connection = new SqliteConnection(connectionString))
                {
                    connection.Open();

                    using (SqliteCommand command = new SqliteCommand(createTransactionsTable, connection))
                    {
                        command.ExecuteNonQuery();
                        Console.WriteLine("Transactions table created successfully.");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating Transactions table: {ex.Message}");
            }
        }
    }
}
