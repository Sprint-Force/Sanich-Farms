import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

// CORRECTED IMPORT PATH: Ensure this points to your new servicesData.js file
import { servicesData } from '../data/servicesData';

const AllServicesPage = () => {
  const navigate = useNavigate();

  const handleNavigate = (serviceId) => {
    // console.log("Navigating to service detail:", `/services/${serviceId}`); // Debugging log
    navigate(`/services/${serviceId}`);
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
          <span className="text-green-400 text-base font-semibold">Our Services</span>
        </div>
      </div>

      {/* Main Services Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Our Comprehensive Services
          </h2>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
            >
              <div className="relative h-64 sm:h-56 md:h-64 lg:h-72">
                <img
                  src={service.image}
                  alt={service.imageAlt}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/cccccc/333333?text=Service+Image+Error"; }}
                />
                {/* Text Overlay */}
                <div className={`absolute inset-0 ${service.overlayBg} flex items-center justify-center p-4`}>
                  <div className="text-center text-white p-2">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight">{service.title}</h3>
                    {service.shortDesc && (
                      <p className="text-sm sm:text-base mb-4 opacity-90">{service.shortDesc}</p>
                    )}
                    {service.details && (
                      <div className="space-y-2 text-sm text-left inline-block">
                        {service.details.map((detail, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <FiCheckCircle className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                            <span className="opacity-90">{detail}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    {service.note && (
                      <p className="text-xs sm:text-sm mt-4 opacity-80">{service.note}</p>
                    )}
                    {service.price && (
                      <p className="text-yellow-300 font-bold text-lg sm:text-xl mt-2">{service.price}</p>
                    )}
                    {service.tags && (
                      <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm mt-4">
                        {service.tags.map((tag, i) => (
                          <span key={i} className={`px-3 py-1 rounded-md font-medium ${i % 2 === 0 ? 'bg-green-700' : 'bg-gray-700'} `}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-6 md:p-7">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Details</h3>
                <p className="text-gray-600 mb-4 leading-relaxed text-base">
                  {service.cardDesc}
                </p>
                <button
                  onClick={() => handleNavigate(service.id)}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2 -ml-2"
                >
                  Read More
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllServicesPage;
