import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import axios from "axios";

interface NewsItem {
  id: number;
  category: string;
  datetime: number;
  headline: string;
  image: string;
  source: string;
  summary: string;
  url: string;
}

const MarketNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;

  const API_URL = `https://finnhub.io/api/v1/news?category=general&token=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(API_URL);
        setNews(response.data);
      } catch (err) {
        setError("Failed to fetch news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">
        Breaking Stock News: Trends You Can’t Miss!
      </h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {news.slice(0, 18).map((item) => (
            <Col md={4} key={item.id} className="mb-4">
              <Card>
                {/* <Card.Img variant="top" src={item.image} alt={item.headline} /> */}
                <Card.Body>
                  <Card.Title>{item.headline}</Card.Title>
                  <Card.Text>{item.summary.slice(0, 100)}...</Card.Text>
                  <a
                    href={item.url}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Source: {item.source}</small>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MarketNews;
