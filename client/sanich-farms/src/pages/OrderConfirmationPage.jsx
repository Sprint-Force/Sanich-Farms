import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiChevronRight } from 'react-icons/fi';
import { ordersAPI } from '../services/api'; // USER SIDE FIX: Use configured API service
import { useToast } from '../context/ToastContext'; // Import useToast context

const OrderConfirmationPage = () => {
  const { orderId } = useParams(); // Get orderId from the URL parameters
  const location = useLocation(); // USER SIDE FIX: Get state data from navigation
  const { addToast } = useToast();
  const navigate = useNavigate(); // USER SIDE FIX: Add navigate for thank you page
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // USER SIDE FIX: Use state data if available, otherwise fetch from API
  useEffect(() => {
    const initializeOrderDetails = async () => {
      try {
        setLoading(true);
        
        // First check if order details were passed via state
        const stateOrderDetails = location.state?.orderDetails;
        if (stateOrderDetails) {
          // Use the order data from state (from checkout page)
          const orderData = stateOrderDetails.order || stateOrderDetails;
          setOrderDetails(orderData);
          setLoading(false);
          return;
        }

        // If no state data and orderId exists, fetch from API
        if (orderId) {
          const response = await ordersAPI.getById(orderId);
          const fetchedOrder = response.order || response;
          setOrderDetails(fetchedOrder);
        } else {
          setError("No order information available. Please try placing your order again.");
          addToast("No order information found.", "error");
        }
      } catch (err) {
        console.error("Failed to fetch order details:", err);
        setError("Failed to load order details. Please contact support if this issue persists.");
        addToast("Failed to load order details.", "error");
      } finally {
        setLoading(false);
      }
    };

    initializeOrderDetails();
  }, [orderId, location.state, addToast]); // Re-run effect if orderId or state changes

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
              {/* USER SIDE FIX: Handle different response structures */}
              <p><strong>Order ID:</strong> #{orderDetails.id}</p>
              <p><strong>Total:</strong> ₵{orderDetails.total_amount || orderDetails.total || '0.00'}</p>
              <p><strong>Payment Method:</strong> {orderDetails.payment_method === 'cash' ? 'Cash on Delivery' : orderDetails.payment_method === 'mobile_money' ? 'Mobile Money' : orderDetails.payment_method}</p>
              <p><strong>Delivery Address:</strong> {orderDetails.delivery_address}</p>
              <p><strong>Status:</strong> <span className="capitalize">{orderDetails.status || 'Pending'}</span></p>
              {orderDetails.note && <p><strong>Notes:</strong> {orderDetails.note}</p>}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          {/* USER SIDE FIX: Add confirm button to go to thank you page */}
          <button
            onClick={() => navigate('/thank-you', { 
              state: { 
                type: 'order', 
                details: orderDetails 
              } 
            })}
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md"
          >
            Confirm Order
          </button>
          <Link
            to="/shop"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
          >
            Continue Shopping
          </Link>
          <Link
            to="/dashboard/orders" // USER SIDE FIX: Updated to dashboard orders
            className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 shadow-md"
          >
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
