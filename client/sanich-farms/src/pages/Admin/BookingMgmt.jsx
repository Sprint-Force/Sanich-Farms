import React, { useState, useEffect } from 'react';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiPhone, 
  FiMail, 
  FiCheck, 
  FiX, 
  FiEdit2, 
  FiTrash2, 
  FiSearch, 
  FiFilter,
  FiChevronDown,
  FiMessageSquare,
  FiBarChart,
  FiTrendingUp,
  FiUserCheck,
  FiAlertCircle,
  FiRefreshCw,
  FiEye
} from 'react-icons/fi';
import { ClickableEmail, ClickablePhone } from '../../utils/contactUtils';
import { bookingsAPI } from '../../services/api';
import apiClient from '../../services/api';

const BookingMgmt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterService, setFilterService] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [editingBooking, setEditingBooking] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [messageType, setMessageType] = useState('confirmation');
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // bookings loaded from API
  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    duration: '',
    assignedStaff: '',
    notes: '',
    totalCost: '',
    status: ''
  });

  const services = ['all', 'Farm Consultation', 'Equipment Installation', 'Training Session', 'Pest Control', 'Soil Testing', 'Crop Planning'];
  const statuses = ['all', 'pending', 'approved', 'completed', 'cancelled', 'rejected'];
  const staffMembers = ['Michael Asante', 'Grace Mensah', 'Kwame Osei', 'Akosua Agyei', 'Peter Nkrumah'];

  

  // Statistics calculation
  const stats = {
    total: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    approved: bookings.filter(b => b.status === 'approved').length,
    completed: bookings.filter(b => b.status === 'completed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
    rejected: bookings.filter(b => b.status === 'rejected').length,
    totalRevenue: bookings.filter(b => b.status === 'completed').reduce((sum, b) => sum + b.totalCost, 0),
    avgBookingValue: bookings.length > 0 ? bookings.reduce((sum, b) => sum + b.totalCost, 0) / bookings.length : 0
  };

  // Service statistics
  const serviceStats = services.slice(1).map(service => ({
    name: service,
    count: bookings.filter(b => b.service === service).length,
    revenue: bookings.filter(b => b.service === service && b.status === 'completed').reduce((sum, b) => sum + b.totalCost, 0)
  })).sort((a, b) => b.count - a.count);

  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // Load bookings from API on mount
  useEffect(() => {
    let mounted = true;
    const loadBookings = async () => {
      setLoading(true);
      try {
        const data = await bookingsAPI.getAll();
        // API might return an array or an object containing the array
        const list = Array.isArray(data) ? data : data?.bookings || data?.data || [];
        if (mounted) setBookings(Array.isArray(list) ? list : []);
      } catch (err) {
        console.warn('Failed to load bookings from API', err?.response?.data || err.message || err);
        if (!mounted) return;
        setError('Failed to load bookings from server');
        setBookings([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    loadBookings();
    return () => { mounted = false; };
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-gray-100 text-gray-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const filteredBookings = bookings.filter(booking => {
    const term = (searchTerm || '').toLowerCase();
    const matchesSearch = 
      (booking.customerName || '').toLowerCase().includes(term) ||
      (booking.bookingNumber || '').toLowerCase().includes(term) ||
      (booking.service || '').toLowerCase().includes(term);

    const matchesStatus = filterStatus === 'all' || ((booking.status || '').toLowerCase() === (filterStatus || '').toLowerCase());
    const matchesService = filterService === 'all' || ((booking.service || '').toLowerCase() === (filterService || '').toLowerCase());
    
    // Date range filter
    let matchesDate = true;
    if (selectedDateRange !== 'all') {
      const bookingDate = new Date(booking.date);
      const today = new Date();
      
      switch (selectedDateRange) {
        case 'today':
          matchesDate = bookingDate.toDateString() === today.toDateString();
          break;
        case 'yesterday': {
          const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
          matchesDate = bookingDate.toDateString() === yesterday.toDateString();
          break;
        }
        case 'week': {
          const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
          matchesDate = bookingDate >= weekAgo;
          break;
        }
        case 'month': {
          const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);
          matchesDate = bookingDate >= monthAgo;
          break;
        }
        default:
          matchesDate = true;
      }
    }
    
    return matchesSearch && matchesStatus && matchesService && matchesDate;
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openEditModal = (booking) => {
    setEditingBooking(booking);
    setFormData({
      date: booking.date,
      time: booking.time,
      duration: booking.duration,
      assignedStaff: booking.assignedStaff || '',
      notes: booking.notes,
      totalCost: booking.totalCost.toString(),
      status: booking.status
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingBooking(null);
    setError(null);
    setSuccess(null);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    
    const submit = async () => {
      setLoading(true);
      try {
        const updatedBooking = {
          ...editingBooking,
          date: formData.date,
          time: formData.time,
          duration: formData.duration,
          assignedStaff: formData.assignedStaff,
          notes: formData.notes,
          totalCost: parseFloat(formData.totalCost),
          status: formData.status,
          lastUpdated: new Date().toISOString()
        };

        try {
          const res = await bookingsAPI.update(editingBooking.id, updatedBooking);
          // If API returned the updated booking use it
          const updated = res?.data || res || updatedBooking;
          setBookings(prev => prev.map(b => b.id === editingBooking.id ? updated : b));
        } catch {
          // Fallback to local update if API fails
          console.warn('API update failed, falling back to local update');
          setBookings(prev => prev.map(b => b.id === editingBooking.id ? updatedBooking : b));
        }

        setSuccess('Booking updated successfully');
        closeEditModal();
      } catch {
        setError('Failed to update booking');
      } finally {
        setLoading(false);
      }
    };

    submit();
  };

  const updateBookingStatus = (id, newStatus) => {
    const patchStatus = async () => {
      setLoading(true);
      try {
        try {
          // prefer using bookingsAPI.update to change status
          await bookingsAPI.update(id, { status: newStatus });
          setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus, lastUpdated: new Date().toISOString() } : b));
        } catch {
          console.warn('Failed to update status on server, updating locally');
          setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus, lastUpdated: new Date().toISOString() } : b));
        }
        setSuccess(`Booking ${newStatus} successfully`);
      } catch {
        setError('Failed to update booking status');
      } finally {
        setLoading(false);
      }
    };

    patchStatus();
  };

  const approveBooking = (id) => {
  updateBookingStatus(id, 'approved');
  };

  const rejectBooking = (id) => {
    if (window.confirm('Are you sure you want to reject this booking?')) {
  updateBookingStatus(id, 'rejected');
    }
  };

  const cancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      const doCancel = async () => {
        setLoading(true);
        try {
          try {
            await bookingsAPI.cancel(id);
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled', lastUpdated: new Date().toISOString() } : b));
          } catch {
            console.warn('Cancel API failed, updating locally');
            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled', lastUpdated: new Date().toISOString() } : b));
          }
          setSuccess('Booking cancelled successfully');
        } catch {
          setError('Failed to cancel booking');
        } finally {
          setLoading(false);
        }
      };
      doCancel();
    }
  };

  const completeBooking = (id) => {
  updateBookingStatus(id, 'completed');
  };

  const deleteBooking = (id) => {
    if (window.confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      const doDelete = async () => {
        setLoading(true);
        try {
          try {
            await apiClient.delete(`/bookings/${id}`);
            setBookings(prev => prev.filter(b => b.id !== id));
            setSuccess('Booking deleted successfully');
          } catch {
            console.warn('Delete API failed, falling back to local delete');
            // fallback to local deletion
            setBookings(prev => prev.filter(b => b.id !== id));
            setSuccess('Booking removed locally');
          }
        } catch {
          setError('Failed to delete booking');
        } finally {
          setLoading(false);
        }
      };

      doDelete();
    }
  };

  const openMessageModal = (booking, type) => {
    setSelectedBooking(booking);
    setMessageType(type);
    
    // Pre-fill message based on type
    let defaultMessage = '';
    switch (type) {
      case 'confirmation':
        defaultMessage = `Dear ${booking.customerName},\n\nYour booking (${booking.bookingNumber}) for ${booking.service} has been confirmed for ${booking.date} at ${booking.time}.\n\nThank you for choosing Sanich Farms!`;
        break;
      case 'cancellation':
        defaultMessage = `Dear ${booking.customerName},\n\nWe regret to inform you that your booking (${booking.bookingNumber}) for ${booking.service} scheduled for ${booking.date} has been cancelled.\n\nWe apologize for any inconvenience.`;
        break;
      case 'reminder':
        defaultMessage = `Dear ${booking.customerName},\n\nThis is a reminder that you have a booking (${booking.bookingNumber}) for ${booking.service} tomorrow at ${booking.time}.\n\nPlease contact us if you need to make any changes.`;
        break;
      default:
        defaultMessage = `Dear ${booking.customerName},\n\n`;
    }
    
    setMessageText(defaultMessage);
    setShowMessageModal(true);
  };

  const sendMessage = () => {
    // In real app, integrate with SMS/Email service
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      setSuccess(`${messageType.charAt(0).toUpperCase() + messageType.slice(1)} message sent successfully`);
      setShowMessageModal(false);
      setMessageText('');
    }, 1000);
  };

  const openDetailsModal = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  return (
    <div className="p-4 sm:p-6">
      {/* Success/Error Messages */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
          {success}
        </div>
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-500"></div>
            <span>Processing...</span>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Bookings</h1>
          <p className="text-gray-600 mt-1">Manage customer service bookings and appointments</p>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <button 
            onClick={() => setShowStatsModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <FiBarChart className="w-4 h-4" />
            Statistics
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition"
          >
            <FiRefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Quick Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FiCalendar className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <FiClock className="w-8 h-8 text-yellow-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-2xl font-bold text-blue-600">{stats.approved}</p>
            </div>
            <FiUserCheck className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
            </div>
            <FiCheck className="w-8 h-8 text-green-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Cancelled</p>
              <p className="text-2xl font-bold text-gray-600">{stats.cancelled}</p>
            </div>
            <FiX className="w-8 h-8 text-gray-400" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Revenue</p>
              <p className="text-xl font-bold text-green-600">GH₵{stats.totalRevenue.toFixed(2)}</p>
            </div>
            <FiTrendingUp className="w-8 h-8 text-green-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          
          {/*  */}
          <div className="relative">
            <select
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
            >
              {services.map(service => (
                <option key={service} value={service}>
                  {service === 'all' ? 'All Services' : service}
                </option>
              ))}
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          
          {/* Date filter */}
          <div className="relative">
            <select
              value={selectedDateRange}
              onChange={(e) => setSelectedDateRange(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
            <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Booking Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Schedule
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Staff
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.bookingNumber}</div>
                      <div className={`text-xs font-medium ${getPriorityColor(booking.priority)}`}>
                        {(booking.priority || '').toUpperCase()} PRIORITY
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                      <div className="text-sm text-gray-500">{booking.customerPhone}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.service}</div>
                      <div className="text-sm text-gray-500">{booking.serviceType}</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{booking.date}</div>
                      <div className="text-sm text-gray-500">{booking.time} ({booking.duration})</div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.status)}`}>
                      {((booking.status || '').charAt(0).toUpperCase() + (booking.status || '').slice(1))}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {booking.assignedStaff || (
                      <span className="text-gray-400 italic">Not assigned</span>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">GH₵{(Number(booking.totalCost) || 0).toFixed(2)}</div>
                      {Number(booking.depositPaid) > 0 && (
                        <div className="text-xs text-green-600">Deposit: GH₵{(Number(booking.depositPaid) || 0).toFixed(2)}</div>
                      )}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-1">
                      {/* Quick Actions based on status */}
                      {booking.status === 'pending' && (
                        <>
                          <button
                            onClick={() => approveBooking(booking.id)}
                            className="text-green-600 hover:text-green-900 p-1"
                            title="Approve"
                          >
                            <FiCheck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => rejectBooking(booking.id)}
                            className="text-red-600 hover:text-red-900 p-1"
                            title="Reject"
                          >
                            <FiX className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      
                      {booking.status === 'approved' && (
                        <button
                          onClick={() => completeBooking(booking.id)}
                          className="text-green-600 hover:text-green-900 p-1"
                          title="Mark as Completed"
                        >
                          <FiCheck className="w-4 h-4" />
                        </button>
                      )}
                      
                      {/* Common Actions */}
                      <button
                        onClick={() => openDetailsModal(booking)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="View Details"
                      >
                        <FiEye className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => openEditModal(booking)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => openMessageModal(booking, 'confirmation')}
                        className="text-purple-600 hover:text-purple-900 p-1"
                        title="Send Message"
                      >
                        <FiMessageSquare className="w-4 h-4" />
                      </button>
                      
                      {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                        <button
                          onClick={() => cancelBooking(booking.id)}
                          className="text-yellow-600 hover:text-yellow-900 p-1"
                          title="Cancel"
                        >
                          <FiAlertCircle className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={() => deleteBooking(booking.id)}
                        className="text-red-600 hover:text-red-900 p-1"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredBookings.length === 0 && (
          <div className="text-center py-12">
            <FiCalendar className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </div>

      {/* Edit Booking Modal */}
      {showEditModal && editingBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Edit Booking - {editingBooking.bookingNumber}</h2>
              <button onClick={closeEditModal} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Time *
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 hours"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assigned Staff
                  </label>
                  <div className="relative">
                    <select
                      name="assignedStaff"
                      value={formData.assignedStaff}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                    >
                      <option value="">Select Staff Member</option>
                      {staffMembers.map(staff => (
                        <option key={staff} value={staff}>{staff}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Total Cost (GH₵)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="totalCost"
                    value={formData.totalCost}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="relative">
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                    >
                      {statuses.slice(1).map(status => (
                        <option key={status} value={status}>
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Update Booking
                </button>
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Booking Details Modal */}
      {showDetailsModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Booking Details - {selectedBooking.bookingNumber}</h2>
              <button onClick={() => setShowDetailsModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Customer Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="text-sm text-gray-900">{selectedBooking.customerName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <ClickableEmail 
                      email={selectedBooking.customerEmail} 
                      className="text-sm text-gray-900 hover:text-green-600" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone</label>
                    <ClickablePhone 
                      phone={selectedBooking.customerPhone} 
                      className="text-sm text-gray-900 hover:text-green-600" 
                    />
                  </div>
                </div>
              </div>

              {/* Service Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service</label>
                    <p className="text-sm text-gray-900">{selectedBooking.service}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Service Type</label>
                    <p className="text-sm text-gray-900">{selectedBooking.serviceType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                    <p className="text-sm text-gray-900">{selectedBooking.date} at {selectedBooking.time}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <p className="text-sm text-gray-900">{selectedBooking.duration}</p>
                  </div>
                </div>
              </div>

              {/* Booking Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Booking Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedBooking.status)}`}>
                      {((selectedBooking.status || '').charAt(0).toUpperCase() + (selectedBooking.status || '').slice(1))}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <span className={`text-sm font-medium ${getPriorityColor(selectedBooking.priority)}`}>
                      {(selectedBooking.priority || '').toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Assigned Staff</label>
                    <p className="text-sm text-gray-900">{selectedBooking.assignedStaff || 'Not assigned'}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Created</label>
                    <p className="text-sm text-gray-900">{new Date(selectedBooking.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Financial Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Total Cost</label>
                    <p className="text-sm text-gray-900">GH₵{(Number(selectedBooking.totalCost) || 0).toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Deposit Paid</label>
                    <p className="text-sm text-gray-900">GH₵{(Number(selectedBooking.depositPaid) || 0).toFixed(2)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Balance Due</label>
                    <p className="text-sm text-gray-900">GH₵{(Number(selectedBooking.totalCost) - Number(selectedBooking.depositPaid) || 0).toFixed(2)}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedBooking.notes && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                  <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{selectedBooking.notes}</p>
                </div>
              )}

              {/* Quick Actions */}
              <div className="flex gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openEditModal(selectedBooking);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Edit Booking
                </button>
                <button
                  onClick={() => {
                    setShowDetailsModal(false);
                    openMessageModal(selectedBooking, 'confirmation');
                  }}
                  className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Modal */}
      {showMessageModal && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                Send {messageType.charAt(0).toUpperCase() + messageType.slice(1)} Message
              </h2>
              <button onClick={() => setShowMessageModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setMessageType('confirmation')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    messageType === 'confirmation' 
                      ? 'bg-green-50 border-green-300 text-green-800' 
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Confirmation
                </button>
                <button
                  onClick={() => setMessageType('cancellation')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    messageType === 'cancellation' 
                      ? 'bg-red-50 border-red-300 text-red-800' 
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Cancellation
                </button>
                <button
                  onClick={() => setMessageType('reminder')}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
                    messageType === 'reminder' 
                      ? 'bg-blue-50 border-blue-300 text-blue-800' 
                      : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Reminder
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient
                </label>
                <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">
                  {selectedBooking.customerName} ({selectedBooking.customerEmail})
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  rows="8"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Type your message here..."
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={sendMessage}
                  disabled={loading || !messageText.trim()}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50"
                >
                  Send Message
                </button>
                <button
                  onClick={() => setShowMessageModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Modal */}
      {showStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">Booking Statistics</h2>
              <button onClick={() => setShowStatsModal(false)} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview Stats */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Overview</h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
                    <div className="text-sm text-gray-600">Total Bookings</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{stats.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">GH₵{(Number(stats.totalRevenue) || 0).toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-600">GH₵{(Number(stats.avgBookingValue) || 0).toFixed(0)}</div>
                    <div className="text-sm text-gray-600">Avg. Booking Value</div>
                  </div>
                </div>
              </div>

              {/* Status Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Breakdown</h3>
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-yellow-600">{stats.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-blue-600">{stats.approved}</div>
                    <div className="text-sm text-gray-600">Approved</div>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-green-600">{stats.completed}</div>
                    <div className="text-sm text-gray-600">Completed</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-gray-600">{stats.cancelled}</div>
                    <div className="text-sm text-gray-600">Cancelled</div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="text-xl font-bold text-red-600">{stats.rejected}</div>
                    <div className="text-sm text-gray-600">Rejected</div>
                  </div>
                </div>
              </div>

              {/* Most Requested Services */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Most Requested Services</h3>
                <div className="space-y-3">
                  {serviceStats.slice(0, 5).map((service, index) => (
                    <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                        <div>
                          <div className="font-medium text-gray-900">{service.name}</div>
                          <div className="text-sm text-gray-600">{service.count} bookings</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-gray-900">GH₵{(Number(service.revenue) || 0).toFixed(2)}</div>
                        <div className="text-sm text-gray-600">Revenue</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button
                  onClick={() => setShowStatsModal(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Service Modal */}
      
    </div>
  );
};

export default BookingMgmt;