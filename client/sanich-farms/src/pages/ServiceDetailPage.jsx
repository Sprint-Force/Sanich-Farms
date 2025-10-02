import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiCheckCircle, FiBookOpen, FiClock, FiStar, FiUsers, FiShield } from 'react-icons/fi';
import axios from 'axios';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Define your backend API URL
  const BASE_URL = 'https://sanich-farms-tnac.onrender.com/api/services';

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch service data from the API
  useEffect(() => {
    const fetchService = async () => {
      // Ensure serviceId is available and valid before making the API call
      if (!serviceId) {
        setError("No service ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/${serviceId}`);
        const fetchedService = response.data.service; // Extract service from response
        if (fetchedService) {
          setService(fetchedService);
        } else {
          setError("Service not found.");
        }
      } catch (err) {
        console.error("Failed to fetch service details:", err);
        setError("Failed to load service details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleBookService = () => {
    // Navigate to the booking page. The booking page will now fetch its own data.
    navigate(`/book-service/${serviceId}`);
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Modern Breadcrumb Skeleton */}
        <div className="w-full breadcrumb-modern">
          <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        {/* Content Skeleton */}
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8">
            {/* Image Skeleton */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6">
              <div className="w-full h-48 xs:h-56 sm:h-64 bg-gray-200 rounded-lg animate-pulse mb-4"></div>
              <div className="w-3/4 h-6 xs:h-8 bg-gray-200 rounded animate-pulse mb-3"></div>
              <div className="space-y-2 mb-4">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
            
            {/* Details Skeleton */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6">
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse mt-1"></div>
                    <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4 xs:px-6">
          <div className="w-16 h-16 xs:w-20 xs:h-20 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-red-600 text-xl xs:text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg xs:text-xl font-semibold text-gray-900 mb-2">Service Not Found</h3>
          <p className="text-sm xs:text-base text-red-600 mb-6">{error || "The requested service could not be found."}</p>
          <div className="flex flex-col xs:flex-row gap-3 justify-center">
            <Link 
              to="/services" 
              className="px-4 xs:px-6 py-2 xs:py-3 bg-blue-600 text-white rounded-lg xs:rounded-xl font-medium hover:bg-blue-700 transition-colors text-sm xs:text-base"
            >
              View All Services
            </Link>
            <button 
              onClick={() => navigate(-1)}
              className="px-4 xs:px-6 py-2 xs:py-3 bg-gray-100 text-gray-700 rounded-lg xs:rounded-xl font-medium hover:bg-gray-200 transition-colors text-sm xs:text-base"
            >
              Go Back
            </button>
          </div>
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
            <span className="breadcrumb-current text-sm xs:text-base font-semibold truncate max-w-[120px] xs:max-w-[150px] sm:max-w-none">
              {service.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Service Detail Content - Modern Layout */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 md:gap-12">
          
          {/* Service Image and Main Info */}
          <div className="space-y-4 xs:space-y-6">
            {/* Service Image */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm overflow-hidden">
              <img
                src={service.image_url || service.image || "https://placehold.co/600x400/cccccc/333333?text=Service+Image"}
                alt={service.name}
                className="w-full h-48 xs:h-56 sm:h-64 md:h-72 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Service+Image+Error"; }}
              />
            </div>

            {/* Service Header Info */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6">
              <div className="flex items-start justify-between gap-4 mb-3 xs:mb-4">
                <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {service.name}
                </h1>
                <div className="text-right flex-shrink-0">
                  <div className="text-2xl xs:text-3xl font-bold text-green-600">
                    GH₵{parseFloat(service.price || 0).toFixed(2)}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm xs:text-base leading-relaxed mb-4 xs:mb-6">
                {service.description || 'Professional poultry service tailored to your needs.'}
              </p>

              {/* Service Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 xs:gap-4 mb-4 xs:mb-6">
                <div className="flex items-center gap-2 text-xs xs:text-sm">
                  <FiStar className="w-4 h-4 text-yellow-500" />
                  <span className="text-gray-600">5.0 Rating</span>
                </div>
                <div className="flex items-center gap-2 text-xs xs:text-sm">
                  <FiUsers className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600">Expert Team</span>
                </div>
                <div className="flex items-center gap-2 text-xs xs:text-sm col-span-2 sm:col-span-1">
                  <FiShield className="w-4 h-4 text-green-500" />
                  <span className="text-gray-600">Guaranteed</span>
                </div>
              </div>

              {/* Service Availability Status */}
              <div className="mb-4 xs:mb-6">
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs xs:text-sm font-medium ${
                  service.is_available !== false 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    service.is_available !== false ? 'bg-green-500' : 'bg-red-500'
                  }`}></div>
                  {service.is_available !== false ? 'Available Now' : 'Currently Unavailable'}
                </div>
              </div>

              {/* Book Service Button - Enhanced Mobile Touch Target */}
              <button
                onClick={handleBookService}
                disabled={service.is_available === false}
                className={`w-full py-3 xs:py-4 sm:py-4 rounded-lg xs:rounded-xl font-semibold text-sm xs:text-base transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 min-h-[44px] touch-manipulation ${
                  service.is_available === false
                    ? 'bg-gray-400 text-gray-200 cursor-not-allowed transform-none hover:shadow-lg'
                    : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white focus:ring-green-300'
                }`}
              >
                {service.is_available === false ? 'Service Currently Unavailable' : 'Book This Service Now'}
              </button>
            </div>
          </div>

          {/* Service Details */}
          <div className="space-y-4 xs:space-y-6">
            
            {/* What's Included */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6">
              <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-3 xs:mb-4 flex items-center gap-2">
                <FiCheckCircle className="w-5 h-5 text-green-600" />
                What's Included
              </h2>
              <ul className="space-y-2 xs:space-y-3">
                {[
                  'Professional consultation and assessment',
                  'Expert service execution by trained staff',
                  'Quality assurance and follow-up',
                  'Customer support throughout the process',
                  'Satisfaction guarantee'
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 text-xs xs:text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Service Process */}
            <div className="bg-white rounded-lg xs:rounded-xl shadow-sm p-4 xs:p-6">
              <h2 className="text-lg xs:text-xl font-bold text-gray-900 mb-3 xs:mb-4 flex items-center gap-2">
                <FiClock className="w-5 h-5 text-blue-600" />
                Our Process
              </h2>
              <div className="space-y-3 xs:space-y-4">
                {[
                  { step: 1, title: 'Book & Schedule', desc: 'Choose your preferred time and date' },
                  { step: 2, title: 'Assessment', desc: 'Our experts evaluate your needs' },
                  { step: 3, title: 'Service Delivery', desc: 'Professional execution of service' },
                  { step: 4, title: 'Follow-up', desc: 'Ensure satisfaction and provide support' }
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 xs:gap-4">
                    <div className="w-6 h-6 xs:w-8 xs:h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-xs xs:text-sm">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-sm xs:text-base">{item.title}</h3>
                      <p className="text-gray-600 text-xs xs:text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Info */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg xs:rounded-xl border border-blue-100 p-4 xs:p-6">
              <h3 className="text-base xs:text-lg font-semibold text-gray-900 mb-2 xs:mb-3">
                Need Custom Requirements?
              </h3>
              <p className="text-gray-700 text-xs xs:text-sm sm:text-base leading-relaxed mb-3 xs:mb-4">
                We offer flexible solutions tailored to your specific needs. Contact us for personalized service options and pricing.
              </p>
              <div className="flex flex-col xs:flex-row gap-2 xs:gap-3">
                <a 
                  href="tel:0243826137" 
                  className="inline-flex items-center justify-center gap-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-blue-600 text-white rounded-md xs:rounded-lg font-medium hover:bg-blue-700 transition-colors text-xs xs:text-sm"
                >
                  Call Now
                </a>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center gap-2 px-3 xs:px-4 py-2 xs:py-2.5 bg-white text-blue-600 border border-blue-200 rounded-md xs:rounded-lg font-medium hover:bg-blue-50 transition-colors text-xs xs:text-sm"
                >
                  Send Message
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
