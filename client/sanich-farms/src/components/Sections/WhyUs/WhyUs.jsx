// WhyUs Component - Modern Clean Design
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import Image6 from '../../../assets/slider2.png';

const WhyUs = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why <span className="text-green-600">Sanich Farms</span>?
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
            100% Trusted, Healthy & Natural Products
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Image Section - Shows first on mobile, left on desktop */}
          <div className="order-1 lg:order-1">
            <div className="relative">
              <img
                src={Image6}
                alt="Premium poultry products from Sanich Farms"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-lg"
                onError={(e) => { 
                  e.target.onerror = null; 
                  e.target.src="https://placehold.co/800x600/E5F3F6/2E8B57?text=Premium+Poultry"; 
                }}
              />
              {/* Quality Badge */}
              <div className="absolute top-4 left-4 bg-green-600 text-white px-3 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <FiCheck className="w-4 h-4" />
                  <span className="text-sm font-semibold">Quality Assured</span>
                </div>
              </div>
              
              {/* Stats Badge */}
              <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">5000+</p>
                  <p className="text-sm text-gray-600">Happy Customers</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section - Shows second on mobile, right on desktop */}
          <div className="order-2 lg:order-2 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 leading-tight">
              From Farm to Table,<br />
              <span className="text-green-600">Quality You Can Trust</span>
            </h3>
            
            <p className="text-gray-600 text-base sm:text-lg mb-6 leading-relaxed">
              We've built our reputation on delivering premium poultry products with unmatched freshness and quality. 
              Every product is carefully selected and delivered with care to ensure your complete satisfaction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Primary CTA */}
              <button
                onClick={() => navigate('/shop')}
                className="inline-flex items-center justify-center gap-2
                           bg-green-600 hover:bg-green-700 active:bg-green-800
                           text-white px-8 py-4 rounded-xl font-semibold text-lg
                           shadow-lg hover:shadow-xl transform hover:-translate-y-1
                           transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300"
              >
                Shop Now
                <FiArrowRight className="w-5 h-5" />
              </button>
              
              {/* Secondary CTA */}
              <button
                onClick={() => navigate('/about')}
                className="inline-flex items-center justify-center gap-2
                           bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-green-200
                           text-gray-700 hover:text-green-600 px-8 py-4 rounded-xl font-semibold text-lg
                           shadow-sm hover:shadow-md transform hover:-translate-y-1
                           transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-gray-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyUs;