import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTruck, FiSearch, FiPackage, FiMapPin, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { ordersAPI } from '../../services/api';

const TrackOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  // Fetch user's orders - API version
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // Fetch real orders from API
        const response = await ordersAPI.getAll();
        const ordersData = Array.isArray(response) ? response : 
                          Array.isArray(response?.orders) ? response.orders : 
                          response?.data || [];
        
        // Add tracking data to orders
        const ordersWithTracking = ordersData.map(order => ({
          ...order,
          tracking: generateTrackingData(order.status, order.ordered_at || order.createdAt)
        }));
        
        setOrders(ordersWithTracking);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        setError('Failed to load orders. Please try again later.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Filter orders based on search query
  useEffect(() => {
    if (searchQuery.trim()) {
      const filtered = orders.filter(order => 
        order.id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders);
    }
  }, [searchQuery, orders]);

  // Generate tracking data based on order status and date
  const generateTrackingData = (status, createdAt) => {
    const orderDate = new Date(createdAt);
    const baseTracking = [
      { 
        status: 'Order Placed', 
        date: orderDate.toISOString(), 
        completed: true,
        description: 'Your order has been placed successfully'
      },
      { 
        status: 'Payment Confirmed', 
        date: new Date(orderDate.getTime() + 30 * 60000).toISOString(), 
        completed: true,
        description: 'Payment has been processed and confirmed'
      }
    ];

    const processingDate = new Date(orderDate.getTime() + 24 * 60 * 60000);
    const shippedDate = new Date(orderDate.getTime() + 48 * 60 * 60000);
    const deliveredDate = new Date(orderDate.getTime() + 72 * 60 * 60000);

    switch (status?.toLowerCase()) {
      case 'pending':
        return [...baseTracking];
      case 'processing':
        return [
          ...baseTracking,
          { 
            status: 'Processing', 
            date: processingDate.toISOString(), 
            completed: true,
            description: 'Your order is being prepared for shipment'
          }
        ];
      case 'shipped':
      case 'in transit':
        return [
          ...baseTracking,
          { 
            status: 'Processing', 
            date: processingDate.toISOString(), 
            completed: true,
            description: 'Your order is being prepared for shipment'
          },
          { 
            status: 'Shipped', 
            date: shippedDate.toISOString(), 
            completed: true,
            description: 'Your order is on the way'
          }
        ];
      case 'delivered':
        return [
          ...baseTracking,
          { 
            status: 'Processing', 
            date: processingDate.toISOString(), 
            completed: true,
            description: 'Your order is being prepared for shipment'
          },
          { 
            status: 'Shipped', 
            date: shippedDate.toISOString(), 
            completed: true,
            description: 'Your order is on the way'
          },
          { 
            status: 'Delivered', 
            date: deliveredDate.toISOString(), 
            completed: true,
            description: 'Your order has been delivered successfully'
          }
        ];
      default:
        return [...baseTracking];
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'order placed':
      case 'payment confirmed':
        return <FiCheckCircle className="w-4 h-4 text-green-500" />;
      case 'processing':
        return <FiPackage className="w-4 h-4 text-blue-500" />;
      case 'shipped':
      case 'in transit':
        return <FiTruck className="w-4 h-4 text-purple-500" />;
      case 'delivered':
        return <FiCheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return <FiClock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
      case 'in transit':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 text-center">
        <FiAlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Unable to Load Orders</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Track Orders</h1>
          <p className="text-gray-600">Monitor the status of your orders in real-time</p>
        </div>
        
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by order number or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <FiPackage className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchQuery ? 'No matching orders found' : 'No orders to track'}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? 'Try adjusting your search criteria or check the order number.'
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
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Order #{order.orderNumber || order.id}
                    </h3>
                    <p className="text-gray-600">
                      Placed on {new Date(order.ordered_at || order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <Link
                      to={`/dashboard/orders/${order.id}`}
                      className="text-green-600 hover:text-green-700 font-medium text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tracking Timeline */}
              <div className="p-6">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Tracking Progress</h4>
                <div className="space-y-4">
                  {order.tracking?.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100' : 'bg-gray-100'
                      }`}>
                        {getStatusIcon(step.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className={`font-medium ${
                            step.completed ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {step.status}
                          </h5>
                          <span className={`text-sm ${
                            step.completed ? 'text-gray-600' : 'text-gray-400'
                          }`}>
                            {step.completed ? new Date(step.date).toLocaleString() : 'Pending'}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${
                          step.completed ? 'text-gray-600' : 'text-gray-400'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Summary */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-semibold text-gray-900">
                    GH₵{(order.total_amount || order.totalAmount || 0).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrackOrders;
