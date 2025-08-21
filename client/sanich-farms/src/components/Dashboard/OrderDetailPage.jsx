import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiPackage, FiMapPin, FiCreditCard } from 'react-icons/fi';
import { ordersAPI } from '../../services/api'; // USER SIDE FIX: Use real API instead of mock data

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // USER SIDE FIX: Fetch order from API
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const response = await ordersAPI.getById(orderId);
        const orderData = response.order || response;
        setOrder(orderData);
      } catch (err) {
        console.error('Failed to fetch order details:', err);
        setError('Failed to load order details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-gray-600 text-lg">Loading order details...</div>
      </div>
    );
  }

  // Error state
  if (error || !order) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        {error || 'Order not found.'} <Link to="/dashboard/orders" className="text-green-600 hover:underline">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 border-b pb-4 border-gray-200 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">Order Details</h1>
        <Link to="/dashboard/orders" className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-200 self-start sm:self-center">
          <FiArrowLeft /> Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
        {/* Order Summary Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiPackage className="text-green-600" /> Order Summary
          </h2>
          <div className="space-y-2 text-gray-700 text-sm lg:text-base">
            {/* USER SIDE FIX: Use real API response fields */}
            <p><strong>Order ID:</strong> #{order.id}</p>
            <p><strong>Date:</strong> {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : order.ordered_at ? new Date(order.ordered_at).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Total:</strong> ₵{order.total_amount || order.total || '0.00'}</p>
            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><strong>Status:</strong>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold w-fit ${
                (order.status === 'delivered' || order.status === 'completed') ? 'bg-green-100 text-green-800' :
                (order.status === 'processing' || order.status === 'pending') ? 'bg-yellow-100 text-yellow-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
              </span>
            </p>
          </div>
        </div>

        {/* Shipping Address Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiMapPin className="text-green-600" /> Delivery Address
          </h2>
          <div className="space-y-1 text-gray-700 text-sm lg:text-base">
            {/* USER SIDE FIX: Use real API response fields */}
            <p><strong>Name:</strong> {order.first_name} {order.last_name}</p>
            {order.company_name && <p><strong>Company:</strong> {order.company_name}</p>}
            <p><strong>Address:</strong> <span className="break-words">{order.delivery_address}</span></p>
            <p><strong>Location:</strong> {order.state}, {order.country}</p>
            {order.zipcode && <p><strong>Zip:</strong> {order.zipcode}</p>}
            <p><strong>Phone:</strong> <span className="break-words">{order.phone_number}</span></p>
            <p><strong>Email:</strong> <span className="break-words">{order.email}</span></p>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiCreditCard className="text-green-600" /> Payment Method
          </h2>
          <div className="text-sm lg:text-base">
            <p className="text-gray-700 font-medium">
              {order.payment_method === 'cash' ? 'Cash on Delivery' : 
               order.payment_method === 'mobile_money' ? 'Mobile Money' : 
               order.payment_method || 'N/A'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Status: <span className="capitalize">{order.payment_status || 'Pending'}</span>
            </p>
            {order.note && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-2">Order Notes</h3>
                <p className="text-gray-600 text-sm break-words">{order.note}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Items Table */}
      <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
        <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200">
          Items in this Order
        </h2>
        
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto hide-scrollbar">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {/* USER SIDE FIX: Use real API response fields for order items */}
              {(order.OrderItems || order.items || []).map((item, index) => (
                <tr key={item.id || index}>
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                    <img 
                      src={item.Product?.image_url || item.image || "https://placehold.co/40x40/cccccc/333333?text=Item"} 
                      alt={item.Product?.name || item.name || 'Product'} 
                      className="h-10 w-10 object-cover rounded-md flex-shrink-0" 
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/333333?text=Item"; }} 
                    />
                    <span className="truncate">{item.Product?.name || item.name || 'Unknown Product'}</span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{item.quantity}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">₵{item.price || '0.00'}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                    ₵{((item.quantity || 0) * (parseFloat(item.price) || 0)).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {(order.OrderItems || order.items || []).map((item, index) => (
            <div key={item.id || index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-start gap-3 mb-3">
                <img 
                  src={item.Product?.image_url || item.image || "https://placehold.co/40x40/cccccc/333333?text=Item"} 
                  alt={item.Product?.name || item.name || 'Product'} 
                  className="h-12 w-12 object-cover rounded-md flex-shrink-0" 
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/333333?text=Item"; }} 
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 break-words">{item.Product?.name || item.name || 'Unknown Product'}</h3>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Quantity</p>
                  <p className="font-medium text-gray-900">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-500">Price</p>
                  <p className="font-medium text-gray-900">₵{item.price || '0.00'}</p>
                </div>
                <div>
                  <p className="text-gray-500">Subtotal</p>
                  <p className="font-semibold text-gray-900">₵{((item.quantity || 0) * (parseFloat(item.price) || 0)).toFixed(2)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
