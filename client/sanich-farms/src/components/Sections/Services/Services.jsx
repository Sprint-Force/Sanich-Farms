import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

// CORRECTED IMPORT PATH: Ensure this points to your new servicesData.js file
import { servicesData } from '../../../data/servicesData';

const Services = () => {
  const navigate = useNavigate();

  const handleNavigate = (serviceId) => {
    navigate(`/services/${serviceId}`);
  };

  const statisticsData = [
    { id: 1, value: "5+", label: "Years of Hard Work" },
    { id: 2, value: "500k+", label: "Happy Customers" },
    { id: 3, value: "28", label: "Qualified Team Members" },
    { id: 4, value: "750k+", label: "Monthly Orders" },
  ];

  // Filter to show only a subset of services for the homepage section (e.g., first 3)
  const featuredServices = servicesData.slice(0, 3);

  return (
    <>
      <section className="w-full py-16 md:py-20 bg-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
              Our Services
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
          </div>
          <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-16 hide-scrollbar">
            {featuredServices.map((service) => (
              <div
                  key={service.id}
                  className="flex-none w-72 sm:w-80 md:w-auto snap-center
                            bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
                >
                <div className="relative h-64 sm:h-56 md:h-64 lg:h-72">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/cccccc/333333?text=Service+Image+Error"; }}
                  />
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
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
          <div className="text-center mt-8">
            <button
              onClick={() => navigate('/services')}
              className="bg-gray-200 text-gray-800 px-10 py-4 rounded-full font-bold text-lg shadow-md hover:bg-gray-300 hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20 bg-gray-900 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 hide-scrollbar">
            {statisticsData.map((stat) => (
              <div
                key={stat.id}
                className="flex-none w-64 sm:w-auto snap-center
                          bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:bg-gray-700 transform hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <div className="text-5xl sm:text-6xl font-extrabold text-green-500 mb-3 animate-pulse-once">
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
