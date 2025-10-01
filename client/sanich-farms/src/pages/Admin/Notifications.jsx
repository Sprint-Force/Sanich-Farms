import React, { useState, useEffect } from 'react';
import { 
  FiBell, 
  FiShoppingBag, 
  FiBook, 
  FiClock, 
  FiCheck, 
  FiX,
  FiRefreshCw,
  FiFilter,
  FiSearch
} from 'react-icons/fi';
import { ordersAPI, bookingsAPI } from '../../services/api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all'); // all, orders, bookings, read, unread
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const [ordersRes, bookingsRes] = await Promise.allSettled([
          ordersAPI.getAll(),
          bookingsAPI.getAll()
        ]);

        const allNotifications = [];

        // Add orders to notifications
        if (ordersRes.status === 'fulfilled') {
          const orders = Array.isArray(ordersRes.value) ? ordersRes.value : ordersRes.value?.orders || [];
          const orderNotifications = orders.map(order => ({
            id: `order-${order.id || order._id}`,
            type: 'order',
            title: 'New Order Placed',
            message: `Order from ${order.first_name && order.last_name ? `${order.first_name} ${order.last_name}` : order.email || 'Customer'}`,
            time: order.createdAt || order.date || new Date().toISOString(),
            amount: order.total || order.amount || 0,
            status: order.status || 'pending',
            unread: true,
            details: order
          }));
          allNotifications.push(...orderNotifications);
        }

        // Add bookings to notifications
        if (bookingsRes.status === 'fulfilled') {
          const bookings = Array.isArray(bookingsRes.value) ? bookingsRes.value : bookingsRes.value?.bookings || [];
          const bookingNotifications = bookings.map(booking => ({
            id: `booking-${booking.id || booking._id}`,
            type: 'booking',
            title: 'New Service Booked',
            message: `${booking.service || 'Service'} booked by ${booking.name || booking.customerName || 'Customer'}`,
            time: booking.createdAt || booking.date || new Date().toISOString(),
            status: booking.status || 'pending',
            unread: true,
            details: booking
          }));
          allNotifications.push(...bookingNotifications);
        }

        // Sort by time (most recent first)
        allNotifications.sort((a, b) => new Date(b.time) - new Date(a.time));
        
        setNotifications(allNotifications);
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, unread: false } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const formatTime = (time) => {
    const date = new Date(time);
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const getStatusColor = (status) => {
    const statusLower = status.toLowerCase();
    switch (statusLower) {
      case 'completed': case 'delivered': case 'fulfilled':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': case 'processing':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shipped': case 'in_transit':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'cancelled': case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = 
      filter === 'all' ||
      (filter === 'orders' && notification.type === 'order') ||
      (filter === 'bookings' && notification.type === 'booking') ||
      (filter === 'read' && !notification.unread) ||
      (filter === 'unread' && notification.unread);

    const matchesSearch = 
      searchTerm === '' ||
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-xl">
              <FiBell className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">
                {unreadCount > 0 
                  ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
                  : 'All caught up!'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Mark all read</span>
              </button>
            )}
            
            <button
              onClick={() => window.location.reload()}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <FiRefreshCw className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center space-x-2">
            <FiFilter className="w-4 h-4 text-gray-400" />
            {['all', 'orders', 'bookings', 'unread', 'read'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-3 py-1 text-sm font-medium rounded-lg transition-colors ${
                  filter === filterOption
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filterOption.charAt(0).toUpperCase() + filterOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <FiRefreshCw className="w-6 h-6 text-gray-400 animate-spin mr-3" />
            <span className="text-gray-600">Loading notifications...</span>
          </div>
        ) : filteredNotifications.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div 
                key={notification.id}
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  notification.unread ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl flex-shrink-0 ${
                    notification.type === 'order' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-blue-100 text-blue-600'
                  }`}>
                    {notification.type === 'order' ? (
                      <FiShoppingBag className="w-5 h-5" />
                    ) : (
                      <FiBook className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {notification.title}
                        </h3>
                        <p className="text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center text-gray-500">
                            <FiClock className="w-4 h-4 mr-1" />
                            {formatTime(notification.time)}
                          </div>
                          
                          {notification.amount && (
                            <div className="font-medium text-green-600">
                              GH₵{Number(notification.amount).toLocaleString()}
                            </div>
                          )}
                          
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-lg border ${getStatusColor(notification.status)}`}>
                            {notification.status}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        {notification.unread && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 text-green-600 hover:bg-green-100 rounded transition-colors"
                            title="Mark as read"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                        )}
                        
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                          title="Delete notification"
                        >
                          <FiX className="w-4 h-4" />
                        </button>
                        
                        {notification.unread && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <FiBell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
            <p className="text-gray-600">
              {searchTerm || filter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'You\'re all caught up! New notifications will appear here.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;