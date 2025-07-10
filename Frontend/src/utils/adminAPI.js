// /api/adminAPI.js
import axios from 'axios';

const adminAPI = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Interceptor: always use fresh token before request
adminAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 💼 Admin endpoints
export const getDashboardStats = () => adminAPI.get('/dashboard/stats');
export const getMonthlySales = () => adminAPI.get('/dashboard/monthly-sales');

// 📦 Product creation with image
export const createProduct = (formData) =>
  adminAPI.post('/product/add', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // 📦 Order Management
export const getAllOrders = (page = 1) =>
  adminAPI.get(`/orders/all?page=${page}`);

export const updateOrderStatus = (orderId, newStatus) =>
  adminAPI.put(`/orders/${orderId}/status`, { status: newStatus });
export default adminAPI;
