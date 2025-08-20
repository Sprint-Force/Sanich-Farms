import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { setLoggingOut } from '../../services/api';

const AdminLogout = () => {
  const [loggedOut, setLoggedOut] = useState(false);
  const { logout } = useAuthContext();

  useEffect(() => {
    const performLogout = () => {
      try {
        // Set the logging out flag to prevent API interceptor redirects
        setLoggingOut(true);
        
        // Use the main auth context logout function
        // This will clear both main auth and admin auth data
        if (logout) {
          logout();
        } else {
          // Fallback: manually clear all auth data
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          
          // Clear all localStorage items that start with 'admin'
          const keysToRemove = [];
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('admin')) {
              keysToRemove.push(key);
            }
          }
          keysToRemove.forEach(key => localStorage.removeItem(key));
        }
        
        // Small delay to ensure localStorage is cleared and then reset logging out flag
        setTimeout(() => {
          setLoggingOut(false);
          setLoggedOut(true);
        }, 200);
        
      } catch (error) {
        console.error('Error during logout:', error);
        // Even if there's an error, still redirect to login
        setLoggingOut(false);
        setLoggedOut(true);
      }
    };

    performLogout();
  }, [logout]);

  // Show loading while logging out
  if (!loggedOut) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Logging out...</p>
        </div>
      </div>
    );
  }

  // Redirect to normal login page with state indicating admin logout
  return <Navigate to="/login" state={{ fromAdminLogout: true }} replace />;
};

export default AdminLogout;
