import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiUser, FiMail, FiPhone, FiMapPin, FiCreditCard, FiShield, FiTruck, FiPackage, FiLock, FiCheck, FiDollarSign, FiSmartphone } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { ordersAPI } from '../services/api';
const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  const { isAuthenticated, user } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    email: '',
    phone: '',
    country: 'Ghana', // Pre-filled with Ghana
    state: '',
    zipCode: '',
    shipToDifferentAddress: false,
  });
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [orderNotes, setOrderNotes] = useState('');

  // Pre-fill user information if available
  useEffect(() => {
    if (user) {
      setBillingInfo(prev => ({
        ...prev,
        firstName: user.first_name || user.firstName || '',
        lastName: user.last_name || user.lastName || '',
        email: user.email || '',
        phone: user.phone || user.phone_number || '',
      }));
    }
  }, [user]);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.email || 
        !billingInfo.phone || !billingInfo.streetAddress) {
      addToast("Please fill in all required fields.", "error");
      return;
    }

    if (!billingInfo.country || !billingInfo.state) {
      addToast("Please select your country and state.", "error");
      return;
    }

    setLoading(true);

    const orderDetails = {
      first_name: billingInfo.firstName,
      last_name: billingInfo.lastName,
      company_name: billingInfo.companyName || '',
      email: billingInfo.email,
      phone_number: billingInfo.phone,
      delivery_address: billingInfo.streetAddress,
      country: billingInfo.country,
      state: billingInfo.state,
      zipcode: billingInfo.zipCode,
      delivery_fee: 0,
      payment_method: paymentMethod,
      note: orderNotes || '',
    };

    try {
      if (paymentMethod === 'mobile_money') {
        // For mobile money: Create order with pending status
        const response = await ordersAPI.create({
          ...orderDetails,
          status: 'pending'
        });
        
        if (response && (response.success || response.id || response.order)) {
          // Don't clear cart yet for mobile money - clear it after payment
          navigate('/order-confirmation', { 
            state: { 
              orderDetails: response.order || response,
              paymentRequired: true,
              paymentMethod: 'mobile_money'
            }
          });
        } else {
          // If API fails, still proceed to confirmation page but with error handling
          navigate('/order-confirmation', { 
            state: { 
              orderDetails: {
                id: 'PENDING-' + Date.now(),
                ...orderDetails,
                total_amount: subtotal,
                status: 'pending'
              },
              paymentRequired: true,
              paymentMethod: 'mobile_money',
              apiError: true
            }
          });
        }
        
      } else {
        // For cash on delivery: Create order and proceed to confirmation
        try {
          const response = await ordersAPI.create(orderDetails);
          
          if (response && (response.success || response.id || response.order)) {
            // Clear cart after successful order creation
            await clearCart();
            navigate('/order-confirmation', { 
              state: { 
                orderDetails: response.order || response,
                paymentRequired: false,
                paymentMethod: 'cash'
              }
            });
          } else {
            // If API fails for cash orders, still proceed to confirmation for user experience
            await clearCart();
            navigate('/order-confirmation', { 
              state: { 
                orderDetails: {
                  id: 'PENDING-' + Date.now(),
                  ...orderDetails,
                  total_amount: subtotal,
                  status: 'pending'
                },
                paymentRequired: false,
                paymentMethod: 'cash',
                apiError: true
              }
            });
          }
        } catch {
          // Even if API fails, proceed to confirmation page for better UX
          await clearCart();
          navigate('/order-confirmation', { 
            state: { 
              orderDetails: {
                id: 'OFFLINE-' + Date.now(),
                ...orderDetails,
                total_amount: subtotal,
                status: 'pending'
              },
              paymentRequired: false,
              paymentMethod: 'cash',
              apiError: true
            }
          });
        }
      }
      
    } catch {
      // Last resort: still navigate to confirmation page
      await clearCart();
      navigate('/order-confirmation', { 
        state: { 
          orderDetails: {
            id: 'ERROR-' + Date.now(),
            ...orderDetails,
            total_amount: subtotal,
            status: 'pending'
          },
          paymentRequired: paymentMethod === 'mobile_money',
          paymentMethod: paymentMethod,
          apiError: true
        }
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBillingInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Calculate order summary
  const subtotal = parseFloat(cartTotal) || 0;
  // No shipping charges

  // If user is not authenticated, show login prompt
  if (!isAuthenticated) {
    return (
      <div className="font-poppins bg-gray-50 min-h-screen pt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800 mb-1.5">Login Required</h2>
              <p className="text-gray-600 mb-6">
                Please log in to your account to proceed with checkout. 
                Don't worry, your cart items will be saved!
              </p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={() => navigate('/login', { state: { from: { pathname: '/checkout' } } })}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Login to Continue
              </button>
              
              <button
                onClick={() => navigate('/signup', { state: { from: { pathname: '/checkout' } } })}
                className="w-full bg-white text-green-600 py-3 px-6 rounded-lg border border-green-600 hover:bg-green-50 transition-colors font-medium"
              >
                Create New Account
              </button>
              
              <button
                onClick={() => navigate('/cart')}
                className="w-full text-gray-600 py-2 px-4 hover:text-gray-800 transition-colors"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins bg-gradient-to-br from-gray-50 via-white to-green-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-4 sm:py-6 md:py-8 lg:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-8 flex items-center gap-2 md:gap-3 text-white">
          <Link to="/" className="flex items-center gap-1 sm:gap-1.5 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-4 h-4 md:w-4.5 md:h-4.5" />
            <span className="text-sm md:text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-gray-400" />
          <Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Cart page">
            <span className="text-sm md:text-base font-medium">Cart</span>
          </Link>
          <FiChevronRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-gray-400" />
          <span className="text-green-400 text-sm md:text-base font-semibold">Checkout</span>
        </div>
      </div>

      {/* Modern Header Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-3">
        <div className="text-center">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1">
            Complete Your Order
          </h1>
          <p className="text-xs sm:text-sm text-gray-600">
            Review your items and provide delivery details
          </p>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="max-w-md mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-4">
              <FiPackage className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">Add some products to get started</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
            >
              <FiPackage className="w-4 h-4" />
              Start Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-6">
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
            
            {/* Billing Information */}
            <div className="lg:col-span-2 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 p-3 sm:p-4 md:p-5 lg:p-6">
              <div className="mb-4 md:mb-5">
                <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2 mb-2 sm:mb-3">
                  <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Billing Information
                </h2>
                <div className="w-full h-px bg-gradient-to-r from-green-200 to-blue-200"></div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                <div>
                  <label htmlFor="firstName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiUser className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    First name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiUser className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    Last name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400"
                    required
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="companyName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiPackage className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    Company name (optional)
                  </label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={billingInfo.companyName}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400"
                  />
                </div>
                
                <div className="sm:col-span-2">
                  <label htmlFor="streetAddress" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    value={billingInfo.streetAddress}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiMail className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiPhone className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="country" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="country"
                    name="country"
                    value={billingInfo.country}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="Ghana">Ghana</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="state" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    State <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="state"
                    name="state"
                    value={billingInfo.state}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400"
                    required
                  >
                    <option value="">Select State/Region</option>
                    <option value="Ashanti Region">Ashanti Region</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Eastern Region">Eastern Region</option>
                    <option value="Volta Region">Volta Region</option>
                    <option value="Central Region">Central Region</option>
                    <option value="Western Region">Western Region</option>
                    <option value="Bono Region">Bono Region</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="zipCode" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1.5">
                    <FiMapPin className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={billingInfo.zipCode}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400"
                    placeholder="Enter zip code"
                  />
                </div>
                
                <div className="sm:col-span-2 mt-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="shipToDifferentAddress"
                      name="shipToDifferentAddress"
                      checked={billingInfo.shipToDifferentAddress}
                      onChange={handleBillingInfoChange}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="shipToDifferentAddress" className="ml-3 text-sm font-medium text-gray-700">
                      Ship to a different address?
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                  <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  Additional Information
                </h3>
                <div>
                  <label htmlFor="orderNotes" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="orderNotes"
                    name="orderNotes"
                    rows="2"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-2.5 py-2 sm:px-3 sm:py-2.5 md:px-4 md:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 hover:border-gray-400 resize-none"
                    placeholder="Special delivery notes or instructions..."
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Modern Order Summary & Payment */}
            <div className="lg:col-span-1 bg-white rounded-lg sm:rounded-xl shadow-lg border border-gray-100 p-3 sm:p-4 md:p-5 h-fit sticky top-2">
              <div className="mb-4 md:mb-5">
                <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <FiCreditCard className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                  Order Summary
                </h2>
                <div className="w-full h-px bg-gradient-to-r from-green-200 to-blue-200 mt-2 md:mt-3"></div>
              </div>
              
              {/* Cart Items */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 md:mb-5">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-2 sm:gap-3 md:gap-3.5 p-2 sm:p-2.5 md:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <img 
                      src={item.image_url || item.image || item.images?.[0] || "https://placehold.co/40x40/cccccc/333333?text=Item"} 
                      alt={item.name} 
                      className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 object-cover rounded-md border border-gray-200 flex-shrink-0" 
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/333333?text=Item"; }} 
                    />
                    <div className="flex-grow min-w-0">
                      <p className="text-xs sm:text-sm md:text-base font-medium text-gray-800 truncate">{item.name}</p>
                      <p className="text-xs sm:text-xs md:text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-xs sm:text-sm md:text-base font-semibold text-green-600 ml-2">
                      GH₵{(parseFloat(item.price || item.currentPrice || 0) * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-1.5 sm:space-y-2 mb-4 md:mb-5">
                <div className="flex justify-between items-center text-xs sm:text-sm md:text-base">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold text-gray-900">GH₵{subtotal.toFixed(2)}</span>
                </div>
                
                {/* Delivery Information */}
                <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-lg p-2 sm:p-2.5 md:p-3">
                  <div className="flex items-start gap-1.5 sm:gap-2 md:gap-2.5">
                    <FiTruck className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-xs md:text-sm font-medium text-blue-800">Delivery Info</p>
                      <p className="text-xs sm:text-xs md:text-sm text-blue-700">3rd party delivery - customer pays</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-1.5 sm:pt-2 md:pt-2.5 border-t border-gray-200">
                  <span className="text-sm sm:text-base md:text-lg font-bold text-gray-800">Total:</span>
                  <span className="text-sm sm:text-base md:text-lg font-bold text-green-600">GH₵{subtotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mb-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3 flex items-center gap-2">
                  <FiLock className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  Payment Method
                </h3>
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="flex items-center p-2.5 sm:p-3 md:p-3.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200 min-h-[44px] sm:min-h-[48px]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <div className="ml-2 sm:ml-3 flex items-center gap-1.5 sm:gap-2">
                      <FiDollarSign className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-green-600" />
                      <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900">Cash on Delivery</span>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-2.5 sm:p-3 md:p-3.5 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition duration-200 min-h-[44px] sm:min-h-[48px]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="mobile_money"
                      checked={paymentMethod === 'mobile_money'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <div className="ml-2 sm:ml-3 flex items-center gap-1.5 sm:gap-2">
                      <FiSmartphone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-blue-600" />
                      <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900">Mobile Money</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-2 mb-4">
                <div className="flex items-center gap-1.5 sm:gap-2 text-xs text-gray-700">
                  <FiShield className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                  <span>Your information is secure and protected</span>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 sm:py-3.5 md:py-4 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 shadow-md hover:shadow-lg ${
                  loading 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transform hover:-translate-y-0.5'
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-3 w-3 sm:h-4 sm:w-4 border-b-2 border-white"></div>
                    <span className="text-xs sm:text-base">Placing Order...</span>
                  </>
                ) : (
                  <>
                    <FiCheck className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-base">Place Order</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
