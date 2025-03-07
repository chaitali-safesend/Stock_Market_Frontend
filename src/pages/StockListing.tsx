import React, { useEffect, useState } from "react";
import { Table, Container, Spinner, Alert, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/StockListing.css";
import {
  addToWatchlist,
  getWatchlist,
  removeFromWatchlist,
} from "../services/watchlistService";
import { useSelector } from "react-redux";

interface Stock {
  stockId: number;
  symbol: string;
  companyName: string;
  country: string;
  price: number;
}

const StockListing: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [watchlistIds, setWatchlistIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7192/api/Stock/GetAllStocks"
        );
        setStocks(response.data);
      } catch (error) {
        setError("Failed to load stock data.");
      } finally {
        setLoading(false);
      }
    };

    const fetchWatchlist = async () => {
      try {
        const watchlist = await getWatchlist(userId);
        const watchlistStockIds = watchlist.map((stock: any) => stock.stockId);
        setWatchlistIds(watchlistStockIds);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };

    fetchStocks();
    fetchWatchlist();
  }, [userId]);

  const handleRowClick = (stockId: number) => {
    navigate(`/stock/${stockId}`);
  };

  const toggleWatchlist = async (stockId: number, event: React.MouseEvent) => {
    event.stopPropagation();

    if (watchlistIds.includes(stockId)) {
      await removeFromWatchlist(userId, stockId);
      setWatchlistIds((prev) => prev.filter((id) => id !== stockId));
    } else {
      await addToWatchlist(userId, stockId);
      setWatchlistIds((prev) => [...prev, stockId]);
    }
  };

  return (
    <Container className="stock-list-container">
      <h2 className="title">Stock Listings</h2>

      {loading ? (
        <div className="text-center mt-4">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table bordered hover responsive className="stock-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Company Name</th>
              <th>Country</th>
              <th>Price ($)</th>
              <th>Watchlist</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
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
                    variant={
                      watchlistIds.includes(stock.stockId)
                        ? "success"
                        : "primary"
                    }
                    onClick={(event) => toggleWatchlist(stock.stockId, event)}
                    style={{
                      width: "100px",
                      height: "40px",
                      fontSize: "14px",
                      padding: "5px",
                    }}
                  >
                    {watchlistIds.includes(stock.stockId)
                      ? "✔ Remove"
                      : "⭐ Add"}
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

export default StockListing;
