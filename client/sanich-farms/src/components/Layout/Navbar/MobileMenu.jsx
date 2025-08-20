import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiChevronRight, FiPhoneCall } from 'react-icons/fi';
import logo from '../../../assets/logo.png';
import { ClickablePhone } from '../../../utils/contactUtils';

// Mobile Menu Component
const MobileMenu = ({ 
  isOpen, 
  onClose, 
  showShopDropdown, 
  onShopDropdownToggle,
  isAuthenticated,
  user,
  wishlistCount,
  onLogout 
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        onClick={onClose}
      />
      
      {/* Mobile Menu Content */}
      <div
        className="lg:hidden fixed inset-y-0 right-0 z-40 flex flex-col w-full bg-white overflow-y-auto animate-slide-in-from-right shadow-lg"
        style={{ top: '0', height: '100vh' }}
      >
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Mobile Header with Logo and Close Button */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
            <div className="w-10"></div>
            <Link to="/" onClick={onClose} className="flex-grow flex justify-center items-center gap-2">
              <img src={logo} alt="Sanich Farms Logo" className="h-10" />
              <span className="text-xl font-bold text-[#00B207]">Sanich Farms</span>
            </Link>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200"
              aria-label="Close mobile menu"
            >
              <FiX size={28} />
            </button>
          </div>
        
          <nav className="flex flex-col gap-4 text-gray-800 text-lg font-medium">
            <Link to="/" onClick={onClose} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">
              Home
            </Link>
            <Link to="/about" onClick={onClose} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">
              About Us
            </Link>
            
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={onShopDropdownToggle}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200 flex items-center justify-between focus:outline-none"
              >
                Shop
                <FiChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {showShopDropdown && (
                <div className="flex flex-col pl-8 mt-2 space-y-2 animate-fade-in-down">
                  <Link to="/shop" onClick={onClose} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">
                    All Products
                  </Link>
                  <Link to="/shop/chicks" onClick={onClose} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">
                    Chicks
                  </Link>
                  <Link to="/shop/feeds" onClick={onClose} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">
                    Feeds
                  </Link>
                </div>
              )}
            </div>
            
            <Link to="/services" onClick={onClose} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">
              Services
            </Link>
            <Link to="/contact" onClick={onClose} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">
              Contact Us
            </Link>
            <Link to="/wishlist" onClick={onClose} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">
              <span>My Wishlist</span>
              {wishlistCount > 0 && (
                <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/dashboard" onClick={onClose} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">
              My Dashboard
            </Link>
            
            {/* Authentication Section */}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-2 mt-4 border-t border-gray-100">
                  <span className="text-green-600 font-bold">Hi! {user?.name?.split(' ')[0] || 'User'}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="block w-full text-center bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300 mt-4 shadow-md"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="block text-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 mt-4 shadow-md"
              >
                Login / Signup
              </Link>
            )}
            
            {/* Language and Currency */}
            <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 text-gray-700">
                <span className="text-lg">🇬🇧</span>
                <span className="font-medium text-base">ENG</span>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <span className="font-medium text-base">GHS</span>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">
              <FiPhoneCall className="text-green-700 text-xl" />
              <ClickablePhone 
                phone="0243826137" 
                className="text-base font-semibold text-gray-700 hover:text-green-600" 
              />
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
