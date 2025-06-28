import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
});

export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const getDashboard = () => api.get('/dashboard');
export const addPurchase = (data) => api.post('/purchases', data);
export const getPurchases = () => api.get('/purchases');
export const addTransfer = (data) => api.post('/transfers', data);
export const addAssignment = (data) => api.post('/assignments', data);
export const addExpenditure = (data) => api.post('/expenditures', data);
