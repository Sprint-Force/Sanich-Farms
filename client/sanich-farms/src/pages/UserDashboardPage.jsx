import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiUser, FiShoppingBag, FiCalendar, FiHeart, FiMenu, FiLogOut, FiX, FiCreditCard, FiTruck, FiBell, FiCheck } from 'react-icons/fi';
import { useAuthContext } from '../hooks/useAuthContext';
import { notificationsAPI } from '../services/api';

// Import dashboard section components
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import MyOrders from '../components/Dashboard/MyOrders';
import MyBookings from '../components/Dashboard/MyBookings';
import MyProfile from '../components/Dashboard/MyProfile';
import PaymentsWallet from '../components/Dashboard/PaymentsWallet'; // DASHBOARD AUDIT FIX: Add payments section
import TrackOrders from '../components/Dashboard/TrackOrders'; // NEW: Add track orders component
import WishlistPage from './WishlistPage'; // Reusing existing WishlistPage

const UserDashboardPage = () => {
  const location = useLocation(); // To get current path
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // LOGOUT UI FIX: Add modal state
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { logout, user } = useAuthContext(); // LOGOUT FIX: Get logout function from auth context

  // DASHBOARD AUDIT FIX: Enhanced active section detection
  const getActiveSection = () => {
    if (location.pathname.includes('/dashboard/orders')) return 'orders';
    if (location.pathname.includes('/dashboard/bookings')) return 'bookings';
    if (location.pathname.includes('/dashboard/profile')) return 'profile';
    if (location.pathname.includes('/dashboard/payments')) return 'payments';
    if (location.pathname.includes('/dashboard/wishlist')) return 'wishlist';
    if (location.pathname.includes('/dashboard/track-orders')) return 'track-orders';
    return 'overview'; // Default to overview
  };

  const activeSection = getActiveSection();

  // Fetch user notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await notificationsAPI.getAll();
        const allNotifications = response.data || [];
        
        // Transform backend fields to match frontend expectations
        const transformedNotifications = allNotifications
          .map(notification => ({
            id: notification.id,
            userId: notification.user_id,
            type: notification.type,
            title: notification.title,
            message: notification.message,
            time: notification.created_at,
            unread: !notification.is_read
          }));
        
        // Filter notifications based on user role and only show unread for header display
        let filteredNotifications;
        if (user?.role === 'admin') {
          // Admins see all unread notifications
          filteredNotifications = transformedNotifications.filter(notification => notification.unread);
        } else {
          // Regular users see only their own unread notifications or global notifications (user_id is null)
          filteredNotifications = transformedNotifications.filter(notification => 
            notification.unread && (notification.userId === user?.id || notification.userId === null)
          );
        }
        
        // Sort and limit for header display
        const displayNotifications = filteredNotifications
          .sort((a, b) => new Date(b.time) - new Date(a.time))
          .slice(0, 10);
        
        setNotifications(displayNotifications);
        setUnreadCount(displayNotifications.length);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
        // Fallback to empty state on error
        setNotifications([]);
        setUnreadCount(0);
      }
    };

    if (user?.id) {
      fetchNotifications();
      
      // Refresh notifications every 3 minutes for users
      const interval = setInterval(fetchNotifications, 3 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, [user?.id, user?.role]);

  // Update browser tab title with notification count
  useEffect(() => {
    const baseTitle = 'My Dashboard - Sanich Farms';
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) ${baseTitle}`;
    } else {
      document.title = baseTitle;
    }
    
    return () => {
      document.title = baseTitle; // Reset on unmount
    };
  }, [unreadCount]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifications && !event.target.closest('.notifications-dropdown')) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifications]);

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
      // Clear authentication state (user data, tokens, localStorage)
      logout();
      
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

  const markAsRead = async (notificationId) => {
    try {
      await notificationsAPI.markAsRead(notificationId);
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, unread: false } : n)
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Failed to mark notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationsAPI.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read:', error);
    }
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString();
  };

  const handleNotificationClick = async (notification) => {
    // Mark as read when clicked
    if (notification.unread) {
      await markAsRead(notification.id);
    }
    
    // Close the notification dropdown
    setShowNotifications(false);
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'order':
        // Extract order ID from notification data or navigate to orders page
        navigate('/dashboard/orders');
        break;
      case 'booking':
        // Extract booking ID from notification data or navigate to bookings page
        navigate('/dashboard/bookings');
        break;
      case 'payment':
        // Navigate to payments/wallet page
        navigate('/dashboard/payments');
        break;
      case 'system':
      default:
        // For system notifications, stay on current page or go to overview
        navigate('/dashboard');
        break;
    }
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
      {/* Modern Breadcrumbs - Clean & Responsive */}
      <div className="w-full breadcrumb-modern">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 xs:gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link flex items-center gap-1 text-slate-600 hover:text-green-600" aria-label="Go to Home page">
              <FiHome className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              <span className="font-medium hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 breadcrumb-separator" />
            <span className="breadcrumb-current text-sm xs:text-base font-semibold">My Dashboard</span>
          </nav>
        </div>
      </div>
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
            <div className="flex items-center space-x-2">
              {/* Notification Icon for Desktop Sidebar */}
              <div className="relative notifications-dropdown hidden lg:block">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="View notifications"
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown for Desktop */}
                {showNotifications && (
                  <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                    <div className="p-3 sm:p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Notifications</h3>
                        {unreadCount > 0 && (
                          <button
                            onClick={markAllAsRead}
                            className="text-xs sm:text-sm text-blue-600 hover:text-blue-800"
                          >
                            Mark all read
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div
                            key={notification.id}
                            onClick={() => handleNotificationClick(notification)}
                            className={`p-3 sm:p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                              notification.unread ? 'bg-blue-50/30' : ''
                            }`}
                          >
                            <div className="flex items-start space-x-2 sm:space-x-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                              }`}></div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                                  {notification.title}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xs text-gray-500">
                                    {formatTime(notification.time)}
                                  </span>
                                  {notification.unread && (
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        markAsRead(notification.id);
                                      }}
                                      className="text-xs text-blue-600 hover:text-blue-800"
                                    >
                                      Mark read
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          <FiBell className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-300" />
                          <p className="text-xs sm:text-sm">No notifications</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <button
                onClick={closeMobileMenu}
                className="lg:hidden text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                aria-label="Close dashboard menu"
              >
                <FiX size={24} />
              </button>
            </div>
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
              to="/dashboard/track-orders"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'track-orders' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiTruck size={20} /> Track Orders
            </Link>
            <Link
              to="/dashboard/bookings"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'bookings' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiCalendar size={20} /> My Bookings
            </Link>
            <Link
              to="/dashboard/notifications"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200 relative
                ${activeSection === 'notifications' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiBell size={20} /> 
              Notifications
              {unreadCount > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium ml-auto">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
            {/* Recently Viewed intentionally removed from sidebar to simplify dashboard */}
            {/* DASHBOARD AUDIT FIX: Add payments section like Amazon - HIDDEN FOR NOW */}
            {/* <Link
              to="/dashboard/payments"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'payments' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiCreditCard size={20} /> Payments & Wallet
            </Link> */}
            <Link
              to="/dashboard/profile"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'profile' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiUser size={20} /> My Profile
            </Link>
            {/* DASHBOARD AUDIT FIX: Add wishlist back with proper navigation - HIDDEN FOR NOW */}
            {/* <Link
              to="/wishlist"
              onClick={closeMobileMenu}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-lg font-medium transition-colors duration-200
                ${activeSection === 'wishlist' ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'}`}
            >
              <FiHeart size={20} /> My Wishlist
            </Link> */}
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
            className="fixed inset-0 backdrop-blur-sm bg-white/20 z-30 lg:hidden"
            onClick={closeMobileMenu}
          ></div>
        )}

        {/* Content Area */}
        {/* This div now acts as the main content area for both mobile and desktop. */}
        {/* On mobile, it's always w-full. The mobile menu button is inside it. */}
        <main className={`flex-1 w-full lg:ml-8 bg-white rounded-xl shadow-md p-4 sm:p-6
                         ${isMobileMenuOpen ? 'hidden' : 'block'}`}> {/* Hide main content when mobile menu is open */}
          {/* Mobile Menu Toggle Button - enhanced text button for small screens */}
          <div className="lg:hidden w-full mb-4 flex items-center justify-between">
            <button
              onClick={toggleMobileMenu}
              className="px-4 py-2.5 rounded-lg text-white bg-green-600 hover:bg-green-700 active:bg-green-800 transition-all duration-200 mobile-touch-target mobile-nav-button font-semibold text-sm shadow-md hover:shadow-lg transform hover:scale-105"
              aria-label={isMobileMenuOpen ? 'Close dashboard menu' : 'Open dashboard menu'}
            >
              Menu
            </button>
            <div className="text-sm font-semibold text-gray-800">My Dashboard</div>
            
            {/* Notification Icon for Mobile */}
            <div className="relative notifications-dropdown">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                aria-label="View notifications"
              >
                <FiBell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="p-3 sm:p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Notifications</h3>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="text-xs sm:text-sm text-blue-600 hover:text-blue-800"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className={`p-3 sm:p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors ${
                            notification.unread ? 'bg-blue-50/30' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                              notification.unread ? 'bg-blue-500' : 'bg-gray-300'
                            }`}></div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 line-clamp-1">
                                {notification.title}
                              </p>
                              <p className="text-xs sm:text-sm text-gray-600 mb-2 line-clamp-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {formatTime(notification.time)}
                                </span>
                                {notification.unread && (
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      markAsRead(notification.id);
                                    }}
                                    className="text-xs text-blue-600 hover:text-blue-800"
                                  >
                                    Mark read
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        <FiBell className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-300" />
                        <p className="text-xs sm:text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
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
