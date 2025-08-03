import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiInfo } from 'react-icons/fi';
import { bookingsData } from '../../data/bookingsData'; // Import centralized bookings data

const BookingDetailPage = () => {
  const { bookingId } = useParams();
  const booking = bookingsData.find(b => b.id === bookingId);

  if (!booking) {
    return (
      <div className="text-center py-10 text-gray-600 text-lg">
        Booking not found. <Link to="/dashboard/bookings" className="text-green-600 hover:underline">Back to Bookings</Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">Booking Details</h1>
        <Link to="/dashboard/bookings" className="flex items-center gap-2 text-green-600 hover:text-green-800 transition-colors duration-200">
          <FiArrowLeft /> Back to Bookings
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Summary Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiCalendar className="text-green-600" /> Booking Summary
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Booking ID:</strong> {booking.id}</p>
            <p><strong>Service:</strong> {booking.service}</p>
            <p><strong>Date & Time:</strong> {`${booking.date} at ${booking.time}`}</p>
            <p><strong>Status:</strong>
              <span className={`ml-2 px-2 py-0.5 rounded-full text-xs font-semibold ${
                booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                booking.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {booking.status}
              </span>
            </p>
            <p><strong>Price:</strong> {booking.price || 'N/A'}</p>
          </div>
        </div>

        {/* Customer Information Card */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiUser className="text-green-600" /> Customer Information
          </h2>
          <div className="space-y-2 text-gray-700">
            <p><strong>Name:</strong> {booking.customerName}</p>
            <p><strong>Email:</strong> {booking.email}</p>
            <p><strong>Phone:</strong> {booking.phone}</p>
            <p><strong>Location:</strong> {booking.location}</p>
          </div>
        </div>
      </div>

      {/* Service Specific Details */}
      {booking.serviceDetails && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200 flex items-center gap-2">
            <FiInfo className="text-green-600" /> Service Specifics
          </h2>
          <div className="space-y-2 text-gray-700">
            {Object.entries(booking.serviceDetails).map(([key, value]) => (
              <p key={key}><strong>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</strong> {value}</p>
            ))}
          </div>
        </div>
      )}

      {/* Optional Notes */}
      {booking.notes && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3 border-gray-200">
            Additional Notes
          </h2>
          <p className="text-gray-700">{booking.notes}</p>
        </div>
      )}
    </div>
  );
};

export default BookingDetailPage;
