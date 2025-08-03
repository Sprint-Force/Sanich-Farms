// src/components/UI/ServiceCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';

const ServiceCard = ({ service }) => {
  return (
    <Link
      to={`/services/${service.id}`}
      className="block bg-white rounded-xl shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg group"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img
          src={service.image || "https://placehold.co/600x400/4CAF50/FFFFFF?text=Service"} // Placeholder if no image
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Service+Image"; }}
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{service.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">{service.shortDesc || service.fullDescription?.substring(0, 100) + '...'}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-lg font-bold text-green-700">{service.price || 'Price Varies'}</span>
          <span className="flex items-center text-green-600 font-medium group-hover:text-green-800 transition-colors duration-200">
            Learn More <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform duration-200" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
