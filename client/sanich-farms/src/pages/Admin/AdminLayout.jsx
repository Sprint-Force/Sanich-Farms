import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  FiHome, 
  FiPackage, 
  FiShoppingBag, 
  FiUsers, 
  FiMenu,
  FiX,
  FiLogOut,
  FiBook,
  FiUser,
  FiTool,
  FiBell,
  FiChevronDown,
  FiAlertTriangle,
  FiExternalLink
} from 'react-icons/fi';
import { logo } from '../../assets';
import { ordersAPI, bookingsAPI, userAPI } from '../../services/api';

/**
 * AdminLayout - Main layout wrapper for admin dashboard
 * Features: Responsive sidebar, notifications, user profile management
 */
const AdminLayout = () => {
  // UI state management
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [adminUser, setAdminUser] = useState(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation configuration with external store link
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: FiHome },
    { name: 'Notifications', href: '/admin/notifications', icon: FiBell, badge: unreadCount },
    { name: 'Products', href: '/admin/products', icon: FiPackage },
    { name: 'Services', href: '/admin/services', icon: FiTool },
    { name: 'Orders', href: '/admin/orders', icon: FiShoppingBag },
    { name: 'Bookings', href: '/admin/bookings', icon: FiBook },
    { name: 'Users', href: '/admin/users', icon: FiUsers },
    { name: 'View Store', href: 'https://sanich-farms.vercel.app', icon: FiExternalLink, external: true },
  ];

  // Fetch admin user data on component mount
  useEffect(() => {
    const getAdminUser = async () => {
      try {
        // Check localStorage for user data
        const storedUser = localStorage.getItem('user');
        const adminAuth = localStorage.getItem('adminAuth');
        
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setAdminUser(userData);
        } else if (adminAuth) {
          const adminData = JSON.parse(adminAuth);
          setAdminUser(adminData);
        } else {
          // Fallback: try to fetch from API
          try {
            const userData = await userAPI.getProfile();
            setAdminUser(userData);
          } catch {
            // Set default admin data if API fails
            setAdminUser({ 
              name: 'Administrator', 
              email: 'admin@sanichfarms.com',
              role: 'admin' 
            });
          }
        }
      } catch {
        setAdminUser({ 
          name: 'Administrator', 
          email: 'admin@sanichfarms.com',
          role: 'admin' 
        });
      }
    };

    getAdminUser();
  }, []);

  // Fetch notifications from recent orders and bookings
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Get recent orders and bookings
        const [ordersRes, bookingsRes] = await Promise.allSettled([
          ordersAPI.getAll(),
          bookingsAPI.getAll()
        ]);

        const newNotifications = [];

        // Process recent orders (last 24 hours)
        if (ordersRes.status === 'fulfilled') {
          const orders = Array.isArray(ordersRes.value) ? ordersRes.value : ordersRes.value?.orders || [];
          const recentOrders = orders
            .filter(order => {
              const orderDate = new Date(order.createdAt || order.date);
              const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
              return orderDate >= dayAgo;
            })
            .slice(0, 5)
            .map(order => ({
              id: `order-${order.id || order._id}`,
              type: 'order',
              title: 'New Order Placed',
              message: `Order from ${order.first_name && order.last_name ? `${order.first_name} ${order.last_name}` : order.email || 'Customer'}`,
              time: order.createdAt || order.date,
              amount: order.total || order.amount || 0,
              unread: true
            }));
          newNotifications.push(...recentOrders);
        }

        // Add recent bookings to notifications
        if (bookingsRes.status === 'fulfilled') {
          const bookings = Array.isArray(bookingsRes.value) ? bookingsRes.value : bookingsRes.value?.bookings || [];
          const recentBookings = bookings
            .filter(booking => {
              const bookingDate = new Date(booking.createdAt || booking.date);
              const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
              return bookingDate >= dayAgo;
            })
            .slice(0, 5)
            .map(booking => ({
              id: `booking-${booking.id || booking._id}`,
              type: 'booking',
              title: 'New Service Booked',
              message: `${booking.service || 'Service'} booked by ${booking.name || booking.customerName || 'Customer'}`,
              time: booking.createdAt || booking.date,
              unread: true
            }));
          newNotifications.push(...recentBookings);
        }

        // Sort by time (most recent first)
        newNotifications.sort((a, b) => new Date(b.time) - new Date(a.time));
        
        setNotifications(newNotifications);
        setUnreadCount(newNotifications.filter(n => n.unread).length);
      } catch {
        // Silently handle notification fetch errors
      }
    };

    fetchNotifications();
    
    // Refresh notifications every 5 minutes
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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

  // Handle ESC key to close logout modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && showLogoutModal) {
        setShowLogoutModal(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [showLogoutModal]);

  // Handle logout functionality
  const handleLogout = () => {
    setShowLogoutModal(false);
    // Clear admin authentication data
    localStorage.removeItem('adminAuth');
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    
    // Navigate to login page
    navigate('/login', { 
      replace: true, 
      state: { fromAdminLogout: true } 
    });
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, unread: false } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    setUnreadCount(0);
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

  // Helper function to get admin display name
  const getAdminName = () => {
    if (!adminUser) return 'Admin';
    
    // Try different name formats
    if (adminUser.name) return adminUser.name;
    if (adminUser.first_name && adminUser.last_name) {
      return `${adminUser.first_name} ${adminUser.last_name}`;
    }
    if (adminUser.first_name) return adminUser.first_name;
    if (adminUser.email) {
      // Extract name from email (before @)
      const emailName = adminUser.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    
    return 'Administrator';
  };

  const getAdminInitials = () => {
    const name = getAdminName();
    if (name === 'Admin' || name === 'Administrator') return 'A';
    
    const words = name.split(' ');
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const isActive = (path) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <img 
              src={logo} 
              alt="Sanich Farms Logo" 
              className="w-8 h-8 object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">Sanich Farms</h1>
              <p className="text-xs text-gray-500">Admin Panel</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded text-gray-500 hover:text-gray-700"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = !item.external && isActive(item.href);
            
            if (item.external) {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                  </div>
                </a>
              );
            }

            return (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  active
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center">
                  <Icon className="w-5 h-5 mr-3" />
                  <span>{item.name}</span>
                </div>
                {item.badge && item.badge > 0 && (
                  <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                    {item.badge > 99 ? '99+' : item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Profile Section */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          <Link
            to="/admin/profile"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-100"
          >
            <FiUser className="w-5 h-5 mr-3" />
            Profile
          </Link>
          <button
            onClick={openLogoutModal}
            className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors"
          >
            <FiLogOut className="w-5 h-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            
            {/* Page title */}
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            </div>

            {/* Simple admin info and notifications */}
            <div className="flex items-center space-x-3">
              {/* Notifications */}
              <div className="relative notifications-dropdown" style={{ zIndex: 50000, isolation: 'isolate' }}>
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                  style={{ zIndex: 50000 }}
                >
                  <FiBell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium" style={{ zIndex: 50001 }}>
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <>
                    {/* Backdrop for mobile */}
                    <div className="fixed inset-0 bg-black/20 lg:hidden" onClick={() => setShowNotifications(false)} style={{ zIndex: 49998 }} />
                    
                    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 overflow-hidden backdrop-filter-none" style={{ zIndex: 50002 }}>
                      <div className="p-4 border-b border-gray-200 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                          <div className="flex items-center space-x-2">
                            {unreadCount > 0 && (
                              <button 
                                onClick={markAllAsRead}
                                className="text-sm text-green-600 hover:text-green-700 font-medium"
                              >
                                Mark all read
                              </button>
                            )}
                            <button 
                              onClick={() => setShowNotifications(false)}
                              className="p-1 rounded hover:bg-gray-200 lg:hidden"
                            >
                              <FiX className="w-4 h-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <div 
                            key={notification.id}
                            className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                              notification.unread ? 'bg-blue-50' : ''
                            }`}
                            onClick={() => markAsRead(notification.id)}
                          >
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${
                                notification.type === 'order' 
                                  ? 'bg-green-100 text-green-600' 
                                  : 'bg-blue-100 text-blue-600'
                              }`}>
                                {notification.type === 'order' ? (
                                  <FiShoppingBag className="w-4 h-4" />
                                ) : (
                                  <FiBook className="w-4 h-4" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 truncate">
                                  {notification.message}
                                </p>
                                <div className="flex items-center justify-between mt-1">
                                  <p className="text-xs text-gray-500">
                                    {formatTime(notification.time)}
                                  </p>
                                  {notification.amount && (
                                    <p className="text-xs font-medium text-green-600">
                                      ₦{Number(notification.amount).toLocaleString()}
                                    </p>
                                  )}
                                </div>
                              </div>
                              {notification.unread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-8 text-center">
                          <FiBell className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-gray-500 text-sm">No notifications yet</p>
                        </div>
                      )}
                    </div>
                    
                    {notifications.length > 0 && (
                      <div className="p-3 border-t border-gray-200 bg-gray-50">
                        <Link 
                          to="/admin/orders"
                          className="block text-center text-sm text-green-600 hover:text-green-700 font-medium"
                          onClick={() => setShowNotifications(false)}
                        >
                          View all orders
                        </Link>
                      </div>
                    )}
                    </div>
                  </>
                )}
              </div>

              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-xs font-semibold text-white">
                    {getAdminInitials()}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {getAdminName()}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop with blur effect */}
          <div 
            className="fixed inset-0 backdrop-blur-md transition-all duration-300"
            onClick={closeLogoutModal}
          ></div>
          
          {/* Modal */}
          <div className="flex items-center justify-center min-h-screen px-4 py-6">
            <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100">
              {/* Header */}
              <div className="flex items-center justify-center p-6 border-b border-gray-100">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                  <FiAlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
                  <p className="text-sm text-gray-500 mt-1">Are you sure you want to sign out?</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p className="text-gray-600 text-center">
                  You will be signed out of your admin account and redirected to the login page.
                </p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-100 bg-gray-50 rounded-b-xl">
                <button
                  onClick={closeLogoutModal}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                >
                  <FiLogOut className="w-4 h-4 mr-2 inline" />
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

export default AdminLayout;