import api from './api'; // axios instance with baseURL

// Add token from localStorage
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token from localStorage
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const userAPI = {
  getProfile: () => API.get('/users/profile'),
  updateProfile: (data) => API.put('/users/profile', data),
  deleteProfile: () => API.delete('/users/profile'),
  uploadProfilePicture: (file) => {
    const formData = new FormData();
    formData.append('image', file);
    return API.post('/users/profile/picture', formData);
  },
};
