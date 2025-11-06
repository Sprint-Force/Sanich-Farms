import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight, FiUser, FiShoppingBag, FiCalendar, FiMenu, FiLogOut, FiX, FiTruck } from 'react-icons/fi';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToast } from '../context/ToastContext';

const UserDashboardPage = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { logout } = useAuthContext();
  const { addToast } = useToast();

  const getActiveSection = () => {
    if (location.pathname.includes('/dashboard/orders')) return 'orders';
    if (location.pathname.includes('/dashboard/bookings')) return 'bookings';
    if (location.pathname.includes('/dashboard/profile')) return 'profile';
    if (location.pathname.includes('/dashboard/track-orders')) return 'track-orders';
    return 'overview';
  };

  const activeSection = getActiveSection();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showLogoutModal) {
        setShowLogoutModal(false);
      }
    };

    if (showLogoutModal) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [showLogoutModal]);

  useEffect(() => {
    return () => {
      const navbar = document.querySelector('header');
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, []);

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = async () => {
    try {
      logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      addToast('There was an error logging out. Please try again.', 'error');
    }
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    
    const navbar = document.querySelector('header');
    if (navbar) {
      if (!isMobileMenuOpen) {
        navbar.style.display = 'none';
      } else {
        navbar.style.display = 'block';
      }
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    
    const navbar = document.querySelector('header');
    if (navbar) {
      navbar.style.display = 'block';
    }
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen flex flex-col">
      {/* Breadcrumbs */}
      <div className="w-full breadcrumb-modern py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link flex items-center gap-1.5 sm:gap-2 text-slate-600 hover:text-green-600 transition-colors duration-200" aria-label="Go to Home page">
              <FiHome className="w-4 h-4 sm:w-4 sm:h-4 flex-shrink-0" />
              <span className="font-medium text-xs sm:text-sm hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 breadcrumb-separator text-gray-400 flex-shrink-0" />
            <span className="breadcrumb-current text-xs sm:text-sm md:text-base font-semibold text-gray-800">My Dashboard</span>
          </nav>
        </div>
      </div>
            
      <div className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 lg:py-12 lg:flex relative">

        {/* Sidebar Navigation */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-72 sm:w-80 md:w-64 bg-white shadow-lg p-4 sm:p-6 flex flex-col border-r border-gray-200
                          transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0 lg:flex lg:flex-shrink-0
                          transition-transform duration-300 ease-in-out lg:rounded-xl lg:h-fit`}>
          <div className="flex justify-between items-center mb-4 sm:mb-6 border-b pb-3 sm:pb-4 border-gray-200">
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={closeMobileMenu}
                className="lg:hidden text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                aria-label="Close dashboard menu"
              >
                <FiX size={20} className="sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
          <nav className="flex-1 space-y-1 sm:space-y-2 overflow-y-auto pb-4">
            <Link
              to="/dashboard"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-colors duration-200 min-h-[44px] w-full
                ${activeSection === 'overview' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiHome size={18} className="sm:w-5 sm:h-5 flex-shrink-0" /> <span>Dashboard Overview</span>
            </Link>
            <Link
              to="/dashboard/orders"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-colors duration-200 min-h-[44px] w-full
                ${activeSection === 'orders' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiShoppingBag size={18} className="sm:w-5 sm:h-5 flex-shrink-0" /> <span>My Orders</span>
            </Link>
            <Link
              to="/dashboard/track-orders"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-colors duration-200 min-h-[44px] w-full
                ${activeSection === 'track-orders' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiTruck size={18} className="sm:w-5 sm:h-5 flex-shrink-0" /> <span>Track Orders</span>
            </Link>
            <Link
              to="/dashboard/bookings"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-colors duration-200 min-h-[44px] w-full
                ${activeSection === 'bookings' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiCalendar size={18} className="sm:w-5 sm:h-5 flex-shrink-0" /> <span>My Bookings</span>
            </Link>
            <Link
              to="/dashboard/profile"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium transition-colors duration-200 min-h-[44px] w-full
                ${activeSection === 'profile' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiUser size={18} className="sm:w-5 sm:h-5 flex-shrink-0" /> <span>My Profile</span>
            </Link>
          </nav>
          <div className="mt-auto pt-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 sm:px-4 py-3 rounded-lg text-sm sm:text-base lg:text-lg font-medium text-red-600 hover:bg-red-50 transition-colors duration-200 min-h-[44px]"
            >
              <FiLogOut size={18} className="sm:w-5 sm:h-5 flex-shrink-0" /> <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-white/20 z-30 lg:hidden"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* Main Content */}
        <main className={`flex-1 w-full lg:ml-6 xl:ml-8 bg-white rounded-xl shadow-md p-3 sm:p-4 md:p-6
                         ${isMobileMenuOpen ? 'hidden' : 'block'}`}>
          {/* Mobile Menu Button */}
          <div className="lg:hidden w-full mb-3 sm:mb-4 flex items-center justify-between">
            <button
              onClick={toggleMobileMenu}
              className="px-4 py-3 sm:px-5 sm:py-3 rounded-lg text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-all duration-200 font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform hover:scale-105 min-h-[44px] flex items-center gap-2"
              aria-label={isMobileMenuOpen ? 'Close dashboard menu' : 'Open dashboard menu'}
            >
              <FiMenu size={18} className="sm:w-5 sm:h-5" />
              <span>Menu</span>
            </button>
            <div className="text-xs sm:text-sm md:text-base font-semibold text-gray-800">My Dashboard</div>
          </div>
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={cancelLogout}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-sm sm:max-w-md w-full mx-3 sm:mx-4 transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FiLogOut className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Confirm Logout</h3>
                  <p className="text-xs sm:text-sm text-gray-500">Are you sure you want to sign out?</p>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
                You will be logged out of your account and redirected to the homepage. 
                Any unsaved changes may be lost.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={cancelLogout}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors duration-200 text-sm sm:text-base min-h-[44px] flex items-center justify-center"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmLogout}
                  className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors duration-200 flex items-center justify-center gap-2 text-sm sm:text-base min-h-[44px]"
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
