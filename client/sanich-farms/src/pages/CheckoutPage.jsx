import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext'; // Import useCart context

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

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
    shipToDifferentAddress: false, // For future expansion
  });
  const [paymentMethod, setPaymentMethod] = useState('cashOnDelivery');
  const [orderNotes, setOrderNotes] = useState('');

  // Calculate order summary
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 0 ? 5.00 : 0.00; // Example shipping
  const total = subtotal + shipping;

  const handleBillingInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBillingInfo(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault(); // Prevent default form submission

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items before placing an order.");
      navigate('/shop');
      return;
    }

    // Basic validation (you'd add more robust validation here)
    if (!billingInfo.firstName || !billingInfo.lastName || !billingInfo.streetAddress || !billingInfo.email || !billingInfo.phone || !billingInfo.country || !billingInfo.state || !billingInfo.zipCode) {
      alert("Please fill in all required billing information.");
      return;
    }

    const orderDetails = {
      cartItems,
      billingInfo,
      paymentMethod,
      orderNotes,
      subtotal,
      shipping,
      total,
      orderDate: new Date().toISOString(),
    };

    console.log("Placing Order:", orderDetails);
    // In a real application:
    // 1. Send orderDetails to your backend API
    //    e.g., fetch('/api/orders', { method: 'POST', body: JSON.stringify(orderDetails) })
    // 2. Handle success/error response from backend
    // 3. Clear the cart on successful order
    clearCart();
    // 4. Navigate to an order confirmation page
    navigate('/order-confirmation', { state: { orderDetails } }); // Pass order details to confirmation page
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
                    <option value="">Select State</option>
                    <option value="Greater Accra">Greater Accra</option>
                    <option value="Ashanti">Ashanti</option>
                    {/* Add more states */}
                  </select>
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">Zip Code <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={billingInfo.zipCode}
                    onChange={handleBillingInfoChange}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
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
                      <img src={item.image} alt={item.name} className="h-10 w-10 object-cover rounded-md" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/40x40/cccccc/333333?text=Item"; }} />
                      <span>{item.name} x{item.quantity}</span>
                    </div>
                    <span className="font-semibold">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                  <span>Subtotal:</span>
                  <span className="font-semibold">GH₵{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping:</span>
                  <span className="font-semibold">GH₵{shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 font-bold text-xl text-gray-900">
                  <span>Total:</span>
                  <span>GH₵{total.toFixed(2)}</span>
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
                      value="cashOnDelivery"
                      checked={paymentMethod === 'cashOnDelivery'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <label htmlFor="cashOnDelivery" className="ml-3 text-base font-medium text-gray-900">Cash on Delivery</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="momo"
                      name="paymentMethod"
                      value="momo"
                      checked={paymentMethod === 'momo'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <label htmlFor="momo" className="ml-3 text-base font-medium text-gray-900">Mobile Money (MoMo)</label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="bank"
                      name="paymentMethod"
                      value="bank"
                      checked={paymentMethod === 'bank'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                    />
                    <label htmlFor="bank" className="ml-3 text-base font-medium text-gray-900">Bank Transfer</label>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-3 rounded-full font-semibold text-lg mt-8 hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Place Order
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
