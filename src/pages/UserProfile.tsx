import React, { useEffect, useState } from "react";
import { Container, Card, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import { checkKYCStatus, getUserDetails } from "../services/kycService";

const UserProfile: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [kycStatus, setKycStatus] = useState<number | null>(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (userId) {
        try {
          const userData = await getUserDetails(userId);
          const status = await checkKYCStatus(userId);

          setUser({ ...userData, kycStatus: status }); // Ensuring kycStatus updates in user object
          setKycStatus(status);
        } catch (err) {
          setError("Failed to fetch user details.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Title className="text-center">User Profile</Card.Title>
        <Card.Body>
          <p>
            <strong>Name:</strong> {user?.name}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone}
          </p>

          <strong>KYC Status:</strong>
          {user?.kycStatus === 0 ? (
            <p>Incomplete</p>
          ) : user?.kycStatus === 1 ? (
            <p> Not Verified</p>
          ) : (
            <p>Verified</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
