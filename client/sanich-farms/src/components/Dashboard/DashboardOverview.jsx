import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag, FiCalendar, FiUser, FiHeart } from 'react-icons/fi';
import { ordersData } from '../../data/ordersData'; // Import orders data
import { bookingsData } from '../../data/bookingsData'; // Import bookings data

const DashboardOverview = () => {
  // Use actual data for demonstration
  const recentOrders = ordersData.slice(0, 2); // Show last 2 orders
  const upcomingBookings = bookingsData.filter(b => b.status === 'Confirmed' || b.status === 'Pending').slice(0, 2); // Show last 2 upcoming

  const userName = "Sanich User"; // Placeholder for logged-in user's name

  return (
    <div className="space-y-8">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
        Welcome, {userName}!
      </h1>

      {/* Quick Stats/Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-green-50 rounded-lg p-6 shadow-sm flex items-center gap-4">
          <FiShoppingBag size={32} className="text-green-600" />
          <div>
            <p className="text-sm text-gray-600">Total Orders</p>
            <p className="text-2xl font-bold text-gray-800">{ordersData.length}</p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-lg p-6 shadow-sm flex items-center gap-4">
          <FiCalendar size={32} className="text-blue-600" />
          <div>
            <p className="text-sm text-gray-600">Total Bookings</p>
            <p className="text-2xl font-bold text-gray-800">{bookingsData.length}</p>
          </div>
        </div>
        <div className="bg-purple-50 rounded-lg p-6 shadow-sm flex items-center gap-4">
          <FiHeart size={32} className="text-purple-600" />
          <div>
            <p className="text-sm text-gray-600">Wishlist Items</p>
            <p className="text-2xl font-bold text-gray-800">7</p> {/* Placeholder, integrate with actual wishlist context if needed */}
          </div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-6 shadow-sm flex items-center gap-4">
          <FiUser size={32} className="text-yellow-600" />
          <div>
            <p className="text-sm text-gray-600">Profile Status</p>
            <p className="text-2xl font-bold text-gray-800">Complete</p>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-green-600 hover:underline text-sm font-medium">View All Orders</Link>
        </div>
        {recentOrders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {recentOrders.map(order => (
              <li key={order.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-gray-800 font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800 font-semibold">{order.total}</p>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
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
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <div className="flex justify-between items-center mb-4 border-b pb-3 border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Upcoming Bookings</h2>
          <Link to="/dashboard/bookings" className="text-green-600 hover:underline text-sm font-medium">View All Bookings</Link>
        </div>
        {upcomingBookings.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {upcomingBookings.map(booking => (
              <li key={booking.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="text-gray-800 font-medium">{booking.service}</p>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
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
