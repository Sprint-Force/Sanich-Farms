import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ServiceCard from '../../UI/ServiceCard';
import { servicesAPI } from '../../../services/api';

const Services = () => {
  const navigate = useNavigate();

  // State for services, loading, and errors
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch services from the API
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

  // Show first 4 services for homepage
  const featuredServices = Array.isArray(services) ? services.slice(0, 4) : [];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Our <span className="text-green-600">Services</span>
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            Professional poultry services for your success
          </p>
        </div>

        {/* Services Container */}
        {loading ? (
          // Loading State - 4 skeleton cards
          <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
            {[...Array(4)].map((_, i) => (
              <ServiceCard key={`skeleton-${i}`} skeleton={true} />
            ))}
          </div>
        ) : error ? (
          // Error State
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-4">⚠️ {error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : featuredServices.length > 0 ? (
          <>
            {/* Desktop Grid - 4 columns */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
              {featuredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ServiceCard service={service} />
                </div>
              ))}
            </div>

            {/* Mobile Horizontal Scroll */}
            <div className="sm:hidden mb-12">
              <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 px-4 -mx-4 hide-scrollbar
                           snap-x snap-mandatory touch-pan-x">
                {featuredServices.map((service, index) => (
                  <div
                    key={service.id}
                    className="flex-shrink-0 w-64 animate-fadeIn snap-start"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <ServiceCard service={service} compact={true} />
                  </div>
                ))}
                {/* Add padding element for better scroll experience */}
                <div className="flex-shrink-0 w-4"></div>
              </div>
            </div>
          </>
        ) : (
          // No Services State
          <div className="text-center py-12">
            <div className="text-gray-400 text-5xl mb-4">🛠️</div>
            <p className="text-gray-600 text-lg mb-6">No services available at the moment</p>
            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Contact Us
              <FiArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Call-to-Action */}
        <div className="text-center">
          <button
            onClick={() => navigate('/services')}
            className="inline-flex items-center justify-center gap-2
                       bg-green-600 hover:bg-green-700 active:bg-green-800
                       text-white px-8 py-4 rounded-xl font-semibold text-lg
                       shadow-lg hover:shadow-xl transform hover:-translate-y-1
                       transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
          >
            View All Services
            <FiArrowRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default Services;
