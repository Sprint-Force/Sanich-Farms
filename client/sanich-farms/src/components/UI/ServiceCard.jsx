import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiClock } from 'react-icons/fi';

const ServiceCard = ({ service, skeleton = false, compact = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageInView, setImageInView] = useState(false);
  const imgRef = useRef();
  const cardRef = useRef();

  // Intersection Observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Skeleton loading state
  if (skeleton) {
    return (
      <div className={`bg-white rounded-lg shadow-md overflow-hidden animate-pulse h-full ${
        compact ? 'max-w-64' : ''
      }`}>
        <div className={`bg-gray-200 ${compact ? 'h-32' : 'h-40 sm:h-48'}`}></div>
        <div className={`p-4 ${compact ? 'p-3' : 'p-4'}`}>
          <div className={`bg-gray-200 rounded ${compact ? 'h-4 mb-2' : 'h-5 mb-3'}`}></div>
          <div className="space-y-2">
            <div className={`bg-gray-200 rounded ${compact ? 'h-3' : 'h-4'}`}></div>
            <div className={`bg-gray-200 rounded ${compact ? 'h-3 w-3/4' : 'h-4 w-4/5'}`}></div>
          </div>
          <div className={`bg-gray-200 rounded ${compact ? 'h-3 w-1/2 mt-2' : 'h-4 w-1/2 mt-3'}`}></div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={`/services/${service.id}`}
      ref={cardRef}
      className={`block bg-white rounded-lg shadow-md overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl group h-full animate-pulse opacity-0 ${
        compact ? 'max-w-64 shadow-sm hover:shadow-md' : ''
      }`}
      style={{ animation: 'fadeIn 0.6s ease-out forwards' }}
    >
      {/* Service Image */}
      <div ref={imgRef} className={`relative w-full overflow-hidden bg-gray-200 ${
        compact ? 'h-32' : 'h-40 sm:h-48'
      }`}>
        {imageInView && (
          <>
            {/* Placeholder/Loading shimmer */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
              </div>
            )}
            
            {/* Main Image */}
            <img
              src={service.image_url || service.image || "https://placehold.co/400x300/4CAF50/FFFFFF?text=Service"}
              alt={service.name}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={(e) => { 
                e.target.onerror = null; 
                e.target.src="https://placehold.co/400x300/cccccc/333333?text=Service";
                setImageLoaded(true);
              }}
              loading="lazy"
            />

            {/* Service Badge */}
            <div className="absolute top-3 left-3">
              <span className="bg-green-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                Service
              </span>
            </div>
          </>
        )}
      </div>

      {/* Service Content */}
      <div className={`p-4 flex flex-col ${compact ? 'p-3' : 'p-4'}`}>
        {/* Service Name */}
        <h3 className={`font-bold text-gray-900 leading-tight mb-2 line-clamp-2 ${
          compact ? 'text-sm' : 'text-base sm:text-lg'
        }`}>
          {service.name}
        </h3>

        {/* Service Description */}
        <p className={`text-gray-600 mb-3 line-clamp-2 leading-relaxed ${
          compact ? 'text-xs' : 'text-sm'
        }`}>
          {service.description?.substring(0, 80) + '...' || 'Professional poultry service available.'}
        </p>

        {/* Service Details */}
        <div className="mt-auto">
          {/* Price & Duration */}
          <div className="flex items-center justify-between mb-3">
            {service.price && (
              <div className="flex items-center gap-1">
                <span className={`font-bold text-green-700 ${
                  compact ? 'text-sm' : 'text-base'
                }`}>
                  GH₵{parseFloat(service.price).toFixed(2)}
                </span>
              </div>
            )}
            
            {service.duration && (
              <div className="flex items-center gap-1">
                <FiClock size={compact ? 12 : 14} className="text-gray-400" />
                <span className={`text-gray-500 ${compact ? 'text-xs' : 'text-sm'}`}>
                  {service.duration}
                </span>
              </div>
            )}
          </div>

          {/* Learn More Button */}
          <div className="flex items-center justify-between">
            <span className={`text-green-600 font-medium group-hover:text-green-700 ${
              compact ? 'text-sm' : 'text-base'
            }`}>
              Learn More
            </span>
            <FiArrowRight 
              size={compact ? 16 : 18} 
              className="text-green-600 group-hover:text-green-700 group-hover:translate-x-1 transition-all duration-200" 
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
