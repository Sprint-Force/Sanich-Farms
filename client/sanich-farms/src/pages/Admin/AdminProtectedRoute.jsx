import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check if admin is authenticated
      const adminAuth = localStorage.getItem('adminAuth');
      
      if (!adminAuth) {
        setAuthState(false);
        setIsLoading(false);
        return;
      }

      try {
        const authData = JSON.parse(adminAuth);
        const isExpired = Date.now() - authData.timestamp > 1 * 60 * 60 * 1000; // 1 hour

        if (isExpired) {
          localStorage.removeItem('adminAuth');
          // Clear any other admin-related data
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      } catch {
        localStorage.removeItem('adminAuth');
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setAuthState(false);
      }
      
      setIsLoading(false);
    };

    checkAuth();

    // Listen for storage changes (when user logs out in another tab)
    const handleStorageChange = (e) => {
      if (e.key === 'adminAuth' && !e.newValue) {
        setAuthState(false);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (authState === false) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;