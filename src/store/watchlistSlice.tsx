import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface WatchlistStock {
  stockId: number;
  symbol: string;
  companyName: string;
  country: string;
  price: number;
}

interface WatchlistState {
  watchlist: WatchlistStock[];
}

const initialState: WatchlistState = {
  watchlist: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    setWatchlist: (state, action: PayloadAction<WatchlistStock[]>) => {
      state.watchlist = action.payload;
    },
    addStockToWatchlist: (state, action: PayloadAction<WatchlistStock>) => {
      state.watchlist.push(action.payload);
    },
    removeStockFromWatchlist: (state, action: PayloadAction<number>) => {
      state.watchlist = state.watchlist.filter(
        (stock) => stock.stockId !== action.payload
      );
    },
  },
});

export const { setWatchlist, addStockToWatchlist, removeStockFromWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
