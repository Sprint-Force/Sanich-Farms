import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiShoppingBag, FiCalendar, FiHeart } from 'react-icons/fi';

const ThankYouPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get data passed from confirmation pages
  const { type, details } = location.state || {};

  // Redirect if no data provided
  useEffect(() => {
    if (!type || !details) {
      navigate('/', { replace: true });
    }
  }, [type, details, navigate]);

  if (!type || !details) {
    return null;
  }

  return (
    <div className="font-poppins bg-gradient-to-br from-green-50 to-blue-50 min-h-screen">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <FiCheckCircle className="w-12 h-12 text-green-600" />
          </div>

          {/* Thank You Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Thank You!
          </h1>
          
          {type === 'order' && (
            <>
              <p className="text-xl text-gray-600 mb-8">
                Your order has been successfully placed and confirmed! We're preparing your items with care.
              </p>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>
                <div className="text-left space-y-2">
                  <p><span className="font-medium">Order ID:</span> #{details.id}</p>
                  <p><span className="font-medium">Total Amount:</span> ₵{details.total_amount || details.total}</p>
                  <p><span className="font-medium">Payment Method:</span> {details.payment_method === 'cash' ? 'Cash on Delivery' : 'Mobile Money'}</p>
                  <p><span className="font-medium">Delivery Address:</span> {details.delivery_address}</p>
                </div>
              </div>
            </>
          )}

          {type === 'booking' && (
            <>
              <p className="text-xl text-gray-600 mb-8">
                Your service booking has been confirmed! Our team will contact you shortly to schedule the service.
              </p>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Booking Summary</h3>
                <div className="text-left space-y-2">
                  <p><span className="font-medium">Booking ID:</span> #{details.id}</p>
                  <p><span className="font-medium">Service:</span> {details.Service?.name || details.serviceType || 'Service Booking'}</p>
                  <p><span className="font-medium">Customer Name:</span> {details.name}</p>
                  <p><span className="font-medium">Phone:</span> {details.phone_number}</p>
                  <p><span className="font-medium">Location:</span> {details.location}</p>
                  <p><span className="font-medium">Preferred Date:</span> {new Date(details.booking_date).toLocaleDateString()}</p>
                </div>
              </div>
            </>
          )}

          {/* What's Next Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-800 mb-3">What happens next?</h3>
            {type === 'order' && (
              <div className="text-blue-700 text-sm space-y-2">
                <p>✅ Your order is being processed</p>
                <p>📦 We'll prepare your items for delivery</p>
                <p>🚚 Our delivery partner will contact you</p>
                <p>📧 You'll receive updates via email</p>
              </div>
            )}
            {type === 'booking' && (
              <div className="text-blue-700 text-sm space-y-2">
                <p>✅ Your booking request has been received</p>
                <p>📞 Our team will contact you within 24 hours</p>
                <p>📅 We'll schedule the service at your convenience</p>
                <p>📧 You'll receive confirmation via email</p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-200"
            >
              <FiHome className="w-5 h-5" />
              Go Home
            </Link>

            {type === 'order' && (
              <>
                <Link
                  to="/dashboard/orders"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  View Orders
                </Link>
                <Link
                  to="/shop"
                  className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
                >
                  <FiShoppingBag className="w-5 h-5" />
                  Continue Shopping
                </Link>
              </>
            )}

            {type === 'booking' && (
              <>
                <Link
                  to="/dashboard/bookings"
                  className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
                >
                  <FiCalendar className="w-5 h-5" />
                  View Bookings
                </Link>
                <Link
                  to="/services"
                  className="flex items-center justify-center gap-2 bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition duration-200"
                >
                  <FiCalendar className="w-5 h-5" />
                  Book More Services
                </Link>
              </>
            )}

            <Link
              to="/wishlist"
              className="flex items-center justify-center gap-2 bg-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-200"
            >
              <FiHeart className="w-5 h-5" />
              Wishlist
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-gray-600 mb-4">
              Need help? Contact our support team
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-gray-500">
              <span>📧 support@sanichfarms.com</span>
              <span>📞 +233 XX XXX XXXX</span>
              <span>🕒 Mon-Fri 8AM-6PM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
