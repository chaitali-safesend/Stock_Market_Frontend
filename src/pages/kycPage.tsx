import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadKYC } from "../services/kycService";
import { Button, Form, Container, Alert, Card } from "react-bootstrap";
import { useSelector } from "react-redux";

const KycPage: React.FC = () => {
  const navigate = useNavigate();
  const userId = useSelector((state: any) => state.auth.userId);

  const [aadhar, setAadhar] = useState<File | null>(null);
  const [pan, setPan] = useState<File | null>(null);
  const [bankProof, setBankProof] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLElement>,
    setter: React.Dispatch<React.SetStateAction<File | null>>
  ) => {
    const target = event.target as HTMLInputElement; // ✅ Explicit type assertion
    if (target.files && target.files.length > 0) {
      setter(target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!userId || isNaN(userId)) {
      setError("Invalid User ID. Please re-login.");
      return;
    }

    if (!aadhar || !pan || !bankProof) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("aadhar", aadhar);
    formData.append("pan", pan);
    formData.append("bankProof", bankProof);

    try {
      await uploadKYC(userId, formData);
      alert("KYC uploaded successfully");
      navigate("/");
    } catch (error) {
      setError("KYC upload failed. Please try again.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="p-4 shadow-lg rounded-lg" style={{ width: "400px", background: "#f8f9fa" }}>
        <h2 className="text-center text-primary mb-4">KYC Verification</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Aadhar Card</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileChange(e, setAadhar)} className="p-2" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">PAN Card</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileChange(e, setPan)} className="p-2" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label className="fw-bold">Bank Proof</Form.Label>
            <Form.Control type="file" onChange={(e) => handleFileChange(e, setBankProof)} className="p-2" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 fw-bold">
            Submit KYC
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default KycPage;
