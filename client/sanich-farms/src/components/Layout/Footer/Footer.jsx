import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FiMail, FiPhoneCall, FiMapPin } from 'react-icons/fi';
import { ClickableEmail, ClickablePhone } from '../../../utils/contactUtils';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      // Simulate newsletter subscription for MVP
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock success response
      setMessage("Thank you for subscribing to our newsletter!");
      setEmail(''); // Clear the input field on success
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      setIsError(true);
      setMessage("Failed to subscribe. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="bg-gray-900 text-gray-300 font-poppins border-t-4 border-green-600 shadow-lg">
      {/* Newsletter Section - Hidden for now */}
      <div className="hidden bg-white py-8 md:py-10">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Get the latest news and exclusive offers from Sanich Farms
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {message && (
            <div className={`mt-3 text-sm ${isError ? 'text-red-500' : 'text-green-600'}`}>
              {message}
            </div>
          )}
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto py-8 sm:py-10 md:py-12 lg:py-16 px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8">
          
          {/* Company Info */}
          <div className="text-center sm:text-left lg:text-left order-1 sm:col-span-2 lg:col-span-1">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Sanich Farms</h3>
            <p className="text-gray-400 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base max-w-sm mx-auto sm:mx-0">
              Your trusted partner in poultry farming, providing quality products and services to help your business thrive.
            </p>
            <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-gray-400">
              <p className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <FiMapPin className="text-green-400 flex-shrink-0 text-sm" /> 
                <span className="text-center sm:text-left">Ejisu, Kumasi, Ghana</span>
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <FiPhoneCall className="text-green-400 flex-shrink-0 text-sm" /> 
                <div className="flex flex-col xs:flex-row xs:gap-1 sm:gap-2 items-center">
                  <ClickablePhone phone="0243826137" className="text-gray-400 hover:text-green-400 transition-colors" />
                  <span className="hidden xs:inline text-gray-500">|</span>
                  <ClickablePhone phone="0568160546" className="text-gray-400 hover:text-green-400 transition-colors" />
                </div>
              </p>
              <p className="flex items-center justify-center sm:justify-start gap-2 flex-wrap">
                <FiMail className="text-green-400 flex-shrink-0 text-sm" /> 
                <ClickableEmail email="Sanichfarms@gmail.com" className="text-gray-400 hover:text-green-400 transition-colors break-all sm:break-normal" />
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-center lg:text-center order-2 sm:order-2">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-green-400 transition-colors inline-block py-1">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-green-400 transition-colors inline-block py-1">Shop</Link></li>
              <li><Link to="/services" className="hover:text-green-400 transition-colors inline-block py-1">Services</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors inline-block py-1">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-green-400 transition-colors inline-block py-1">FAQs</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="text-center sm:text-center lg:text-center order-3 sm:order-3">
            <h3 className="text-base sm:text-lg font-bold text-white mb-3 sm:mb-4">Customer Care</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-400">
              <li><Link to="/track-order" className="hover:text-green-400 transition-colors inline-block py-1">Track Order</Link></li>
              <li><Link to="/terms" className="hover:text-green-400 transition-colors inline-block py-1">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-green-400 transition-colors inline-block py-1">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 sm:pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left order-2 sm:order-1">
            © {new Date().getFullYear()} Sanich Farms. All rights reserved.
          </p>
          
          {/* Social Media */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 order-1 sm:order-2">
            <a href="https://facebook.com/sanichfarms" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
               aria-label="Facebook">
              <FaFacebookF className="text-xs sm:text-sm" />
            </a>
            <a href="https://tiktok.com/@sanichfarms" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
               aria-label="TikTok">
              <FaTiktok className="text-xs sm:text-sm" />
            </a>
            <a href="https://youtube.com/sanichfarms" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
               aria-label="YouTube">
              <FaYoutube className="text-xs sm:text-sm" />
            </a>
            <a href="https://instagram.com/sanichfarms" target="_blank" rel="noopener noreferrer"
               className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
               aria-label="Instagram">
              <FaInstagram className="text-xs sm:text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
