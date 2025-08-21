import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiInfo } from 'react-icons/fi';
import { bookingsAPI } from '../../services/api'; // Use real API instead of mock data
import { ClickableEmail, ClickablePhone } from '../../utils/contactUtils';

const BookingDetailPage = () => {
  const { bookingId } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch booking from API
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        setLoading(true);
        const response = await bookingsAPI.getById(bookingId);
        const bookingData = response.booking || response;
        setBooking(bookingData);
      } catch (err) {
        console.error('Failed to fetch booking details:', err);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) {
      fetchBooking();
    }
  }, [bookingId]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="text-gray-600 text-lg">Loading booking details...</div>
      </div>
    );
  }

  // Error state or booking not found
  if (error || !booking) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        {error || 'Booking not found.'} <Link to="/dashboard/bookings" className="text-green-600 hover:underline">Back to Bookings</Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 lg:space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 lg:mb-6 border-b pb-4 border-gray-200 gap-4 sm:gap-0">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800">Booking Details</h1>
        <Link to="/dashboard/bookings" className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-200 self-start sm:self-center">
          <FiArrowLeft /> Back to Bookings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Booking Summary Card */}
        <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiCalendar className="text-green-600" /> Booking Summary
          </h2>
          <div className="space-y-2 text-gray-700 text-sm lg:text-base">
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>Service:</strong> <span className="break-words">{booking.Service?.name || booking.service || 'N/A'}</span></p>
            <p><strong>Date & Time:</strong> <span className="break-words">{booking.booking_date ? new Date(booking.booking_date).toLocaleString() : booking.date ? `${booking.date} at ${booking.time}` : 'N/A'}</span></p>
            <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2"><strong>Status:</strong>
              <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-semibold w-fit ${
                (booking.status === 'confirmed' || booking.status === 'Confirmed') ? 'bg-green-100 text-green-800' :
                (booking.status === 'pending' || booking.status === 'Pending') ? 'bg-blue-100 text-blue-800' :
                (booking.status === 'completed') ? 'bg-green-100 text-green-800' :
                (booking.status === 'cancelled' || booking.status === 'rejected') ? 'bg-red-100 text-red-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {booking.status ? booking.status.charAt(0).toUpperCase() + booking.status.slice(1) : 'Pending'}
              </span>
            </p>
            <p><strong>Payment Status:</strong> <span className="capitalize">{booking.payment_status || 'Unpaid'}</span></p>
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
          <h2 className="text-lg lg:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiUser className="text-green-600" /> Customer Information
          </h2>
          <div className="space-y-2 text-gray-700 text-sm lg:text-base">
            <p><strong>Name:</strong> <span className="break-words">{booking.name || booking.customerName || 'N/A'}</span></p>
            <p><strong>Email:</strong> <ClickableEmail email={booking.email} className="text-gray-700 hover:text-green-600 break-words" /></p>
            <p><strong>Phone:</strong> <ClickablePhone phone={booking.phone_number || booking.phone} className="text-gray-700 hover:text-green-600 break-words" /></p>
            <p><strong>Location:</strong> <span className="break-words">{booking.location || booking.customerLocation || 'N/A'}</span></p>
          </div>
        </div>
      </div>

      {/* Service Specific Details */}
      {booking.serviceDetails && (
        <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200 flex items-center gap-2">
            <FiInfo className="text-green-600" /> Service Specifics
          </h2>
          <div className="space-y-2 text-gray-700 text-sm lg:text-base">
            {Object.entries(booking.serviceDetails).map(([key, value]) => (
              <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> <span className="break-words">{value}</span></p>
            ))}
          </div>
        </div>
      )}

      {/* Optional Notes */}
      {(booking.note || booking.notes) && (
        <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 border border-gray-100">
          <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200">
            Additional Notes
          </h2>
          <p className="text-gray-700 text-sm lg:text-base break-words">{booking.note || booking.notes}</p>
        </div>
      )}
    </div>
  );
};

export default BookingDetailPage;
