import axios from "axios";

const BASE_URL = "https://localhost:7192/api/WatchList";

// Add stock to watchlist
export const addToWatchlist = async (userId: number, stockId: number) => {
  try {
    await axios.post(`${BASE_URL}/AddToWatchList/${userId}/${stockId}`);
    alert("Stock added to watchlist!");
  } catch (error) {
    console.error("Error adding to watchlist:", error);
    alert("Failed to add stock to watchlist.");
  }
};

// Get all watchlist stocks
export const getWatchlist = async (userId: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/GetAllWatchListStocks/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching watchlist:", error);
    throw new Error("Failed to fetch watchlist.");
  }
};

// Remove stock from watchlist
export const removeFromWatchlist = async (userId: number, stockId: number) => {
  try {
    await axios.delete(`${BASE_URL}/RemoveFromWatchList/${userId}/${stockId}`);
    alert("Stock removed from watchlist!");
  } catch (error) {
    console.error("Error removing from watchlist:", error);
    alert("Failed to remove stock from watchlist.");
  }
};
