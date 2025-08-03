import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye } from 'react-icons/fi';
import { bookingsData } from '../../data/bookingsData'; // Import centralized bookings data

const MyBookings = () => {
  // Use imported data
  const bookings = bookingsData;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center py-10 text-gray-600 text-lg">
          You haven't made any service bookings yet.
          <Link to="/services" className="text-green-600 hover:underline ml-2">Book a Service!</Link>
        </div>
      ) : (
        <div className="overflow-x-auto hide-scrollbar">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tl-lg">Booking ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider rounded-tr-lg">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="py-4 px-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.id}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{booking.service}</td>
                  <td className="py-4 px-4 whitespace-nowrap text-sm text-gray-600">{`${booking.date} at ${booking.time}`}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Pending' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-right text-sm font-medium">
                    {/* Link to BookingDetailPage */}
                    <Link
                      to={`/dashboard/bookings/${booking.id}`}
                      className="text-green-600 hover:text-green-900 ml-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
                      aria-label={`View details for booking ${booking.id}`}
                    >
                      <FiEye size={18} />
                    </Link>
                    {/* Add more actions like reschedule, cancel etc. */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
