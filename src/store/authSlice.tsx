import { createSlice } from "@reduxjs/toolkit";
import LogoutButton from "../pages/LogoutButton";

const token = localStorage.getItem("token");

// Function to decode JWT and extract userId
const decodeToken = (token: string | null) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // Decode payload
    return (
      payload[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ] || null
    );
  } catch (error) {
    return null;
  }
};

const userId = decodeToken(token);

const authSlice = createSlice({
  name: "auth",
  initialState: { token: token || null, userId: userId || null },
  reducers: {
    login: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);

      const decodedUserId = decodeToken(action.payload);
      state.userId = decodedUserId;

      localStorage.setItem("userId", state.userId);
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
    },
    LogoutButton: (state) => {
      state.token = null;
      state.userId = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userId"); // Remove userId from storage
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
