import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiChevronRight, FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiFileText, FiClock, FiStar } from 'react-icons/fi';
import { bookingsAPI } from '../services/api';

const BookingConfirmationPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [confirming, setConfirming] = useState(false);

  // USER SIDE FIX: Use configured API service instead of direct axios
  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (!bookingId) {
        setError("No booking ID provided in the URL.");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const response = await bookingsAPI.getById(bookingId);
        const fetchedBookingDetails = response.booking || response;
        if (fetchedBookingDetails) {
          setBookingDetails(fetchedBookingDetails);
        } else {
          setError("Booking not found.");
        }
      } catch (err) {
        console.error("Failed to fetch booking details:", err);
        setError("Failed to load booking details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  // Modern loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 xs:py-6 sm:py-8 lg:py-12 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-4 xs:mb-6 sm:mb-8 flex items-center gap-2 text-xs xs:text-sm sm:text-base">
            <Link to="/" className="flex items-center gap-1 xs:gap-2 text-gray-500 hover:text-green-600 transition-colors duration-200">
              <FiHome className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              <span className="font-medium hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
            <span className="text-green-600 font-semibold">Booking Confirmation</span>
          </div>

          {/* Loading Content */}
          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-4 xs:p-6 sm:p-8 lg:p-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full mb-4 xs:mb-6 sm:mb-8">
                <div className="animate-spin rounded-full h-6 w-6 xs:h-8 xs:w-8 sm:h-10 sm:w-10 border-b-2 border-green-600"></div>
              </div>
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                Loading Your Booking...
              </h1>
              <p className="text-gray-600 text-xs xs:text-sm sm:text-base leading-relaxed">
                Please wait while we retrieve your booking details
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Modern error state
  if (error || !bookingDetails) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 xs:py-6 sm:py-8 lg:py-12 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
          {/* Breadcrumbs */}
          <div className="mb-4 xs:mb-6 sm:mb-8 flex items-center gap-2 text-xs xs:text-sm sm:text-base">
            <Link to="/" className="flex items-center gap-1 xs:gap-2 text-gray-500 hover:text-green-600 transition-colors duration-200">
              <FiHome className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
              <span className="font-medium hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
            <span className="text-green-600 font-semibold">Booking Confirmation</span>
          </div>

          {/* Error Content */}
          <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg border border-red-100 overflow-hidden">
            <div className="p-4 xs:p-6 sm:p-8 lg:p-12 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full mb-4 xs:mb-6 sm:mb-8">
                <FiFileText className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 text-red-600" />
              </div>
              <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
                Unable to Load Booking
              </h1>
              <p className="text-red-600 text-xs xs:text-sm sm:text-base mb-4 xs:mb-6 sm:mb-8 leading-relaxed">
                {error || "Booking not found."}
              </p>
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 xs:px-6 py-3 bg-green-600 text-white rounded-lg xs:rounded-xl font-semibold hover:bg-green-700 active:scale-95 transform transition-all duration-200 text-xs xs:text-sm sm:text-base"
                >
                  Try Again
                </button>
                <Link
                  to="/"
                  className="px-4 xs:px-6 py-3 bg-gray-100 text-gray-700 rounded-lg xs:rounded-xl font-semibold hover:bg-gray-200 active:scale-95 transform transition-all duration-200 text-xs xs:text-sm sm:text-base text-center"
                >
                  Go Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-4 xs:py-6 sm:py-8 lg:py-12 px-3 xs:px-4 sm:px-6 lg:px-8 xl:px-12">
      <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        {/* Breadcrumbs */}
        <div className="mb-4 xs:mb-6 sm:mb-8 flex items-center gap-2 text-xs xs:text-sm sm:text-base">
          <Link to="/" className="flex items-center gap-1 xs:gap-2 text-gray-500 hover:text-green-600 transition-colors duration-200">
            <FiHome className="w-3 h-3 xs:w-4 xs:h-4 sm:w-5 sm:h-5" />
            <span className="font-medium hidden xs:inline">Home</span>
          </Link>
          <FiChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
          <span className="text-green-600 font-semibold">Booking Confirmation</span>
        </div>

        {/* Main Confirmation Card */}
        <div className="bg-white rounded-lg xs:rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Success Header */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 xs:p-6 sm:p-8 text-center border-b border-green-200">
            <div className="inline-flex items-center justify-center w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-blue-600 rounded-full mb-3 xs:mb-4 sm:mb-6 shadow-lg">
              <FiCheckCircle className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Booking Request Received!
            </h1>
            <p className="text-gray-700 text-xs xs:text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-4 xs:mb-5 sm:mb-6 px-2">
              Thank you for choosing Sanich Farms! Please review your booking details below and click "Confirm Booking" to complete your request.
            </p>
            
            {/* Primary Action - Above the fold */}
            <button
              onClick={() => {
                setConfirming(true);
                setTimeout(() => {
                  navigate('/thank-you', { 
                    state: { 
                      type: 'booking', 
                      details: bookingDetails 
                    } 
                  });
                }, 500);
              }}
              disabled={confirming}
              className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 xs:px-8 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold hover:from-green-700 hover:to-green-800 active:scale-95 transform transition-all duration-200 shadow-lg hover:shadow-xl text-sm xs:text-base sm:text-lg flex items-center justify-center gap-2 xs:gap-3 min-h-[48px] xs:min-h-[52px] sm:min-h-[56px] w-full xs:w-auto mx-auto"
            >
              {confirming ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 xs:h-5 xs:w-5 border-b-2 border-white"></div>
                  <span className="hidden xs:inline">Confirming Your Booking...</span>
                  <span className="xs:hidden">Confirming...</span>
                </>
              ) : (
                <>
                  <FiCheckCircle className="w-4 h-4 xs:w-5 xs:h-5" />
                  Confirm Booking
                </>
              )}
            </button>
            
            <p className="text-xs xs:text-sm text-gray-600 mt-2 xs:mt-3 px-2">
              Click above to finalize and confirm your booking request
            </p>
          </div>

          {/* Booking Details Section */}
          <div className="p-4 xs:p-6 sm:p-8">
            <div className="mb-5 xs:mb-6 sm:mb-8">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 mb-3 xs:mb-4 sm:mb-6 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiFileText className="w-3 h-3 xs:w-4 xs:h-4 text-blue-600" />
                </div>
                Booking Details
              </h2>

              {/* Compact Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4">
                {/* Booking ID & Service - Most Important */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-green-200 sm:col-span-2 lg:col-span-3">
                  <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 xs:gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FiStar className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-500" />
                        <span className="text-xs xs:text-sm font-semibold text-gray-600">Booking ID</span>
                      </div>
                      <p className="text-base xs:text-lg font-bold text-gray-900 break-words">
                        #{bookingDetails.id || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <FiStar className="w-3 h-3 xs:w-4 xs:h-4 text-green-500" />
                        <span className="text-xs xs:text-sm font-semibold text-gray-600">Service</span>
                      </div>
                      <p className="text-base xs:text-lg font-bold text-gray-900 break-words">
                        {bookingDetails.Service?.name || bookingDetails.serviceType || 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FiUser className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500" />
                    <span className="text-xs xs:text-sm font-semibold text-gray-600">Customer</span>
                  </div>
                  <p className="text-sm xs:text-base font-bold text-gray-900 mb-2 break-words">
                    {bookingDetails.name || bookingDetails.customerName || 'N/A'}
                  </p>
                  <p className="text-xs xs:text-sm text-gray-600 break-words leading-tight">
                    {bookingDetails.email || 'N/A'}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FiPhone className="w-3 h-3 xs:w-4 xs:h-4 text-purple-500" />
                    <span className="text-xs xs:text-sm font-semibold text-gray-600">Phone</span>
                  </div>
                  <p className="text-sm xs:text-base font-bold text-gray-900 break-words">
                    {bookingDetails.phone_number || bookingDetails.phone || 'N/A'}
                  </p>
                </div>

                {/* Date & Status */}
                <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200 lg:col-span-1">
                  <div className="flex items-center gap-2 mb-1">
                    <FiCalendar className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500" />
                    <span className="text-xs xs:text-sm font-semibold text-gray-600">Date & Time</span>
                  </div>
                  <p className="text-sm xs:text-base font-bold text-gray-900 break-words">
                    {bookingDetails.booking_date 
                      ? new Date(bookingDetails.booking_date).toLocaleDateString() 
                      : (bookingDetails.preferredDateTime 
                        ? new Date(bookingDetails.preferredDateTime).toLocaleDateString() 
                        : 'N/A')}
                  </p>
                </div>

                <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200 sm:col-span-1 lg:col-span-2">
                  <div className="flex items-center gap-2 mb-1">
                    <FiClock className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-500" />
                    <span className="text-xs xs:text-sm font-semibold text-gray-600">Status</span>
                  </div>
                  <span className={`inline-flex items-center px-2 xs:px-3 py-1 xs:py-2 rounded-full text-xs xs:text-sm font-semibold ${
                    bookingDetails.status === 'confirmed' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {bookingDetails.status || 'Pending'}
                  </span>
                </div>

                {/* Location */}
                <div className="bg-gray-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-gray-200 sm:col-span-2 lg:col-span-3">
                  <div className="flex items-center gap-2 mb-1">
                    <FiMapPin className="w-3 h-3 xs:w-4 xs:h-4 text-red-500" />
                    <span className="text-xs xs:text-sm font-semibold text-gray-600">Location</span>
                  </div>
                  <p className="text-sm xs:text-base font-semibold text-gray-900 break-words leading-relaxed">
                    {bookingDetails.location || bookingDetails.customerLocation || 'N/A'}
                  </p>
                </div>

                {/* Notes (if exists) */}
                {(bookingDetails.note || bookingDetails.optionalMessage) && (
                  <div className="bg-blue-50 p-3 xs:p-4 rounded-lg xs:rounded-xl border border-blue-200 sm:col-span-2 lg:col-span-3">
                    <div className="flex items-center gap-2 mb-1">
                      <FiFileText className="w-3 h-3 xs:w-4 xs:h-4 text-blue-500" />
                      <span className="text-xs xs:text-sm font-semibold text-gray-600">Additional Notes</span>
                    </div>
                    <p className="text-sm xs:text-base text-gray-900 leading-relaxed break-words">
                      {bookingDetails.note || bookingDetails.optionalMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Secondary Action Buttons */}
            <div className="border-t border-gray-200 pt-4 xs:pt-6">
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                <Link
                  to="/services"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 xs:px-6 py-3 rounded-lg xs:rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs xs:text-sm text-center flex items-center justify-center gap-2 min-h-[40px] xs:min-h-[44px]"
                >
                  <FiStar className="w-3 h-3 xs:w-4 xs:h-4" />
                  Explore More Services
                </Link>

                <Link
                  to="/dashboard/bookings"
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 xs:px-6 py-3 rounded-lg xs:rounded-xl font-semibold hover:from-yellow-600 hover:to-yellow-700 active:scale-95 transform transition-all duration-200 shadow-md hover:shadow-lg text-xs xs:text-sm text-center flex items-center justify-center gap-2 min-h-[40px] xs:min-h-[44px]"
                >
                  <FiUser className="w-3 h-3 xs:w-4 xs:h-4" />
                  View My Bookings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
