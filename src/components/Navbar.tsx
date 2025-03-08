import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Button,
  Container,
  Alert,
  NavDropdown,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { checkKYCStatus, getUserDetails } from "../services/kycService";

const AppNavbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state: any) => state.auth.token);
  const userId = useSelector((state: any) => state.auth.userId);
  const [kycStatus, setKycStatus] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (userId) {
        const status = await checkKYCStatus(userId);
        setKycStatus(status);

        const userDetails = await getUserDetails(userId);
        setUserName(userDetails?.name || "User");
      }
    };

    fetchUserData();
  }, [userId]);

  const handleKYCClick = () => {
    if (kycStatus === 0) {
      alert("Please complete your KYC.");
      navigate("/kyc");
    } else if (kycStatus === 1) {
      alert("Verification pending from admin side.");
    }
  };

  const handleDashboardClick = () => {
    if (kycStatus === 0) {
      setAlertMessage("Please complete your KYC to access the dashboard.");
      navigate("/kyc");
    } else if (kycStatus === 1) {
      setAlertMessage("Verification pending from admin side.");
    } else {
      navigate("/dashboard");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            InvestGrow
          </Navbar.Brand>
          <Nav className="ms-auto">
            {token && (
              <Navbar.Text style={{ color: "yellow" }} className="me-3">
                Welcome, {userName} !😊
              </Navbar.Text>
            )}

            {!token ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Button
                  variant={
                    kycStatus === 0
                      ? "danger"
                      : kycStatus === 1
                      ? "warning"
                      : "success"
                  }
                  onClick={handleKYCClick}
                  disabled={kycStatus === 2}
                >
                  {kycStatus === 0
                    ? "KYC: Incomplete!"
                    : kycStatus === 1
                    ? "KYC: Not Verified!"
                    : "KYC Verified!"}
                </Button>

                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>

                {/* Dropdown Menu */}
                <NavDropdown title="Menu" id="nav-dropdown">
                  <NavDropdown.Item onClick={handleDashboardClick}>
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      {alertMessage && (
        <Alert variant="warning" className="text-center">
          {alertMessage}
        </Alert>
      )}
    </>
  );
};

export default AppNavbar;
