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
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Our Services</span>
        </div>
      </div>

      {/* NEW: Modernized Services Heading Section */}
      <div className="bg-white py-10 sm:py-12 md:py-16 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Our Expert Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From brooding to consultancy, we offer comprehensive services to support your poultry farm.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {loading ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            Loading services...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 text-lg">
            {error}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-600 text-lg">
            No services available at the moment. Please check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServicesPage;
