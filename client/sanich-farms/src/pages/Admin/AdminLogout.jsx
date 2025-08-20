import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminLogout = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const performLogout = () => {
      try {
        // Clear admin authentication data
        localStorage.removeItem('adminAuth');
        
        // Clear any other admin-related data if needed
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        
        // Optional: Clear all localStorage items that start with 'admin'
        const keysToRemove = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && key.startsWith('admin')) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach(key => localStorage.removeItem(key));
        
        // Small delay to ensure localStorage is cleared
        setTimeout(() => {
          setLoggedOut(true);
        }, 100);
        
      } catch (error) {
        console.error('Error during logout:', error);
        // Even if there's an error, still redirect to login
        setLoggedOut(true);
      }
    };

    performLogout();
  }, []);

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

  // Redirect to normal login page
  return <Navigate to="/login" replace />;
};

export default AdminLogout;
