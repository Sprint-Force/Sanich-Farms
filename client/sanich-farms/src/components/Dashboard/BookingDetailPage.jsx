import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiInfo, FiClock, FiDollarSign } from 'react-icons/fi';
import { bookingsAPI } from '../../services/api';
import { ClickableEmail, ClickablePhone } from '../../utils/contactUtils';

const BookingDetailPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking details from backend API
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await bookingsAPI.getById(bookingId);
        const bookingData = response.booking || response;
        setBooking(bookingData);
      } catch {
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  // Handle booking cancellation with reason
  // Loading state with spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Error state with navigation back
  if (error || !booking) {
    return (
      <div className="text-center py-8 px-4">
        <p className="text-gray-600 text-lg mb-4">{error || 'Booking not found.'}</p>
        <Link 
          to="/dashboard/bookings" 
          className="inline-flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-200"
        >
          <FiArrowLeft /> Back to Bookings
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col gap-4 mb-4 sm:mb-6 pb-4 border-b border-gray-200">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">Booking Details</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            {/* Contact Support Button - for cancel/reschedule requests */}
            {(booking.status === 'pending' || booking.status === 'scheduled') && (
              <a
                href="tel:0243826137"
                className="inline-flex items-center justify-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors duration-200 w-full sm:w-auto"
              >
                <FiPhone className="h-4 w-4 flex-shrink-0" /> 
                <span className="truncate">Contact Support</span>
              </a>
            )}
            <Link 
              to="/dashboard/bookings" 
              className="inline-flex items-center justify-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-200 w-full sm:w-auto"
            >
              <FiArrowLeft className="h-4 w-4 flex-shrink-0" /> 
              <span className="truncate">Back to Bookings</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Booking Summary Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <FiCalendar className="text-green-600 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> 
              <span className="truncate">Booking Summary</span>
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="min-h-[2.5rem]">
                <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Booking ID</span>
                <p className="text-sm sm:text-base text-gray-900 break-words"># {booking.id}</p>
              </div>
              <div className="min-h-[2.5rem]">
                <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Service</span>
                <p className="text-sm sm:text-base text-gray-900 font-medium break-words leading-relaxed">
                  {booking.Service?.name || 'Service Details'}
                </p>
              </div>
              <div className="min-h-[2.5rem]">
                <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Booking Date</span>
                <p className="text-sm sm:text-base text-gray-900 break-words">
                  {new Date(booking.booking_date).toLocaleString()}
                </p>
              </div>
              {booking.schedule_date && (
                <div className="min-h-[2.5rem]">
                  <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Scheduled Date</span>
                  <p className="text-sm sm:text-base text-gray-900 break-words">
                    {new Date(booking.schedule_date).toLocaleString()}
                  </p>
                </div>
              )}
              <div className="min-h-[3rem]">
                <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">Status</span>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                  booking.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                  booking.status === 'cancelled' || booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {booking.status ? `${booking.status.charAt(0).toUpperCase()}${booking.status.slice(1)}` : 'Pending'}
                </span>
              </div>
              <div className="min-h-[3rem]">
                <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">Payment Status</span>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                  booking.payment_status === 'paid' ? 'bg-green-100 text-green-800' :
                  booking.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                  booking.payment_status === 'refunded' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {booking.payment_status ? `${booking.payment_status.charAt(0).toUpperCase()}${booking.payment_status.slice(1)}` : 'Unpaid'}
                </span>
              </div>
              {booking.completed_at && (
                <div className="min-h-[2.5rem]">
                  <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Completed At</span>
                  <p className="text-sm sm:text-base text-gray-900 break-words">
                    {new Date(booking.completed_at).toLocaleString()}
                  </p>
                </div>
              )}
              
              {/* Support Notice for pending/scheduled bookings */}
              {(booking.status === 'pending' || booking.status === 'scheduled') && (
                <div className="min-h-[3rem] bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <FiPhone className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-800 mb-1">Need to make changes?</p>
                      <p className="text-xs text-green-700">
                        Contact our support team to cancel or reschedule your booking.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Customer Information Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <FiUser className="text-green-600 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> 
              <span className="truncate">Customer Information</span>
            </h2>
            <div className="space-y-3 sm:space-y-4">
              <div className="min-h-[2.5rem]">
                <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Name</span>
                <p className="text-sm sm:text-base text-gray-900 break-words leading-relaxed">{booking.name}</p>
              </div>
              <div className="min-h-[2.5rem]">
                <span className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                  <FiMail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> Email
                </span>
                <ClickableEmail 
                  email={booking.email} 
                  className="text-green-600 hover:text-green-800 transition-colors text-sm sm:text-base break-all" 
                />
              </div>
              <div className="min-h-[2.5rem]">
                <span className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                  <FiPhone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> Phone
                </span>
                <ClickablePhone 
                  phone={booking.phone_number} 
                  className="text-green-600 hover:text-green-800 transition-colors text-sm sm:text-base break-all" 
                />
              </div>
              <div className="min-h-[2.5rem]">
                <span className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                  <FiMapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> Location
                </span>
                <p className="text-sm sm:text-base text-gray-900 break-words leading-relaxed">{booking.location}</p>
              </div>
            </div>
          </div>

          {/* Service Details Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 md:col-span-2 xl:col-span-1">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
              <FiInfo className="text-green-600 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> 
              <span className="truncate">Service Details</span>
            </h2>
            {booking.Service && (
              <div className="space-y-3 sm:space-y-4">
                <div className="min-h-[2.5rem]">
                  <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Service Name</span>
                  <p className="text-sm sm:text-base text-gray-900 font-medium break-words leading-relaxed">
                    {booking.Service.name}
                  </p>
                </div>
                {booking.Service.description && (
                  <div className="min-h-[2.5rem]">
                    <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Description</span>
                    <p className="text-sm text-gray-700 break-words leading-relaxed">
                      {booking.Service.description}
                    </p>
                  </div>
                )}
                {booking.Service.price && (
                  <div className="min-h-[2.5rem]">
                    <span className="text-xs sm:text-sm font-medium text-gray-500 mb-1 flex items-center gap-1">
                      <FiDollarSign className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" /> Price
                    </span>
                    <p className="text-sm sm:text-base text-gray-900 font-medium">GH₵ {booking.Service.price}</p>
                  </div>
                )}
                {booking.Service.image_url && (
                  <div>
                    <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-2">Service Image</span>
                    <img 
                      src={booking.Service.image_url} 
                      alt={booking.Service.name}
                      className="w-full h-24 sm:h-32 object-cover rounded-md"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Additional Notes Section */}
        {booking.note && (
          <div className="mt-4 sm:mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <FiInfo className="text-green-600 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> 
              <span className="truncate">Additional Notes</span>
            </h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed break-words">{booking.note}</p>
          </div>
        )}

        {/* Timestamps Section */}
        <div className="mt-4 sm:mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <FiClock className="text-green-600 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" /> 
            <span className="truncate">Timeline</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="min-h-[2.5rem]">
              <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Created</span>
              <p className="text-sm sm:text-base text-gray-900 break-words">
                {new Date(booking.created_at).toLocaleString()}
              </p>
            </div>
            <div className="min-h-[2.5rem]">
              <span className="block text-xs sm:text-sm font-medium text-gray-500 mb-1">Last Updated</span>
              <p className="text-sm sm:text-base text-gray-900 break-words">
                {new Date(booking.updated_at).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetailPage;
