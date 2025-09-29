import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiCalendar, FiX, FiEdit, FiFilter, FiRefreshCw } from 'react-icons/fi';
import { bookingsAPI } from '../../services/api'; // API integration

const MyBookings = () => {
  // DASHBOARD API INTEGRATION: State management
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');

  // DASHBOARD API INTEGRATION: Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingsAPI.getAll();
      
      // Handle different response structures
      const bookingsData = Array.isArray(response) ? response : 
                          Array.isArray(response?.bookings) ? response.bookings : 
                          Array.isArray(response?.data) ? response.data : [];
      
      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // DASHBOARD API INTEGRATION: Load bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // DASHBOARD API INTEGRATION: Filter bookings based on status
  useEffect(() => {
    if (statusFilter === 'All') {
      setFilteredBookings(bookings);
    } else {
      setFilteredBookings(bookings.filter(booking => booking.status === statusFilter));
    }
  }, [statusFilter, bookings]);

  // DASHBOARD API INTEGRATION: Handle booking rescheduling
  const handleReschedule = async (bookingId) => {
    try {
      // This would typically open a date picker modal
      const newDate = prompt('Enter new date (YYYY-MM-DD):');
      const newTime = prompt('Enter new time (HH:MM):');
      
      if (newDate && newTime) {
        await bookingsAPI.update(bookingId, { 
          date: newDate, 
          time: newTime 
        });
        fetchBookings(); // Refresh the list
        alert(`Booking ${bookingId} rescheduled successfully!`);
      }
    } catch (error) {
      console.error('Error rescheduling booking:', error);
      alert('Failed to reschedule booking. Please try again.');
    }
  };

  // DASHBOARD API INTEGRATION: Handle booking cancellation
  const handleCancel = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      try {
        await bookingsAPI.cancel(bookingId);
        fetchBookings(); // Refresh the list
        alert(`Booking ${bookingId} has been cancelled.`);
      } catch (error) {
        console.error('Error cancelling booking:', error);
        alert('Failed to cancel booking. Please try again.');
      }
    }
  };

  const statusOptions = ['All', 'pending', 'scheduled', 'completed', 'cancelled']; // USER SIDE FIX: Use lowercase status values

  // DASHBOARD API INTEGRATION: Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse"></div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // DASHBOARD API INTEGRATION: Error state
  if (error) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800">My Bookings</h1>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => fetchBookings()} 
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800">My Bookings</h1>
        
        {/* DASHBOARD AUDIT FIX: Booking filtering */}
        <div className="flex items-center gap-2">
          <FiFilter className="text-gray-500" size={16} />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>{status} Bookings</option>
            ))}
          </select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-xl shadow-sm">
          <FiCalendar className="mx-auto text-gray-400 mb-3" size={44} />
          <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-2">
            {statusFilter === 'All' ? "You haven't made any service bookings yet" : `No ${statusFilter.toLowerCase()} bookings found`}
          </h3>
          <Link to="/services" className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition duration-200">
            <FiCalendar size={16} />
            Book a Service
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {/* DASHBOARD AUDIT FIX: Card-based layout like Amazon mobile */}
          <div className="grid gap-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-2 sm:p-4 hover:shadow-md transition duration-200">
                <div className="block sm:hidden mb-2">
                  <div className="text-sm text-gray-500">
                    <span>Bookings</span>
                    <span className="px-1">/</span>
                    <Link to={`/dashboard/bookings/${booking.id}`} className="text-green-600 font-medium">Details</Link>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Booking Info */}
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-800">
                        {/* USER SIDE FIX: Display service name from API response */}
                        {booking.Service?.name || booking.service || 'Service Booking'}
                      </h3>
                      <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'scheduled' || booking.status === 'Confirmed' ? 'bg-blue-100 text-blue-800' :
                        booking.status === 'pending' || booking.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {booking.status || 'pending'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs sm:text-sm text-gray-600">
                      <p><span className="font-medium">Booking ID:</span> #{booking.id}</p>
                      <p><span className="font-medium">Date:</span> {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : (booking.date || 'N/A')}</p>
                      <p><span className="font-medium">Location:</span> {booking.location || booking.time || 'N/A'}</p>
                    </div>
                    {/* USER SIDE FIX: Display service description and price */}
                    {booking.Service?.description && (
                      <p className="text-sm text-gray-500 mt-2">{booking.Service.description}</p>
                    )}
                    {booking.Service?.price && (
                      <p className="text-lg font-semibold text-green-600 mt-1">GH₵{parseFloat(booking.Service.price).toFixed(2)}</p>
                    )}
                  </div>

                  {/* DASHBOARD AUDIT FIX: Amazon-style action buttons for bookings */}
                      <div className="flex flex-wrap gap-2 items-center">
                        <Link to={`/dashboard/bookings/${booking.id}`} aria-label={`View booking ${booking.id}`} className="inline-flex items-center justify-center p-2 rounded-md bg-gray-100 text-gray-700 sm:hidden">
                          <FiEye size={16} />
                        </Link>
                        <Link to={`/dashboard/bookings/${booking.id}`} className="hidden sm:inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-2 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200 transition duration-200">
                          <FiEye size={14} />
                          View Details
                        </Link>

                      {(booking.status === 'Pending' || booking.status === 'Confirmed') && (
                        <>
                          <button onClick={() => handleReschedule(booking.id)} aria-label={`Reschedule booking ${booking.id}`} className="inline-flex items-center justify-center p-2 rounded-md bg-blue-100 text-blue-700 sm:hidden">
                            <FiEdit size={16} />
                          </button>
                          <button onClick={() => handleReschedule(booking.id)} className="hidden sm:inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-2 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-200 transition duration-200">
                            <FiEdit size={14} />
                            Reschedule
                          </button>

                          <button onClick={() => handleCancel(booking.id)} aria-label={`Cancel booking ${booking.id}`} className="inline-flex items-center justify-center p-2 rounded-md bg-red-100 text-red-700 sm:hidden">
                            <FiX size={16} />
                          </button>
                          <button onClick={() => handleCancel(booking.id)} className="hidden sm:inline-flex items-center gap-2 bg-red-100 text-red-700 px-2 py-1.5 rounded-lg text-sm font-medium hover:bg-red-200 transition duration-200">
                            <FiX size={14} />
                            Cancel
                          </button>
                        </>
                      )}

                      {booking.status === 'Completed' && (
                        <>
                          <Link to="/services" className="inline-flex items-center justify-center p-2 rounded-md bg-green-100 text-green-700 sm:hidden" aria-label="Book again">
                            <FiRefreshCw size={18} />
                          </Link>
                          <Link to="/services" className="hidden sm:inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition duration-200">
                            <FiRefreshCw size={14} />
                            Book Again
                          </Link>
                        </>
                      )}
                    </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
