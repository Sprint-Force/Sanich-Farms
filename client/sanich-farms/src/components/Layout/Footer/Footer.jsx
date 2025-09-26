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
      <div className="max-w-6xl mx-auto py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Company Info */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-white mb-4">Sanich Farms</h3>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Your trusted partner in poultry farming, providing quality products and services to help your business thrive.
            </p>
            <div className="space-y-2 text-sm text-gray-400">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <FiMapPin className="text-green-400 flex-shrink-0" /> 
                Ejisu, Kumasi, Ghana
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <FiPhoneCall className="text-green-400 flex-shrink-0" /> 
                <div className="flex flex-col sm:flex-row sm:gap-2">
                  <ClickablePhone phone="0243826137" className="text-gray-400 hover:text-green-400" />
                  <span className="hidden sm:inline text-gray-500">|</span>
                  <ClickablePhone phone="0568160546" className="text-gray-400 hover:text-green-400" />
                </div>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <FiMail className="text-green-400 flex-shrink-0" /> 
                <ClickableEmail email="Sanichfarms@gmail.com" className="text-gray-400 hover:text-green-400" />
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
              <li><Link to="/shop" className="hover:text-green-400 transition-colors">Shop</Link></li>
              <li><Link to="/services" className="hover:text-green-400 transition-colors">Services</Link></li>
              <li><Link to="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-green-400 transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-bold text-white mb-4">Customer Care</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/track-order" className="hover:text-green-400 transition-colors">Track Order</Link></li>
              <li><Link to="/terms" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400 text-center sm:text-left">
            © {new Date().getFullYear()} Sanich Farms. All rights reserved.
          </p>
          
          {/* Social Media */}
          <div className="flex items-center gap-3">
            <a href="https://facebook.com/sanichfarms" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
               aria-label="Facebook">
              <FaFacebookF className="text-sm" />
            </a>
            <a href="https://tiktok.com/@sanichfarms" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
               aria-label="TikTok">
              <FaTiktok className="text-sm" />
            </a>
            <a href="https://youtube.com/sanichfarms" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
               aria-label="YouTube">
              <FaYoutube className="text-sm" />
            </a>
            <a href="https://instagram.com/sanichfarms" target="_blank" rel="noopener noreferrer"
               className="w-9 h-9 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
               aria-label="Instagram">
              <FaInstagram className="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
