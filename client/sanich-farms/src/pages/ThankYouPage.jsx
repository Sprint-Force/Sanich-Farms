import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiShoppingBag, FiCalendar, FiHeart, FiStar, FiUser, FiMail, FiPhone, FiMapPin, FiFileText, FiTruck, FiClock } from 'react-icons/fi';

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 xs:py-6 sm:py-8 lg:py-12 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        {/* Main Success Card */}
        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-4 xs:mb-6">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 xs:p-6 sm:p-8 text-center border-b border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-green-600 rounded-full mb-4 xs:mb-6 shadow-lg">
              <FiCheckCircle className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 xs:mb-4">
              Thank You!
            </h1>
            
            {type === 'order' && (
              <p className="text-gray-700 text-sm xs:text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-2">
                Your order has been successfully placed and confirmed! We're preparing your items with care and will have them delivered to you soon.
              </p>
            )}
            
            {type === 'payment' && (
              <p className="text-gray-700 text-sm xs:text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-2">
                Your payment has been processed successfully! Your order is confirmed and being prepared for delivery.
              </p>
            )}
            
            {type === 'booking' && (
              <p className="text-gray-700 text-sm xs:text-base sm:text-lg leading-relaxed max-w-2xl mx-auto px-2">
                Your service booking has been confirmed! Our team will contact you shortly to schedule the service at your convenience.
              </p>
            )}
          </div>

          {/* Details Section */}
          <div className="p-4 xs:p-6 sm:p-8">
            {/* Order/Payment Summary */}
            {(type === 'order' || type === 'payment') && (
              <div className="mb-6 xs:mb-8">
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-4 xs:mb-6 flex items-center gap-2 xs:gap-3">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiShoppingBag className="w-3 h-3 xs:w-4 xs:h-4 text-blue-600" />
                  </div>
                  {type === 'order' ? 'Order Summary' : 'Payment Confirmation'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-green-200">
                    <div className="flex items-center gap-2 mb-1">
                      <FiStar className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">Order ID</span>
                    </div>
                    <p className="text-base xs:text-lg font-bold text-gray-900 break-words">
                      #{details.id}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <FiStar className="w-3 h-3 xs:w-4 xs:h-4 text-green-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">
                        {type === 'payment' ? 'Total Paid' : 'Total Amount'}
                      </span>
                    </div>
                    <p className="text-base xs:text-lg font-bold text-gray-900">
                      GH₵{details.total_amount || details.total}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <FiClock className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">Payment Method</span>
                    </div>
                    <p className="text-sm xs:text-base font-semibold text-gray-900">
                      {details.payment_method === 'cash' ? 'Cash on Delivery' : 'Mobile Money'}
                    </p>
                  </div>

                  {type === 'payment' && (
                    <div className="bg-green-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-green-200">
                      <div className="flex items-center gap-2 mb-1">
                        <FiCheckCircle className="w-3 h-3 xs:w-4 xs:h-4 text-green-500" />
                        <span className="text-xs xs:text-sm font-semibold text-gray-600">Payment Status</span>
                      </div>
                      <span className="inline-flex items-center px-2 xs:px-3 py-1 rounded-full text-xs xs:text-sm font-semibold bg-green-100 text-green-800">
                        Successful
                      </span>
                    </div>
                  )}

                  <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200 sm:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <FiMapPin className="w-3 h-3 xs:w-4 xs:h-4 text-red-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">Delivery Address</span>
                    </div>
                    <p className="text-sm xs:text-base font-semibold text-gray-900 break-words leading-relaxed">
                      {details.delivery_address}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Booking Summary */}
            {type === 'booking' && (
              <div className="mb-6 xs:mb-8">
                <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-4 xs:mb-6 flex items-center gap-2 xs:gap-3">
                  <div className="w-6 h-6 xs:w-7 xs:h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                    <FiCalendar className="w-3 h-3 xs:w-4 xs:h-4 text-blue-600" />
                  </div>
                  Booking Summary
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-green-200 sm:col-span-2">
                    <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FiStar className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-500" />
                          <span className="text-xs xs:text-sm font-semibold text-gray-600">Booking ID</span>
                        </div>
                        <p className="text-base xs:text-lg font-bold text-gray-900">
                          #{details.id}
                        </p>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <FiStar className="w-3 h-3 xs:w-4 xs:h-4 text-green-500" />
                          <span className="text-xs xs:text-sm font-semibold text-gray-600">Service</span>
                        </div>
                        <p className="text-base xs:text-lg font-bold text-gray-900 break-words">
                          {details.Service?.name || details.serviceType || 'Service Booking'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <FiUser className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">Customer Name</span>
                    </div>
                    <p className="text-sm xs:text-base font-bold text-gray-900 break-words">
                      {details.name}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <FiPhone className="w-3 h-3 xs:w-4 xs:h-4 text-purple-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">Phone</span>
                    </div>
                    <p className="text-sm xs:text-base font-bold text-gray-900 break-words">
                      {details.phone_number}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200">
                    <div className="flex items-center gap-2 mb-1">
                      <FiCalendar className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">Preferred Date</span>
                    </div>
                    <p className="text-sm xs:text-base font-bold text-gray-900">
                      {new Date(details.booking_date).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200 sm:col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <FiMapPin className="w-3 h-3 xs:w-4 xs:h-4 text-red-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">Location</span>
                    </div>
                    <p className="text-sm xs:text-base font-semibold text-gray-900 break-words leading-relaxed">
                      {details.location}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* What's Next Section */}
            <div className="bg-blue-50 p-4 xs:p-6 rounded-lg xs:rounded-xl border border-blue-200 mb-6 xs:mb-8">
              <h3 className="text-base xs:text-lg font-bold text-blue-900 mb-3 xs:mb-4 flex items-center gap-2">
                <div className="w-5 h-5 xs:w-6 xs:h-6 bg-blue-200 rounded-lg flex items-center justify-center">
                  <FiClock className="w-3 h-3 xs:w-4 xs:h-4 text-blue-700" />
                </div>
                What happens next?
              </h3>
              
              {(type === 'order' || type === 'payment') && (
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 text-blue-800">
                  <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                    </div>
                    <span>Your order is being processed</span>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiTruck className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                    </div>
                    <span>We'll prepare items for delivery</span>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                    </div>
                    <span>Delivery partner will contact you</span>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                    </div>
                    <span>You'll receive updates via email</span>
                  </div>
                  {type === 'payment' && (
                    <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm xs:col-span-2">
                      <div className="w-5 h-5 xs:w-6 xs:h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <FiCheckCircle className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                      </div>
                      <span>Payment confirmed - no further action needed</span>
                    </div>
                  )}
                </div>
              )}
              
              {type === 'booking' && (
                <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3 text-blue-800">
                  <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiCheckCircle className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                    </div>
                    <span>Booking request received</span>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiPhone className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                    </div>
                    <span>Team will contact you within 24hrs</span>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiCalendar className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                    </div>
                    <span>Schedule at your convenience</span>
                  </div>
                  <div className="flex items-center gap-2 xs:gap-3 text-xs xs:text-sm">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <FiMail className="w-3 h-3 xs:w-4 xs:h-4 text-white" />
                    </div>
                    <span>Email confirmation will be sent</span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 xs:gap-3 sm:gap-4">
              <Link
                to="/"
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 xs:px-4 sm:px-6 py-3 rounded-lg xs:rounded-xl font-semibold hover:from-green-700 hover:to-green-800 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs xs:text-sm flex items-center justify-center gap-1 xs:gap-2 min-h-[40px] xs:min-h-[44px]"
              >
                <FiHome className="w-3 h-3 xs:w-4 xs:h-4" />
                <span className="hidden xs:inline">Go Home</span>
                <span className="xs:hidden">Home</span>
              </Link>

              {(type === 'order' || type === 'payment') && (
                <>
                  <Link
                    to="/dashboard/orders"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 xs:px-4 sm:px-6 py-3 rounded-lg xs:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs xs:text-sm flex items-center justify-center gap-1 xs:gap-2 min-h-[40px] xs:min-h-[44px]"
                  >
                    <FiShoppingBag className="w-3 h-3 xs:w-4 xs:h-4" />
                    <span className="hidden sm:inline">View Orders</span>
                    <span className="sm:hidden">Orders</span>
                  </Link>
                  <Link
                    to="/shop"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 xs:px-4 sm:px-6 py-3 rounded-lg xs:rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs xs:text-sm flex items-center justify-center gap-1 xs:gap-2 min-h-[40px] xs:min-h-[44px] col-span-2 md:col-span-1"
                  >
                    <FiShoppingBag className="w-3 h-3 xs:w-4 xs:h-4" />
                    <span className="hidden sm:inline">Continue Shopping</span>
                    <span className="sm:hidden">Shop More</span>
                  </Link>
                </>
              )}

              {type === 'booking' && (
                <>
                  <Link
                    to="/dashboard/bookings"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 xs:px-4 sm:px-6 py-3 rounded-lg xs:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs xs:text-sm flex items-center justify-center gap-1 xs:gap-2 min-h-[40px] xs:min-h-[44px]"
                  >
                    <FiCalendar className="w-3 h-3 xs:w-4 xs:h-4" />
                    <span className="hidden sm:inline">View Bookings</span>
                    <span className="sm:hidden">Bookings</span>
                  </Link>
                  <Link
                    to="/services"
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-3 xs:px-4 sm:px-6 py-3 rounded-lg xs:rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs xs:text-sm flex items-center justify-center gap-1 xs:gap-2 min-h-[40px] xs:min-h-[44px] col-span-2 md:col-span-1"
                  >
                    <FiCalendar className="w-3 h-3 xs:w-4 xs:h-4" />
                    <span className="hidden sm:inline">Book More Services</span>
                    <span className="sm:hidden">Book More</span>
                  </Link>
                </>
              )}

              <Link
                to="/wishlist"
                className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 xs:px-4 sm:px-6 py-3 rounded-lg xs:rounded-xl font-semibold hover:from-pink-600 hover:to-pink-700 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs xs:text-sm flex items-center justify-center gap-1 xs:gap-2 min-h-[40px] xs:min-h-[44px] col-span-2 sm:col-span-1 md:col-span-1"
              >
                <FiHeart className="w-3 h-3 xs:w-4 xs:h-4" />
                Wishlist
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Support Card */}
        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          <div className="p-4 xs:p-6 text-center">
            <h3 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 flex items-center justify-center gap-2">
              <div className="w-5 h-5 xs:w-6 xs:h-6 bg-green-100 rounded-lg flex items-center justify-center">
                <FiPhone className="w-3 h-3 xs:w-4 xs:h-4 text-green-600" />
              </div>
              Need Help?
            </h3>
            <p className="text-gray-600 text-xs xs:text-sm mb-3 xs:mb-4">
              Contact our support team for any assistance
            </p>
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2 xs:gap-3 text-xs xs:text-sm text-gray-500">
              <a
                href="mailto:Sanichfarms@gmail.com"
                className="flex items-center justify-center gap-1 xs:gap-2 p-2 xs:p-3 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors duration-200 hover:text-red-600 cursor-pointer"
              >
                <FiMail className="w-3 h-3 xs:w-4 xs:h-4 text-red-500 flex-shrink-0" />
                <span className="truncate">Sanichfarms@gmail.com</span>
              </a>
              <a
                href="tel:+233243826137"
                className="flex items-center justify-center gap-1 xs:gap-2 p-2 xs:p-3 bg-gray-50 hover:bg-blue-50 rounded-lg transition-colors duration-200 hover:text-blue-600 cursor-pointer"
              >
                <FiPhone className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500 flex-shrink-0" />
                <span>+233 24 382 6137</span>
              </a>
              <div className="flex items-center justify-center gap-1 xs:gap-2 p-2 xs:p-3 bg-gray-50 rounded-lg">
                <FiClock className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-500 flex-shrink-0" />
                <span>Mon-Fri 8AM-6PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
