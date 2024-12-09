import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import './Dashboard.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(9000);
  const barChartRef = useRef();
  const pieChartRef = useRef();

  useEffect(() => {
    axios.get('/api/expenses')
      .then(response => {
        setExpenses(response.data.expenses);
        setBudget(response.data.budget);
      })
      .catch(err => console.error(err));

 
    const barChartInstance = barChartRef.current;
    const pieChartInstance = pieChartRef.current;

    return () => {
      if (barChartInstance) {
        barChartInstance.destroy();
      }
      if (pieChartInstance) {
        pieChartInstance.destroy();
      }
    };
  }, [expenses, budget]); 

  const getTotalExpenses = () => expenses.reduce((total, item) => total + item.amount, 0);

  const pieData = {
    labels: [...new Set(expenses.map(exp => exp.category))],
    datasets: [{
      data: [...new Set(expenses.map(exp => exp.category))].map(category => {
        return expenses.filter(exp => exp.category === category).reduce((acc, exp) => acc + exp.amount, 0);
      }),
      backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545', '#6610f2', '#17a2b8'],
    }],
  };

  const barData = {
    labels: expenses.map(exp => exp.date),
    datasets: [{
      label: 'Daily Expenses',
      data: expenses.map(exp => exp.amount),
      backgroundColor: '#007bff',
    }],
  };

  return (
    <Container fluid className="dashboard">
      <Row>
        <Col lg={3} className="sidebar">
          <h1>Expenso</h1>
          <div className="budget-info">
            <h2>Expenses</h2>
            <p>Rs. {getTotalExpenses()}</p>
            <h2>Budget</h2>
            <p>Rs. {budget - getTotalExpenses()} / {budget}</p>
          </div>
          <Button variant="danger" onClick={() => setBudget(0)}>Reset Budget</Button>
        </Col>
        <Col lg={9}>
          <Row>
            <Col lg={6}>
              <Card>
                <Card.Header>Daily Expense Chart</Card.Header>
                <Card.Body>
                  <Bar ref={barChartRef} data={barData} />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card>
                <Card.Header>Category Distribution</Card.Header>
                <Card.Body>
                  <Pie ref={pieChartRef} data={pieData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card>
                <Card.Header>Transactions</Card.Header>
                <Card.Body>
                  <ul className="transaction-list">
                    {expenses.map((exp, idx) => (
                      <li key={idx}>{exp.name} - Rs. {exp.amount} on {exp.date}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
