// Auth Layout - Layout for authentication pages without footer
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from './Navbar/Navbar'; 

const AuthLayout = () => {
  const navbarRef = useRef(null);

  // Sets a CSS variable for the navbar height
  // Fixed elements like the mobile menu to start below the navbar
  useEffect(() => {
    const setNavbarHeight = () => {
      if (navbarRef.current) {
        const height = navbarRef.current.offsetHeight;
        document.documentElement.style.setProperty('--navbar-height', `${height}px`);
        
        // Add responsive padding to ensure breadcrumbs are never covered
        const additionalPadding = window.innerWidth >= 1024 ? 12 : window.innerWidth >= 768 ? 8 : 4;
        const totalPadding = height + additionalPadding;
        document.documentElement.style.setProperty('--content-padding-top', `${totalPadding}px`);
      }
    };

    // Set height on mount and on resize
    setNavbarHeight();
    window.addEventListener('resize', setNavbarHeight);

    // Also recalculate on orientation change for mobile devices
    window.addEventListener('orientationchange', () => {
      setTimeout(setNavbarHeight, 100); // Small delay to let orientation change complete
    });

    // Cleanup listeners on unmount
    return () => {
      window.removeEventListener('resize', setNavbarHeight);
      window.removeEventListener('orientationchange', setNavbarHeight);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar ref={navbarRef} /> {/* Pass ref to Navbar */}
      <main className="flex-grow" style={{ paddingTop: 'var(--content-padding-top, 120px)' }}>
        <Outlet /> {/* This is where nested route components (like Login, Signup, etc.) will render */}
      </main>
      {/* No Footer component here */}
    </div>
  );
};

export default AuthLayout;
