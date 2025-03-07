import axios from "axios";

const API_BASE_URL = "https://localhost:7192/api/KYC";

export const uploadKYC = async (userId: number, kycData: FormData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/upload/${userId}`,
      kycData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  } catch (error: any) {
    console.error("KYC Upload Error:", error.response?.data || error.message);
    throw error;
  }
};

export const checkKYCStatus = async (userId: number): Promise<number> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/status/${userId}`);
    return response.data.statusCode;
  } catch (error) {
    console.error("Error fetching KYC status:", error);
    return 0; // Default to "KYC Not Done"
  }
};

export const getUserDetails = async (userId: number) => {
  try {
    const response = await axios.get(
      `https://localhost:7192/api/auth/user/${userId}`
    );
    return response.data; // Assuming API returns { id, name, email, etc. }
  } catch (error) {
    console.error("Error fetching user details:", error);
    return null;
  }
};
