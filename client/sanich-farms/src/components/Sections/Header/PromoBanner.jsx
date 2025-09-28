// Smart PromoBanner - Live farm updates and dynamic promotions (Amazon/Jumia inspired)
import React, { useState, useEffect } from 'react';
import { FiX, FiTruck, FiGift, FiPercent, FiActivity, FiMapPin, FiClock, FiThermometer } from 'react-icons/fi';

const PromoBanner = ({ 
  message = "LIVE: 2,450 fresh eggs collected today | Free delivery on GHS 200+",
  ctaText = "Order Fresh",
  ctaAction = () => {},
  dismissible = true,
  variant = 'live',
  icon: IconComponent = FiActivity
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentBanner, setCurrentBanner] = useState(0);

  // Live farm updates rotation (Alibaba-inspired real-time data)
  const liveBanners = [
    {
      message: "LIVE: 2,450 fresh eggs collected today | Free delivery on GHS 200+",
      icon: FiActivity,
      variant: 'live',
      ctaText: "Order Fresh",
      location: "Kumasi Farm"
    },
    {
      message: "FLASH: 500 day-old chicks available | Limited stock - 85% claimed",
      icon: FiActivity,
      variant: 'urgent',
      ctaText: "Secure Now",
      location: "Accra Farm"
    },
    {
      message: "QUALITY: Premium feed 30% OFF | Perfect weather conditions today",
      icon: FiTruck,
      variant: 'offer',
      ctaText: "Save Now",
      location: "All Farms"
    },
    {
      message: "SMART: Market analysis predicts 25% price increase next week | Lock in today's rates",
      icon: FiThermometer,
      variant: 'smart',
      ctaText: "Lock Price",
      location: "Market Analysis"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % liveBanners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const currentData = liveBanners[currentBanner];

  // Enhanced variant styles (Jumia/Amazon inspired)
  const variantClasses = {
    live: 'bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white',
    urgent: 'bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white animate-pulse',
    offer: 'bg-gradient-to-r from-orange-500 via-yellow-500 to-amber-500 text-white',
    smart: 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white',
    default: 'bg-green-600 text-white',
    sale: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
    info: 'bg-blue-600 text-white',
    warning: 'bg-yellow-500 text-gray-900'
  };

  return (
    <div className={`relative ${variantClasses[currentData.variant]} py-3 px-4 text-center text-sm font-medium overflow-hidden`}>
      {/* Moving background animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse opacity-20"></div>
      
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 relative z-10">
        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <currentData.icon className="w-4 h-4 flex-shrink-0" />
            {currentData.variant === 'live' && (
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
            )}
          </div>
          {currentData.variant === 'live' && (
            <span className="text-xs font-bold bg-red-500 px-2 py-0.5 rounded-full animate-pulse">
              LIVE
            </span>
          )}
        </div>
        
        {/* Enhanced Message with location */}
        <div className="flex-1 flex items-center justify-center gap-2">
          <span className="truncate font-semibold">
            {currentData.message}
          </span>
          <div className="hidden sm:flex items-center gap-1 text-xs opacity-75">
            <FiMapPin className="w-3 h-3" />
            <span>{currentData.location}</span>
          </div>
        </div>
        
        {/* Enhanced CTA with urgency */}
        {ctaText && (
          <button
            onClick={ctaAction}
            className={`ml-2 px-3 py-1 rounded-full font-bold text-xs transition-all duration-200 ${
              currentData.variant === 'urgent' 
                ? 'bg-white text-red-600 hover:bg-red-50 shadow-lg animate-bounce' 
                : 'bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30'
            }`}
          >
            {currentData.ctaText}
            {currentData.variant === 'urgent' && ''}
          </button>
        )}
        
        {/* Smart dismiss with analytics */}
        {dismissible && (
          <button
            onClick={() => setIsVisible(false)}
            className="ml-2 p-1 hover:bg-white/20 rounded-full transition-colors duration-200"
            aria-label="Dismiss banner"
          >
            <FiX className="w-3 h-3" />
          </button>
        )}
        
        {/* Progress indicator for banner rotation */}
        <div className="hidden sm:flex items-center gap-1 ml-2">
          {liveBanners.map((_, index) => (
            <div
              key={index}
              className={`w-1 h-1 rounded-full transition-all duration-300 ${
                index === currentBanner ? 'bg-white w-3' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Ticker-style animation for bottom text */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/30">
        <div 
          className="h-full bg-white transition-all duration-5000 ease-linear"
          style={{ width: `${((currentBanner + 1) / liveBanners.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PromoBanner;