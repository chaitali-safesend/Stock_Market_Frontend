import { useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return <Button variant="danger" className="fw-bold shadow-sm" onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
