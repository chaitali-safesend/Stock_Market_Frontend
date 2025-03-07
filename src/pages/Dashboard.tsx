import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/Dashboard.css";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const userName = useSelector((state: any) => state.auth.userName);

  return (
    <Container fluid className="dashboard-container py-5">
      <Row className="justify-content-center text-center mb-4">
        <Col md={8}>
          <h2 className="fw-bold text-dark">Welcome, {userName}!</h2>
          <p className="text-muted">
            Manage your stock market activities efficiently.
          </p>
        </Col>
      </Row>

      {/* Display only one option per row */}
      <Row className="justify-content-center g-3">
        <Col md={8} sm={10} xs={12}>
          <Card
            className="dashboard-card text-center"
            onClick={() => navigate("/account")}
          >
            <Card.Body>
              <i className="bi bi-person-circle card-icon"></i>
              <Card.Title>Account Details</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} sm={10} xs={12}>
          <Card
            className="dashboard-card text-center"
            onClick={() => navigate("/stocks")}
          >
            <Card.Body>
              <i className="bi bi-bar-chart-line card-icon"></i>
              <Card.Title>Stock Listing</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} sm={10} xs={12}>
          <Card
            className="dashboard-card text-center"
            onClick={() => navigate("/watchlist")}
          >
            <Card.Body>
              <i className="bi bi-eye card-icon"></i>
              <Card.Title>Watchlist</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} sm={10} xs={12}>
          <Card
            className="dashboard-card text-center"
            onClick={() => navigate("/pnl")}
          >
            <Card.Body>
              <i className="bi bi-cash-coin card-icon"></i>
              <Card.Title>Profit & Loss</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8} sm={10} xs={12}>
          <Card
            className="dashboard-card text-center"
            onClick={() => navigate("/userHistory")}
          >
            <Card.Body>
              <i className="bi bi-clock-history card-icon"></i>
              <Card.Title>User Order History</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4 text-center">
        <Col>
          <Button variant="dark" size="lg" onClick={() => navigate("/stocks")}>
            Explore Stocks
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
