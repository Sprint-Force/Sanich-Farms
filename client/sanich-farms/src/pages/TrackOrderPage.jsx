import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiPackage, FiSearch, FiTruck, FiMapPin, FiPhone, FiMail, FiEye, FiClock, FiCheck, FiCreditCard, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';
import { ordersAPI } from '../services/api';

const TrackOrderPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const { addToast } = useToast();

  // Load order history on component mount
  useEffect(() => {
    const loadOrderHistory = async () => {
      setLoading(true);
      try {
        const response = await ordersAPI.getAll();
        const ordersData = Array.isArray(response) ? response : 
                          Array.isArray(response?.orders) ? response.orders : 
                          response?.data || [];
        
        setOrders(ordersData);
        setFilteredOrders(ordersData);
      } catch (error) {
        console.error('Failed to load order history:', error);
        addToast('Failed to load order history', 'error');
        setOrders([]);
        setFilteredOrders([]);
      } finally {
        setLoading(false);
      }
    };

    loadOrderHistory();
  }, [addToast]);

  // Filter orders based on search query and status
  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => 
        order.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(order => 
        order.id?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.status?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.first_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.last_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.OrderItems?.some(item => 
          item.Product?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    setFilteredOrders(filtered);
  }, [searchQuery, statusFilter, orders]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'payment_confirmed':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTrackingSteps = (order) => {
    const isMobileMoney = order.payment_method === 'mobile_money';
    
    if (isMobileMoney) {
      return [
        { key: 'pending', label: 'Order Placed', icon: FiPackage },
        { key: 'payment_confirmed', label: 'Payment Confirmed', icon: FiCreditCard },
        { key: 'processing', label: 'Processing', icon: FiClock },
        { key: 'delivered', label: 'Delivered', icon: FiCheck }
      ];
    } else {
      return [
        { key: 'pending', label: 'Order Placed', icon: FiPackage },
        { key: 'processing', label: 'Processing', icon: FiClock },
        { key: 'delivered', label: 'Delivered', icon: FiCheck }
      ];
    }
  };

  const getCurrentStepIndex = (order) => {
    const steps = getTrackingSteps(order);
    const currentStatus = order.status?.toLowerCase();
    return steps.findIndex(step => step.key === currentStatus);
  };

  const handleViewDetails = (orderId) => {
    navigate(`/dashboard/orders/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30">
            {/* Breadcrumbs - Keep as requested */}
      <div className="w-full py-4 sm:py-6 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200">
            <FiHome className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400" />
          <span className="text-green-400 text-sm sm:text-base font-semibold">Track Orders</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
        {/* Header */}
                  {/* Header Card with reduced size */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl sm:rounded-2xl shadow-lg text-white px-4 sm:px-6 py-4 sm:py-6 mb-4 sm:mb-6">
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
        ) : (
          <>
            {/* Orders List */}
            {filteredOrders.length === 0 ? (
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
                {filteredOrders.map((order) => {
                  const trackingSteps = getTrackingSteps(order);
                  const currentStepIndex = getCurrentStepIndex(order);
                  
                  return (
                    <div key={order.id} id={`order-${order.id}`} className="bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-lg">
                      {/* Order Header - Optimized for mobile */}
                      <div className="bg-gradient-to-r from-gray-50 to-green-50/50 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 rounded-md flex items-center justify-center flex-shrink-0">
                                <FiPackage className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600" />
                              </div>
                              <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 truncate">
                                Order #{order.id}
                              </h3>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600">
                              {new Date(order.ordered_at || order.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-3">
                            <span className={`px-2.5 py-1 rounded-full text-xs sm:text-sm font-semibold border ${getStatusColor(order.status)}`}>
                              {order.status?.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'Pending'}
                            </span>
                            <span className="text-base sm:text-lg font-bold text-green-600">
                              GH₵{(parseFloat(order.total_amount || order.totalAmount || 0) || 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Method Info - Compact */}
                      <div className="px-3 sm:px-4 py-2 bg-blue-50/50 border-b border-gray-100">
                        <div className="flex items-center gap-1.5 text-xs sm:text-sm text-blue-700">
                          <FiCreditCard className="w-3 h-3 sm:w-4 sm:h-4" />
                          <span className="font-medium">
                            {order.payment_method === 'mobile_money' ? 'Mobile Money' : 'Cash on Delivery'}
                          </span>
                        </div>
                      </div>

                      {/* Tracking Progress */}
                      <div className="px-4 sm:px-6 py-4 sm:py-6">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                          <FiTruck className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                          Order Progress
                        </h4>
                        
                        <div className="relative">
                          <div className="flex justify-between">
                            {trackingSteps.map((step, index) => {
                              const isCompleted = index <= currentStepIndex;
                              const isCurrent = index === currentStepIndex;
                              const IconComponent = step.icon;
                              
                              return (
                                <div key={step.key} className="flex flex-col items-center flex-1">
                                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-2 sm:mb-3 transition-all duration-300 ${
                                    isCompleted 
                                      ? 'bg-green-500 text-white shadow-lg' 
                                      : isCurrent 
                                        ? 'bg-blue-500 text-white shadow-lg animate-pulse'
                                        : 'bg-gray-200 text-gray-400'
                                  }`}>
                                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </div>
                                  <p className={`text-xs sm:text-sm font-medium text-center px-1 ${
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
                                    <div className={`absolute top-4 sm:top-5 h-0.5 transition-all duration-500 ${
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

                      {/* Order Items */}
                      <div className="px-4 sm:px-6 py-4 border-t border-gray-100">
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Order Items</h4>
                        <div className="space-y-2 sm:space-y-3">
                          {order.OrderItems?.slice(0, 3).map((item, index) => (
                            <div key={index} className="flex justify-between items-center py-2 sm:py-3 px-3 sm:px-4 bg-gray-50 rounded-lg">
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-800 text-sm sm:text-base truncate">
                                  {item.Product?.name || 'Product'}
                                </h5>
                                <p className="text-xs sm:text-sm text-gray-600">Qty: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-gray-800 text-sm sm:text-base ml-2">
                                GH₵{(parseFloat((item.price || 0) * (item.quantity || 0)) || 0).toFixed(2)}
                              </p>
                            </div>
                          ))}
                          {order.OrderItems?.length > 3 && (
                            <p className="text-xs sm:text-sm text-gray-500 text-center py-2">
                              +{order.OrderItems.length - 3} more items
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <button 
                            onClick={() => handleViewDetails(order.id)}
                            className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-200 font-medium text-sm sm:text-base shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                          >
                            <FiEye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                          
                          <button 
                            onClick={() => window.location.reload()}
                            className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-3 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all duration-200 font-medium text-sm sm:text-base"
                          >
                            <FiRefreshCw className="w-4 h-4" />
                            <span className="hidden sm:inline">Refresh</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* Compact Help Section */}
        <div className="mt-6 sm:mt-8 bg-white rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 text-center">
          <div className="max-w-xl mx-auto">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg mx-auto mb-3 sm:mb-4 flex items-center justify-center">
              <FiMail className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-2 sm:mb-3">
              Need Help With Your Order?
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed">
              Our support team is ready to assist you with any questions about your orders.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <a
                href="tel:0243826137"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all duration-300 font-semibold text-sm sm:text-base"
              >
                <FiPhone className="w-4 h-4 sm:w-5 sm:h-5" />
                Call: 0243826137
              </a>
              <a
                href="mailto:Sanichfarms@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl transition-all duration-300 font-semibold text-sm sm:text-base shadow-lg hover:shadow-xl"
              >
                <FiMail className="w-4 h-4 sm:w-5 sm:h-5" />
                Email Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
