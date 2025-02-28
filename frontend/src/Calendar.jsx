import React, { useState, useEffect } from "react";
import "./Calendar.css";


function getDaysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}


function getFirstDayOfMonth(year, monthIndex) {
  return new Date(year, monthIndex, 1).getDay();
}


function isToday(year, monthIndex, dayNumber) {
  const today = new Date();
  return (
    year === today.getFullYear() &&
    monthIndex === today.getMonth() &&
    dayNumber === today.getDate()
  );
}

const Calendar = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [showTransactionPopup, setShowTransactionPopup] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);


  const fetchTransactions = async () => {
    try {
      const response = await fetch("http://localhost:3011/api/v1/transactions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTransactions(data);
      } else {
        console.error("Failed to fetch transactions");
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };


  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentYear((prev) => prev - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };


  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentYear((prev) => prev + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };


  const handleDateClick = (dayTransactions) => {
    setSelectedTransactions(dayTransactions);
    setShowTransactionPopup(true);
  };

  
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfMonth(currentYear, currentMonth);

  const calendarDays = [];
  for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(
      dayNumber
    ).padStart(2, "0")}`;

   
    const dayTransactions = transactions.filter((t) => t.date === dateStr);

    calendarDays.push({
      dayNumber,
      transactions: dayTransactions,
    });
  }

 
  const blanksBefore = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    blanksBefore.push({ blank: true });
  }


  const allCells = [...blanksBefore, ...calendarDays];


  const rows = [];
  for (let i = 0; i < allCells.length; i += 7) {
    rows.push(allCells.slice(i, i + 7));
  }

  const monthYearTitle = new Date(currentYear, currentMonth).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="calendar-page">
      <div className="calendar-container">
        <div className="calendar-nav">
          <button onClick={handlePrevMonth}>{"<"}</button>
          <h2>{monthYearTitle}</h2>
          <button onClick={handleNextMonth}>{">"}</button>
        </div>

        <div className="calendar-grid calendar-header">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>

        <div className="calendar-grid calendar-body">
          {rows.map((week, idx) => (
            <React.Fragment key={idx}>
              {week.map((cell, cellIdx) => {
                if (cell.blank) {
                  return <div key={cellIdx} className="calendar-cell blank"></div>;
                } else {
                  const { dayNumber, transactions } = cell;
                  const todayClass = isToday(currentYear, currentMonth, dayNumber) ? "today" : "";
                  return (
                    <div
                      key={cellIdx}
                      className={`calendar-cell date-cell ${todayClass}`}
                      onClick={() => handleDateClick(transactions)}
                    >
                      <div className="day-number">{dayNumber}</div>
                      <div className="dots">
                        {transactions.some((t) => t.type === "expense") && (
                          <span className="dot dot-red"></span>
                        )}
                        {transactions.some((t) => t.type === "income") && (
                          <span className="dot dot-green"></span>
                        )}
                      </div>
                    </div>
                  );
                }
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

      {showTransactionPopup && (
        <>
          <div className="popup-overlay" onClick={() => setShowTransactionPopup(false)}></div>
          <div className="transaction-popup">
            <button className="popup-close" onClick={() => setShowTransactionPopup(false)}>
              &times;
            </button>
            <h3>Transactions</h3>
            {selectedTransactions.length === 0 ? (
              <p>No transactions for this date.</p>
            ) : (
              <ul>
                {selectedTransactions.map((t, idx) => (
                  <li key={idx}>
                    <strong>{t.title}</strong> - Rs.{t.amount}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
