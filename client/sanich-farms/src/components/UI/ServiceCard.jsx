import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ServiceCard = ({ service }) => {
  return (
    <Link
      to={`/services/${service.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg group"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden"> {/* Consistent image height */}
        <img
          src={service.image_url || service.image || "https://placehold.co/600x400/4CAF50/FFFFFF?text=Service"}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Service+Image"; }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 truncate">{service.name}</h3> {/* Adjusted font size */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{service.description?.substring(0, 100) + '...' || 'No description available.'}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg sm:text-xl font-bold text-green-700">GH₵{parseFloat(service.price || 0).toFixed(2)}</span> {/* Adjusted font size */}
          <span className="flex items-center text-green-600 font-medium group-hover:text-green-800 transition-colors duration-200 text-sm sm:text-base"> {/* Adjusted font size */}
            Learn More <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
