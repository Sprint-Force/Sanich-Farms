import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isAuthenticated, loading } = useAuthContext();
  const location = useLocation();

  // Show loading spinner while checking authentication status
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // If route requires authentication and user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Save attempted location for redirect after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route doesn't require authentication and user is authenticated
  // (e.g., login page when already logged in)
  if (!requireAuth && isAuthenticated) {
    // Redirect to dashboard or intended location
    return <Navigate to="/dashboard" replace />;
  }

  // User has appropriate access, render the children
  return children;
};

export default ProtectedRoute;
