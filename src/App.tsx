import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import KycPage from "./pages/kycPage";
import LogoutButton from "./pages/LogoutButton";
import { Navbar } from "react-bootstrap";
import AppNavbar from "./components/Navbar";
import UserProfile from "./pages/UserProfile";
import Dashboard from "./pages/Dashboard";
import StockListing from "./pages/StockListing";
import StockDescription from "./pages/StockDescription";
import AccountDetails from "./pages/AccountDetails";
import UserHistory from "./pages/UserHistory";
import Watchlist from "./pages/Watchlist";
import ProfitLoss from "./pages/ProfitLoss";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutButton />} />
        <Route path="/kyc" element={<KycPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/stocks" element={<StockListing />} />
          <Route path="/stock/:stockId" element={<StockDescription />} />
          <Route path="/account" element={<AccountDetails />} />
          <Route path="/userHistory" element={<UserHistory />} />
          <Route path="/watchlist" element={<Watchlist />} />
          <Route path="/pnl" element={<ProfitLoss />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
