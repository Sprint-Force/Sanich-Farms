import axios from 'axios';

// Base URL from environment variables or fallback
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://sanich-farms-tnac.onrender.com/api';

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 seconds timeout
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flag to prevent redirect during logout
let isLoggingOut = false;

// Response interceptor to handle errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Don't redirect if we're logging out
      if (isLoggingOut) {
        return Promise.reject(error);
      }
      
      // Don't redirect if this is a login attempt (failed login should stay on login page)
      if (error.config?.url?.includes('/auth/login')) {
        return Promise.reject(error);
      }
      
      // Only redirect for other 401 errors (expired tokens, etc.)
      console.log('Redirecting to login page for expired token');
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Export function to set logout flag
export const setLoggingOut = (status) => {
  isLoggingOut = status;
};

// Authentication API methods
export const authAPI = {
  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  forgotPassword: async (email) => {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  },

  resetPassword: async (resetData) => {
    const response = await apiClient.post('/auth/reset-password', resetData);
    return response.data;
  },
};

// Products API methods
export const productsAPI = {
  getAll: async (params = {}) => {
    const response = await apiClient.get('/products', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return response.data;
  },
};

// Services API methods
export const servicesAPI = {
  getAll: async () => {
    const response = await apiClient.get('/services');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/services/${id}`);
    return response.data;
  },
};

// Orders API methods
export const ordersAPI = {
  create: async (orderData) => {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/orders');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  },

  // DASHBOARD API INTEGRATION: Add cancel order functionality
  cancel: async (id) => {
    const response = await apiClient.patch(`/orders/${id}/cancel`);
    return response.data;
  },
};

// Bookings API methods
export const bookingsAPI = {
  create: async (bookingData) => {
    const response = await apiClient.post('/bookings', bookingData);
    return response.data;
  },

  getAll: async () => {
    const response = await apiClient.get('/bookings');
    return response.data;
  },

  getById: async (id) => {
    const response = await apiClient.get(`/bookings/${id}`);
    return response.data;
  },

  // DASHBOARD API INTEGRATION: Add booking management functionality
  update: async (id, bookingData) => {
    const response = await apiClient.patch(`/bookings/${id}`, bookingData);
    return response.data;
  },

  cancel: async (id) => {
    const response = await apiClient.patch(`/bookings/${id}/cancel`);
    return response.data;
  },
};

// User API methods
export const userAPI = {
  getProfile: async () => {
    const response = await apiClient.get('/user/profile');
    return response.data;
  },

  updateProfile: async (userData) => {
    const response = await apiClient.put('/user/profile', userData);
    return response.data;
  },
};

// Cart API methods
export const cartAPI = {
  getCart: async () => {
    const response = await apiClient.get('/cart');
    return response.data;
  },

  addToCart: async (cartData) => {
    const response = await apiClient.post('/cart', cartData);
    return response.data;
  },

  updateCartItem: async (productId, cartData) => {
    const response = await apiClient.put(`/cart/${productId}`, cartData);
    return response.data;
  },

  removeFromCart: async (productId) => {
    const response = await apiClient.delete(`/cart/${productId}`);
    return response.data;
  },

  clearCart: async () => {
    const response = await apiClient.delete('/cart');
    return response.data;
  },
};

// Wishlist API methods
export const wishlistAPI = {
  getWishlist: async () => {
    const response = await apiClient.get('/wishlist');
    return response.data;
  },

  addToWishlist: async (productId, wishlistData) => {
    const response = await apiClient.post(`/wishlist/${productId}`, wishlistData);
    return response.data;
  },

  removeFromWishlist: async (productId) => {
    const response = await apiClient.delete(`/wishlist/${productId}`);
    return response.data;
  },

  clearWishlist: async () => {
    const response = await apiClient.delete('/wishlist');
    return response.data;
  },
};

// DASHBOARD API INTEGRATION: Payments API methods
export const paymentsAPI = {
  getTransactions: async () => {
    const response = await apiClient.get('/payments/transactions');
    return response.data;
  },

  getPaymentMethods: async () => {
    const response = await apiClient.get('/user/payment-methods');
    return response.data;
  },

  addPaymentMethod: async (methodData) => {
    const response = await apiClient.post('/user/payment-methods', methodData);
    return response.data;
  },

  removePaymentMethod: async (methodId) => {
    const response = await apiClient.delete(`/user/payment-methods/${methodId}`);
    return response.data;
  },

  getWalletBalance: async () => {
    const response = await apiClient.get('/user/wallet/balance');
    return response.data;
  },

  addFunds: async (amount) => {
    const response = await apiClient.post('/user/wallet/add-funds', { amount });
    return response.data;
  },

  processPayment: async (paymentData) => {
    const response = await apiClient.post('/payments/process', paymentData);
    return response.data;
  }
};

export default apiClient;
