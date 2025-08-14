// import React from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FiCheckCircle, FiHome, FiChevronRight } from 'react-icons/fi';

// const OrderConfirmationPage = () => {
//   const location = useLocation();
//   const { orderDetails } = location.state || {}; // Get orderDetails passed via navigate state

//   return (
//     <div className="font-poppins bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       {/* Breadcrumbs */}
//       <div className="w-full max-w-7xl mx-auto mb-8 flex items-center gap-2 text-gray-700">
//         <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200" aria-label="Go to Home page">
//           <FiHome className="w-5 h-5" />
//           <span className="text-base font-medium hidden sm:inline">Home</span>
//         </Link>
//         <FiChevronRight className="w-4 h-4 text-gray-400" />
//         <span className="text-green-600 text-base font-semibold">Order Confirmation</span>
//       </div>

//       <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full max-w-2xl text-center">
//         <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
//         <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
//           Order Placed Successfully!
//         </h1>
//         <p className="text-gray-600 text-lg mb-6 leading-relaxed">
//           Thank you for your order. Your order has been placed and will be processed shortly.
//         </p>

//         {orderDetails && (
//           <div className="bg-gray-50 p-6 rounded-lg text-left mb-8 border border-gray-200">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
//             <div className="space-y-2 text-gray-700">
//               <p><strong>Order ID:</strong> #{orderDetails.orderDate ? new Date(orderDetails.orderDate).getTime() : 'N/A'}</p> {/* Simple ID for demo */}
//               <p><strong>Total:</strong> GH₵{orderDetails.total?.toFixed(2) || '0.00'}</p>
//               <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
//               <p><strong>Delivery Address:</strong> {orderDetails.billingInfo?.streetAddress}, {orderDetails.billingInfo?.state}, {orderDetails.billingInfo?.country}</p>
//             </div>
//           </div>
//         )}

//         <div className="flex flex-col sm:flex-row justify-center gap-4">
//           <Link
//             to="/shop"
//             className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md"
//           >
//             Continue Shopping
//           </Link>
//           <Link
//             to="/profile/orders" // Assuming you'll have an orders history page
//             className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
//           >
//             View My Orders
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderConfirmationPage;


import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiChevronRight } from 'react-icons/fi';
import axios from 'axios';
import { useToast } from '../context/ToastContext'; // Import useToast context

const OrderConfirmationPage = () => {
  const { orderId } = useParams(); // Get orderId from the URL parameters
  const { addToast } = useToast();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define your backend API URL
  const BASE_URL = 'https://sanich-farms-tnac.onrender.com/api/orders';

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) {
        setLoading(false);
        setError("Invalid order ID. Please go back to the homepage.");
        addToast("Invalid order ID.", "error");
        return;
      }
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/${orderId}`);
        setOrderDetails(response.data);
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        setError("Failed to load order details. Please contact support if this issue persists.");
        addToast("Failed to load order details.", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, addToast]); // Re-run effect if orderId changes

  // Conditional rendering based on loading and error states
  if (loading) {
    return (
      <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading order details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center text-center">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full max-w-2xl">
          <p className="text-red-500 text-lg">{error}</p>
          <Link to="/" className="mt-4 inline-block bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300">
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto mb-8 flex items-center gap-2 text-gray-700">
        <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200" aria-label="Go to Home page">
          <FiHome className="w-5 h-5" />
          <span className="text-base font-medium hidden sm:inline">Home</span>
        </Link>
        <FiChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-green-600 text-base font-semibold">Order Confirmation</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full max-w-2xl text-center">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Order Placed Successfully!
        </h1>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          Thank you for your order. Your order has been placed and will be processed shortly.
        </p>

        {orderDetails && (
          <div className="bg-gray-50 p-6 rounded-lg text-left mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Order ID:</strong> #{orderDetails.orderId}</p>
              <p><strong>Total:</strong> GH₵{parseFloat(orderDetails.total)?.toFixed(2) || '0.00'}</p>
              <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
              <p><strong>Delivery Address:</strong> {orderDetails.billingInfo?.streetAddress}, {orderDetails.billingInfo?.state}, {orderDetails.billingInfo?.country}</p>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/shop"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md"
          >
            Continue Shopping
          </Link>
          <Link
            to="/profile/orders" // Assuming you'll have an orders history page
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
