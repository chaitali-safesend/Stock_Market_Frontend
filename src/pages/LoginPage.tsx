import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { loginUser } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Alert } from "react-bootstrap";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", passwordHash: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await loginUser(formData);
      dispatch(login(response.token));
      alert("Login successful!");
      navigate("/");
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow-lg rounded-lg" style={{ width: "400px", background: "#f8f9fa" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              onChange={handleChange}
              required
              className="p-2"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordHash"
              placeholder="Enter password"
              onChange={handleChange}
              required
              className="p-2"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 fw-bold">
            Login
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default LoginPage;
