import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiHome, FiChevronRight, FiCalendar, FiUser, FiMail, FiPhone, FiMapPin, FiClock, FiCheckCircle } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';
import { servicesAPI, bookingsAPI } from '../services/api';
import { useAuthContext } from '../hooks/useAuthContext';
import notificationService from '../services/notificationService';

const ServiceBookingPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { addToast } = useToast();
  const { isAuthenticated } = useAuthContext();

  const [selectedService, setSelectedService] = useState(null);
  const [allServices, setAllServices] = useState([]); // FIX: Add state for all available services
  const [loading, setLoading] = useState(true);
  const [loadingBooking, setLoadingBooking] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    customerLocation: '',
    preferredDateTime: '',
    serviceType: '',
    optionalMessage: '',
  });

  // Effect to fetch service data from the API
  useEffect(() => {
    const fetchServiceAndAllServices = async () => {
      try {
        setLoading(true);
        
        // Fetch all services for dropdown using configured API
        const servicesData = await servicesAPI.getAll();
        setAllServices(servicesData.services || servicesData || []);
        
        // If serviceId is provided, fetch specific service
        if (serviceId) {
          const fetchedService = await servicesAPI.getById(serviceId);
          if (fetchedService) {
            setSelectedService(fetchedService.service || fetchedService);
            setFormData(prev => ({
              ...prev,
              serviceType: (fetchedService.service || fetchedService).name,
            }));
          } else {
            setError("Service not found.");
          }
        } else {
          // If no specific service, allow user to select from all services
          setSelectedService(null);
        }
      } catch (err) {
        console.error("Failed to fetch service details:", err);
        setError("Failed to load service details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceAndAllServices();
  }, [serviceId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // FIX: Update selected service when service type changes
    if (name === 'serviceType') {
      const selectedSvc = allServices.find(service => service.name === value);
      if (selectedSvc) {
        setSelectedService(selectedSvc);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is authenticated
    if (!isAuthenticated) {
      addToast("Please log in to book a service.", "error");
      navigate('/login', { state: { from: { pathname: `/book-service/${serviceId || ''}` } } });
      return;
    }

    if (!formData.customerName || !formData.email || !formData.phone || !formData.customerLocation || !formData.preferredDateTime || !formData.serviceType) {
      addToast("Please fill in all required fields.", 'error');
      return;
    }

    // Validate that a service is selected
    if (!selectedService?.id) {
      addToast("Please select a valid service.", 'error');
      return;
    }

    // Validate that the booking date is in the future
    const selectedDate = new Date(formData.preferredDateTime);
    const now = new Date();
    if (selectedDate <= now) {
      addToast("Please select a future date and time for your booking.", 'error');
      return;
    }

    setLoadingBooking(true);
    try {
      const bookingDetails = {
        serviceId: selectedService.id, // Backend maps this to service_id
        name: formData.customerName.trim(),
        email: formData.email.trim(),
        phone_number: formData.phone.trim(),
        location: formData.customerLocation.trim(),
        booking_date: formData.preferredDateTime, // ISO format from datetime-local
        note: formData.optionalMessage.trim() || null,
      };

      console.log('Submitting booking with data:', bookingDetails); // Debug log

      const response = await bookingsAPI.create(bookingDetails);

      const bookingId = response.booking?.id || response.id; // Handle different response formats
      
      // Notify admin about new booking
      try {
        await notificationService.notifyAdminNewBooking({
          ...bookingDetails,
          id: bookingId,
          service_name: selectedService?.name || formData.serviceType || 'Service',
          customer_name: `${formData.customerName}`,
          scheduled_date: formData.preferredDateTime
        });
      } catch (notifError) {
        console.error('Failed to send admin notification:', notifError);
      }
      
      addToast("Your service booking has been submitted! We will contact you shortly.", 'success');
      
      // Navigate to booking confirmation page with the booking data
      if (bookingId) {
        navigate(`/booking-confirmation/${bookingId}`, { 
          state: { 
            booking: response.booking || response,
            type: 'booking' 
          } 
        });
      } else {
        navigate('/dashboard/bookings');
      }
    } catch (err) {
      console.error("Failed to submit booking:", err);
      
      // Enhanced error handling
      let errorMessage = "Failed to submit your booking. Please try again.";
      
      if (err.response?.data) {
        if (err.response.data.error) {
          errorMessage = err.response.data.error;
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      addToast(errorMessage, 'error');
    } finally {
      setLoadingBooking(false);
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Modern Breadcrumb Skeleton */}
        <div className="w-full breadcrumb-modern">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8">
            {/* Form Skeleton */}
            <div className="lg:col-span-2 bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 sm:p-8">
              <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-4">
                {[...Array(7)].map((_, i) => (
                  <div key={i} className="w-full h-12 bg-gray-200 rounded animate-pulse"></div>
                ))}
                <div className="w-32 h-12 bg-gray-200 rounded animate-pulse mt-6"></div>
              </div>
            </div>
            
            {/* Summary Skeleton */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 sm:p-8">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="w-3/4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-1/2 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-24 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Service Not Found</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            to="/services" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Breadcrumbs - Clean & Responsive */}
      <div className="w-full breadcrumb-modern">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 xs:gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link flex items-center gap-1 text-slate-600 hover:text-green-600" aria-label="Go to Home page">
              <FiHome className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              <span className="font-medium hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 breadcrumb-separator" />
            <Link to="/services" className="breadcrumb-link text-slate-600 hover:text-green-600" aria-label="Go to Services page">
              <span className="font-medium hidden sm:inline">Services</span>
              <span className="font-medium sm:hidden">...</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 breadcrumb-separator" />
            <span className="breadcrumb-current text-sm xs:text-base font-semibold truncate max-w-[120px] xs:max-w-[200px] sm:max-w-none">
              Book Service
            </span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Clean & Modern */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10">
          <div className="text-center">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Book Your Service
            </h1>
            <p className="text-xs xs:text-sm sm:text-base text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Fill out the form below to book your preferred service with us
            </p>
          </div>
        </div>
      </div>

      {/* Main Booking Content - Enhanced Responsive Layout */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8">
          
          {/* Booking Form - Enhanced Mobile Design */}
          <div className="lg:col-span-2 bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
              
              {/* Personal Information Section */}
              <div className="border-b border-gray-100 pb-4 xs:pb-6">
                <h2 className="text-lg xs:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiUser className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                  {/* Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="customerName"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        placeholder="0XX XXX XXXX"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Location Section */}
              <div className="border-b border-gray-100 pb-4 xs:pb-6">
                <h2 className="text-lg xs:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiMapPin className="w-5 h-5 text-green-600" />
                  Service & Location
                </h2>
                
                <div className="grid grid-cols-1 gap-4 xs:gap-6">
                  {/* Service Selection */}
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Select Service <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="serviceType"
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      required
                    >
                      <option value="">Choose your service...</option>
                      {allServices.map(service => (
                        <option key={service.id} value={service.name}>
                          {service.name} - GH₵{parseFloat(service.price || 0).toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Location */}
                  <div>
                    <label htmlFor="customerLocation" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Your Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="customerLocation"
                      name="customerLocation"
                      value={formData.customerLocation}
                      onChange={handleChange}
                      className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your address or location"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Booking Details Section */}
              <div className="pb-4 xs:pb-6">
                <h2 className="text-lg xs:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiCalendar className="w-5 h-5 text-yellow-600" />
                  Booking Details
                </h2>
                
                <div className="grid grid-cols-1 gap-4 xs:gap-6">
                  {/* Date & Time */}
                  <div>
                    <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Preferred Date & Time <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <FiClock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="datetime-local"
                        id="preferredDateTime"
                        name="preferredDateTime"
                        value={formData.preferredDateTime}
                        onChange={handleChange}
                        className="w-full pl-9 xs:pl-10 pr-3 xs:pr-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                  </div>
                  
                  {/* Additional Notes */}
                  <div>
                    <label htmlFor="optionalMessage" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="optionalMessage"
                      name="optionalMessage"
                      rows="3"
                      value={formData.optionalMessage}
                      onChange={handleChange}
                      className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                      placeholder="Any specific requirements or notes..."
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loadingBooking}
                  className={`w-full flex items-center justify-center gap-2 px-6 xs:px-8 py-3 xs:py-4 rounded-lg xs:rounded-xl font-semibold text-sm xs:text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 min-h-[44px] ${
                    loadingBooking
                      ? 'bg-gray-400 cursor-not-allowed text-white'
                      : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:ring-green-300'
                  }`}
                >
                  {loadingBooking ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Booking Service...</span>
                    </>
                  ) : (
                    <>
                      <FiCheckCircle className="w-5 h-5" />
                      <span>Book Service Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Service Summary - Enhanced Mobile Design */}
          <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6 sm:p-8 h-fit">
            <h2 className="text-lg xs:text-xl font-semibold text-gray-900 mb-4 xs:mb-6 border-b border-gray-100 pb-3 xs:pb-4">
              Service Summary
            </h2>
            
            {selectedService ? (
              <div className="space-y-4 xs:space-y-6">
                {/* Service Info */}
                <div className="flex items-start gap-3 xs:gap-4">
                  <img
                    src={selectedService.image_url || selectedService.image || "https://placehold.co/60x60/4CAF50/FFFFFF?text=Service"}
                    alt={selectedService.name}
                    className="w-12 h-12 xs:w-16 xs:h-16 rounded-lg object-cover flex-shrink-0"
                    onError={(e) => { 
                      e.target.onerror = null; 
                      e.target.src="https://placehold.co/60x60/cccccc/333333?text=Service"; 
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm xs:text-base font-semibold text-gray-900 leading-tight">
                      {selectedService.name}
                    </h3>
                    <p className="text-xs xs:text-sm text-gray-600 mt-1">Selected Service</p>
                    <div className="mt-2">
                      <span className="text-lg xs:text-xl font-bold text-green-600">
                        GH₵{parseFloat(selectedService.price || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs xs:text-sm text-gray-700 leading-relaxed">
                    {selectedService.description?.substring(0, 120) + '...' || 'Professional service tailored to your needs.'}
                  </p>
                </div>
                
                {/* Confirmation Info */}
                <div className="bg-blue-50 rounded-lg p-3 xs:p-4 border border-blue-100">
                  <h4 className="text-sm xs:text-base font-semibold text-blue-900 mb-2">
                    What happens next?
                  </h4>
                  <ul className="text-xs xs:text-sm text-blue-800 space-y-1">
                    <li>• Confirmation email within 1 hour</li>
                    <li>• Service team contact within 24 hours</li>
                    <li>• Flexible rescheduling available</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 xs:py-8">
                <div className="w-12 h-12 xs:w-16 xs:h-16 mx-auto mb-3 xs:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <FiCalendar className="w-6 h-6 xs:w-8 xs:h-8 text-gray-400" />
                </div>
                <p className="text-xs xs:text-sm text-gray-600">
                  Select a service to view its details and pricing
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingPage;
