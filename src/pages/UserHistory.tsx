import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

type HistoryItem = {
  historyId: number;
  userId: number;
  stockId: number;
  transactionDate: string;
  price: number;
  transactionType: string;
  symbol: string;
  companyName: string;
  stockQuantity: number;
};

const UserHistory: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserHistory = async () => {
      if (!userId) return;

      try {
        const response = await axios.get(
          `https://localhost:7192/api/UserHistory/GetUserHistory/${userId}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching user history:", error);
        setError("Failed to fetch history.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserHistory();
  }, [userId]);

  return (
    <Container className="mt-4">
      <h2 className="text-center" style={{ color: "#2C3930" }}>
        User Transaction History
      </h2>

      {loading && <Spinner animation="border" className="d-block mx-auto" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && history.length === 0 && (
        <Alert variant="warning">No transaction history available.</Alert>
      )}

      {history.length > 0 && (
        <Table striped bordered hover responsive className="mt-3">
          <thead style={{ background: "#A59D84", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Company</th>
              <th>Symbol</th>
              <th>Transaction Type</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Transaction Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item.historyId}>
                <td>{index + 1}</td>
                <td>{item.companyName}</td>
                <td>{item.symbol}</td>
                <td
                  style={{
                    color: item.transactionType === "Buy" ? "green" : "red",
                  }}
                >
                  {item.transactionType}
                </td>
                <td>{item.stockQuantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{new Date(item.transactionDate).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default UserHistory;
