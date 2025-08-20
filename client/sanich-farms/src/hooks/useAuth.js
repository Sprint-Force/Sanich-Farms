import { useState, useEffect } from 'react';
import { setLoggingOut } from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error loading auth state from localStorage:', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (userData, authToken) => {
    try {
      setUser(userData);
      setToken(authToken);
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('user', JSON.stringify(userData));
    } catch (error) {
      console.error('Error saving auth state to localStorage:', error);
    }
  };

  // Logout function
  const logout = () => {
    setLoggingOut(true); // Prevent axios interceptor redirect
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    // Also clear admin auth data for unified logout
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    
    // Reset flag after a longer delay to ensure navigation completes
    setTimeout(() => {
      setLoggingOut(false);
    }, 1000);
  };

  // Update user data
  const updateUser = (updatedUser) => {
    try {
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    } catch (error) {
      console.error('Error updating user data in localStorage:', error);
    }
  };

  // Check if user is authenticated
  const isAuthenticated = !!token && !!user;

  return {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    logout,
    updateUser,
  };
};
