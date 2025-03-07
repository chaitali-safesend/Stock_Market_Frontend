import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Navbar,
  Nav,
} from "react-bootstrap";
import axios from "axios";
import AppNavbar from "../components/Navbar";
import MarketNews from "./MarketNews";

interface NewsItem {
  headline: string;
  image: string;
  source: string;
  url: string;
}

const Home: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.REACT_APP_FINNHUB_API_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://finnhub.io/api/v1/news?category=general&token=${process.env.REACT_APP_FINNHUB_API_KEY}`
        );
        setNews(response.data.slice(0, 6)); // Show 6 news items
      } catch (error) {
        setError("Failed to fetch market news.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <>
      <AppNavbar />

      <MarketNews />
    </>
  );
};

export default Home;
