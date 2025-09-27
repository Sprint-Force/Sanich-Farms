import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiPackage, FiSearch, FiClock, FiCheck, FiCreditCard } from 'react-icons/fi';
import { ordersAPI } from '../../services/api';

const TrackOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showAllOrders, setShowAllOrders] = useState(false);

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
        
        // Sort orders by most recent first
        const sortedOrders = ordersData.sort((a, b) => {
          const dateA = new Date(a.createdAt || a.ordered_at || 0);
          const dateB = new Date(b.createdAt || b.ordered_at || 0);
          return dateB - dateA; // Most recent first
        });
        
        setOrders(sortedOrders);
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

  // Filter orders based on search query and status filter
  useEffect(() => {
    let filtered = orders;

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(order => 
        order.id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.orderNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredOrders(filtered);
  }, [searchQuery, statusFilter, orders]);

  // Get orders to display (recent 3 or all based on showAllOrders state)
  const getDisplayOrders = () => {
    if (searchQuery.trim() || statusFilter !== 'all' || showAllOrders) {
      return filteredOrders; // Show all filtered results if searching/filtering or "View All" clicked
    }
    return filteredOrders.slice(0, 3); // Show only 3 most recent by default
  };

  const displayOrders = getDisplayOrders();
  const hasMoreOrders = filteredOrders.length > 3 && !showAllOrders && !searchQuery.trim() && statusFilter === 'all';

  // Helper functions matching TrackOrderPage design
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered':
        return 'bg-green-50 text-green-700 border-green-200';
      case 'cancelled':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getTrackingSteps = () => {
    const baseSteps = [
      { key: 'pending', label: 'Order Placed', icon: FiPackage },
      { key: 'processing', label: 'Processing', icon: FiClock },
      { key: 'delivered', label: 'Delivered', icon: FiCheck }
    ];
    return baseSteps;
  };

  const getCurrentStepIndex = (order) => {
    const steps = getTrackingSteps(order);
    const currentStatus = order.status?.toLowerCase();
    return steps.findIndex(step => step.key === currentStatus);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30">
      {/* Header Card with reduced size */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl sm:rounded-2xl shadow-lg text-white px-4 sm:px-6 py-4 sm:py-6 mb-4 sm:mb-6 mx-4 sm:mx-6">
        <div className="flex items-center gap-3 mb-2 sm:mb-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg flex items-center justify-center">
            <FiPackage className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Track Your Orders</h1>
        </div>
        <p className="text-green-100 text-sm sm:text-base leading-relaxed">
          Monitor your order status and delivery progress in real-time
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-4">
        {/* Compact Search and Filter */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-3 sm:p-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm bg-white min-w-[100px]"
            >
              <option value="all">All</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8">
            <div className="animate-pulse space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-gray-100 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="h-5 bg-gray-200 rounded w-32"></div>
                      <div className="h-6 bg-gray-200 rounded w-20"></div>
                    </div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 md:p-12 text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-red-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <FiPackage className="w-8 h-8 sm:w-10 sm:h-10 text-red-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">Error Loading Orders</h3>
            <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-md mx-auto">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <FiRefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* Orders List */}
            {displayOrders.length === 0 ? (
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-6 sm:p-8 md:p-12 text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <FiPackage className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {searchQuery || statusFilter !== 'all' ? 'No matching orders found' : 'No orders yet'}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-6 max-w-md mx-auto">
                  {searchQuery || statusFilter !== 'all'
                    ? 'Try adjusting your search criteria or filters.'
                    : 'Start shopping to see your orders and track their progress here.'
                  }
                </p>
                {!searchQuery && statusFilter === 'all' && (
                  <Link
                    to="/shop"
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <FiPackage className="w-4 h-4" />
                    Start Shopping
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-6">
                {displayOrders.map((order) => {
                  const trackingSteps = getTrackingSteps();
                  const currentStepIndex = getCurrentStepIndex(order);
                  
                  return (
                    <div key={order.id} className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
                      {/* Order Header - Compact for mobile */}
                      <div className="bg-gradient-to-r from-gray-50 to-green-50/50 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-1.5 sm:gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                                <FiPackage className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-600" />
                              </div>
                              <h3 className="text-sm sm:text-base font-bold text-gray-900 truncate">
                                Order #{order.id}
                              </h3>
                            </div>
                            <p className="text-xs text-gray-600">
                              {new Date(order.ordered_at || order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          
                          <div className="flex flex-row sm:flex-row items-center gap-2">
                            <span className={`px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-semibold border ${getStatusColor(order.status)}`}>
                              {order.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Pending'}
                            </span>
                            <span className="text-sm sm:text-base font-bold text-green-600">
                              GH₵{(parseFloat(order.total_amount || order.totalAmount || 0) || 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Method Info - Compact */}
                      <div className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-50/50 border-b border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs text-blue-700">
                          <FiCreditCard className="w-3 h-3" />
                          <span className="font-medium">
                            {order.payment_method === 'mobile_money' ? 'Mobile Money' : 'Cash on Delivery'}
                          </span>
                        </div>
                      </div>

                      {/* Tracking Progress - Compact */}
                      <div className="px-4 sm:px-6 py-3 sm:py-4">
                        <div className="relative">
                          <div className="flex justify-between">
                            {trackingSteps.map((step, index) => {
                              const isCompleted = index <= currentStepIndex;
                              const isCurrent = index === currentStepIndex;
                              const IconComponent = step.icon;
                              
                              return (
                                <div key={step.key} className="flex flex-col items-center flex-1">
                                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center mb-1 sm:mb-2 transition-all duration-300 ${
                                    isCompleted 
                                      ? 'bg-green-500 text-white shadow-lg' 
                                      : isCurrent 
                                        ? 'bg-blue-500 text-white shadow-lg animate-pulse'
                                        : 'bg-gray-200 text-gray-400'
                                  }`}>
                                    <IconComponent className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </div>
                                  <p className={`text-xs font-medium text-center px-1 ${
                                    isCompleted 
                                      ? 'text-green-600' 
                                      : isCurrent 
                                        ? 'text-blue-600'
                                        : 'text-gray-400'
                                  }`}>
                                    {step.label}
                                  </p>
                                  
                                  {/* Progress Line */}
                                  {index < trackingSteps.length - 1 && (
                                    <div className={`absolute top-3 sm:top-4 h-0.5 transition-all duration-500 ${
                                      index < currentStepIndex 
                                        ? 'bg-green-500' 
                                        : 'bg-gray-200'
                                    }`} 
                                    style={{
                                      left: `${(100 / trackingSteps.length) * (index + 0.5)}%`,
                                      width: `${100 / trackingSteps.length}%`
                                    }}></div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Order Summary - Compact */}
                      <div className="px-4 sm:px-6 py-2 sm:py-3 bg-blue-50/30 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3 text-sm text-gray-600">
                            <span className="flex items-center gap-1">
                              <FiPackage className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="font-medium">
                                {(() => {
                                  const totalItems = order.OrderItems?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 1;
                                  return `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
                                })()}
                              </span>
                            </span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold text-gray-900">
                              GH₵{(parseFloat(order.total_amount || order.totalAmount || 0) || 0).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="px-4 sm:px-6 py-3 bg-gray-50 border-t border-gray-100">
                        <button
                          onClick={() => navigate(`/dashboard/orders/${order.id}`)}
                          className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* View All Orders Button */}
                {hasMoreOrders && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setShowAllOrders(true)}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    >
                      <FiPackage className="w-4 h-4" />
                      View All Orders ({filteredOrders.length})
                    </button>
                  </div>
                )}

                {/* Show Less Button when showing all orders */}
                {showAllOrders && !searchQuery.trim() && statusFilter === 'all' && (
                  <div className="text-center pt-4">
                    <button
                      onClick={() => setShowAllOrders(false)}
                      className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold transition-all duration-300"
                    >
                      Show Recent Orders Only
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default TrackOrders;
