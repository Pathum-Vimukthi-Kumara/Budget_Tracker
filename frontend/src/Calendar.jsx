import React, { useState, useEffect } from "react";
import "./Calendar.css";

// Helper to get number of days in a given month and year
function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

// Helper to find the day of the week a particular date falls on (0=Sun, 1=Mon, etc.)
function getFirstDayOfMonth(year, monthIndex) {
  return new Date(year, monthIndex, 1).getDay();
}

const Calendar = () => {
  // We'll store the transactions we fetch from your API
  const [transactions, setTransactions] = useState([]);

  // Current displayed year and month (0-based for month)
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  // Fetch transactions once on mount
  useEffect(() => {
    fetchTransactions();
  }, []);

  // 1) Fetch from your existing transactions endpoint
  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3011/api/v1/transactions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        // data should be an array of transactions:
        // [{id, title, amount, type, date}, ...]
        setTransactions(data);
      } else {
        console.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  // 2) Move to the previous month
  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  // 3) Move to the next month
  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  // 4) Prepare the calendar cells
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth);

  // Build an array [ { dayNumber: i, transactions: [...] }, ... ]
  const calendarDays = [];
  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

    // Filter transactions that match this date
    const dayTransactions = transactions.filter((t) => t.date === dateStr);

    calendarDays.push({
      dayNumber: i,
      transactions: dayTransactions,
    });
  }

  // Create blank cells for days before the first day of the month
  const blanksBefore = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    blanksBefore.push({ blank: true });
  }

  // Combine blank cells + real day cells
  const allCells = [...blanksBefore, ...calendarDays];

  // Chunk into rows of 7 cells each (weeks)
  const rows = [];
  for (let i = 0; i < allCells.length; i += 7) {
    rows.push(allCells.slice(i, i + 7));
  }

  // 5) Render the calendar, wrapped in a scrollable container
  return (
    // Outer wrapper that gives us scrollable area if content is tall
    <div
      style={{
        overflowY: "auto",
        maxHeight: "80vh",  // Adjust as you like (px or vh)
        backgroundColor: "#000",  // If your site is black background
        padding: "1rem",
      }}
    >
      <div className="calendar-container">
        {/* Navigation */}
        <div className="calendar-nav">
          <button onClick={handlePrevMonth}>{"<"}</button>
          <h2>
            {new Date(currentYear, currentMonth).toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </h2>
          <button onClick={handleNextMonth}>{">"}</button>
        </div>

        {/* Calendar Header (Sun - Sat) */}
        <div className="calendar-grid calendar-header">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        {/* Calendar Body: each row = week, each cell = day */}
        <div className="calendar-grid calendar-body">
          {rows.map((week, idx) => (
            <React.Fragment key={idx}>
              {week.map((cell, cellIdx) => {
                if (cell.blank) {
                  // Blank cell for days before the 1st of the month
                  return <div key={cellIdx} className="calendar-cell blank"></div>;
                } else {
                  // Real date cell
                  const { dayNumber, transactions } = cell;

                  // Summarize today's income/expense
                  let dayIncome = 0;
                  let dayExpense = 0;
                  transactions.forEach((t) => {
                    if (t.type === "income") dayIncome += parseFloat(t.amount);
                    else dayExpense += parseFloat(t.amount);
                  });

                  return (
                    <div key={cellIdx} className="calendar-cell date-cell">
                      <div className="day-number">{dayNumber}</div>

                      {/* Red dot if any expense, green dot if any income */}
                      <div className="dots">
                        {dayExpense > 0 && <span className="dot dot-red"></span>}
                        {dayIncome > 0 && <span className="dot dot-green"></span>}
                      </div>

                      {/* Show amounts (optional) */}
                      {dayIncome > 0 && (
                        <div className="income-amount" style={{ color: "green" }}>
                          +{dayIncome.toFixed(2)}
                        </div>
                      )}
                      {dayExpense > 0 && (
                        <div className="expense-amount" style={{ color: "red" }}>
                          -{dayExpense.toFixed(2)}
                        </div>
                      )}
                    </div>
                  );
                }
              })}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
