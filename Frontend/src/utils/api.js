// src/lib/api.js
import axios from 'axios';


export const BASE_URL = import.meta.env.VITE_API_BASE_URL;


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

// Optionally, attach token if exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken') || localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("🔐 Sending token:", token);
  }
  // else{
  //   delete config.headers.Authorization;
  //   console.log("⚠️ No token found. Authorization header removed."); 
  // }
  return config;
});


export default api;
