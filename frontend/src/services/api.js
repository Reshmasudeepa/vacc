import axios from 'axios';
// Contact API calls
export const contactAPI = {
  sendMessage: (data) => {
    return api.post('/contact', data);
  },
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Vaccine API calls
export const vaccineAPI = {
  // Get all vaccines
  getVaccines: (params = {}) => {
    return api.get('/vaccines', { params });
  },

  // Get single vaccine
  getVaccine: (id) => {
    return api.get(`/vaccines/${id}`);
  },

  // Create vaccine (admin)
  createVaccine: (data) => {
    return api.post('/vaccines', data);
  },

  // Update vaccine (admin)
  updateVaccine: (id, data) => {
    return api.put(`/vaccines/${id}`, data);
  },

  // Delete vaccine (admin)
  deleteVaccine: (id) => {
    return api.delete(`/vaccines/${id}`);
  },
};

// Booking API calls
export const bookingAPI = {
  // Get all bookings
  getBookings: (params = {}) => {
    return api.get('/bookings', { params });
  },

  // Get single booking
  getBooking: (id) => {
    return api.get(`/bookings/${id}`);
  },

  // Create booking
  createBooking: (data) => {
    return api.post('/bookings', data);
  },

  // Update booking
  updateBooking: (id, data) => {
    return api.put(`/bookings/${id}`, data);
  },

  // Cancel booking
  cancelBooking: (id) => {
    return api.delete(`/bookings/${id}`);
  },
};

// User API calls
export const userAPI = {
  // Get all users
  getUsers: () => {
    return api.get('/users');
  },

  // Create user
  createUser: (data) => {
    return api.post('/users', data);
  },

  // Get user by email
  getUserByEmail: (email) => {
    return api.get(`/users/email/${email}`);
  },
};

export default api;

