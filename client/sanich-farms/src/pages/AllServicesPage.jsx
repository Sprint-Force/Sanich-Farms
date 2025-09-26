import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { servicesAPI } from '../services/api';
import ServiceCard from '../components/UI/ServiceCard';

const AllServicesPage = () => {
  // State for services, loading, and errors
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all services from the API
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await servicesAPI.getAll();
      // Ensure the response is an array of service objects
      const servicesData = Array.isArray(response) ? response : 
                          Array.isArray(response?.data) ? response.data : 
                          Array.isArray(response?.services) ? response.services : [];
      setServices(servicesData);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Failed to load services. Please try again later.");
      setServices([]); // Clear services on error
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch services when the component mounts
  useEffect(() => {
    fetchServices();
  }, []);


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs - Enhanced Mobile Responsiveness */}
      <div className="w-full py-6 sm:py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-4 h-4 xs:w-5 xs:h-5" />
            <span className="text-sm xs:text-base font-medium hidden xs:inline">Home</span>
          </Link>
          <FiChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
          <span className="text-green-400 text-sm xs:text-base font-semibold">Our Services</span>
        </div>
      </div>

      {/* Hero Section - Enhanced Mobile Responsiveness */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 md:py-12">
          <div className="text-center">
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Expert Poultry Services
            </h1>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-2 xs:px-0">
              Professional solutions for your poultry farming success
            </p>
          </div>
        </div>
      </div>

      {/* Services Content - Enhanced Mobile Layout */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 md:py-12">
        {loading ? (
          <div className="grid gap-3 xs:gap-4 sm:gap-6 md:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white rounded-md xs:rounded-lg sm:rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 h-28 xs:h-32 sm:h-40 md:h-48"></div>
                <div className="p-2 xs:p-3 sm:p-4 md:p-6">
                  <div className="w-3/4 h-3 xs:h-4 sm:h-5 bg-gray-200 rounded mb-1.5 xs:mb-2 sm:mb-3"></div>
                  <div className="space-y-1 xs:space-y-2">
                    <div className="w-full h-2.5 xs:h-3 sm:h-4 bg-gray-200 rounded"></div>
                    <div className="w-4/5 h-2.5 xs:h-3 sm:h-4 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex justify-between items-center mt-2 xs:mt-3 sm:mt-4">
                    <div className="w-12 xs:w-16 sm:w-20 h-4 xs:h-5 sm:h-6 bg-gray-200 rounded"></div>
                    <div className="w-16 xs:w-20 sm:w-24 h-5 xs:h-6 sm:h-8 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8 xs:py-10 sm:py-12 md:py-16">
            <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 mx-auto mb-3 xs:mb-4 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-lg xs:text-xl sm:text-2xl">⚠️</span>
            </div>
            <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-900 mb-1 xs:mb-2">Unable to load services</h3>
            <p className="text-xs xs:text-sm sm:text-base text-red-600 mb-3 xs:mb-4 px-4">{error}</p>
            <button
              onClick={fetchServices}
              className="px-3 xs:px-4 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-blue-600 text-white rounded-md xs:rounded-lg sm:rounded-xl text-xs xs:text-sm sm:text-base font-medium hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : services.length > 0 ? (
          <div className="grid gap-3 xs:gap-4 sm:gap-6 md:gap-8 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service, index) => (
              <div 
                key={service.id} 
                className="animate-fadeInUp"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 xs:py-10 sm:py-12 md:py-16">
            <div className="w-12 h-12 xs:w-16 xs:h-16 sm:w-20 sm:h-20 mx-auto mb-3 xs:mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <span className="text-gray-400 text-lg xs:text-xl sm:text-2xl">📋</span>
            </div>
            <h3 className="text-base xs:text-lg sm:text-xl font-semibold text-gray-900 mb-1 xs:mb-2">
              No services available
            </h3>
            <p className="text-xs xs:text-sm sm:text-base text-gray-600 px-4">
              Check back later for new services!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServicesPage;
