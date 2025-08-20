import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiPackage, FiSearch, FiTruck, FiMapPin, FiPhone, FiMail, FiEye, FiClock } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';
import { ordersAPI } from '../services/api';

const TrackOrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { addToast } = useToast();

  // Load order history on component mount
  useEffect(() => {
    const loadOrderHistory = async () => {
      setLoading(true);
      try {
        // Fetch real orders from API
        const response = await ordersAPI.getAll();
        const ordersData = Array.isArray(response) ? response : 
                          Array.isArray(response?.orders) ? response.orders : 
                          response?.data || [];
        
        setOrders(ordersData);
        setFilteredOrders(ordersData);
        addToast('Order history loaded successfully!', 'success');
      } catch (error) {
        console.error('Failed to load order history:', error);
        addToast('Failed to load order history', 'error');
        // Set empty array on error
        setOrders([]);
        setFilteredOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrderHistory();
  }, [addToast]);

  // Filter orders based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = orders.filter(order => 
        order.id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.OrderItems?.some(item => 
          item.Product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchQuery, orders]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Order History</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FiPackage className="w-8 h-8 text-green-600" />
              <h1 className="text-3xl font-bold text-gray-800">Order History</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Track and view all your previous orders
            </p>
          </div>
          
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="animate-pulse space-y-6">
              <div className="h-8 bg-gray-200 rounded w-1/3"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Orders List */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'No matching orders found' : 'No orders yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery 
                    ? 'Try adjusting your search criteria.'
                    : 'Start shopping to see your orders here.'
                  }
                </p>
                {!searchQuery && (
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FiPackage className="w-4 h-4" />
                    Start Shopping
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredOrders.map((order) => (
                  <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    {/* Order Header */}
                    <div className="p-6 border-b border-gray-100">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.id}
                          </h3>
                          <p className="text-gray-600">
                            Placed on {new Date(order.ordered_at || order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                          <span className="text-lg font-semibold text-gray-900">
                            GH₵{(order.total_amount || order.totalAmount || 0).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="p-6 border-b border-gray-100">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Items Ordered</h4>
                      <div className="space-y-3">
                        {order.OrderItems?.map((item, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex-1">
                              <h5 className="font-medium text-gray-800">{item.Product?.name}</h5>
                              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                            </div>
                            <p className="font-semibold text-gray-800">
                              GH₵{((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Actions */}
                    <div className="px-6 py-4 bg-gray-50 flex flex-col sm:flex-row gap-3 justify-end">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
                        <FiEye className="w-4 h-4" />
                        View Details
                      </button>
                      {order.status !== 'delivered' && order.status !== 'cancelled' && (
                        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                          <FiTruck className="w-4 h-4" />
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-white rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-600 mb-6">
            If you have any questions about your orders, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:0243826137"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
            >
              <FiPhone className="w-4 h-4" />
              Call: 0243826137
            </a>
            <a
              href="mailto:Sanichfarms@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiMail className="w-4 h-4" />
              Email Support
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
