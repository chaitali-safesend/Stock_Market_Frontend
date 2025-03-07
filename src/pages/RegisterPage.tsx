import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";
import { registerUser } from "../services/authService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: 0, passwordHash: "" });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: name === "phone" ? Number(value) : value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await registerUser(formData);
      alert(response);
      localStorage.setItem("userId", response.userId);
      navigate("/login");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow-lg rounded-lg" style={{ width: "400px", background: "#f8f9fa" }}>
        <h2 className="text-center text-primary mb-4">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Name</Form.Label>
            <Form.Control type="text" name="name" placeholder="Enter name" onChange={handleChange} required className="p-2" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Email</Form.Label>
            <Form.Control type="email" name="email" placeholder="Enter email" onChange={handleChange} required className="p-2" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Phone</Form.Label>
            <Form.Control type="number" name="phone" placeholder="Enter phone" onChange={handleChange} required className="p-2" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Password</Form.Label>
            <Form.Control type="password" name="passwordHash" placeholder="Enter password" onChange={handleChange} required className="p-2" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 fw-bold">Register</Button>
        </Form>
      </Card>
    </Container>
  );
};

export default RegisterPage;
