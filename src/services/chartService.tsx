import axios from "axios";
import { useEffect, useState } from "react";

export interface Holding {
  symbol: string;
  quantity: number;
}

export interface PnL {
  date: string;
  netPnL: number;
}

export interface Transaction {
  transactionType: string;
  quantity: number;
}

const BASE_URL = `https://localhost:7192/api`; // Change if needed

// Fetch User Holdings
export const fetchHoldings = async (userId: number): Promise<Holding[]> => {
  try {
    const response = await axios.get<Holding[]>(
      `${BASE_URL}/UserHistory/GetUserHoldings/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching holdings data:", error);
    return [];
  }
};

// Fetch Profit and Loss Data
export const fetchPnL = async (userId: number): Promise<PnL[]> => {
  try {
    const response = await axios.get<PnL[]>(
      `${BASE_URL}/UserHistory/GetPnLByUserId/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching PnL data:", error);
    return [];
  }
};

//------------
export interface UserTransaction {
  companyName: String;
  Date: string;
  stockQuantity: Number;
}

export const fetchUserTransactionHistory = async (
  userId: number
): Promise<UserTransaction[]> => {
  try {
    const response = await axios.get<UserTransaction[]>(
      `${BASE_URL}/UserHistory/GetUserHistory/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user transaction history:", error);
    return [];
  }
};
