import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Card, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { useSelector } from "react-redux";

const StockDescription: React.FC = () => {
  const userId = useSelector((state: any) => state.auth.userId);
  const { stockId } = useParams<{ stockId: string }>();
  const [stock, setStock] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [transactionType, setTransactionType] = useState("Buy");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/Stock/GetStockById/${stockId}`
        );
        setStock(response.data);
        setTotalPrice(response.data.price);
      } catch (error) {
        console.error("Error fetching stock details:", error);
      }
    };

    fetchStockDetails();
  }, [stockId]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const qty = parseInt(e.target.value) || 1;
    setQuantity(qty);
    if (stock) {
      setTotalPrice(qty * stock.price);
    }
  };

  type HistoryItem = {
    transactionType: string;
    stockQuantity: number;
  };

  // Fetch user history
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const fetchUserHistory = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7192/api/UserHistory/GetUserHistory/${userId}`
        );
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching user history:", error);
      }
    };

    if (userId) {
      fetchUserHistory();
    }
  }, [userId]);

  const handleTransactionSubmit = async () => {
    if (!userId || !stock) {
      alert("Invalid transaction: Missing user or stock details.");
      return;
    }

    // Calculate total bought and sold stocks from history
    const totalBought = history
      .filter((item) => item.transactionType === "Buy")
      .reduce((sum, item) => sum + item.stockQuantity, 0);

    const totalSold = history
      .filter((item) => item.transactionType === "Sell")
      .reduce((sum, item) => sum + item.stockQuantity, 0);

    // If selling more than owned, show an alert
    if (transactionType === "Sell" && totalSold + quantity > totalBought) {
      alert("Sell transaction failed! You cannot sell more than you own.");
      return;
    }

    try {
      await axios.post(
        "https://localhost:7192/api/UserHistory/AddOrder",
        null,
        {
          params: {
            userId: userId,
            stockId: stock.stockId,
            transactionType: transactionType,
            stockQuantity: quantity,
          },
          headers: { "Content-Type": "application/json" },
        }
      );

      alert("Transaction successful!");
      handleCloseModal();
    } catch (error: any) {
      console.error(
        "Error processing transaction:",
        error.response?.data || error.message
      );
      alert(error.response?.data || error.message);
    }
  };

  if (!stock) return <p>Loading stock details...</p>;

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#ECEBDE" }}
    >
      <Card
        style={{
          width: "50%",
          background: "#D7D3BF",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <Card.Body>
          <h2 className="text-center" style={{ color: "#2C3930" }}>
            {stock.companyName} ({stock.symbol})
          </h2>
          <p>
            <strong>Country:</strong> {stock.country}
          </p>
          <p>
            <strong>Price:</strong> ${stock.price}
          </p>
          <p>
            <strong>High:</strong> ${stock.high}
          </p>
          <p>
            <strong>Low:</strong> ${stock.low}
          </p>
          <p>
            <strong>Previous Close Price:</strong> ${stock.prevClosePrice}
          </p>
          <div className="d-flex justify-content-center">
            <Button variant="primary" onClick={handleShowModal}>
              Buy / Sell
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Buy/Sell Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Buy/Sell Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Stock Price</Form.Label>
              <Form.Control type="text" value={`$ ${stock.price}`} readOnly />
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="1"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Transaction Type</Form.Label>
              <Form.Select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="Buy">Buy</option>
                <option value="Sell">Sell</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Total Price</Form.Label>
              <Form.Control type="text" value={`$${totalPrice}`} readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleTransactionSubmit}>
            Confirm {transactionType}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default StockDescription;
