import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
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

  const handleNavigate = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const statisticsData = [
    { id: 1, value: "5+", label: "Years Experience" },
    { id: 2, value: "5,000+", label: "Happy Customers" },
    { id: 3, value: "100%", label: "Quality Guaranteed" },
    { id: 4, value: "24/7", label: "Support Available" },
  ];

  // Filter to show only a subset of services for the homepage section (e.g., first 3)
  const featuredServices = Array.isArray(services) ? services.slice(0, 3) : [];

  return (
    <>
      <section className="w-full py-12 sm:py-16 lg:py-20 bg-gray-50 font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="text-green-600">Services</span>
            </h2>
            {/* <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
              Expert poultry services to help you succeed
            </p> */}
            <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse"
                >
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gray-200 rounded"></div>
                      <div className="w-5/6 h-3 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12 text-red-500 text-lg">
              {error}
            </div>
          ) : featuredServices.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {featuredServices.map((service, index) => (
                <div
                  key={service.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
                  onClick={() => handleNavigate(service.id)}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image_url || service.image || "https://placehold.co/400x300/4CAF50/FFFFFF?text=Service"}
                      alt={service.name}
                      className="w-full h-full object-cover transition-opacity duration-500"
                      onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/cccccc/333333?text=Service+Image+Error"; }}
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.name}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-base">
                      {service.description?.substring(0, 100) + '...' || 'Professional service available.'}
                    </p>
                    <button
                      onClick={() => handleNavigate(service.id)}
                      className="group inline-flex items-center gap-2 text-green-600 hover:text-green-700 
                                 font-medium text-base
                                 hover:gap-3 transition-all duration-200 
                                 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-1
                                 rounded-md p-2 -ml-2 hover:bg-green-50"
                    >
                      <span>Read More</span>
                      <FiArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 text-lg">
              No services available at the moment.
            </div>
          )}
          
          <div className="text-center">
            <button
              onClick={() => navigate('/services')}
              className="group inline-flex items-center justify-center gap-2
                         bg-blue-600 hover:bg-blue-700 text-white 
                         px-8 py-4 sm:px-10 sm:py-5 rounded-lg
                         font-semibold text-base sm:text-lg
                         shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                         transition-all duration-200 ease-out
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         active:transform active:scale-95"
            >
              <span>View All Services</span>
              <FiArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform duration-200" />
            </button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 lg:py-20 bg-gray-900 font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 hide-scrollbar">
            {statisticsData.map((stat) => (
              <div
                key={stat.id}
                className="flex-none w-64 sm:w-auto snap-center
                          bg-gray-800 rounded-xl p-8 text-center 
                          shadow-lg hover:bg-gray-700 transform hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <div className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-green-500 mb-3 animate-pulse-once">
                  {stat.value}
                </div>
                <div className="text-white text-lg sm:text-xl font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
