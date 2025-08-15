import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { 
  FiUsers, 
  FiShoppingBag, 
  FiDollarSign, 
  FiTrendingUp,
  FiPackage,
  FiHeart,
  FiShoppingCart,
  FiEye,
  FiCalendar,
  FiClock,
  FiChevronDown
} from 'react-icons/fi';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7days');
  const navigate = useNavigate();

  // Quick action handlers
  const handleQuickAction = (action) => {
    switch (action) {
      case 'add-product':
        navigate('/admin/products');
        break;
      case 'manage-orders':
        navigate('/admin/orders');
        break;
      case 'manage-bookings':
        navigate('/admin/bookings');
        break;
      case 'view-analytics':
        navigate('/admin/analytics');
        break;
      default:
        break;
    }
  };

  // Mock data - replace with real API calls
  const stats = {
    totalUsers: 1248,
    totalOrders: 856,
    totalRevenue: 45678.90,
    totalProducts: 234,
    totalBookings: 342,
    pendingOrders: 12,
    pendingBookings: 18,
    outOfStock: 8,
    wishlistItems: 345,
    cartItems: 167
  };

  const recentOrders = [
    { id: 'ORD001', customer: 'John Doe', amount: 125.50, status: 'Completed', date: '2024-08-07' },
    { id: 'ORD002', customer: 'Jane Smith', amount: 89.99, status: 'Pending', date: '2024-08-07' },
    { id: 'ORD003', customer: 'Mike Johnson', amount: 234.75, status: 'Processing', date: '2024-08-06' },
    { id: 'ORD004', customer: 'Sarah Wilson', amount: 67.25, status: 'Shipped', date: '2024-08-06' },
  ];

  const recentBookings = [
    { id: 'BKG001', customer: 'Alice Brown', service: 'Farm Consultation', status: 'Confirmed', date: '2024-08-10' },
    { id: 'BKG002', customer: 'Bob Davis', service: 'Equipment Training', status: 'Pending', date: '2024-08-09' },
    { id: 'BKG003', customer: 'Carol White', service: 'Crop Advisory', status: 'Completed', date: '2024-08-08' },
    { id: 'BKG004', customer: 'David Lee', service: 'Soil Testing', status: 'Confirmed', date: '2024-08-08' },
  ];

  const topProducts = [
    { name: 'Product A', sales: 145, revenue: 2175.00, stock: 23 },
    { name: 'Product B', sales: 98, revenue: 1470.00, stock: 45 },
    { name: 'Product C', sales: 87, revenue: 1305.00, stock: 12 },
    { name: 'Product D', sales: 76, revenue: 1140.00, stock: 34 },
  ];

  // eslint-disable-next-line no-unused-vars
  const StatCard = ({ icon: IconComponent, title, value, color, change }) => (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {change && (
            <p className={`text-sm mt-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last week
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          <IconComponent className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4 relative z-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="mt-4 sm:mt-0 relative">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none relative"
            >
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 py-8 relative z-0">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiUsers}
            title="Total Users"
            value={stats.totalUsers.toLocaleString()}
            color="bg-blue-500"
            change={12.5}
          />
          <StatCard
            icon={FiShoppingBag}
            title="Total Orders"
            value={stats.totalOrders.toLocaleString()}
            color="bg-green-500"
            change={8.2}
          />
          <StatCard
            icon={FiCalendar}
            title="Total Bookings"
            value={stats.totalBookings.toLocaleString()}
            color="bg-teal-500"
            change={18.7}
          />
          <StatCard
            icon={FiDollarSign}
            title="Total Revenue"
            value={`GH₵${stats.totalRevenue.toLocaleString()}`}
            color="bg-purple-500"
            change={15.3}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiPackage}
            title="Total Products"
            value={stats.totalProducts.toLocaleString()}
            color="bg-orange-500"
            change={5.1}
          />
          <StatCard
            icon={FiTrendingUp}
            title="Pending Orders"
            value={stats.pendingOrders}
            color="bg-yellow-500"
          />
          <StatCard
            icon={FiClock}
            title="Pending Bookings"
            value={stats.pendingBookings}
            color="bg-cyan-500"
          />
          <StatCard
            icon={FiPackage}
            title="Out of Stock"
            value={stats.outOfStock}
            color="bg-red-500"
          />
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={FiHeart}
            title="Wishlist Items"
            value={stats.wishlistItems}
            color="bg-pink-500"
          />
          <StatCard
            icon={FiShoppingCart}
            title="Cart Items"
            value={stats.cartItems}
            color="bg-indigo-500"
          />
          <div className="hidden lg:block"></div>
          <div className="hidden lg:block"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Recent Orders */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden sm:block">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        GH₵{order.amount}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <div key={order.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{order.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{order.customer}</div>
                  <div className="text-sm font-medium text-gray-900">GH₵{order.amount}</div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-3 border-t border-gray-200">
              <Link to="/admin/orders"className="text-green-600 hover:text-green-700 hover:underline text-sm font-medium flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                View all orders
              </Link>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Bookings</h3>
            </div>
            
            {/* Desktop Table View */}
            <div className="hidden sm:block">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {booking.id}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.customer}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.service}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden divide-y divide-gray-200">
              {recentBookings.map((booking) => (
                <div key={booking.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900">{booking.id}</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-1">{booking.customer}</div>
                  <div className="text-sm text-gray-500">{booking.service}</div>
                </div>
              ))}
            </div>
            
            <div className="px-6 py-3 border-t border-gray-200">
              <Link to="/admin/bookings" className="text-green-600 hover:text-green-700 hover:underline text-sm font-medium flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                View all bookings
              </Link>
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-white rounded-xl shadow-md border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Top Products</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={product.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">GH₵{product.revenue}</p>
                      <p className="text-sm text-gray-500">{product.stock} in stock</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-6 py-3 border-t border-gray-200">
              <Link to="/admin/products" className="text-green-600 hover:text-green-700 hover:underline text-sm font-medium flex items-center gap-1">
                <FiEye className="w-4 h-4" />
                View all products
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button 
              onClick={() => handleQuickAction('add-product')}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-medium transition"
            >
              Add New Product
            </button>
            <button 
              onClick={() => handleQuickAction('manage-orders')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition"
            >
              Manage Orders
            </button>
            <button 
              onClick={() => handleQuickAction('manage-bookings')}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-3 rounded-lg font-medium transition"
            >
              Manage Bookings
            </button>
            <button 
              onClick={() => handleQuickAction('view-analytics')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-3 rounded-lg font-medium transition"
            >
              View Analytics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;