import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiEye, 
  FiSearch, 
  FiCalendar, 
  FiClock,
  FiUser,
  FiCheck,
  FiX,
  FiChevronDown,
  FiGrid,
  FiList,
  FiPhone,
  FiMail,
  FiMapPin,
  FiDollarSign,
  FiRefreshCw,
  FiUserCheck,
  FiAlertCircle,
  FiDownload
} from 'react-icons/fi';
import { bookingsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const BookingMgmt = () => {
  const { addToast } = useToast();
  
  // State management
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [error, setError] = useState(null);
  
  // Confirmation modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [confirmAction, setConfirmAction] = useState(null);
  const [confirmConfig, setConfirmConfig] = useState({
    title: '',
    message: '',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    type: 'danger'
  });
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Input modals state
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showRejectionModal, setShowRejectionModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [actionBookingId, setActionBookingId] = useState(null);
  const [scheduleDate, setScheduleDate] = useState('');
  const [approvalNote, setApprovalNote] = useState('');
  const [rejectionNote, setRejectionNote] = useState('');
  const [completionNote, setCompletionNote] = useState('');

  const statusOptions = ['all', 'pending', 'scheduled', 'completed', 'cancelled', 'rejected'];

  // Helper functions
  const getBookingId = (booking) => booking?.id || booking?._id || '';
  const getBookingStatus = (booking) => booking?.status || 'pending';
  const getCustomerName = (booking) => booking?.name || booking?.customer_name || 'N/A';
  const getCustomerEmail = (booking) => booking?.email || booking?.customer_email || 'N/A';
  const getCustomerPhone = (booking) => booking?.phone_number || booking?.customer_phone || 'N/A';
  const getServiceName = (booking) => booking?.Service?.name || booking?.service || 'N/A';
  const getBookingDate = (booking) => {
    if (!booking?.booking_date) return 'N/A';
    return new Date(booking.booking_date).toLocaleDateString();
  };
  const getBookingTime = (booking) => {
    if (!booking?.booking_date) return 'N/A';
    return new Date(booking.booking_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const getServicePrice = (booking) => booking?.Service?.price || booking?.price || 0;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return <FiClock className="w-3 h-3" />;
      case 'scheduled': return <FiCalendar className="w-3 h-3" />;
      case 'completed': return <FiCheck className="w-3 h-3" />;
      case 'cancelled': return <FiX className="w-3 h-3" />;
      case 'rejected': return <FiX className="w-3 h-3" />;
      default: return <FiClock className="w-3 h-3" />;
    }
  };

  // Load bookings from API
  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await bookingsAPI.getAll();
      const bookingsData = Array.isArray(response) ? response : response.bookings || response.data || [];
      setBookings(bookingsData);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      setError('Failed to load bookings. Please try again.');
      addToast('Failed to load bookings', 'error');
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
      getCustomerName(booking).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getServiceName(booking).toLowerCase().includes(searchTerm.toLowerCase()) ||
      getBookingId(booking).toString().includes(searchTerm);
    
    const matchesStatus = filterStatus === 'all' || getBookingStatus(booking) === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Helper function to show confirmation modal
  const showConfirmation = (config, action) => {
    setConfirmConfig(config);
    setConfirmAction(() => action);
    setShowConfirmModal(true);
  };

  // Helper function to handle confirmation modal actions
  const handleConfirm = async () => {
    setShowConfirmModal(false);
    if (confirmAction) {
      await confirmAction();
    }
    setConfirmAction(null);
  };

  const handleCancelConfirm = () => {
    setShowConfirmModal(false);
    setConfirmAction(null);
  };

  // Booking action handlers
  const handleViewBooking = async (booking) => {
    // Since we already have the booking data from the list,
    // just show the modal with the existing data instead of making another API call
    setSelectedBooking(booking);
    setShowDetailModal(true);
  };

  const handleApproveBooking = async (bookingId) => {
    setActionBookingId(bookingId);
    setScheduleDate('');
    setApprovalNote('');
    setShowApprovalModal(true);
  };

  const handleApprovalSubmit = async () => {
    try {
      setLoadingAction(true);
      setUpdatingStatus('approving');
      setShowApprovalModal(false);
      
      const approvalData = {};
      if (scheduleDate) approvalData.schedule_date = scheduleDate;
      if (approvalNote.trim()) approvalData.note = approvalNote.trim();
      
      await bookingsAPI.approve(actionBookingId, approvalData);
      
      setBookings(prev => prev.map(booking => 
        booking.id === actionBookingId 
          ? { ...booking, status: 'scheduled', schedule_date: scheduleDate || booking.schedule_date, note: approvalNote || booking.note }
          : booking
      ));
      
      if (selectedBooking && selectedBooking.id === actionBookingId) {
        setSelectedBooking(prev => ({ 
          ...prev, 
          status: 'scheduled',
          schedule_date: scheduleDate || prev.schedule_date,
          note: approvalNote || prev.note
        }));
      }
      
      addToast('Booking approved successfully!', 'success');
    } catch (error) {
      console.error('Failed to approve booking:', error);
      addToast('Failed to approve booking', 'error');
    } finally {
      setLoadingAction(false);
      setUpdatingStatus(null);
      setActionBookingId(null);
    }
  };

  const handleRejectBooking = async (bookingId) => {
    setActionBookingId(bookingId);
    setRejectionNote('');
    setShowRejectionModal(true);
  };

  const handleRejectionSubmit = async () => {
    try {
      setLoadingAction(true);
      setUpdatingStatus('rejecting');
      setShowRejectionModal(false);
      
      const rejectionData = {};
      if (rejectionNote.trim()) rejectionData.note = rejectionNote.trim();
      
      await bookingsAPI.reject(actionBookingId, rejectionData);
      
      setBookings(prev => prev.map(booking => 
        booking.id === actionBookingId 
          ? { ...booking, status: 'rejected', note: rejectionNote || booking.note }
          : booking
      ));
      
      if (selectedBooking && selectedBooking.id === actionBookingId) {
        setSelectedBooking(prev => ({ 
          ...prev, 
          status: 'rejected',
          note: rejectionNote || prev.note
        }));
      }
      
      addToast('Booking rejected successfully!', 'success');
    } catch (error) {
      console.error('Failed to reject booking:', error);
      addToast('Failed to reject booking', 'error');
    } finally {
      setLoadingAction(false);
      setUpdatingStatus(null);
      setActionBookingId(null);
    }
  };

  const handleCompleteBooking = async (bookingId) => {
    setActionBookingId(bookingId);
    setCompletionNote('');
    setShowCompletionModal(true);
  };

  const handleCompletionSubmit = async () => {
    try {
      setLoadingAction(true);
      setUpdatingStatus('completing');
      setShowCompletionModal(false);
      
      const completionData = {};
      if (completionNote.trim()) completionData.note = completionNote.trim();
      
      await bookingsAPI.complete(actionBookingId, completionData);
      
      setBookings(prev => prev.map(booking => 
        booking.id === actionBookingId 
          ? { ...booking, status: 'completed', note: completionNote || booking.note }
          : booking
      ));
      
      if (selectedBooking && selectedBooking.id === actionBookingId) {
        setSelectedBooking(prev => ({ 
          ...prev, 
          status: 'completed',
          note: completionNote || prev.note
        }));
      }
      
      addToast('Booking marked as completed!', 'success');
    } catch (error) {
      console.error('Failed to complete booking:', error);
      addToast('Failed to complete booking', 'error');
    } finally {
      setLoadingAction(false);
      setUpdatingStatus(null);
      setActionBookingId(null);
    }
  };

  const handleMarkAsPaid = async (bookingId) => {
    const markPaidAction = async () => {
      try {
        setLoadingAction(true);
        setUpdatingStatus('marking_paid');
        
        await bookingsAPI.markPaid(bookingId);
        
        setBookings(prev => prev.map(booking => 
          booking.id === bookingId 
            ? { ...booking, payment_status: 'paid' }
            : booking
        ));
        
        if (selectedBooking && selectedBooking.id === bookingId) {
          setSelectedBooking(prev => ({ ...prev, payment_status: 'paid' }));
        }
        
        addToast('Booking marked as paid!', 'success');
      } catch (error) {
        console.error('Failed to mark booking as paid:', error);
        addToast('Failed to mark booking as paid', 'error');
      } finally {
        setLoadingAction(false);
        setUpdatingStatus(null);
      }
    };

    showConfirmation({
      title: 'Mark as Paid',
      message: `Are you sure you want to mark this booking as paid? This confirms that payment has been received for this service.`,
      confirmText: 'Yes, Mark as Paid',
      cancelText: 'Cancel',
      type: 'warning'
    }, markPaidAction);
  };

  const closeModal = () => {
    setShowDetailModal(false);
    setSelectedBooking(null);
  };

  // Export bookings to CSV
  const handleExportBookings = () => {
    try {
      // Prepare CSV data
      const csvHeaders = [
        'Booking ID',
        'Customer Name',
        'Email',
        'Phone',
        'Service',
        'Booking Date',
        'Booking Time',
        'Status',
        'Payment Status',
        'Location',
        'Service Price',
        'Notes',
        'Created Date'
      ];

      const csvData = filteredBookings.map(booking => [
        getBookingId(booking),
        getCustomerName(booking),
        getCustomerEmail(booking),
        getCustomerPhone(booking),
        getServiceName(booking),
        getBookingDate(booking),
        getBookingTime(booking),
        getBookingStatus(booking),
        booking?.payment_status || 'pending',
        booking?.location || 'N/A',
        `$${getServicePrice(booking)}`,
        booking?.note || '',
        booking?.created_at ? new Date(booking.created_at).toLocaleDateString() : 'N/A'
      ]);

      // Create CSV content
      const csvContent = [
        csvHeaders.join(','),
        ...csvData.map(row => 
          row.map(field => `"${String(field).replace(/"/g, '""')}"`).join(',')
        )
      ].join('\n');

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `bookings-export-${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        addToast('Bookings exported successfully!', 'success');
      }
    } catch (error) {
      console.error('Export failed:', error);
      addToast('Failed to export bookings', 'error');
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Booking Management
            </h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              Manage service bookings and appointments
            </p>
          </div>
          
          {/* Controls - View Toggle and Export Button */}
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-gray-200">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <FiList className="w-4 h-4" />
              </button>
            </div>
            
            {/* Export Button */}
            <button
              onClick={handleExportBookings}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              <FiDownload className="w-4 h-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-5 lg:p-6">
        <div className="space-y-4 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-4">
            <div className="relative flex-1 sm:max-w-md lg:max-w-lg">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, service, or booking ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base transition-all duration-200"
              />
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[160px]">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base w-full transition-all duration-200"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>
                    {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{filteredBookings.length}</span> of <span className="font-medium text-gray-900">{bookings.length}</span> bookings
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
          <span className="ml-3 text-gray-600">Loading bookings...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <FiAlertCircle className="w-8 h-8 text-red-600 mx-auto mb-3" />
          <p className="text-red-800 font-medium mb-2">Error Loading Bookings</p>
          <p className="text-red-600 text-sm mb-4">{error}</p>
          <button
            onClick={fetchBookings}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium mb-2">
            {bookings.length === 0 
              ? 'No bookings found' 
              : 'No bookings match your current filters.'}
          </p>
          <p className="text-gray-500">
            {bookings.length === 0 
              ? 'No bookings have been created yet.' 
              : 'Try adjusting your search or filter criteria.'}
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 sm:p-5 lg:p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                {filteredBookings.map((booking) => (
                  <div key={getBookingId(booking)} className="group bg-gray-50 border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-green-300 hover:bg-white transition-all duration-300 transform hover:-translate-y-1">
                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="min-w-0 flex-1 pr-2">
                          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate mb-1">
                            #{getBookingId(booking)}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-600 truncate">
                            {getCustomerName(booking)}
                          </p>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ${getStatusColor(getBookingStatus(booking))}`}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(getBookingStatus(booking))}
                            <span className="hidden sm:inline">{getBookingStatus(booking)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5 mb-4">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">Service:</span>
                          <span className="font-medium text-gray-900 truncate ml-2 text-right">
                            {getServiceName(booking)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">Date:</span>
                          <span className="text-gray-900 font-medium">{getBookingDate(booking)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">Time:</span>
                          <span className="text-gray-900 font-medium">{getBookingTime(booking)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-500 font-medium">Price:</span>
                          <span className="font-bold text-green-600">
                            GH₵{getServicePrice(booking).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleViewBooking(booking)}
                        className="w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 hover:scale-105 active:scale-95"
                      >
                        <FiEye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5">
                {filteredBookings.map((booking) => (
                  <div key={getBookingId(booking)} className="group bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-5 lg:p-6 hover:shadow-lg hover:border-green-300 hover:bg-white transition-all duration-300">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                          <div className="flex-1 mb-3 sm:mb-0">
                            <h3 className="font-bold text-gray-900 text-lg sm:text-xl mb-2 group-hover:text-green-700 transition-colors duration-200">
                              Booking #{getBookingId(booking)}
                            </h3>
                            <p className="text-sm sm:text-base text-gray-600 mb-3">
                              <span className="font-medium">{getCustomerName(booking)}</span> • {getBookingDate(booking)} at {getBookingTime(booking)}
                            </p>
                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(getBookingStatus(booking))}`}>
                              {getStatusIcon(getBookingStatus(booking))}
                              {getBookingStatus(booking)}
                            </div>
                          </div>
                          <div className="sm:ml-6 sm:text-right">
                            <p className="text-xl sm:text-2xl font-bold text-green-600 mb-1">
                              GH₵{getServicePrice(booking).toLocaleString()}
                            </p>
                            <p className="text-sm sm:text-base text-gray-600 font-medium">{getServiceName(booking)}</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 mb-4">
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <p className="text-xs text-gray-500 font-medium mb-1">Customer Email</p>
                            <p className="text-sm font-medium text-gray-900 truncate">{getCustomerEmail(booking)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <p className="text-xs text-gray-500 font-medium mb-1">Phone Number</p>
                            <p className="text-sm font-medium text-gray-900">{getCustomerPhone(booking)}</p>
                          </div>
                          <div className="bg-white rounded-lg p-3 border border-gray-100">
                            <p className="text-xs text-gray-500 font-medium mb-1">Payment Status</p>
                            <p className={`text-sm font-bold ${
                              booking?.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                            }`}>
                              {booking?.payment_status?.charAt(0).toUpperCase() + booking?.payment_status?.slice(1) || 'Pending'}
                            </p>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleViewBooking(booking)}
                          className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm sm:text-base font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 hover:scale-105 active:scale-95 min-w-[140px]"
                        >
                          <FiEye className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform duration-200" />
                          <span>View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 lg:p-6 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[96vh] sm:max-h-[94vh] lg:max-h-[90vh] overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 truncate pr-4">
                Booking Details {selectedBooking && `- #${getBookingId(selectedBooking)}`}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition duration-200 touch-manipulation flex-shrink-0"
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {loadingAction && !selectedBooking ? (
              <div className="p-8 sm:p-12 lg:p-16 text-center">
                <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-green-600 mx-auto"></div>
                <p className="mt-6 text-gray-600 text-base sm:text-lg">Loading booking details...</p>
              </div>
            ) : selectedBooking ? (
              <div className="p-4 sm:p-5 lg:p-6 overflow-y-auto max-h-[calc(96vh-5rem)] sm:max-h-[calc(94vh-6rem)] lg:max-h-[calc(90vh-7rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
                  {/* Customer Information */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 sm:p-5 border border-blue-100">
                    <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2 text-base sm:text-lg">
                      <FiUser className="w-5 h-5" />
                      Customer Information
                    </h3>
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <p className="text-xs text-blue-700 mb-1 font-medium">Name</p>
                        <p className="font-semibold text-blue-900 text-sm sm:text-base">{getCustomerName(selectedBooking)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700 mb-1 font-medium">Email</p>
                        <p className="font-semibold text-blue-900 text-sm sm:text-base break-words">{getCustomerEmail(selectedBooking)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700 mb-1 font-medium">Phone</p>
                        <p className="font-semibold text-blue-900 text-sm sm:text-base">{getCustomerPhone(selectedBooking)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-blue-700 mb-1 font-medium">Location</p>
                        <p className="font-semibold text-blue-900 text-sm sm:text-base break-words">{selectedBooking?.location || 'N/A'}</p>
                      </div>
                    </div>
                  </div>

                  {/* Service Information */}
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 sm:p-4 border border-green-100">
                    <h3 className="font-semibold text-green-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <FiCalendar className="w-4 h-4" />
                      Service Information
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <p className="text-xs text-green-700 mb-1">Service</p>
                        <p className="font-medium text-green-900 text-sm sm:text-base">{getServiceName(selectedBooking)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-700 mb-1">Date</p>
                        <p className="font-medium text-green-900 text-sm sm:text-base">{getBookingDate(selectedBooking)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-green-700 mb-1">Time</p>
                        <p className="font-medium text-green-900 text-sm sm:text-base">{getBookingTime(selectedBooking)}</p>
                      </div>
                      {selectedBooking?.schedule_date && (
                        <div>
                          <p className="text-xs text-green-700 mb-1">Scheduled Date</p>
                          <p className="font-medium text-green-900 text-sm sm:text-base">
                            {new Date(selectedBooking.schedule_date).toLocaleDateString()} at {new Date(selectedBooking.schedule_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-green-700 mb-1">Price</p>
                        <p className="font-bold text-green-900 text-base sm:text-lg">GH₵{getServicePrice(selectedBooking).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Status Information */}
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-3 sm:p-4 border border-yellow-100">
                    <h3 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2 text-sm sm:text-base">
                      <FiClock className="w-4 h-4" />
                      Booking Status
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      <div>
                        <p className="text-xs text-yellow-700 mb-1">Status</p>
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(getBookingStatus(selectedBooking))}`}>
                          {getStatusIcon(getBookingStatus(selectedBooking))}
                          {getBookingStatus(selectedBooking)}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-yellow-700 mb-1">Payment Status</p>
                        <p className={`font-medium text-sm ${
                          selectedBooking?.payment_status === 'paid' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {selectedBooking?.payment_status || 'Pending'}
                        </p>
                      </div>
                      {selectedBooking?.note && (
                        <div>
                          <p className="text-xs text-yellow-700 mb-1">Notes</p>
                          <p className="font-medium text-yellow-900 text-sm break-words">{selectedBooking.note}</p>
                        </div>
                      )}
                      {selectedBooking?.completed_at && (
                        <div>
                          <p className="text-xs text-yellow-700 mb-1">Completed At</p>
                          <p className="font-medium text-yellow-900 text-sm">
                            {new Date(selectedBooking.completed_at).toLocaleDateString()} at {new Date(selectedBooking.completed_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-yellow-700 mb-1">Created Date</p>
                        <p className="font-medium text-yellow-900 text-sm">
                          {selectedBooking?.created_at ? new Date(selectedBooking.created_at).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      {selectedBooking?.updated_at && selectedBooking.updated_at !== selectedBooking.created_at && (
                        <div>
                          <p className="text-xs text-yellow-700 mb-1">Last Updated</p>
                          <p className="font-medium text-yellow-900 text-sm">
                            {new Date(selectedBooking.updated_at).toLocaleDateString()} at {new Date(selectedBooking.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 space-y-4">
                  {/* Status Update Section */}
                  {getBookingStatus(selectedBooking) === 'pending' && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Booking Actions</h3>
                      <div className="flex flex-col sm:flex-row gap-3">
                        <button
                          onClick={() => handleApproveBooking(selectedBooking.id)}
                          disabled={loadingAction}
                          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                            loadingAction && updatingStatus === 'approving'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-green-600 text-white hover:bg-green-700'
                          }`}
                        >
                          {loadingAction && updatingStatus === 'approving' ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                          ) : (
                            <FiCheck className="w-4 h-4" />
                          )}
                          <span>{loadingAction && updatingStatus === 'approving' ? 'Approving...' : 'Approve Booking'}</span>
                        </button>
                        <button
                          onClick={() => handleRejectBooking(selectedBooking.id)}
                          disabled={loadingAction}
                          className={`flex-1 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                            loadingAction && updatingStatus === 'rejecting'
                              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          {loadingAction && updatingStatus === 'rejecting' ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-400"></div>
                          ) : (
                            <FiX className="w-4 h-4" />
                          )}
                          <span>{loadingAction && updatingStatus === 'rejecting' ? 'Rejecting...' : 'Reject Booking'}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Complete Booking */}
                  {getBookingStatus(selectedBooking) === 'scheduled' && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Complete Service</h3>
                      <button
                        onClick={() => handleCompleteBooking(selectedBooking.id)}
                        disabled={loadingAction}
                        className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                          loadingAction && updatingStatus === 'completing'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {loadingAction && updatingStatus === 'completing' ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <FiCheck className="w-4 h-4" />
                        )}
                        <span>{loadingAction && updatingStatus === 'completing' ? 'Completing...' : 'Mark as Completed'}</span>
                      </button>
                    </div>
                  )}

                  {/* Payment Actions */}
                  {selectedBooking?.payment_status !== 'paid' && (
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Payment Actions</h3>
                      <button
                        onClick={() => handleMarkAsPaid(selectedBooking.id)}
                        disabled={loadingAction}
                        className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                          loadingAction && updatingStatus === 'marking_paid'
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-yellow-600 text-white hover:bg-yellow-700'
                        }`}
                      >
                        {loadingAction && updatingStatus === 'marking_paid' ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          <FiDollarSign className="w-4 h-4" />
                        )}
                        <span>{loadingAction && updatingStatus === 'marking_paid' ? 'Processing...' : 'Mark as Paid'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-8 lg:p-12 text-center">
                <p className="text-gray-600">Failed to load booking details.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className={`p-6 ${
              confirmConfig.type === 'danger' ? 'bg-red-50 border-b border-red-200' :
              confirmConfig.type === 'warning' ? 'bg-yellow-50 border-b border-yellow-200' :
              'bg-blue-50 border-b border-blue-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  confirmConfig.type === 'danger' ? 'bg-red-100' :
                  confirmConfig.type === 'warning' ? 'bg-yellow-100' :
                  'bg-blue-100'
                }`}>
                  {confirmConfig.type === 'danger' ? (
                    <FiX className={`w-5 h-5 text-red-600`} />
                  ) : confirmConfig.type === 'warning' ? (
                    <FiDollarSign className={`w-5 h-5 text-yellow-600`} />
                  ) : (
                    <FiCheck className={`w-5 h-5 text-blue-600`} />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{confirmConfig.title}</h3>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-6 leading-relaxed">{confirmConfig.message}</p>
              
              <div className="flex gap-3 justify-end">
                <button
                  onClick={handleCancelConfirm}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  {confirmConfig.cancelText}
                </button>
                <button
                  onClick={handleConfirm}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    confirmConfig.type === 'danger' 
                      ? 'bg-red-600 hover:bg-red-700 text-white' :
                    confirmConfig.type === 'warning'
                      ? 'bg-yellow-600 hover:bg-yellow-700 text-white' :
                      'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {confirmConfig.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Approval Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className="p-6 bg-green-50 border-b border-green-200">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCheck className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Approve Booking</h3>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Approve this booking and optionally set a schedule date and add notes.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="scheduleDate" className="block text-sm font-medium text-gray-700 mb-2">
                    Schedule Date (Optional)
                  </label>
                  <input
                    type="datetime-local"
                    id="scheduleDate"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="approvalNote" className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    id="approvalNote"
                    value={approvalNote}
                    onChange={(e) => setApprovalNote(e.target.value)}
                    rows="3"
                    placeholder="Add any notes for the approval..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                  />
                </div>
              </div>
              
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowApprovalModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApprovalSubmit}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
                >
                  Approve Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rejection Modal */}
      {showRejectionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className="p-6 bg-red-50 border-b border-red-200">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <FiX className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Reject Booking</h3>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Reject this booking and optionally provide a reason for the rejection.
              </p>
              
              <div>
                <label htmlFor="rejectionNote" className="block text-sm font-medium text-gray-700 mb-2">
                  Rejection Reason (Optional)
                </label>
                <textarea
                  id="rejectionNote"
                  value={rejectionNote}
                  onChange={(e) => setRejectionNote(e.target.value)}
                  rows="4"
                  placeholder="Provide a reason for rejecting this booking..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 resize-none"
                />
              </div>
              
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowRejectionModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRejectionSubmit}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Reject Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Completion Modal */}
      {showCompletionModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100">
            <div className="p-6 bg-blue-50 border-b border-blue-200">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUserCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Complete Booking</h3>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                Mark this booking as completed and optionally add completion notes.
              </p>
              
              <div>
                <label htmlFor="completionNote" className="block text-sm font-medium text-gray-700 mb-2">
                  Completion Notes (Optional)
                </label>
                <textarea
                  id="completionNote"
                  value={completionNote}
                  onChange={(e) => setCompletionNote(e.target.value)}
                  rows="4"
                  placeholder="Add notes about the service completion..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                />
              </div>
              
              <div className="flex gap-3 justify-end mt-6">
                <button
                  onClick={() => setShowCompletionModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCompletionSubmit}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Complete Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingMgmt;