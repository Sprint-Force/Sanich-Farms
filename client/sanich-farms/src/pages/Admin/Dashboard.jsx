import React, { useState, useEffect } from 'react';
import { 
  FiUsers, FiShoppingBag, FiPackage, FiCalendar, FiDollarSign, 
  FiSettings, FiChevronDown, FiExternalLink
} from 'react-icons/fi';
import { ordersAPI, bookingsAPI, productsAPI, adminUsersAPI } from '../../services/api';
import { useNavigate } from 'react-router-dom';

/**
 * Admin Dashboard - Main overview page with analytics and quick actions
 * Features: Stats cards, recent orders/bookings, time range filtering
 */
const Dashboard = () => {
  const navigate = useNavigate();
  
  // Data state management
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [timeRange, setTimeRange] = useState('7days');
  
  // Loading states
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingBookings, setLoadingBookings] = useState(true);
  const [dashboardError, setDashboardError] = useState(null);

  // Fetch all dashboard data
  const fetchDashboardData = async () => {
    setLoadingDashboard(true);
    setDashboardError(null);

    try {
      const [ordersResult, bookingsResult, productsResult, usersResult] = await Promise.allSettled([
        ordersAPI.getAll(),
        bookingsAPI.getAll(),
        productsAPI.getAll(),
        adminUsersAPI.getAll()
      ]);

      if (ordersResult.status === 'fulfilled') {
        const ordersList = Array.isArray(ordersResult.value) ? ordersResult.value : ordersResult.value?.orders || ordersResult.value?.data || [];
        setOrders(ordersList);
        setLoadingOrders(false);
      }

      if (bookingsResult.status === 'fulfilled') {
        const bookingsList = Array.isArray(bookingsResult.value) ? bookingsResult.value : bookingsResult.value?.bookings || bookingsResult.value?.data || [];
        setBookings(bookingsList);
        setLoadingBookings(false);
      }

      if (productsResult.status === 'fulfilled') {
        const productsList = Array.isArray(productsResult.value) ? productsResult.value : productsResult.value?.products || productsResult.value?.data || [];
        setProducts(productsList);
      }

      if (usersResult.status === 'fulfilled') {
        const usersList = Array.isArray(usersResult.value) ? usersResult.value : usersResult.value?.users || usersResult.value?.data || [];
        setUsers(usersList);
      }

    } catch {
      setDashboardError('Failed to load dashboard data. Please refresh to try again.');
    } finally {
      setLoadingDashboard(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [timeRange]);

  // Calculate stats
  const displayTotalUsers = users.length || 0;
  const displayTotalOrders = orders.length || 0;
  const displayTotalBookings = bookings.length || 0;

  // Helper function to get booking price (same as BookingMgmt.jsx)
  const getServicePrice = (booking) => booking?.Service?.price || booking?.price || 0;

  const displayTotalRevenue = orders
    .filter(order => ['completed', 'delivered', 'fulfilled'].includes(order.status?.toLowerCase()))
    .reduce((sum, order) => sum + (Number(order.total_amount) || 0), 0) +
    bookings
    .filter(booking => ['completed', 'fulfilled'].includes(booking.status?.toLowerCase()))
    .reduce((sum, booking) => sum + (Number(getServicePrice(booking)) || 0), 0);

  const displayLowStockCount = products.filter(p => Number(p.stock_quantity || p.stock) <= 10).length || 0;
  const displayActiveServices = products.filter(p => p.is_available !== false).length || 0;
  const displayActiveProducts = products.filter(p => p.is_available !== false && Number(p.stock_quantity || p.stock) > 0).length || 0;

  const displayRecentOrders = orders.slice(0, 5);
  const displayRecentBookings = bookings.slice(0, 5);

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase();
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

  // Stats data for consistent card rendering like other admin tabs
  const getStatsData = () => [
    {
      title: 'Total Users',
      value: displayTotalUsers,
      icon: FiUsers,
      color: 'blue'
    },
    {
      title: 'Total Orders', 
      value: displayTotalOrders,
      icon: FiShoppingBag,
      color: 'green'
    },
    {
      title: 'Total Bookings',
      value: displayTotalBookings, 
      icon: FiCalendar,
      color: 'yellow'
    },
    {
      title: 'Total Revenue',
      value: displayTotalRevenue,
      icon: FiDollarSign,
      color: 'green',
      prefix: 'GH₵'
    }
  ];

  return (
    <div className="w-full h-full bg-gray-50 p-3 sm:p-4 lg:p-6 relative">
      {loadingDashboard && (
        <div className="absolute inset-0 bg-white/80 z-[2] flex items-center justify-center rounded-lg">
          <div className="flex flex-col items-center space-y-3 text-gray-700">
            <div className="w-10 h-10 sm:w-12 sm:h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            <span className="font-semibold text-sm sm:text-base lg:text-lg">Loading dashboard...</span>
          </div>
        </div>
      )}

      {dashboardError && (
        <div className="mb-3 sm:mb-4 lg:mb-6">
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 sm:p-4 rounded-lg shadow-sm">
            <p className="text-xs sm:text-sm font-medium">{dashboardError}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="mb-3 sm:mb-4 lg:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3 lg:gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 mb-1 truncate">
              Dashboard
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-600 leading-relaxed">
              Monitor your farm operations and business metrics
            </p>
          </div>
          
          <div className="flex items-center justify-end flex-shrink-0">
            {/* Time Range Selector */}
            <div className="relative">
              <select 
                value={timeRange} 
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-2 sm:px-4 sm:py-2.5 pr-8 sm:pr-10 text-xs sm:text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-gray-300 transition-colors min-w-[120px] sm:min-w-[140px]"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
              <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mb-3 sm:mb-4 lg:mb-6">
        {getStatsData().map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5 sm:p-3 lg:p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-2">
                <p className={`text-xs sm:text-sm font-medium truncate mb-1 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'yellow' ? 'text-yellow-600' :
                  'text-gray-600'
                }`}>{stat.title}</p>
                <p className={`text-sm sm:text-base lg:text-lg xl:text-xl font-bold ${
                  stat.color === 'blue' ? 'text-blue-900' :
                  stat.color === 'green' ? 'text-green-900' :
                  stat.color === 'yellow' ? 'text-yellow-900' :
                  'text-gray-900'
                }`}>{stat.prefix || ''}{typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}</p>
              </div>
              <div className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'yellow' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                <stat.icon className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'yellow' ? 'text-yellow-600' :
                  'text-gray-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8">
        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-red-600" />
              </div>
            </div>
            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Low Stock Products</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {displayLowStockCount}
              </p>
            </div>
          </div>
        </div>

        {/* Active Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
            </div>
            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Products</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {displayActiveProducts}
              </p>
            </div>
          </div>
        </div>

        {/* Active Services */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FiSettings className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-green-600" />
              </div>
            </div>
            <div className="ml-3 sm:ml-4 flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Services</p>
              <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                {displayActiveServices}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 pb-4 sm:pb-6 lg:pb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate pr-2">Recent Orders</h3>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <FiShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <button 
                onClick={() => navigate('/admin/orders')}
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center space-x-1 transition-colors"
              >
                <span>View All</span>
                <FiExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          </div>
          
          {loadingOrders ? (
            <div className="space-y-2 sm:space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-1 sm:space-y-2">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayRecentOrders.length > 0 ? (
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
              {displayRecentOrders.slice(0, 5).map((order, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate('/admin/orders')}
                  className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                      <FiShoppingBag className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                        Order #{order.id}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {order.user?.email || order.email || 'No email'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      GH₵{order.total_amount ? Number(order.total_amount).toLocaleString() : '0'}
                    </p>
                    <span className={`inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <FiShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-500">No recent orders</p>
            </div>
          )}
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 truncate pr-2">Recent Bookings</h3>
            <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
              <FiCalendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              <button 
                onClick={() => navigate('/admin/bookings')}
                className="text-blue-600 hover:text-blue-800 text-xs sm:text-sm font-medium flex items-center space-x-1 transition-colors"
              >
                <span>View All</span>
                <FiExternalLink className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
            </div>
          </div>
          
          {loadingBookings ? (
            <div className="space-y-2 sm:space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-2 sm:space-x-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-1 sm:space-y-2">
                    <div className="h-3 sm:h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-2 sm:h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayRecentBookings.length > 0 ? (
            <div className="space-y-2 sm:space-y-3 max-h-64 sm:max-h-80 overflow-y-auto">
              {displayRecentBookings.slice(0, 5).map((booking, index) => (
                <div 
                  key={index} 
                  onClick={() => navigate('/admin/bookings')}
                  className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                      <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-900 truncate group-hover:text-green-700 transition-colors">
                        Booking #{booking.id}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {booking.user?.email || booking.email || 'No email'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-2">
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                      GH₵{getServicePrice(booking).toLocaleString()}
                    </p>
                    <span className={`inline-flex items-center px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <FiCalendar className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-gray-500">No recent bookings</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;