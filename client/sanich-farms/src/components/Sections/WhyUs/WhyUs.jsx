// WhyUs Component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import Image6 from '../../../assets/slider2.png';
const WhyUs = () => {
  const navigate = useNavigate();


  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <section className="w-full py-12 sm:py-16 lg:py-20 bg-gray-50 font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-green-600">Sanich Farms</span>?
          </h2>
          {/* <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Trusted by thousands for quality poultry products and exceptional service
          </p> */}
          <div className="w-20 h-1.5 bg-gradient-to-r from-green-500 to-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="flex-1 w-full">
            <img
              src={Image6}
              alt="Healthy baby chicks on a farm"
              className="w-full h-64 sm:h-72 lg:h-80 xl:h-96 object-cover rounded-2xl shadow-xl transform transition-transform duration-500 hover:scale-[1.02] hover:shadow-2xl"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/700x500/E5F3F6/2E8B57?text=Quality+Poultry"; }}
            />
          </div>
          
          <div className="flex-1 w-full text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 lg:mb-8 leading-tight">
              100% Trusted, Healthy & Natural Products
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-600 rounded-full p-3 flex-shrink-0 mt-1 shadow-lg">
                  <FaCheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Healthy & Natural Products
                  </h4>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Natural farming practices ensure every product meets the highest health standards
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-blue-600 rounded-full p-3 flex-shrink-0 mt-1 shadow-lg">
                  <FaCheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    Daily Fresh & Quality
                  </h4>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Fresh products delivered daily through our efficient supply chain and quality control
                  </p>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <div className="mt-8 lg:mt-12">
              <button
                onClick={handleShopNowClick}
                className="group inline-flex items-center justify-center gap-2
                           bg-green-600 hover:bg-green-700 text-white 
                           px-6 py-3 sm:px-8 sm:py-4 rounded-lg
                           font-semibold text-base sm:text-lg
                           shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                           transition-all duration-200 ease-out
                           focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2
                           active:transform active:scale-95 mx-auto lg:mx-0"
              >
                <span>Shop Now</span>
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;