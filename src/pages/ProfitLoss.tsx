import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import PnLChart from "../charts/PnLChart";

interface PnLData {
  pnLId: number;
  userId: number;
  date: string;
  priceDifference: number;
  netPnL: number;
}

const ProfitLoss: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [pnlData, setPnLData] = useState<PnLData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPnLData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/UserHistory/GetPnLByUserId/${userId}`
        );
        setPnLData(response.data);
      } catch (error) {
        setError("Failed to load Profit/Loss data.");
      } finally {
        setLoading(false);
      }
    };

    fetchPnLData();
  }, [userId]);

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Profit & Loss History</h2>
      <PnLChart />
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : pnlData.length === 0 ? (
        <Alert variant="info">No Profit/Loss records found.</Alert>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Date</th>
              <th>Price Difference ($)</th>
              <th>Net PnL ($)</th>
            </tr>
          </thead>
          <tbody>
            {pnlData.map((record) => (
              <tr key={record.pnLId}>
                <td>{new Date(record.date).toLocaleString()}</td>
                <td
                  style={{
                    color: record.priceDifference >= 0 ? "green" : "red",
                  }}
                >
                  {record.priceDifference.toFixed(2)}
                </td>
                <td>{record.netPnL.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ProfitLoss;
