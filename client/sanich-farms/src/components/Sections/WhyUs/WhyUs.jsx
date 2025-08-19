// WhyUs Component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import Image6 from '../../../assets/image6.png';
const WhyUs = () => {
  const navigate = useNavigate();


  const handleShopNowClick = () => {
    navigate('/shop');
  };

  return (
    <section className="w-full py-16 md:py-20 bg-gray-50 font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Why Choose Us?
          </h2>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full" aria-hidden="true"></div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="flex-1 w-full md:w-auto">
            <img
              src={Image6}
              alt="Healthy baby chicks on a farm"
              className="w-full h-64 sm:h-80 md:h-[450px] object-cover rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-[1.01] hover:shadow-2xl"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/700x500/cccccc/333333?text=Image+Error"; }}
            />
          </div>
          <div className="flex-1 w-full md:w-auto text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 leading-tight">
              100% Trusted, Healthy & Natural Poultry Products
            </h3>
            <div className="flex items-start gap-4 mb-6">
              <div className="bg-green-600 rounded-full p-2 flex-shrink-0 mt-1 shadow-md">
                <FaCheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Healthy & natural for lovers of healthy food
                </h4>
                <p className="text-gray-600 leading-relaxed text-base">
                  Our commitment to natural farming practices ensures that every product meets the highest standards of health and nutrition for your family.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 mb-8">
              <div className="bg-green-600 rounded-full p-2 flex-shrink-0 mt-1 shadow-md">
                <FaCheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">
                  Every day fresh and quality products for you
                </h4>
                <p className="text-gray-600 leading-relaxed text-base">
                  We ensure daily freshness through our efficient supply chain and quality control processes, delivering the best products directly to your doorstep.
                </p>
              </div>
            </div>
            <button
              onClick={handleShopNowClick}
              className="inline-flex items-center justify-center gap-3 bg-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-green-700 hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50"
            >
              Shop Now
              <FiArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;