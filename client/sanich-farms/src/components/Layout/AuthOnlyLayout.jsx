// AuthOnlyLayout - Layout for authentication pages without navbar and footer
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const AuthOnlyLayout = () => {
  // Prevent scrolling when on auth pages
  useEffect(() => {
    // Add overflow hidden to body when auth layout mounts
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Cleanup - restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Full height container without any navigation */}
      <main className="h-screen overflow-hidden flex items-center justify-center">
        <Outlet /> {/* This is where auth components (Login, Signup, etc.) will render */}
      </main>
    </div>
  );
};

export default AuthOnlyLayout;
