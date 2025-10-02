import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiCalendar, FiFilter, FiRefreshCw, FiPhone } from 'react-icons/fi';
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

  const statusOptions = ['All', 'pending', 'scheduled', 'completed', 'rejected', 'cancelled']; // Backend enum values

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

      {/* Support Information Notice */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4">
        <div className="flex items-start gap-2 sm:gap-3">
          <FiPhone className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="min-w-0 flex-1">
            <h3 className="text-xs sm:text-sm font-semibold text-green-800 mb-1">Need to modify your booking?</h3>
            <p className="text-xs sm:text-sm text-green-700 mb-2 leading-relaxed">
              Contact our support team for assistance with cancellations or rescheduling.
            </p>
            <a 
              href="tel:0243826137" 
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-green-700 hover:text-green-800 transition-colors"
            >
              <FiPhone className="h-3 w-3 flex-shrink-0" />
              Call Support: 024 382 6137
            </a>
          </div>
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
                      <div className="flex flex-wrap gap-2">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          booking.status === 'completed' ? 'bg-green-100 text-green-800' :
                          booking.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                          booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          booking.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          booking.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {booking.status ? `${booking.status.charAt(0).toUpperCase()}${booking.status.slice(1)}` : 'Pending'}
                        </span>
                        {/* Payment Status Badge */}
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          booking.payment_status === 'paid' ? 'bg-green-100 text-green-700' :
                          booking.payment_status === 'failed' ? 'bg-red-100 text-red-700' :
                          booking.payment_status === 'refunded' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {booking.payment_status ? `${booking.payment_status.charAt(0).toUpperCase()}${booking.payment_status.slice(1)}` : 'Unpaid'}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced booking details with all backend fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 text-xs sm:text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Booking ID:</span> #{booking.id}
                      </div>
                      <div>
                        <span className="font-medium">Requested Date:</span> 
                        <br />
                        {booking.booking_date ? new Date(booking.booking_date).toLocaleDateString() : (booking.date || 'N/A')}
                      </div>
                      {booking.schedule_date && (
                        <div>
                          <span className="font-medium">Scheduled Date:</span>
                          <br />
                          {new Date(booking.schedule_date).toLocaleDateString()}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Location:</span>
                        <br />
                        {booking.location || 'Not specified'}
                      </div>
                      <div>
                        <span className="font-medium">Contact:</span>
                        <br />
                        {booking.name || 'N/A'}
                        {booking.phone_number && (
                          <div className="text-xs text-gray-500">{booking.phone_number}</div>
                        )}
                      </div>
                      {booking.completed_at && (
                        <div>
                          <span className="font-medium">Completed:</span>
                          <br />
                          {new Date(booking.completed_at).toLocaleDateString()}
                        </div>
                      )}
                    </div>

                    {/* Service information and pricing */}
                    {booking.Service?.description && (
                      <p className="text-sm text-gray-500 mt-2">{booking.Service.description}</p>
                    )}
                    {booking.Service?.price && (
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-semibold text-green-600">GH₵{parseFloat(booking.Service.price).toFixed(2)}</p>
                        {booking.payment_status === 'paid' && (
                          <span className="text-xs text-green-600 font-medium">Paid</span>
                        )}
                      </div>
                    )}

                    {/* Booking note if available */}
                    {booking.note && (
                      <div className="mt-2 p-2 bg-gray-50 rounded">
                        <span className="text-xs font-medium text-gray-500">Note:</span>
                        <p className="text-sm text-gray-700">{booking.note}</p>
                      </div>
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

                      {(booking.status === 'pending' || booking.status === 'scheduled') && (
                        <>
                          <a href="tel:0243826137" aria-label={`Contact support for booking ${booking.id}`} className="inline-flex items-center justify-center p-2 rounded-md bg-green-100 text-green-700 sm:hidden">
                            <FiPhone size={16} />
                          </a>
                          <a href="tel:0243826137" className="hidden sm:inline-flex items-center gap-2 bg-green-100 text-green-700 px-2 py-1.5 rounded-lg text-sm font-medium hover:bg-green-200 transition duration-200">
                            <FiPhone size={14} />
                            Contact Support
                          </a>
                        </>
                      )}

                      {booking.status === 'completed' && (
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
