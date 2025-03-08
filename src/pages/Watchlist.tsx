import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import {
  getWatchlist,
  removeFromWatchlist,
} from "../services/watchlistService";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface WatchlistStock {
  stockId: number;
  symbol: string;
  companyName: string;
  country: string;
  price: number;
}

const Watchlist: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [watchlist, setWatchlist] = useState<WatchlistStock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const data = await getWatchlist(userId);
        setWatchlist(data);
      } catch (error) {
        setError("Failed to load watchlist.");
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [userId]);

  const handleRemove = async (stockId: number) => {
    await removeFromWatchlist(userId, stockId);
    setWatchlist((prev) => prev.filter((stock) => stock.stockId !== stockId));
  };

  const handleRowClick = (stockId: number) => {
    navigate(`/stock/${stockId}`);
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">My Watchlist</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : watchlist.length === 0 ? (
        <Alert variant="info">Your watchlist is empty.</Alert>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company Name</th>
              <th>Country</th>
              <th>Price ($)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {watchlist.map((stock) => (
              <tr
                key={stock.stockId}
                onClick={() => handleRowClick(stock.stockId)}
                className="clickable-row"
              >
                <td>{stock.symbol}</td>
                <td>{stock.companyName}</td>
                <td>{stock.country || "N/A"}</td>
                <td>${stock.price.toFixed(2)}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleRemove(stock.stockId)}
                  >
                    ❌ Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Watchlist;
