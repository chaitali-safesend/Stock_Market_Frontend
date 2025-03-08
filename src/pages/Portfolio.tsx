import React, { useEffect, useState } from "react";
import { Table, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import HoldingsChart from "../charts/HoldingsChart";

const Portfolio: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [holdings, setHoldings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchHoldings = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/UserHistory/GetUserHoldings/${userId}`
        );
        setHoldings(response.data);
      } catch (error) {
        console.error("Error fetching holdings:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchHoldings();
  }, [userId]);

  const handleRowClick = (stockId: number) => {
    navigate(`/stock/${stockId}`);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#ECEBDE" }}
    >
      <HoldingsChart />

      <Card
        style={{
          width: "60%",
          background: "#D7D3BF",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <Card.Body>
          <h2 className="text-center" style={{ color: "#2C3930" }}>
            My Holdings
          </h2>
          {loading ? (
            <div className="text-center">
              <Spinner animation="border" variant="dark" />
            </div>
          ) : holdings.length === 0 ? (
            <p className="text-center">No holdings found.</p>
          ) : (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Symbol</th>
                  <th>Company</th>
                  <th>Quantity</th>
                  {/* <th>AvgPnL</th> */}
                </tr>
              </thead>
              <tbody>
                {holdings.map((holding) => (
                  <tr
                    key={holding.stockId}
                    onClick={() => handleRowClick(holding.stockId)}
                  >
                    <td>{holding.symbol}</td>
                    <td>{holding.companyName}</td>
                    <td>{holding.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Portfolio;
