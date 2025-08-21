import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext'; // Import useToast context
import { useAuthContext } from '../hooks/useAuthContext';
import { ordersAPI } from '../services/api'; // USER SIDE FIX: Import orders API for checkout

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuthContext();

  const [loading, setLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    streetAddress: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    zipCode: '',
    shipToDifferentAddress: false,
  });
  const [paymentMethod, setPaymentMethod] = useState('cash'); // USER SIDE FIX: Default to cash
  const [orderNotes, setOrderNotes] = useState('');

  // Calculate order summary - FIX: Remove shipping, replace with delivery note
  const subtotal = parseFloat(cartTotal);
  const total = subtotal.toFixed(2); // No shipping charges

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
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Required</h2>
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

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      addToast("Your cart is empty. Please add items before placing an order.", "error");
      navigate('/shop');
      return;
    }

    // Check if user is authenticated
    if (!isAuthenticated) {
      addToast("Please log in to place an order.", "error");
      navigate('/login', { state: { from: { pathname: '/checkout' } } });
      return;
    }

    // Basic validation
    // USER SIDE FIX: Backend controller requires zipcode, so include it in validation
    if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.streetAddress || !billingInfo.email || !billingInfo.phone || !billingInfo.country || !billingInfo.state || !billingInfo.zipCode) {
      addToast("Please fill in all required fields including zip code.", "error");
      return;
    }

    setLoading(true);

    // USER SIDE FIX: Match backend field names exactly
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
      delivery_fee: 0, // No delivery fee for now
      payment_method: paymentMethod, // Use the exact value from the form
      note: orderNotes || '',
    };

    try {
      // USER SIDE FIX: Backend gets items from cart, no need to send items array
      const response = await ordersAPI.create(orderDetails);
      
      console.log("Order placed successfully:", response);
      addToast("Order placed successfully!", "success");
      
      // Clear the cart on successful order
      clearCart();
      
      // Navigate to order confirmation page
      navigate('/order-confirmation', { state: { orderDetails: response } });
      
    } catch (error) {
      console.error("Failed to place order:", error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || error.message || "Failed to place order. Please try again.";
      addToast(errorMessage, "error");
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

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/cart" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Cart page">
            <span className="text-base font-medium">Cart</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Checkout</span>
        </div>
      </div>

      {/* Main Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 md:mb-12 text-center">
          Checkout
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl shadow-md text-gray-600 text-lg">
            Your cart is empty. <Link to="/shop" className="text-green-600 hover:underline">Start shopping!</Link>
          </div>
        ) : (
          <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
            {/* Billing Information */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 sm:p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
                Billing Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    required
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-1">Company name (optional)</label>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    value={billingInfo.companyName}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="streetAddress" className="block text-sm font-medium text-gray-700 mb-1">Street Address <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="streetAddress"
                    name="streetAddress"
                    value={billingInfo.streetAddress}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={billingInfo.email}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone number <span className="text-red-500">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">Country / Region <span className="text-red-500">*</span></label>
                  <select
                    id="country"
                    name="country"
                    value={billingInfo.country}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Nigeria">Nigeria</option>
                    {/* Add more countries */}
                  </select>
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                  <select
                    id="state"
                    name="state"
                    value={billingInfo.state}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    required
                  >
                    <option value="">Select State/Region</option>
                    {/* FIX: Checkout State Dropdown - Add all Ghana regions */}
                    <option value="Ashanti Region">Ashanti Region</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Eastern Region">Eastern Region</option>
                    <option value="Volta Region">Volta Region</option>
                    <option value="Central Region">Central Region</option>
                    <option value="Western Region">Western Region</option>
                    <option value="Sunyani">Sunyani</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                  {/* FIX: Zip code optional */}
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={billingInfo.zipCode}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                    placeholder="Enter zip code"
                    required
                  />
                </div>
                <div className="sm:col-span-2 flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="shipToDifferentAddress"
                    name="shipToDifferentAddress"
                    checked={billingInfo.shipToDifferentAddress}
                    onChange={handleBillingInfoChange}
                    className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <label htmlFor="shipToDifferentAddress" className="ml-2 block text-sm text-gray-900">Ship to a different address?</label>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Info</h3>
                <label htmlFor="orderNotes" className="block text-sm font-medium text-gray-700 mb-1">Order Notes (Optional)</label>
                <textarea
                  id="orderNotes"
                  name="orderNotes"
                  rows="4"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Notes about your order, e.g. special delivery notes."
                ></textarea>
              </div>
            </div>

            {/* Order Summary & Payment Method */}
            <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 sm:p-8 h-fit">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
                Order Summary
              </h2>
              <div className="space-y-4 text-gray-700 text-lg">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      {/* FIX: Checkout Cart Item Images */}
                      <img 
                        src={item.image_url || item.image || item.images?.[0] || "https://placehold.co/40x40/cccccc/333333?text=Item"} 
                        alt={item.name} 
                        className="h-10 w-10 object-cover rounded-md" 
                        onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/333333?text=Item"; }} 
                      />
                      <span>{item.name} x{item.quantity}</span>
                    </div>
                    {/* FIX: Checkout Cart Item Price Display */}
                    <span className="font-semibold">GH₵{(parseFloat(item.price || item.currentPrice || 0) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span>Subtotal:</span>
                  <span className="font-semibold">GH₵{subtotal.toFixed(2)}</span>
                </div>
                {/* FIX: Replace Shipping with Delivery Note */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 my-3">
                  <div className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-blue-800">Delivery Information</p>
                      <p className="text-xs text-blue-700">Delivery is handled by a 3rd Party, and the customer bears the cost.</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 font-bold text-xl text-gray-900">
                  <span>Total:</span>
                  <span>GH₵{total}</span>
                </div>
              </div>

              {/* Payment Method */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="cashOnDelivery"
                      name="paymentMethod"
                      value="cash"
                      checked={paymentMethod === 'cash'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="cashOnDelivery" className="ml-3 text-base font-medium text-gray-900">Cash on Delivery (COD)</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="momo"
                      name="paymentMethod"
                      value="mobile_money"
                      checked={paymentMethod === 'mobile_money'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                    />
                    <label htmlFor="momo" className="ml-3 text-base font-medium text-gray-900">Mobile Money (MoMo)</label>
                  </div>
                  {/* USER SIDE FIX: Remove bank transfer option */}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full text-white py-3 rounded-full font-semibold text-lg mt-8 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300
                  ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
