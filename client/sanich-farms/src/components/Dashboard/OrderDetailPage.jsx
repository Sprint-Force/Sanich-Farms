import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiPackage, FiMapPin, FiCreditCard } from 'react-icons/fi';
import { ordersData } from '../../data/ordersData'; // Import centralized orders data

const OrderDetailPage = () => {
  const { orderId } = useParams();
  const order = ordersData.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Order not found. <Link to="/dashboard/orders" className="text-green-600 hover:underline">Back to Orders</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Order Details</h1>
        <Link to="/dashboard/orders" className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-200">
          <FiArrowLeft /> Back to Orders
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiPackage className="text-green-600" /> Order Summary
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Date:</strong> {order.date}</p>
            <p><strong>Total:</strong> {order.total}</p>
            <p><strong>Status:</strong>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {order.status}
              </span>
            </p>
          </div>
        </div>

        {/* Shipping Address Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiMapPin className="text-green-600" /> Shipping Address
          </h2>
          <div className="space-y-1 text-gray-700">
            <p>{order.shippingAddress.name}</p>
            <p>{order.shippingAddress.street}</p>
            <p>{`${order.shippingAddress.city}, ${order.shippingAddress.region}`}</p>
            <p>{`${order.shippingAddress.zip}, ${order.shippingAddress.country}`}</p>
          </div>
        </div>

        {/* Payment Method Card */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiCreditCard className="text-green-600" /> Payment Method
          </h2>
          <p className="text-gray-700">{order.paymentMethod}</p>
          {order.notes && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Order Notes</h3>
              <p className="text-gray-600 text-sm">{order.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Order Items Table */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200">
          Items in this Order
        </h2>
        <div className="overflow-x-auto hide-scrollbar">
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
              {order.items.map((item) => (
                <tr key={item.id}>
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/333333?text=Item"; }} />
                    {item.name}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{item.quantity}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{item.price}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">{item.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage;
