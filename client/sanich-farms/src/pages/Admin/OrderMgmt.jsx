import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiEye, 
  FiSearch, 
  FiPackage, 
  FiDollarSign,
  FiClock,
  FiTruck,
  FiCheck,
  FiX,
  FiChevronDown,
  FiGrid,
  FiList,
  FiUser,
  FiDownload,
  FiRefreshCw,
  FiMapPin
} from 'react-icons/fi';
import { ordersAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const OrderMgmt = () => {
  const { addToast } = useToast();
  
  // State management
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null); // Track which status is being updated
  const [loadingOrderDetails, setLoadingOrderDetails] = useState(null); // Track which order details are being loaded
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState(null);
  
  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'danger' // 'danger', 'warning', 'info'
  });
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const statusOptions = ['all', 'pending', 'processing', 'completed', 'cancelled'];

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await ordersAPI.getAll();
      const ordersData = Array.isArray(response) ? response : response.orders || response.data || [];
      setOrders(ordersData);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      setError('Failed to load orders. Please try again.');
      addToast('Failed to load orders', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Helper functions
  const getOrderStatus = (order) => order?.status || 'pending';
  
  const getCustomerName = (order) => {
    if (!order) return 'Unknown Customer';
    if (order.User?.name) return order.User.name;
    if (order.first_name && order.last_name) return `${order.first_name} ${order.last_name}`;
    return 'Unknown Customer';
  };

  const getCustomerEmail = (order) => {
    if (!order) return '';
    return order.User?.email || order.email || '';
  };

  const getOrderTotal = (order) => Number(order?.total_amount || 0);
  
  const getOrderDate = (order) => {
    if (!order) return '';
    const date = new Date(order.ordered_at || Date.now());
    return date.toLocaleDateString();
  };

  const getOrderDateTime = (order) => {
    if (!order) return '';
    const date = new Date(order.ordered_at || Date.now());
    return date.toLocaleString();
  };

  const getOrderItems = (order) => {
    if (!order) return [];
    const items = order.OrderItems || [];
    return Array.isArray(items) ? items : [];
  };

  const getCustomerLocation = (order) => {
    if (!order) return 'Not specified';
    const parts = [];
    if (order.delivery_address) parts.push(order.delivery_address);
    if (order.state) parts.push(order.state);
    if (order.country) parts.push(order.country);
    return parts.join(', ') || 'Not specified';
  };

  const getPaymentMethod = (order) => {
    if (!order?.payment_method) return 'Not specified';
    const method = order.payment_method.replace('_', ' ');
    return method.charAt(0).toUpperCase() + method.slice(1);
  };

  const getPaymentStatus = (order) => order?.payment_status || 'unpaid';

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return <FiClock className="w-3 h-3" />;
      case 'processing': return <FiRefreshCw className="w-3 h-3" />;
      case 'completed': return <FiCheck className="w-3 h-3" />;
      case 'cancelled': return <FiX className="w-3 h-3" />;
      default: return <FiPackage className="w-3 h-3" />;
    }
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      getCustomerName(order).toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order?.id || order?._id || '').toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
      getCustomerEmail(order).toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || getOrderStatus(order).toLowerCase() === filterStatus.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Statistics
  const getStatsData = () => {
    const totalOrders = orders.length;
    const completedOrdersData = orders.filter(order => getOrderStatus(order).toLowerCase() === 'completed');
    const totalRevenue = completedOrdersData.reduce((sum, order) => sum + getOrderTotal(order), 0);
    const pendingOrders = orders.filter(order => getOrderStatus(order).toLowerCase() === 'pending').length;
    const completedOrders = completedOrdersData.length;

    return [
      {
        title: 'Total Orders',
        value: totalOrders,
        icon: FiPackage,
        color: 'blue'
      },
      {
        title: 'Total Revenue',
        value: `GH₵${totalRevenue.toLocaleString()}`,
        icon: FiDollarSign,
        color: 'green'
      },
      {
        title: 'Pending Orders',
        value: pendingOrders,
        icon: FiClock,
        color: 'yellow'
      },
      {
        title: 'Completed Orders',
        value: completedOrders,
        icon: FiCheck,
        color: 'green'
      }
    ];
  };

  const handleViewOrder = async (order) => {
    try {
      setLoadingAction(true);
      setLoadingOrderDetails(order.id); // Track which order is loading
      // Fetch full order details including items
      const response = await ordersAPI.getById(order.id);
      // Extract order from response structure
      const fullOrderData = response.order || response;
      setSelectedOrder(fullOrderData);
      setShowDetailModal(true);
    } catch (error) {
      console.error('Failed to fetch order details:', error);
      addToast('Failed to load order details', 'error');
      // Fallback to the basic order data
      setSelectedOrder(order);
      setShowDetailModal(true);
    } finally {
      setLoadingAction(false);
      setLoadingOrderDetails(null); // Clear loading state
    }
  };

  const handleUpdateStatus = async (orderId, newStatus) => {
    const updateAction = async () => {
      try {
        setLoadingAction(true);
        setUpdatingStatus(newStatus);
        await ordersAPI.updateStatus(orderId, newStatus);
        
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: newStatus }
            : order
        ));
        
        // Update selected order if it's the one being updated
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ ...prev, status: newStatus }));
        }
        
        addToast('Order status updated successfully!');
      } catch (error) {
        console.error('Failed to update order status:', error);
        addToast('Failed to update order status', 'error');
      } finally {
        setLoadingAction(false);
        setUpdatingStatus(null);
      }
    };

    // Show confirmation for completed status (important finalization action)
    if (newStatus === 'completed') {
      showConfirmation({
        title: 'Mark Order as Completed',
        message: `Are you sure you want to mark this order as completed? This indicates that the order has been fully processed and fulfilled for Order #${orderId}.`,
        confirmText: 'Yes, Mark as Completed',
        cancelText: 'Cancel',
        type: 'info'
      }, updateAction);
    } else {
      // For other status changes (pending, processing), execute directly
      updateAction();
    }
  };

  const handleUpdatePaymentStatus = async (orderId, newPaymentStatus) => {
    const updateAction = async () => {
      try {
        setLoadingAction(true);
        setUpdatingStatus(`payment_${newPaymentStatus}`);
        
        // For cash orders being marked as paid, use the dedicated markAsPaid endpoint
        if (newPaymentStatus === 'paid' && selectedOrder?.payment_method?.toLowerCase() === 'cash') {
          await ordersAPI.markAsPaid(orderId);
        } else {
          // For other payment status updates, use the regular updatePaymentStatus endpoint
          await ordersAPI.updatePaymentStatus(orderId, newPaymentStatus);
        }
        
        // Update local state to reflect the change
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, payment_status: newPaymentStatus }
            : order
        ));
        
        // Update selected order if it's the one being updated
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ ...prev, payment_status: newPaymentStatus }));
        }
        
        addToast(`Payment status updated to ${newPaymentStatus}!`);
      } catch (error) {
        console.error('Failed to update payment status:', error);
        addToast('Failed to update payment status', 'error');
      } finally {
        setLoadingAction(false);
        setUpdatingStatus(null);
      }
    };

    // Show confirmation for marking as paid (important financial action)
    if (newPaymentStatus === 'paid') {
      showConfirmation({
        title: 'Mark Order as Paid',
        message: `Are you sure you want to mark this order as paid? This confirms that payment has been received for Order #${orderId}.`,
        confirmText: 'Yes, Mark as Paid',
        cancelText: 'Cancel',
        type: 'warning'
      }, updateAction);
    } else {
      // For other status changes, execute directly
      updateAction();
    }
  };

  const handleUpdateDeliveryStatus = async (orderId, newDeliveryStatus) => {
    const updateAction = async () => {
      try {
        setLoadingAction(true);
        setUpdatingStatus(`delivery_${newDeliveryStatus}`);
        
        // Make API call to update delivery status
        await ordersAPI.updateDeliveryStatus(orderId, newDeliveryStatus);
        
        // Update local state to reflect the change
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, delivery_status: newDeliveryStatus }
            : order
        ));
        
        // Update selected order if it's the one being updated
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ ...prev, delivery_status: newDeliveryStatus }));
        }
        
        addToast(`Delivery status updated to ${newDeliveryStatus}!`);
      } catch (error) {
        console.error('Failed to update delivery status:', error);
        addToast('Failed to update delivery status', 'error');
      } finally {
        setLoadingAction(false);
        setUpdatingStatus(null);
      }
    };

    // Show confirmation for delivered or returned status (important delivery actions)
    if (newDeliveryStatus === 'delivered') {
      showConfirmation({
        title: 'Mark as Delivered',
        message: `Are you sure this order has been successfully delivered to the customer? This will finalize the delivery process for Order #${orderId}.`,
        confirmText: 'Yes, Mark as Delivered',
        cancelText: 'Cancel',
        type: 'info'
      }, updateAction);
    } else if (newDeliveryStatus === 'returned') {
      showConfirmation({
        title: 'Mark as Returned',
        message: `Are you sure this order was returned? This indicates the delivery was unsuccessful and the order was sent back for Order #${orderId}.`,
        confirmText: 'Yes, Mark as Returned',
        cancelText: 'Cancel',
        type: 'warning'
      }, updateAction);
    } else {
      // For pending status, execute directly
      updateAction();
    }
  };

  const handleCancelOrder = async (orderId) => {
    const cancelAction = async () => {
      try {
        setLoadingAction(true);
        setUpdatingStatus('cancelling');
        
        // Make API call to cancel order
        await ordersAPI.adminCancel(orderId);
        
        // Update local state to reflect the change
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled', payment_status: order.payment_status === 'paid' ? 'refunded' : order.payment_status }
            : order
        ));
        
        // Update selected order if it's the one being updated
        if (selectedOrder && selectedOrder.id === orderId) {
          setSelectedOrder(prev => ({ 
            ...prev, 
            status: 'cancelled',
            payment_status: prev.payment_status === 'paid' ? 'refunded' : prev.payment_status
          }));
        }
        
        addToast('Order cancelled successfully!', 'success');
      } catch (error) {
        console.error('Failed to cancel order:', error);
        addToast('Failed to cancel order', 'error');
      } finally {
        setLoadingAction(false);
        setUpdatingStatus(null);
      }
    };

    showConfirmation({
      title: 'Cancel Order',
      message: 'Are you sure you want to cancel this order? This action cannot be undone. If the order was paid, a refund will be processed automatically.',
      confirmText: 'Yes, Cancel Order',
      cancelText: 'Keep Order',
      type: 'danger'
    }, cancelAction);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedOrder(null);
  };

  // Helper function to show confirmation modal
  const showConfirmation = (config, action) => {
    setConfirmConfig(config);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  // Helper function to handle confirmation modal actions
  const handleConfirm = async () => {
    setShowConfirmModal(false);
    if (confirmAction) {
      await confirmAction();
    }
    setConfirmAction(null);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  const exportOrders = (format) => {
    const csvContent = [
      ['Order ID', 'Customer', 'Email', 'Total', 'Status', 'Date'].join(','),
      ...filteredOrders.map(order => [
        order?.id || order?._id || '',
        getCustomerName(order),
        getCustomerEmail(order),
        getOrderTotal(order),
        getOrderStatus(order),
        getOrderDate(order)
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `orders_${new Date().toISOString().split('T')[0]}.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    
    addToast(`Orders exported as ${format.toUpperCase()}!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6 pb-8 sm:pb-12 lg:pb-20">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Orders Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Monitor and manage customer orders
            </p>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
            {/* View Mode Toggle */}
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Grid View"
              >
                <FiGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="List View"
              >
                <FiList className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Export Button */}
            <button 
              onClick={() => exportOrders('csv')}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium flex items-center space-x-1.5 sm:space-x-2 transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <FiDownload className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:hidden">Export</span>
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
        {getStatsData().map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium truncate mb-1 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'yellow' ? 'text-yellow-600' :
                  'text-gray-600'
                }`}>{stat.title}</p>
                <p className={`text-lg sm:text-xl font-bold ${
                  stat.color === 'blue' ? 'text-blue-900' :
                  stat.color === 'green' ? 'text-green-900' :
                  stat.color === 'yellow' ? 'text-yellow-900' :
                  'text-gray-900'
                }`}>{stat.value}</p>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'yellow' ? 'bg-yellow-100' :
                'bg-gray-100'
              }`}>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
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

      {/* Search and Filter Controls */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          <div className="flex w-full gap-2 sm:gap-3">
            <div className="relative flex-1 sm:max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
              />
            </div>
            <div className="relative w-36 sm:w-auto sm:min-w-[140px]">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 sm:py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base w-full"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
        </div>
      </div>

      {/* Orders Content - Loading State */}
      {loading ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12 text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 lg:p-12 text-center">
          <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Orders Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterStatus !== 'all' 
              ? 'No orders match your current filters.' 
              : 'No orders have been placed yet.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-3 sm:p-4 lg:p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pb-2 sm:pb-4">
                {filteredOrders.map((order) => (
                  <div key={order?.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate mb-1">
                            Order #{order?.id}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {getCustomerName(order)}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getOrderStatus(order))}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(getOrderStatus(order))}
                            {getOrderStatus(order)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Total:</span>
                          <span className="font-semibold text-green-600">
                            GH₵{getOrderTotal(order).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Date:</span>
                          <span className="text-gray-900">{getOrderDate(order)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500">Payment:</span>
                          <span className="text-gray-900">{getPaymentMethod(order)}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewOrder(order)}
                        disabled={loadingOrderDetails === order.id}
                        className={`w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group ${
                          loadingOrderDetails === order.id
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 hover:scale-105'
                        }`}
                      >
                        {loadingOrderDetails === order.id ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                        ) : (
                          <FiEye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        )}
                        <span>{loadingOrderDetails === order.id ? 'Loading...' : 'View Details'}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5 pb-2 sm:pb-4">
                {filteredOrders.map((order) => (
                  <div key={order?.id} className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <div className="flex-1 mb-2 sm:mb-0">
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 group-hover:text-green-700 transition-colors duration-200">
                              Order #{order?.id}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {getCustomerName(order)} • {getOrderDateTime(order)}
                            </p>
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getOrderStatus(order))}`}>
                              {getStatusIcon(getOrderStatus(order))}
                              {getOrderStatus(order)}
                            </div>
                          </div>
                          <div className="sm:ml-4 sm:text-right">
                            <p className="text-lg sm:text-xl font-bold text-green-600">
                              GH₵{getOrderTotal(order).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                          <div>
                            <p className="text-xs text-gray-500">Payment Method</p>
                            <p className="text-sm font-medium text-gray-900">{getPaymentMethod(order)}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Payment Status</p>
                            <p className={`text-sm font-medium ${
                              getPaymentStatus(order) === 'paid' ? 'text-green-600' : 
                              getPaymentStatus(order) === 'failed' ? 'text-red-600' : 'text-yellow-600'
                            }`}>
                              {getPaymentStatus(order).charAt(0).toUpperCase() + getPaymentStatus(order).slice(1)}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Location</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{getCustomerLocation(order)}</p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleViewOrder(order)}
                          disabled={loadingOrderDetails === order.id}
                          className={`w-full sm:w-auto px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group ${
                            loadingOrderDetails === order.id
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 hover:scale-105'
                          }`}
                        >
                          {loadingOrderDetails === order.id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                          ) : (
                            <FiEye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                          )}
                          <span>{loadingOrderDetails === order.id ? 'Loading...' : 'View Details'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[98vh] sm:max-h-[95vh] lg:max-h-[90vh] overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between p-3 sm:p-4 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 truncate pr-2">
                Order Details {selectedOrder && `- #${selectedOrder?.id || selectedOrder?._id}`}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200 touch-manipulation flex-shrink-0"
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {loadingAction && !selectedOrder ? (
              <div className="p-6 sm:p-8 lg:p-12 text-center">
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-4 text-gray-600 text-sm sm:text-base">Loading order details...</p>
              </div>
            ) : selectedOrder ? (

            <div className="p-3 sm:p-4 lg:p-6 overflow-y-auto max-h-[calc(98vh-4rem)] sm:max-h-[calc(95vh-5rem)] lg:max-h-[calc(90vh-6rem)]">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                {/* Customer Information */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-3 sm:p-4 border border-blue-100">
                  <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <FiUser className="w-4 h-4" />
                    Customer Information
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{getCustomerName(selectedOrder)}</p>
                    </div>
                    {selectedOrder?.company_name && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Company Name</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{selectedOrder.company_name}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email Address</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base break-words">{getCustomerEmail(selectedOrder) || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone Number</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{selectedOrder?.phone_number || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Delivery Address</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base leading-relaxed">{selectedOrder?.delivery_address || 'Not provided'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">
                        {[selectedOrder?.state, selectedOrder?.country, selectedOrder?.zipcode].filter(Boolean).join(', ') || 'Not provided'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Information */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-100">
                  <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <FiPackage className="w-4 h-4" />
                    Order Information
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order ID</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">#{selectedOrder?.id || selectedOrder?._id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Order Date & Time</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{getOrderDateTime(selectedOrder)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Status</p>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getOrderStatus(selectedOrder))}`}>
                        {getStatusIcon(getOrderStatus(selectedOrder))}
                        {getOrderStatus(selectedOrder)}
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Delivery Status</p>
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        (selectedOrder?.delivery_status || 'pending') === 'delivered' ? 'bg-green-100 text-green-800' :
                        (selectedOrder?.delivery_status || 'pending') === 'returned' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        <FiTruck className="w-3 h-3" />
                        {(selectedOrder?.delivery_status || 'pending').charAt(0).toUpperCase() + (selectedOrder?.delivery_status || 'pending').slice(1)}
                      </div>
                    </div>
                    {selectedOrder?.delivered_at && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Delivered At</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{new Date(selectedOrder.delivered_at).toLocaleString()}</p>
                      </div>
                    )}
                    {selectedOrder?.cancelled_at && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Cancelled At</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">{new Date(selectedOrder.cancelled_at).toLocaleString()}</p>
                      </div>
                    )}
                    {selectedOrder?.note && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Order Notes</p>
                        <p className="font-medium text-gray-900 text-sm leading-relaxed bg-gray-50 p-2 rounded border break-words">{selectedOrder.note}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Payment Information */}
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-3 sm:p-4 border border-yellow-100">
                  <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <FiDollarSign className="w-4 h-4" />
                    Payment Information
                  </h3>
                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                      <p className="font-bold text-lg sm:text-xl text-green-600">GH₵{getOrderTotal(selectedOrder).toLocaleString()}</p>
                    </div>
                    {selectedOrder?.delivery_fee && parseFloat(selectedOrder.delivery_fee) > 0 && (
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Delivery Fee</p>
                        <p className="font-medium text-gray-900 text-sm sm:text-base">GH₵{parseFloat(selectedOrder.delivery_fee).toLocaleString()}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Payment Method</p>
                      <p className="font-medium text-gray-900 text-sm sm:text-base">{getPaymentMethod(selectedOrder)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                      <p className={`font-medium text-sm sm:text-base ${
                        getPaymentStatus(selectedOrder) === 'paid' ? 'text-green-600' : 
                        getPaymentStatus(selectedOrder) === 'failed' ? 'text-red-600' : 'text-yellow-600'
                      }`}>
                        {getPaymentStatus(selectedOrder).charAt(0).toUpperCase() + getPaymentStatus(selectedOrder).slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="mt-4 sm:mt-6">
                <h3 className="font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base">
                  <FiPackage className="w-4 h-4" />
                  Order Items ({getOrderItems(selectedOrder).length})
                </h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  {getOrderItems(selectedOrder).length === 0 ? (
                    <div className="p-4 sm:p-6 text-center">
                      <FiPackage className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500 text-sm sm:text-base">No items found</p>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {getOrderItems(selectedOrder).map((item, index) => (
                        <div key={index} className="p-3 sm:p-4 flex items-center justify-between gap-3">
                          <div className="flex items-center space-x-3 min-w-0 flex-1">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                              <img 
                                src={item?.Product?.image_url || item?.Product?.image || item?.Product?.images?.[0] || "https://placehold.co/48x48/cccccc/333333?text=Product"}
                                alt={item?.Product?.name || 'Product'}
                                className="w-full h-full object-cover rounded-lg"
                                onError={(e) => {
                                  e.target.src = "https://placehold.co/48x48/cccccc/333333?text=Product";
                                }}
                              />
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-medium text-gray-900 text-sm sm:text-base truncate">{item?.Product?.name || 'Unknown Item'}</p>
                              <p className="text-xs sm:text-sm text-gray-500">Qty: {item?.quantity || 1}</p>
                            </div>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="font-semibold text-gray-900 text-sm sm:text-base">GH₵{(item?.Product?.price || 0).toLocaleString()}</p>
                            <p className="text-xs sm:text-sm text-gray-500">
                              GH₵{((item?.Product?.price || 0) * (item?.quantity || 1)).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Status Update Section */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">Update Order Status</h3>
                <p className="text-xs text-gray-600 mb-3">
                  Quick status updates. Note: Cancelling here will process refunds if applicable.
                </p>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.filter(status => status !== 'all').map(status => (
                    <button
                      key={status}
                      onClick={() => {
                        // Use proper cancel logic for cancelled status
                        if (status === 'cancelled') {
                          handleCancelOrder(selectedOrder?.id);
                        } else {
                          handleUpdateStatus(selectedOrder?.id, status);
                        }
                      }}
                      disabled={loadingAction || getOrderStatus(selectedOrder).toLowerCase() === status}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                        getOrderStatus(selectedOrder).toLowerCase() === status
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : loadingAction
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : status === 'cancelled'
                          ? 'bg-red-50 border border-red-300 text-red-700 hover:bg-red-100'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {loadingAction && (updatingStatus === status || (status === 'cancelled' && updatingStatus === 'cancelling')) && (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                      )}
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Status Update Section */}
              {getPaymentMethod(selectedOrder).toLowerCase() === 'cash' && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <FiDollarSign className="w-4 h-4" />
                    Update Payment Status (Cash on Delivery)
                  </h3>
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                    {['paid', 'unpaid'].map(paymentStatus => (
                      <button
                        key={paymentStatus}
                        onClick={() => handleUpdatePaymentStatus(selectedOrder?.id, paymentStatus)}
                        disabled={loadingAction || getPaymentStatus(selectedOrder).toLowerCase() === paymentStatus}
                        className={`px-3 py-2 sm:py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-initial ${
                          getPaymentStatus(selectedOrder).toLowerCase() === paymentStatus
                            ? paymentStatus === 'paid' 
                              ? 'bg-green-200 text-green-800 cursor-not-allowed'
                              : 'bg-yellow-200 text-yellow-800 cursor-not-allowed'
                            : loadingAction
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : paymentStatus === 'paid'
                            ? 'bg-white border border-green-300 text-green-700 hover:bg-green-50'
                            : 'bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50'
                        }`}
                      >
                        {loadingAction && updatingStatus === `payment_${paymentStatus}` && (
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                        )}
                        {paymentStatus === 'paid' ? <FiCheck className="w-3 h-3 flex-shrink-0" /> : <FiClock className="w-3 h-3 flex-shrink-0" />}
                        <span className="truncate">Mark as {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Only available for Cash on Delivery orders
                  </p>
                </div>
              )}

              {/* Delivery Status Update Section */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-orange-50 rounded-lg border border-orange-200">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                  <FiTruck className="w-4 h-4" />
                  Update Delivery Status
                </h3>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                  {['pending', 'delivered', 'returned'].map(deliveryStatus => (
                    <button
                      key={deliveryStatus}
                      onClick={() => handleUpdateDeliveryStatus(selectedOrder?.id, deliveryStatus)}
                      disabled={loadingAction || (selectedOrder?.delivery_status || 'pending').toLowerCase() === deliveryStatus}
                      className={`px-3 py-2 sm:py-1.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 flex-1 sm:flex-initial ${
                        (selectedOrder?.delivery_status || 'pending').toLowerCase() === deliveryStatus
                          ? deliveryStatus === 'delivered' 
                            ? 'bg-green-200 text-green-800 cursor-not-allowed'
                            : deliveryStatus === 'returned'
                            ? 'bg-red-200 text-red-800 cursor-not-allowed'
                            : 'bg-yellow-200 text-yellow-800 cursor-not-allowed'
                          : loadingAction
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : deliveryStatus === 'delivered'
                          ? 'bg-white border border-green-300 text-green-700 hover:bg-green-50'
                          : deliveryStatus === 'returned'
                          ? 'bg-white border border-red-300 text-red-700 hover:bg-red-50'
                          : 'bg-white border border-yellow-300 text-yellow-700 hover:bg-yellow-50'
                      }`}
                    >
                      {loadingAction && updatingStatus === `delivery_${deliveryStatus}` && (
                        <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-600"></div>
                      )}
                      {deliveryStatus === 'delivered' ? <FiCheck className="w-3 h-3 flex-shrink-0" /> : 
                       deliveryStatus === 'returned' ? <FiX className="w-3 h-3 flex-shrink-0" /> : 
                       <FiClock className="w-3 h-3 flex-shrink-0" />}
                      <span className="truncate">Mark as {deliveryStatus.charAt(0).toUpperCase() + deliveryStatus.slice(1)}</span>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Update the delivery status for this order
                </p>
              </div>

              {/* Cancel Order Section */}
              {getOrderStatus(selectedOrder) !== 'cancelled' && (
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                    <FiX className="w-4 h-4" />
                    Cancel Order
                  </h3>
                  <button
                    onClick={() => handleCancelOrder(selectedOrder?.id)}
                    disabled={loadingAction}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                      loadingAction
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    {loadingAction && updatingStatus === 'cancelling' ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <FiX className="w-4 h-4" />
                    )}
                    <span>{loadingAction && updatingStatus === 'cancelling' ? 'Cancelling...' : 'Cancel Order'}</span>
                  </button>
                  <p className="text-xs text-gray-600 mt-2">
                    Cancel this order. If payment was made, a refund will be processed automatically.
                  </p>
                </div>
              )}
            </div>
            ) : (
              <div className="p-8 lg:p-12 text-center">
                <p className="text-gray-600">Failed to load order details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className={`p-6 ${
              confirmConfig.type === 'danger' ? 'bg-red-50 border-b border-red-200' :
              confirmConfig.type === 'warning' ? 'bg-yellow-50 border-b border-yellow-200' :
              'bg-blue-50 border-b border-blue-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  confirmConfig.type === 'danger' ? 'bg-red-100' :
                  confirmConfig.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {confirmConfig.type === 'danger' ? (
                    <FiX className={`w-5 h-5 text-red-600`} />
                  ) : confirmConfig.type === 'warning' ? (
                    <FiClock className={`w-5 h-5 text-yellow-600`} />
                  ) : (
                    <FiCheck className={`w-5 h-5 text-blue-600`} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{confirmConfig.title}</h3>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">{confirmConfig.message}</p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancelConfirm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  {confirmConfig.cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    confirmConfig.type === 'danger' 
                      ? 'bg-red-600 hover:bg-red-700 text-white' :
                    confirmConfig.type === 'warning'
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                      'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {confirmConfig.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderMgmt;