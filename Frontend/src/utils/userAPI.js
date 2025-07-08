import api from './api'; // axios instance with baseURL

// // Add token from localStorage
// import axios from 'axios';

// const API = axios.create({
//   baseURL: 'http://localhost:5000/api',
// });

// // ✅ Fix: Check adminToken first, fallback to token
// API.interceptors.request.use((req) => {
//   const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

export const userAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  deleteProfile: () => api.delete('/users/profile'),

};
