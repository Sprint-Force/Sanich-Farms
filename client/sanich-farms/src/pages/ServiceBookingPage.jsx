import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { servicesData } from '../data/servicesData'; // Import servicesData to get service details

const ServiceBookingPage = () => {
  const navigate = useNavigate();
  const { serviceId } = useParams(); // Get serviceId from URL if navigated directly
  const location = useLocation(); // To get state passed from ServiceDetailPage

  // Get service details either from passed state or by looking up via serviceId
  const initialService = location.state?.service || servicesData.find(s => s.id === parseInt(serviceId, 10));

  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    customerLocation: '',
    preferredDateTime: '',
    serviceType: initialService ? initialService.title : '', // Pre-fill if service is known
    optionalMessage: '',
  });

  // State to hold the service being booked for summary display
  const [selectedService, setSelectedService] = useState(initialService);

  // Update form data and selected service if initialService changes (e.g., direct URL access)
  useEffect(() => {
    if (initialService && initialService.id !== selectedService?.id) {
      setSelectedService(initialService);
      setFormData(prev => ({
        ...prev,
        serviceType: initialService.title,
      }));
    } else if (!initialService && serviceId) {
      // If no initialService but serviceId in URL, try to fetch it
      const serviceFromUrl = servicesData.find(s => s.id === parseInt(serviceId, 10));
      setSelectedService(serviceFromUrl);
      if (serviceFromUrl) {
        setFormData(prev => ({
          ...prev,
          serviceType: serviceFromUrl.title,
        }));
      }
    }
  }, [initialService, serviceId, selectedService]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.customerName || !formData.email || !formData.phone || !formData.customerLocation || !formData.preferredDateTime || !formData.serviceType) {
      alert("Please fill in all required fields.");
      return;
    }

    const bookingDetails = {
      ...formData,
      serviceId: selectedService?.id,
      servicePrice: selectedService?.price,
      bookingDate: new Date().toISOString(),
    };

    console.log("Service booking submitted:", bookingDetails);
    // In a real application:
    // 1. Send bookingDetails to your backend API
    //    e.g., fetch('/api/bookings', { method: 'POST', body: JSON.stringify(bookingDetails) })
    // 2. Handle success/error response from backend
    // 3. Navigate to a booking confirmation page or show a success message
    alert("Your service booking has been submitted! You will receive a confirmation email within 24 hours."); // Using alert for simplicity
    navigate('/booking-confirmation', { state: { bookingDetails } }); // Navigate to a confirmation page
  };

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
          <span className="text-green-400 text-base font-semibold">Book a Service</span>
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
                  type="datetime-local" // Use datetime-local for date and time picker
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
                <select
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  required
                >
                  <option value="">Select service type</option>
                  {servicesData.map(service => (
                    <option key={service.id} value={service.title}>{service.title}</option>
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
                  className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Submit Booking
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
                <p><strong>Service:</strong> {selectedService.title}</p>
                <p><strong>Description:</strong> {selectedService.shortDesc || selectedService.fullDescription?.substring(0, 100) + '...'}</p>
                <p><strong>Price:</strong> {selectedService.price || 'Varies'}</p>
                <div className="pt-4 border-t border-gray-200">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Confirmation Details</h3>
                  <p className="text-gray-600 text-base">
                    You will receive a confirmation email within 24 hours.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-gray-600 text-base">
                Select a service from the form to see its summary here.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceBookingPage;
