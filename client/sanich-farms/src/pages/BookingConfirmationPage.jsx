import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiCheckCircle, FiHome, FiChevronRight } from 'react-icons/fi';

const BookingConfirmationPage = () => {
  const location = useLocation();
  const { bookingDetails } = location.state || {}; // Get bookingDetails passed via navigate state

  return (
    <div className="font-poppins bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <div className="w-full max-w-7xl mx-auto mb-8 flex items-center gap-2 text-gray-700">
        <Link to="/" className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors duration-200" aria-label="Go to Home page">
          <FiHome className="w-5 h-5" />
          <span className="text-base font-medium hidden sm:inline">Home</span>
        </Link>
        <FiChevronRight className="w-4 h-4 text-gray-400" />
        <span className="text-green-600 text-base font-semibold">Booking Confirmation</span>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 w-full max-w-2xl text-center">
        <FiCheckCircle className="text-green-500 text-6xl mx-auto mb-6" />
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4">
          Booking Confirmed!
        </h1>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          Thank you for booking with Sanich Farms. Your request has been received, and we will contact you shortly to confirm the details.
        </p>

        {bookingDetails ? (
          <div className="bg-gray-50 p-6 rounded-lg text-left mb-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Booking Details</h2>
            <div className="space-y-2 text-gray-700">
              <p><strong>Service Type:</strong> {bookingDetails.serviceType || 'N/A'}</p>
              <p><strong>Customer Name:</strong> {bookingDetails.customerName || 'N/A'}</p>
              <p><strong>Email:</strong> {bookingDetails.email || 'N/A'}</p>
              <p><strong>Phone:</strong> {bookingDetails.phone || 'N/A'}</p>
              <p><strong>Location:</strong> {bookingDetails.customerLocation || 'N/A'}</p>
              <p><strong>Preferred Date/Time:</strong> {bookingDetails.preferredDateTime ? new Date(bookingDetails.preferredDateTime).toLocaleString() : 'N/A'}</p>
              {bookingDetails.optionalMessage && <p><strong>Notes:</strong> {bookingDetails.optionalMessage}</p>}
            </div>
          </div>
        ) : (
          <p className="text-gray-600 text-base mb-8">No booking details available.</p>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/services"
            className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md"
          >
            Explore More Services
          </Link>
          <Link
            to="/"
            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmationPage;
