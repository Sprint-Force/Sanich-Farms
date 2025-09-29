import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiShoppingCart, FiPhone, FiUsers, FiAward, FiHeart, FiTruck } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import SocialShare from '../components/UI/SocialShare';

// Import assets
import ourStoryImage from '../assets/slider1.png';
import founderImage from '../assets/slider2.png';
import managerImage from '../assets/image7.png';

const AboutUsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="font-poppins bg-white min-h-screen">
      {/* Modern Breadcrumbs - Clean & Compact */}
      <div className="w-full breadcrumb-modern">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 xs:gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link flex items-center gap-1 text-slate-600 hover:text-green-600" aria-label="Home">
              <FiHome className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              <span className="font-medium hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 breadcrumb-separator" />
            <span className="breadcrumb-current text-sm xs:text-base font-semibold">About</span>
          </nav>
        </div>
      </div>

      {/* Hero Section - Mobile First */}
      <section className="w-full py-6 xs:py-8 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12">
            <h1 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              About <span className="text-green-600">Sanich Farms</span>
            </h1>
            <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2 xs:px-0">
              Ghana's trusted poultry partner since 2019, providing quality products and expert services.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xs:gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left px-2 xs:px-0">
              <h2 className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800 mb-3 xs:mb-4 sm:mb-6">
                Quality & Trust Since 2019
              </h2>
              <p className="text-sm xs:text-base sm:text-lg text-gray-600 mb-3 xs:mb-4 sm:mb-6 leading-relaxed">
                From humble beginnings to Ghana's leading poultry provider, we've built our reputation on 
                quality products, sustainable practices, and exceptional customer service since 2019.
              </p>
              <p className="text-sm xs:text-base sm:text-lg text-gray-600 leading-relaxed">
                Our modern facilities and traditional values ensure every product meets the highest standards.
              </p>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <img
                src={ourStoryImage}
                alt="Sanich Farms"
                className="w-full max-w-xs xs:max-w-sm sm:max-w-md lg:max-w-lg h-40 xs:h-48 sm:h-60 lg:h-72 xl:h-80 rounded-2xl shadow-lg object-cover"
                onError={(e) => { e.target.src="https://placehold.co/400x300/E5F3F6/2E8B57?text=Sanich+Farms"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats - Mobile Optimized */}
      <section className="w-full py-6 xs:py-8 sm:py-10 lg:py-12 xl:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center p-3 xs:p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
              <FiUsers className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-green-600 mx-auto mb-2 sm:mb-3" />
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">5,000+</p>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">Happy Customers</p>
            </div>
            <div className="text-center p-3 xs:p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
              <FiTruck className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-blue-600 mx-auto mb-2 sm:mb-3" />
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">50,000+</p>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">Products Delivered</p>
            </div>
            <div className="text-center p-3 xs:p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
              <FiAward className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-yellow-600 mx-auto mb-2 sm:mb-3" />
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">5+</p>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">Years Experience</p>
            </div>
            <div className="text-center p-3 xs:p-4 sm:p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-300">
              <FiHeart className="w-5 h-5 xs:w-6 xs:h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 text-red-500 mx-auto mb-2 sm:mb-3" />
              <p className="text-base xs:text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900">100%</p>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-tight">Quality Standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team - Just 2 People */}
      <section className="w-full py-6 xs:py-8 sm:py-12 lg:py-16 xl:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-6 xs:mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4">
              Meet Our Team
            </h2>
            <p className="text-sm xs:text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2 xs:px-0">
              The experts behind Sanich Farms' success
            </p>
          </div>

          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="flex md:grid overflow-x-auto md:overflow-x-visible md:grid-cols-2 gap-4 xs:gap-5 sm:gap-6 lg:gap-8 xl:gap-12 max-w-5xl mx-auto hide-scrollbar pb-4 md:pb-0">
            {/* Founder */}
            <div className="flex-shrink-0 w-72 xs:w-80 sm:w-96 md:w-full bg-white rounded-2xl p-4 xs:p-5 sm:p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <img
                src={founderImage}
                alt="Saaka Nicholas"
                className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover rounded-full mx-auto mb-3 xs:mb-4 sm:mb-5 border-4 border-green-100"
                onError={(e) => { e.target.src="https://placehold.co/120x120/E5F3F6/2E8B57?text=SN"; }}
              />
              <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-1 xs:mb-2">Saaka Nicholas</h3>
              <p className="text-sm xs:text-base sm:text-lg text-green-600 font-medium mb-2 xs:mb-3 sm:mb-4">CEO & Founder</p>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed mb-4 xs:mb-5 sm:mb-6">
                Visionary leader driving innovation in Ghana's poultry industry since 2019.
              </p>
              
              {/* Social Media Links */}
              <div className="flex justify-center gap-3 xs:gap-4">
                <a href="#" className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300" aria-label="LinkedIn">
                  <FaLinkedinIn className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
                <a href="#" className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-400 transition-colors duration-300" aria-label="Twitter">
                  <FaTwitter className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
                <a href="#" className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300" aria-label="Facebook">
                  <FaFacebookF className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
                <a href="#" className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors duration-300" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
              </div>
            </div>

            {/* Operations Manager */}
            <div className="flex-shrink-0 w-72 xs:w-80 sm:w-96 md:w-full bg-white rounded-2xl p-4 xs:p-5 sm:p-6 lg:p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <img
                src={managerImage}
                alt="Grace Mensah"
                className="w-16 h-16 xs:w-20 xs:h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 object-cover rounded-full mx-auto mb-3 xs:mb-4 sm:mb-5 border-4 border-blue-100"
                onError={(e) => { e.target.src="https://placehold.co/120x120/E5F3F6/2E8B57?text=GM"; }}
              />
              <h3 className="text-base xs:text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 mb-1 xs:mb-2">Grace Mensah</h3>
              <p className="text-sm xs:text-base sm:text-lg text-blue-600 font-medium mb-2 xs:mb-3 sm:mb-4">Operations Manager</p>
              <p className="text-xs xs:text-sm sm:text-base text-gray-600 leading-relaxed mb-4 xs:mb-5 sm:mb-6">
                Expert in farm operations ensuring quality and efficiency in all processes.
              </p>
              
              {/* Social Media Links */}
              <div className="flex justify-center gap-3 xs:gap-4">
                <a href="#" className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors duration-300" aria-label="LinkedIn">
                  <FaLinkedinIn className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
                <a href="#" className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-400 transition-colors duration-300" aria-label="Twitter">
                  <FaTwitter className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
                <a href="#" className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300" aria-label="Facebook">
                  <FaFacebookF className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
                <a href="#" className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-pink-100 hover:text-pink-600 transition-colors duration-300" aria-label="Instagram">
                  <FaInstagram className="w-4 h-4 xs:w-5 xs:h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="w-full py-6 xs:py-8 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 xs:mb-4 sm:mb-6 lg:mb-8">
            Ready to Get Started?
          </h2>
          <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-green-100 mb-6 xs:mb-8 sm:mb-10 lg:mb-12 max-w-3xl mx-auto px-2 xs:px-0 leading-relaxed">
            Shop our quality products or book expert services. Join thousands of satisfied customers.
          </p>
          
          <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 justify-center items-center max-w-lg mx-auto">
            <button
              onClick={() => navigate('/shop')}
              className="w-full xs:w-auto inline-flex items-center justify-center gap-2 xs:gap-3 bg-white text-green-700 px-4 xs:px-5 sm:px-6 lg:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full font-semibold text-sm xs:text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <FiShoppingCart className="w-4 h-4 xs:w-5 xs:h-5" />
              Shop Products
            </button>
            
            <button
              onClick={() => navigate('/services')}
              className="w-full xs:w-auto inline-flex items-center justify-center gap-2 xs:gap-3 bg-yellow-400 text-gray-900 px-4 xs:px-5 sm:px-6 lg:px-8 py-2.5 xs:py-3 sm:py-4 rounded-full font-semibold text-sm xs:text-base sm:text-lg shadow-lg hover:shadow-xl hover:bg-yellow-300 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <FiPhone className="w-4 h-4 xs:w-5 xs:h-5" />
              Book Services
            </button>
          </div>

          <div className="mt-6 xs:mt-8 sm:mt-10 lg:mt-12">
            <p className="text-sm xs:text-base text-green-100 mb-2 xs:mb-3">Need help?</p>
            <Link 
              to="/contact"
              className="text-yellow-300 hover:text-yellow-200 font-medium text-sm xs:text-base sm:text-lg underline-offset-4 hover:underline transition-colors"
            >
              Contact our team →
            </Link>
          </div>

          {/* Social Sharing Section */}
          <div className="mt-8 xs:mt-10 sm:mt-12 pt-6 xs:pt-8 border-t border-green-500/30">
            <p className="text-sm xs:text-base text-green-100 mb-4 text-center">
              Share our story with others
            </p>
            <div className="flex justify-center">
              <SocialShare 
                title="About Sanich Farms - Ghana's Trusted Poultry Partner"
                description="Learn about Sanich Farms' journey since 2019, providing quality poultry products and expert services across Ghana."
                platforms={['facebook', 'twitter', 'linkedin', 'whatsapp', 'copy']}
                className="justify-center"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;
