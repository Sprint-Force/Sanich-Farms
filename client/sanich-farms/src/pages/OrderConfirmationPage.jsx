import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiChevronRight, FiPackage, FiTruck, FiCreditCard, FiMapPin, FiUser, FiMail, FiPhone, FiClock, FiCheck, FiArrowRight } from 'react-icons/fi';
import { ordersAPI, paymentsAPI } from '../services/api';
import { useToast } from '../context/ToastContext';
import { useCart } from '../context/CartContext';

const OrderConfirmationPage = () => {
  const { orderId } = useParams(); // Get orderId from the URL parameters
  const location = useLocation();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const paymentRequired = location.state?.paymentRequired || false;
  const paymentMethod = location.state?.paymentMethod;
  const apiError = location.state?.apiError || false;

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
      } catch {
        setError("Failed to load order details. Please contact support if this issue persists.");
        addToast("Failed to load order details.", "error");
      } finally {
        setLoading(false);
      }
    };

    initializeOrderDetails();
  }, [orderId, location.state, addToast]); // Re-run effect if orderId or state changes

  const handleConfirmOrder = async () => {
    if (paymentRequired && paymentMethod === 'mobile_money') {
      setProcessingPayment(true);
      try {
        const paymentData = {
          order_id: orderDetails.id,
          payment_method: 'mobile_money',
          amount: parseFloat(orderDetails.total_amount || orderDetails.total || 0)
        };

        const paymentResponse = await paymentsAPI.initializePayment(paymentData);
        
        if (paymentResponse.payment_link) {
          // Clear cart before redirecting to payment
          clearCart();
          window.location.href = paymentResponse.payment_link;
        } else {
          throw new Error('No payment link received from server');
        }
      } catch {
        addToast('Failed to initialize payment. Please try again.', 'error');
      } finally {
        setProcessingPayment(false);
      }
    } else {
      // For cash orders, confirm the order and proceed to thank you page
      if (!paymentRequired && paymentMethod === 'cash') {
        // If cart wasn't cleared earlier (due to API error), clear it now
        if (apiError) {
          await clearCart();
        }
        
        navigate('/thank-you', { 
          state: { 
            type: 'order', 
            details: orderDetails 
          } 
        });
      }
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-base sm:text-lg font-medium">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-red-50/30 to-orange-50/30 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-red-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Order Not Found</h2>
          <p className="text-red-500 text-sm sm:text-base mb-6 leading-relaxed">{error}</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <FiHome className="w-4 h-4" />
            Go to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30">
      {/* Modern Breadcrumbs - Clean & Responsive */}
      <div className="w-full breadcrumb-modern">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 xs:gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link flex items-center gap-1 text-slate-600 hover:text-green-600" aria-label="Go to Home page">
              <FiHome className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              <span className="font-medium hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 breadcrumb-separator" />
            <span className="breadcrumb-current text-sm xs:text-base font-semibold">Order Confirmation</span>
          </nav>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center py-2 sm:py-3 md:py-4 lg:py-6 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="w-full max-w-2xl lg:max-w-3xl mx-auto">
          {/* Main Card */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            
            {/* Header Section with Success Icon */}
            <div className="relative bg-gradient-to-r from-green-500 to-green-600 px-3 sm:px-4 md:px-6 py-3 sm:py-4 md:py-5 text-center text-white">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20"></div>
              <div className="relative">
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/20 backdrop-blur-sm rounded-full mx-auto mb-2 sm:mb-3 flex items-center justify-center">
                  <FiCheckCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                  Order {paymentRequired && paymentMethod === 'mobile_money' ? 'Created' : 'Received'}!
                </h1>
                <p className="text-green-100 text-xs sm:text-sm md:text-sm max-w-xl mx-auto leading-relaxed px-2 mb-3 sm:mb-4 md:mb-4">
                  {paymentRequired && paymentMethod === 'mobile_money' 
                    ? 'Your order has been created successfully. Please proceed to payment to complete your purchase.'
                    : 'Thank you for your order! Please confirm to finalize your purchase and we\'ll process it right away.'
                  }
                </p>

                {/* Primary Confirmation Button - Moved here from bottom like BookingConfirmationPage */}
                <button
                  onClick={handleConfirmOrder}
                  disabled={processingPayment}
                  className={`w-full xs:w-auto mx-auto flex items-center justify-center gap-2 px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-sm md:text-base transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 min-h-[40px] sm:min-h-[44px] md:min-h-[48px] ${
                    processingPayment 
                      ? 'bg-blue-400 text-white cursor-not-allowed shadow-md transform-none' 
                      : paymentRequired && paymentMethod === 'mobile_money'
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white'
                  }`}
                >
                  {processingPayment ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent"></div>
                      <span>Processing...</span>
                    </>
                  ) : paymentRequired && paymentMethod === 'mobile_money' ? (
                    <>
                      <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Proceed to Payment</span>
                      <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </>
                  ) : (
                    <>
                      <FiCheck className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Confirm Order</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-white/90 mt-1.5 sm:mt-2 px-2">
                  {paymentRequired && paymentMethod === 'mobile_money' 
                    ? 'Click above to proceed with secure payment'
                    : 'Click above to finalize and confirm your order'
                  }
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5">
              
              {/* Order Summary Card */}
              {orderDetails && (
                <div className="bg-gradient-to-br from-gray-50 to-green-50/50 rounded-lg sm:rounded-xl border border-gray-200 p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <FiPackage className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-green-600" />
                    </div>
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800">Order Summary</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5 md:gap-3">
                    
                    {/* Order ID */}
                    <div className="bg-white rounded-md sm:rounded-lg p-2 sm:p-2.5 md:p-3 border border-gray-100">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-100 rounded-md flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">#</span>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Order ID</span>
                      </div>
                      <p className="text-sm sm:text-sm md:text-base font-bold text-gray-900">#{orderDetails.id}</p>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-white rounded-md sm:rounded-lg p-2 sm:p-2.5 md:p-3 border border-gray-100">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-green-100 rounded-md flex items-center justify-center">
                          <span className="text-xs font-bold text-green-600">₵</span>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Total Amount</span>
                      </div>
                      <p className="text-sm sm:text-sm md:text-base font-bold text-green-600">
                        GH₵{parseFloat(orderDetails.total_amount || orderDetails.total || 0).toFixed(2)}
                      </p>
                    </div>

                    {/* Payment Method */}
                    <div className="bg-white rounded-md sm:rounded-lg p-2 sm:p-2.5 md:p-3 border border-gray-100">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-100 rounded-md flex items-center justify-center">
                          <FiCreditCard className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-blue-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-600">Payment Method</span>
                      </div>
                      <p className="text-sm sm:text-sm md:text-base font-semibold text-gray-900">
                        {orderDetails.payment_method === 'cash' ? 'Cash on Delivery' : 
                         orderDetails.payment_method === 'mobile_money' ? 'Mobile Money' : 
                         orderDetails.payment_method}
                      </p>
                    </div>

                    {/* Order Status */}
                    <div className="bg-white rounded-md sm:rounded-lg p-2 sm:p-2.5 md:p-3 border border-gray-100">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-0.5 sm:mb-1">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-yellow-100 rounded-md flex items-center justify-center">
                          <FiClock className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-yellow-600" />
                        </div>
                        <span className="text-xs font-medium text-gray-600">Status</span>
                      </div>
                      <p className="text-sm sm:text-sm md:text-base font-semibold text-yellow-600 capitalize">
                        {orderDetails.status || 'Pending'}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mt-2.5 sm:mt-3 bg-white rounded-md sm:rounded-lg p-2 sm:p-2.5 md:p-3 border border-gray-100">
                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-green-100 rounded-md flex items-center justify-center">
                        <FiMapPin className="w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 text-green-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-600">Delivery Address</span>
                    </div>
                    <p className="text-sm md:text-base text-gray-900 leading-relaxed">
                      {orderDetails.delivery_address}
                    </p>
                  </div>

                  {/* Order Notes if available */}
                  {orderDetails.note && (
                    <div className="mt-2.5 sm:mt-3 bg-white rounded-md sm:rounded-lg p-2 sm:p-2.5 md:p-3 border border-gray-100">
                      <div className="flex items-center gap-1 sm:gap-1.5 mb-1">
                        <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 bg-blue-100 rounded-md flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">📝</span>
                        </div>
                        <span className="text-xs font-medium text-gray-600">Order Notes</span>
                      </div>
                      <p className="text-sm md:text-base text-gray-900 leading-relaxed">
                        {orderDetails.note}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Secondary Navigation Buttons */}
              <div className="grid grid-cols-2 gap-2 sm:gap-2.5 mt-3 sm:mt-4">
                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-md hover:shadow-lg min-h-[40px] sm:min-h-[44px]"
                >
                  <FiPackage className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Continue Shopping</span>
                </Link>
                
                <Link
                  to="/dashboard/orders"
                  className="flex items-center justify-center gap-1.5 px-2.5 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300 transition-all duration-300 shadow-md hover:shadow-lg min-h-[40px] sm:min-h-[44px]"
                >
                  <FiTruck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>View Orders</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
