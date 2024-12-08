import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(0);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Load stored expenses and budget from localStorage (or backend)
    const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const storedBudget = JSON.parse(localStorage.getItem('budget')) || 0;
    
    setExpenses(storedExpenses);
    setBudget(storedBudget);
  }, []);

  // Function to handle adding an expense
  const addExpense = (e) => {
    e.preventDefault();

    if (!expenseName || !expenseAmount || !expenseCategory || !expenseDate) {
      setMessage('Please fill in all fields!');
      return;
    }

    const newExpense = {
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: expenseCategory,
      date: expenseDate
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem('expenses', JSON.stringify(updatedExpenses));

    setMessage('Expense added successfully!');
    clearForm();
  };

  // Function to clear form fields
  const clearForm = () => {
    setExpenseName('');
    setExpenseAmount('');
    setExpenseCategory('');
    setExpenseDate('');
  };

  // Function to calculate total expenses
  const getTotalExpenses = () => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  };

  // Chart data for expenses by category
  const chartData = {
    labels: ['Food', 'Transport', 'Entertainment', 'Other'],
    datasets: [{
      label: 'Expenses by Category',
      data: [50, 30, 20, 10], // These are example values, replace with actual dynamic data
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
    }]
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Header>
              <h3>Expense Tracker</h3>
            </Card.Header>
            <Card.Body>
              <h5>Current Budget: ${budget}</h5>
              <h5>Total Expenses: ${getTotalExpenses()}</h5>
              <h5>Remaining Budget: ${budget - getTotalExpenses()}</h5>
              <div className="my-4">
                <Bar data={chartData} />
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="mb-3">
            <Card.Header>
              <h5>Add Expense</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={addExpense}>
                {message && <p className="text-danger">{message}</p>}
                <Form.Group className="mb-3">
                  <Form.Label>Expense Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={expenseName}
                    onChange={(e) => setExpenseName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Amount</Form.Label>
                  <Form.Control
                    type="number"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                  >
                    <option>Food</option>
                    <option>Transport</option>
                    <option>Entertainment</option>
                    <option>Other</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Add Expense
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Header>
              <h5>Set Budget</h5>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Set Your Budget</Form.Label>
                  <Form.Control
                    type="number"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  onClick={() => localStorage.setItem('budget', JSON.stringify(budget))}
                >
                  Set Budget
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Expense List (optional) */}
      <Row className="mt-5">
        <Col>
          <Card>
            <Card.Header>
              <h5>Expense List</h5>
            </Card.Header>
            <Card.Body>
              <ul>
                {expenses.map((expense, index) => (
                  <li key={index}>
                    {expense.name} - ${expense.amount} on {expense.date}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
