import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiUser, FiShoppingBag, FiCalendar, FiHeart, FiSettings, FiLogOut, FiX, FiCreditCard } from 'react-icons/fi';
import { useAuthContext } from '../hooks/useAuthContext';

// Import dashboard section components
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import MyOrders from '../components/Dashboard/MyOrders';
import MyBookings from '../components/Dashboard/MyBookings';
import MyProfile from '../components/Dashboard/MyProfile';
import PaymentsWallet from '../components/Dashboard/PaymentsWallet'; // DASHBOARD AUDIT FIX: Add payments section
import WishlistPage from './WishlistPage'; // Reusing existing WishlistPage

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation(); // To get current path
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // LOGOUT UI FIX: Add modal state
  const { logout } = useAuthContext(); // LOGOUT FIX: Get logout function from auth context

  // DASHBOARD AUDIT FIX: Enhanced active section detection
  const getActiveSection = () => {
    if (location.pathname.includes('/dashboard/orders')) return 'orders';
    if (location.pathname.includes('/dashboard/bookings')) return 'bookings';
    if (location.pathname.includes('/dashboard/profile')) return 'profile';
    if (location.pathname.includes('/dashboard/payments')) return 'payments';
    if (location.pathname.includes('/dashboard/wishlist')) return 'wishlist';
    return 'overview'; // Default to overview
  };

  const activeSection = getActiveSection();

  // LOGOUT UI FIX: Handle ESC key to close logout modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showLogoutModal) {
        setShowLogoutModal(false);
      }
    };

    if (showLogoutModal) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showLogoutModal]);

  // MOBILE MENU FIX: Cleanup navbar visibility on component unmount
  useEffect(() => {
    return () => {
      // Ensure navbar is visible when leaving dashboard
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, []);

  // LOGOUT UI FIX: Show logout confirmation modal
  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  // LOGOUT UI FIX: Confirm logout action
  const confirmLogout = async () => {
    try {
      console.log('Confirm logout called');
      
      // Clear authentication state (user data, tokens, localStorage)
      logout();
      
      console.log('Logout completed, using window.location to navigate to homepage...');
      // Use window.location for a clean redirect that bypasses React Router
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      alert('There was an error logging out. Please try again.');
    }
  };

  // LOGOUT UI FIX: Cancel logout action
  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    // MOBILE MENU FIX: Hide/show navbar when dashboard menu toggles
    const navbar = document.querySelector('header');
    if (navbar) {
      if (!isMobileMenuOpen) {
        // Opening mobile menu - hide navbar
        navbar.style.display = 'none';
      } else {
        // Closing mobile menu - show navbar
        navbar.style.display = 'block';
      }
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    
    // MOBILE MENU FIX: Show navbar when mobile menu is closed
    const navbar = document.querySelector('header');
    if (navbar) {
      navbar.style.display = 'block';
    }
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen flex flex-col">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">My Dashboard</span>
        </div>
      </div>

      {/* Main Dashboard Content Area Wrapper */}
      {/* This container will be block on mobile, and flex on large screens */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:flex relative">

        {/* Sidebar Navigation */}
        {/* On mobile, this is fixed and slides in/out. On large screens, it's static. */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg p-6 flex flex-col border-r border-gray-200
                          transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0
                          transition-transform duration-300 ease-in-out lg:rounded-xl lg:h-fit`}>
          {/* Close button for mobile sidebar */}
          <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
            <button
              onClick={closeMobileMenu}
              className="lg:hidden text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200"
              aria-label="Close dashboard menu"
            >
              <FiX size={24} />
            </button>
          </div>
          <nav className="flex-1 space-y-2 overflow-y-auto pb-4">
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'overview' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiHome size={20} /> Dashboard Overview
            </Link>
            <Link
              to="/dashboard/orders"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'orders' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiShoppingBag size={20} /> My Orders
            </Link>
            <Link
              to="/dashboard/bookings"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'bookings' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiCalendar size={20} /> My Bookings
            </Link>
            {/* DASHBOARD AUDIT FIX: Add payments section like Amazon */}
            <Link
              to="/dashboard/payments"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'payments' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiCreditCard size={20} /> Payments & Wallet
            </Link>
            <Link
              to="/dashboard/profile"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'profile' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiUser size={20} /> My Profile
            </Link>
            {/* DASHBOARD AUDIT FIX: Add wishlist back with proper navigation */}
            <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'wishlist' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiHeart size={20} /> My Wishlist
            </Link>
          </nav>
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-200"
            >
              <FiLogOut size={20} /> Logout
            </button>
          </div>
        </aside>

        {/* Overlay for mobile menu - covers main content when sidebar is open */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* Content Area */}
        {/* This div now acts as the main content area for both mobile and desktop. */}
        {/* On mobile, it's always w-full. The mobile menu button is inside it. */}
        <main className={`flex-1 w-full lg:ml-8 bg-white rounded-xl shadow-md p-6 sm:p-8
                         ${isMobileMenuOpen ? 'hidden' : 'block'}`}> {/* Hide main content when mobile menu is open */}
          {/* Mobile Menu Toggle Button - Moved inside main content to manage its layout */}
          <div className="lg:hidden w-full mb-6">
            <button
              onClick={toggleMobileMenu}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300 shadow-md"
              aria-label="Toggle Dashboard Menu"
            >
              <FiSettings size={20} />
              {isMobileMenuOpen ? 'Close Menu' : 'Open Dashboard Menu'}
            </button>
          </div>
          <Outlet /> {/* Renders the nested route component */}
        </main>
      </div>

      {/* LOGOUT UI FIX: Logout Confirmation Modal */}
      {showLogoutModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={cancelLogout} // Close on backdrop click
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiLogOut className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Confirm Logout</h3>
                  <p className="text-sm text-gray-500">Are you sure you want to sign out?</p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                You will be logged out of your account and redirected to the homepage. 
                Any unsaved changes may be lost.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboardPage;
