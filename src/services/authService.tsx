import axios from "axios";

const API_BASE_URL = "https://localhost:7192/api/auth";

export const registerUser = async (userData: {
  name: string;
  email: string;
  phone: number;
  passwordHash: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/Register`, {
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password_hash: userData.passwordHash, // Fix field name here
    });
    return response.data;
  } catch (error: any) {
    console.error("Registration Error:", error.response?.data || error.message);
    throw error;
  }
};

export const loginUser = async (credentials: {
  email: string;
  passwordHash: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email: credentials.email,
      password_hash: credentials.passwordHash,
    });
    return response.data;
  } catch (error: any) {
    console.error("Login Error:", error.response?.data || error.message);
    throw error;
  }
};
