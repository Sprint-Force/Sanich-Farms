// Main Layout Components
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom'; 
import Navbar from './Navbar/Navbar'; 
import Footer from './Footer/Footer'; 

const MainLayout = () => {
  const navbarRef = useRef(null);

  // Sets a CSS variable for the navbar height
  // Fixed elements like the mobile menu to start below the navbar
  useEffect(() => {
    const setNavbarHeight = () => {
      if (navbarRef.current) {
        document.documentElement.style.setProperty('--navbar-height', `${navbarRef.current.offsetHeight}px`);
      }
    };

    // Set height on mount and on resize
    setNavbarHeight();
    window.addEventListener('resize', setNavbarHeight);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener('resize', setNavbarHeight);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar ref={navbarRef} /> {/* Pass ref to Navbar */}
      <main className="flex-grow">
        <Outlet /> {/* This is where nested route components (like Home, Login, etc.) will render */}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;