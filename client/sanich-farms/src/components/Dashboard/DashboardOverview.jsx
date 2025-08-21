import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiCalendar, FiUser, FiHeart, FiRepeat, FiShoppingCart, FiTrendingUp, FiCreditCard } from 'react-icons/fi';
import { ordersAPI, bookingsAPI } from '../../services/api'; // DASHBOARD API INTEGRATION: Import real APIs
import { useAuthContext } from '../../hooks/useAuthContext';

const DashboardOverview = () => {
  const { user } = useAuthContext();
  
  // DASHBOARD API INTEGRATION: State for real API data
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // DASHBOARD API INTEGRATION: Fetch dashboard data from APIs
  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Fetch all dashboard data in parallel
        const [ordersResponse, bookingsResponse] = await Promise.all([
          ordersAPI.getAll(),
          bookingsAPI.getAll()
        ]);

        // Handle different response structures
        const ordersData = Array.isArray(ordersResponse) ? ordersResponse : 
                          Array.isArray(ordersResponse?.orders) ? ordersResponse.orders : [];
        
        const bookingsData = Array.isArray(bookingsResponse) ? bookingsResponse : 
                            Array.isArray(bookingsResponse?.bookings) ? bookingsResponse.bookings : [];

        setOrders(ordersData);
        setBookings(bookingsData);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data');
        // Fallback to empty arrays
        setOrders([]);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Process data for display
  const recentOrders = orders.slice(0, 3);
  const upcomingBookings = bookings.filter(b => 
    b.status === 'Confirmed' || b.status === 'Pending'
  ).slice(0, 2);

  const userName = user?.name?.split(' ')[0] || 'User';

  // DASHBOARD API INTEGRATION: Calculate real statistics
  const totalSpent = orders.reduce((sum, order) => {
    const amount = parseFloat(order.total_amount || order.total || '0');
    return sum + amount;
  }, 0);
  
  const activeOrders = orders.filter(order => 
    order.status === 'Processing' || order.status === 'Shipped'
  ).length;
  
  const completedOrders = orders.filter(order => order.status === 'Delivered').length;

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-12 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-xl"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome back, {userName}!</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
        <button 
          onClick={() => window.location.reload()} 
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 md:mb-0">
          Welcome back, {userName}!
        </h1>
        {/* DASHBOARD AUDIT FIX: Add quick actions like Amazon */}
        <div className="flex flex-wrap gap-2">
          <Link to="/shop" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition duration-200">
            <FiShoppingCart size={16} />
            Shop Now
          </Link>
          <Link to="/services" className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-200">
            <FiCalendar size={16} />
            Book Service
          </Link>
        </div>
      </div>

      {/* DASHBOARD AUDIT FIX: Enhanced Quick Stats like Jumia/Amazon with real calculations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 lg:p-6 shadow-sm border border-green-200 min-h-[140px] xl:min-h-[160px]">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 text-white p-3 rounded-full flex-shrink-0">
                <FiShoppingBag size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-green-700 font-medium">Total Orders</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl lg:text-xl xl:text-2xl font-bold text-green-800">{orders.length}</p>
              <p className="text-xs text-green-600">{activeOrders} active</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6 shadow-sm border border-blue-200 min-h-[140px] xl:min-h-[160px]">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 text-white p-3 rounded-full flex-shrink-0">
                <FiCalendar size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-blue-700 font-medium">Service Bookings</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl lg:text-xl xl:text-2xl font-bold text-blue-800">{bookings.length}</p>
              <p className="text-xs text-blue-600">{upcomingBookings.length} upcoming</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 shadow-sm border border-purple-200 min-h-[140px] xl:min-h-[160px]">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 text-white p-3 rounded-full flex-shrink-0">
                <FiCreditCard size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-purple-700 font-medium">Total Spent</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xl lg:text-lg xl:text-xl font-bold text-purple-800 break-words">GH₵{totalSpent.toFixed(2)}</p>
              <p className="text-xs text-purple-600">All time</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 lg:p-6 shadow-sm border border-orange-200 min-h-[140px] xl:min-h-[160px]">
          <div className="flex flex-col space-y-3">
            <div className="flex items-center gap-3">
              <div className="bg-orange-600 text-white p-3 rounded-full flex-shrink-0">
                <FiTrendingUp size={24} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-orange-700 font-medium">Success Rate</p>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-2xl lg:text-xl xl:text-2xl font-bold text-orange-800">{orders.length > 0 ? Math.round((completedOrders / orders.length) * 100) : 0}%</p>
              <p className="text-xs text-orange-600">{completedOrders} delivered</p>
            </div>
          </div>
        </div>
      </div>

      {/* DASHBOARD AUDIT FIX: Quick Actions Section like Amazon "Your Account" shortcuts */}
      <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
        <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-4">
          <Link to="/dashboard/orders" className="flex flex-col items-center p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition duration-200 text-center">
            <FiShoppingBag className="w-6 h-6 lg:w-8 lg:h-8 text-green-600 mb-1 lg:mb-2" />
            <span className="text-xs lg:text-sm font-medium text-gray-700">Track Orders</span>
          </Link>
          <Link to="/shop" className="flex flex-col items-center p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition duration-200 text-center">
            <FiRepeat className="w-6 h-6 lg:w-8 lg:h-8 text-blue-600 mb-1 lg:mb-2" />
            <span className="text-xs lg:text-sm font-medium text-gray-700">Reorder</span>
          </Link>
          <Link to="/dashboard/bookings" className="flex flex-col items-center p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition duration-200 text-center">
            <FiCalendar className="w-6 h-6 lg:w-8 lg:h-8 text-purple-600 mb-1 lg:mb-2" />
            <span className="text-xs lg:text-sm font-medium text-gray-700">Manage Bookings</span>
          </Link>
          <Link to="/wishlist" className="flex flex-col items-center p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition duration-200 text-center">
            <FiHeart className="w-6 h-6 lg:w-8 lg:h-8 text-red-600 mb-1 lg:mb-2" />
            <span className="text-xs lg:text-sm font-medium text-gray-700">Wishlist</span>
          </Link>
          <Link to="/dashboard/profile" className="flex flex-col items-center p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition duration-200 text-center">
            <FiUser className="w-6 h-6 lg:w-8 lg:h-8 text-yellow-600 mb-1 lg:mb-2" />
            <span className="text-xs lg:text-sm font-medium text-gray-700">Account Settings</span>
          </Link>
          <Link to="/services" className="flex flex-col items-center p-3 lg:p-4 rounded-lg hover:bg-gray-50 transition duration-200 text-center">
            <FiShoppingCart className="w-6 h-6 lg:w-8 lg:h-8 text-indigo-600 mb-1 lg:mb-2" />
            <span className="text-xs lg:text-sm font-medium text-gray-700">Book Again</span>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 border-b pb-3 border-gray-200 gap-2">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-green-600 hover:underline text-sm font-medium self-start sm:self-center">View All Orders</Link>
        </div>
        {recentOrders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recentOrders.map(order => (
              <li key={order.id} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">Order #{order.id}</p>
                  <p className="text-sm text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date}</p>
                </div>
                <div className="flex flex-row sm:flex-col sm:text-right items-start sm:items-end gap-2 sm:gap-1">
                  <p className="text-gray-800 font-semibold">GH₵{order.total_amount || order.total}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {order.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No recent orders found.</p>
        )}
      </div>

      {/* Upcoming Bookings */}
      <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 border-b pb-3 border-gray-200 gap-2">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800">Upcoming Bookings</h2>
          <Link to="/dashboard/bookings" className="text-green-600 hover:underline text-sm font-medium self-start sm:self-center">View All Bookings</Link>
        </div>
        {upcomingBookings.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {upcomingBookings.map(booking => (
              <li key={booking.id} className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <div className="flex-1">
                  <p className="text-gray-800 font-medium">{booking.service || booking.service_name}</p>
                  <p className="text-sm text-gray-500">{booking.appointment_date ? new Date(booking.appointment_date).toLocaleDateString() : booking.date}</p>
                </div>
                <div className="flex sm:justify-end">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full flex-shrink-0 ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                    {booking.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No upcoming bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
