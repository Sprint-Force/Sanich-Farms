import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { ordersData } from '../../data/ordersData'; // Import centralized orders data

const MyOrders = () => {
  // Use imported data
  const orders = ordersData;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center py-10 text-gray-600 text-lg">
          You haven't placed any orders yet.
          <Link to="/shop" className="text-green-600 hover:underline ml-2">Start Shopping!</Link>
        </div>
      ) : (
        <div className="overflow-x-auto hide-scrollbar">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Order ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{order.date}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{order.total}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Link to OrderDetailPage */}
                    <Link
                      to={`/dashboard/orders/${order.id}`}
                      className="text-green-600 hover:text-green-900 ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      aria-label={`View details for order ${order.id}`}
                    >
                      <FiEye size={18} />
                    </Link>
                    {/* Add more actions like reorder, cancel etc. */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
