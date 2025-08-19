import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { useToast } from '../context/ToastContext';
import axios from 'axios';

const ServiceBookingPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams();
  const { addToast } = useToast();

  // Define your backend API URLs
  const BASE_URL_SERVICES = 'https://sanich-farms-tnac.onrender.com/api/services';
  const BASE_URL_BOOKINGS = 'https://sanich-farms-tnac.onrender.com/api/bookings';

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
        
        // Fetch all services for dropdown
        const allServicesResponse = await axios.get(BASE_URL_SERVICES);
        const servicesData = allServicesResponse.data.services || [];
        setAllServices(servicesData);
        
        // If serviceId is provided, fetch specific service
        if (serviceId) {
          const response = await axios.get(`${BASE_URL_SERVICES}/${serviceId}`);
          const fetchedService = response.data.service;
          if (fetchedService) {
            setSelectedService(fetchedService);
            setFormData(prev => ({
              ...prev,
              serviceType: fetchedService.name,
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

    if (!formData.customerName || !formData.email || !formData.phone || !formData.customerLocation || !formData.preferredDateTime || !formData.serviceType) {
      addToast("Please fill in all required fields.", 'error');
      return;
    }

    setLoadingBooking(true);
    try {
      const bookingDetails = {
        ...formData,
        serviceId: selectedService.id,
        servicePrice: selectedService.price,
      };

      const response = await axios.post(BASE_URL_BOOKINGS, bookingDetails);

      const bookingId = response.data.bookingId; // Assuming your API returns a bookingId
      addToast("Your service booking has been submitted! We will contact you shortly.", 'success');
      navigate(`/booking-confirmation/${bookingId}`);
    } catch (err) {
      console.error("Failed to submit booking:", err);
      addToast("Failed to submit your booking. Please try again.", 'error');
    } finally {
      setLoadingBooking(false);
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] bg-gray-50 font-poppins text-gray-700 text-xl col-span-full">
        Loading service details...
      </div>
    );
  }

  if (error || !selectedService) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-120px)] bg-gray-50 font-poppins text-gray-700 text-xl col-span-full">
        <p className="text-red-500 mb-4">{error || "Service not found."}</p>
        <Link to="/services" className="text-green-600 hover:underline">Back to Services</Link>
      </div>
    );
  }

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Services page">
            <span className="text-base font-medium">Our Services</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Book: {selectedService.name}</span>
        </div>
      </div>

      {/* Main Booking Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Booking Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 sm:p-8">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-8 md:mb-12">
              Book a Service
            </h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div className="sm:col-span-2">
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">Customer Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="customerLocation" className="block text-sm font-medium text-gray-700 mb-1">Customer Location <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  id="customerLocation"
                  name="customerLocation"
                  value={formData.customerLocation}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Enter your location"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="preferredDateTime" className="block text-sm font-medium text-gray-700 mb-1">Preferred Date and Time <span className="text-red-500">*</span></label>
                <input
                  type="datetime-local"
                  id="preferredDateTime"
                  name="preferredDateTime"
                  value={formData.preferredDateTime}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Service Type <span className="text-red-500">*</span></label>
                {/* FIX: Service Booking Dropdown - Allow user to change service selection */}
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  required
                >
                  <option value="">Select service type</option>
                  {/* Display all available services for user selection */}
                  {allServices.map(service => (
                    <option key={service.id} value={service.name}>
                      {service.name} - GH₵{parseFloat(service.price || 0).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="optionalMessage" className="block text-sm font-medium text-gray-700 mb-1">Optional Message</label>
                <textarea
                  id="optionalMessage"
                  name="optionalMessage"
                  rows="4"
                  value={formData.optionalMessage}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Any additional notes or specific requirements..."
                ></textarea>
              </div>
              <div className="sm:col-span-2 mt-4">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loadingBooking}
                >
                  {loadingBooking ? 'Submitting...' : 'Submit Booking'}
                </button>
              </div>
            </form>
          </div>

          {/* Service Summary */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 sm:p-8 h-fit">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Service Summary
            </h2>
            {selectedService ? (
              <div className="space-y-4 text-gray-700 text-lg">
                {/* FIX: Service Summary Population - Display dynamic service information */}
                <div className="flex items-center gap-3">
                  <img
                    src={selectedService.image_url || "https://placehold.co/60x60/4CAF50/FFFFFF?text=Service"}
                    alt={selectedService.name}
                    className="w-16 h-16 rounded-lg object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/60x60/cccccc/333333?text=Service"; }}
                  />
                  <div>
                    <p className="font-semibold">{selectedService.name}</p>
                    <p className="text-sm text-gray-600">Selected Service</p>
                  </div>
                </div>
                <p><strong>Description:</strong> {selectedService.description?.substring(0, 150) + '...' || 'Professional service available.'}</p>
                <p><strong>Price:</strong> <span className="text-green-600 font-semibold">GH₵{parseFloat(selectedService.price || 0).toFixed(2)}</span></p>
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmation Details</h3>
                  <p className="text-gray-600 text-base">
                    You will receive a confirmation email within 24 hours with detailed instructions and next steps.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-base">
                Select a service from the dropdown to see its summary here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingPage;
