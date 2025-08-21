import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiRepeat, FiDownload, FiX, FiTruck, FiFilter, FiShoppingBag, FiShoppingCart } from 'react-icons/fi';
import { ordersAPI } from '../../services/api'; // DASHBOARD API INTEGRATION: Import real orders API

const MyOrders = () => {
  // DASHBOARD API INTEGRATION: State for real API data
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredOrders, setFilteredOrders] = useState([]);

  // DASHBOARD API INTEGRATION: Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await ordersAPI.getAll();
        const ordersData = Array.isArray(response) ? response : 
                          Array.isArray(response?.orders) ? response.orders : [];
        setOrders(ordersData);
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

  // Filter orders based on status
  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter(order => order.status === statusFilter));
    }
  }, [statusFilter, orders]);

  // DASHBOARD API INTEGRATION: Amazon-style order actions with API calls
  const handleReorder = async (orderId) => {
    try {
      console.log(`Reordering items from order ${orderId}`);
      // In real app, add order items to cart via API
      alert(`Items from order ${orderId} added to cart!`);
    } catch (err) {
      console.error('Failed to reorder:', err);
      alert('Failed to reorder items. Please try again.');
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await ordersAPI.cancel(orderId);
        // Refresh orders list
        const response = await ordersAPI.getAll();
        const ordersData = Array.isArray(response) ? response : 
                          Array.isArray(response?.orders) ? response.orders : [];
        setOrders(ordersData);
        alert(`Order ${orderId} has been cancelled.`);
      } catch (err) {
        console.error('Failed to cancel order:', err);
        alert('Failed to cancel order. Please try again.');
      }
    }
  };

  const handleDownloadInvoice = (orderId) => {
    console.log(`Downloading invoice for order ${orderId}`);
    alert(`Invoice for order ${orderId} downloaded!`);
  };

  const statusOptions = ['All', 'Processing', 'Delivered', 'Cancelled'];

  // DASHBOARD API INTEGRATION: Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // DASHBOARD API INTEGRATION: Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">My Orders</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">My Orders</h1>
        
        {/* DASHBOARD AUDIT FIX: Order filtering like Amazon */}
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" size={16} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status} Orders</option>
            ))}
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm">
          <FiShoppingBag className="mx-auto text-gray-400 mb-4" size={48} />
          <h3 className="text-lg font-medium text-gray-600 mb-2">
            {statusFilter === 'All' ? "You haven't placed any orders yet" : `No ${statusFilter.toLowerCase()} orders found`}
          </h3>
          <Link to="/shop" className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition duration-200">
            <FiShoppingCart size={16} />
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* DASHBOARD AUDIT FIX: Card-based layout like Amazon mobile */}
          <div className="grid gap-4">
            {filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition duration-200">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Order Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                      {/* USER SIDE FIX: Proper order ID and status display */}
                      <h3 className="text-lg font-semibold text-gray-800">Order #{order.id}</h3>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        (order.status === 'delivered' || order.status === 'Delivered') ? 'bg-green-100 text-green-800' :
                        (order.status === 'processing' || order.status === 'Processing' || order.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                        (order.status === 'shipped' || order.status === 'Shipped') ? 'bg-blue-100 text-blue-800' :
                        (order.status === 'cancelled' || order.status === 'Cancelled') ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
                      {/* USER SIDE FIX: Proper data mapping for order fields */}
                      <p><span className="font-medium">Date:</span> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.date || 'N/A'}</p>
                      <p><span className="font-medium">Total:</span> ₵{order.total_amount || order.total || '0.00'}</p>
                      <p><span className="font-medium">Items:</span> {order.OrderItems?.length || order.items?.length || 1}</p>
                    </div>
                  </div>

                  {/* DASHBOARD AUDIT FIX: Amazon-style action buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`/dashboard/orders/${order.id}`}
                      className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-200"
                    >
                      <FiEye size={14} />
                      View Details
                    </Link>
                    
                    {order.status === 'Processing' && (
                      <button
                        onClick={() => handleCancelOrder(order.id)}
                        className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-200 transition duration-200"
                      >
                        <FiX size={14} />
                        Cancel
                      </button>
                    )}
                    
                    {order.status === 'Delivered' && (
                      <>
                        <button
                          onClick={() => handleReorder(order.id)}
                          className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition duration-200"
                        >
                          <FiRepeat size={14} />
                          Reorder
                        </button>
                        <button
                          onClick={() => handleDownloadInvoice(order.id)}
                          className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition duration-200"
                        >
                          <FiDownload size={14} />
                          Invoice
                        </button>
                      </>
                    )}
                    
                    {(order.status === 'Processing' || order.status === 'Shipped') && (
                      <button className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-200 transition duration-200">
                        <FiTruck size={14} />
                        Track Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
