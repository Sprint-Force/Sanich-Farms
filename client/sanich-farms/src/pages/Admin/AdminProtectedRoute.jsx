import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const [authState, setAuthState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // First check if user is authenticated via normal auth system
      const normalToken = localStorage.getItem('authToken');
      const normalUser = localStorage.getItem('user');
      
      if (normalToken && normalUser) {
        try {
          const userData = JSON.parse(normalUser);
          // Check if user has admin role (from API)
          if (userData.role === 'admin') {
            // Check if there's an explicit logout happening
            const adminAuth = localStorage.getItem('adminAuth');
            
            // Only create admin auth entry if it doesn't exist AND we're not in a logout state
            if (!adminAuth) {
              localStorage.setItem('adminAuth', JSON.stringify({
                email: userData.email,
                role: 'admin',
                name: userData.name,
                timestamp: Date.now()
              }));
            }
            setAuthState(true);
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.error('Error parsing normal user data:', error);
        }
      }

      // Fallback: Check legacy admin auth for existing sessions
      const adminAuth = localStorage.getItem('adminAuth');
      
      if (!adminAuth) {
        setAuthState(false);
        setIsLoading(false);
        return;
      }

      try {
        const authData = JSON.parse(adminAuth);
        const isExpired = Date.now() - authData.timestamp > 8 * 60 * 60 * 1000; // 8 hours

        if (isExpired) {
          // Clear all admin related data when expired
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          setAuthState(false);
        } else {
          // Double check that main auth still exists if we're relying on admin auth
          const mainToken = localStorage.getItem('authToken');
          if (!mainToken) {
            // Main auth is gone, clear admin auth too
            localStorage.removeItem('adminAuth');
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');
            setAuthState(false);
          } else {
            setAuthState(true);
          }
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
      if ((e.key === 'adminAuth' || e.key === 'authToken') && !e.newValue) {
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
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AdminProtectedRoute;