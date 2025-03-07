import axios from 'axios';

const API_KEY = '73c1580767cb9d6f3f69445a221b7153';

const api = axios.create({
  baseURL: 'https://api-hackathon.capitalone.com', // Replace with the actual Capital One API base URL
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Function to get account balances
export const getAccountBalances = async () => {
  try {
    const response = await api.get('/accounts/balances');
    return response.data;
  } catch (error) {
    console.error('Error fetching account balances:', error);
    throw error;
  }
};

// Function to get transaction history
export const getTransactions = async (accountId) => {
  try {
    const response = await api.get(`/accounts/${accountId}/transactions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

// Function to get spending categories
export const getSpendingCategories = async (accountId) => {
  try {
    const response = await api.get(`/accounts/${accountId}/spending-categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spending categories:', error);
    throw error;
  }
};

// Function to get financial insights
export const getFinancialInsights = async () => {
  try {
    const response = await api.get('/insights');
    return response.data;
  } catch (error) {
    console.error('Error fetching financial insights:', error);
    throw error;
  }
};

export default api;