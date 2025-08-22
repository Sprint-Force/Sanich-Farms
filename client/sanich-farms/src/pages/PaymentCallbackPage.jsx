import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FiCheck, FiX, FiLoader, FiHome, FiShoppingBag } from 'react-icons/fi';
import { paymentsAPI, ordersAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

// USER SIDE FIX: Payment callback page for MoMo payment verification
const PaymentCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const { addToast } = useToast();
  
  const [status, setStatus] = useState('loading'); // loading, success, failed
  const [message, setMessage] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get payment reference from URL params
        const reference = searchParams.get('reference');
        const trxref = searchParams.get('trxref');
        const paymentRef = reference || trxref;

        if (!paymentRef) {
          setStatus('failed');
          setMessage('Invalid payment reference. Please try again.');
          return;
        }

        // Verify payment with backend
        const paymentResult = await paymentsAPI.verifyPayment(paymentRef);

        if (paymentResult.success && paymentResult.status === 'success') {
          // Payment successful, get order details
          const orderId = paymentResult.metadata?.order_id;
          
          if (orderId) {
            try {
              const order = await ordersAPI.getById(orderId);
              setOrderDetails(order);
            } catch (orderErr) {
              console.error('Failed to fetch order details:', orderErr);
            }
          }

          setStatus('success');
          setMessage('Payment completed successfully! Your order has been confirmed.');
          
          // Clear cart since order was successful
          clearCart();
          
          // Show success toast
          addToast('Payment successful! Your order is being processed.', 'success');
          
          // MOMO FLOW FIX: Redirect to thank you page after 2 seconds
          setTimeout(() => {
            navigate('/thank-you', { 
              state: { 
                type: 'payment',
                details: paymentResult.metadata?.order_id ? {
                  id: paymentResult.metadata.order_id,
                  total_amount: paymentResult.amount ? (paymentResult.amount / 100) : 0,
                  payment_method: 'mobile_money'
                } : null,
                paymentSuccess: true 
              } 
            });
          }, 2000);
          
        } else {
          setStatus('failed');
          setMessage(paymentResult.message || 'Payment verification failed. Please contact support.');
          addToast('Payment verification failed. Please try again.', 'error');
        }
        
      } catch (error) {
        console.error('Payment verification error:', error);
        setStatus('failed');
        setMessage('Unable to verify payment. Please contact support if amount was deducted.');
        addToast('Payment verification error. Please contact support.', 'error');
      }
    };

    verifyPayment();
  }, [searchParams, clearCart, addToast, navigate]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleViewOrders = () => {
    navigate('/dashboard/orders');
  };

  const handleContinueShopping = () => {
    navigate('/shop');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        
        {/* Loading State */}
        {status === 'loading' && (
          <div className="text-center">
            <FiLoader className="w-16 h-16 text-green-500 mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Verifying Payment</h2>
            <p className="text-gray-600">Please wait while we confirm your payment...</p>
          </div>
        )}

        {/* Success State */}
        {status === 'success' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiCheck className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            
            {orderDetails && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-left">
                <h3 className="font-semibold text-green-800 mb-2">Order Details</h3>
                <div className="text-sm text-green-700 space-y-1">
                  <p><span className="font-medium">Order ID:</span> #{orderDetails.id}</p>
                  <p><span className="font-medium">Total:</span> ₵{orderDetails.total_amount || orderDetails.total}</p>
                  <p><span className="font-medium">Payment Method:</span> Mobile Money</p>
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <button
                onClick={handleViewOrders}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200 flex items-center justify-center gap-2"
              >
                <FiShoppingBag className="w-5 h-5" />
                View My Orders
              </button>
              <button
                onClick={handleContinueShopping}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}

        {/* Failed State */}
        {status === 'failed' && (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiX className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-red-800 mb-2">Payment Failed</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition duration-200"
              >
                Try Again
              </button>
              <button
                onClick={handleGoHome}
                className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200 flex items-center justify-center gap-2"
              >
                <FiHome className="w-5 h-5" />
                Go Home
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentCallbackPage;
