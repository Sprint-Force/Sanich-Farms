import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiChevronRight, FiPhoneCall, FiLogOut } from 'react-icons/fi';
import logo from '../../../../assets/logo.png';
import { getTypographyClasses, iconSizes } from '../config/typography';

/**
 * MobileMenu component - Full-screen mobile navigation menu
 */
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
      <div
        className="lg:hidden fixed inset-y-0 right-0 z-40 flex flex-col w-full bg-white overflow-y-auto animate-slide-in-from-right shadow-lg"
        style={{ top: `0`, height: `100vh` }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        data-mobile-menu
      >
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Mobile Header with Logo and Close Button */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
            <div className="w-12" />
            <Link to="/" onClick={onClose} className="flex-grow flex justify-center items-center gap-2">
              <img src={logo} alt="Sanich Farms Logo" className="h-12" />
              <span className={`${getTypographyClasses('mobileMenu.title')} text-[#00B207]`}>
                Sanich Farms
              </span>
            </Link>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 p-3 rounded-full hover:bg-gray-100 transition duration-200 mobile-touch-target mobile-nav-button"
              aria-label="Close mobile menu"
            >
              <FiX size={iconSizes.xlarge} />
            </button>
          </div>
        
          <nav className={`flex flex-col gap-4 text-gray-800 ${getTypographyClasses('mobileMenu.links')}`}>
            <Link to="/" onClick={onClose} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition duration-200 mobile-nav-item">
              Home
            </Link>
            <Link to="/about" onClick={onClose} className="block px-4 py-3 hover:bg-gray-100 rounded-lg transition duration-200 mobile-nav-item">
              About Us
            </Link>
            
            {/* Shop Dropdown */}
            <div className="relative">
              <button
                onClick={onShopDropdownToggle}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 rounded-lg transition duration-200 flex items-center justify-between focus:outline-none mobile-nav-item"
              >
                Shop
                <FiChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
              </button>
              {showShopDropdown && (
                <div className={`flex flex-col pl-8 mt-2 space-y-2 ${getTypographyClasses('mobileMenu.subLinks')}`}>
                  <Link to="/shop" onClick={onClose} className="block py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150 mobile-nav-item">
                    All Products
                  </Link>
                  <Link to="/shop/chicks" onClick={onClose} className="block py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">
                    Chicks
                  </Link>
                  <Link to="/shop/feeds" onClick={onClose} className="block py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">
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
            
            {/* Wishlist */}
            <Link to="/wishlist" onClick={onClose} className="flex items-center justify-between px-4 py-3 hover:bg-gray-100 rounded-lg transition duration-200 mobile-nav-item">
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
                <div className="px-4 py-3 mt-4 border-t border-gray-100">
                  <span className={`${getTypographyClasses('userGreeting')} text-green-600 font-bold`}>
                    Hi! {user?.name?.split(' ')[0] || 'User'}
                  </span>
                </div>
                <button
                  onClick={onLogout}
                  className="block w-full text-center bg-red-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-full text-base sm:text-lg font-semibold hover:bg-red-700 active:bg-red-800 transition-all duration-300 mt-4 shadow-md hover:shadow-lg min-h-[48px] touch-manipulation mobile-touch-target"
                >
                  <span className="flex items-center justify-center gap-2">
                    <FiLogOut size={18} />
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className="block text-center bg-green-600 text-white px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-full text-base sm:text-lg font-semibold hover:bg-green-700 active:bg-green-800 transition-all duration-300 mt-4 shadow-md hover:shadow-lg min-h-[48px] touch-manipulation"
              >
                Login / Signup
              </Link>
            )}
            
            {/* Language & Currency */}
            <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1 text-gray-700">
                <span className="text-lg">🇬🇧</span>
                <span className={`${getTypographyClasses('topBar')} font-medium`}>ENG</span>
              </div>
              <div className="flex items-center gap-1 text-gray-700">
                <span className={`${getTypographyClasses('topBar')} font-medium`}>GHS</span>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">
              <FiPhoneCall className="text-green-700 text-xl" />
              <span className={`${getTypographyClasses('contact')}`}>0243826137</span>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
        onClick={onClose}
      ></div>
    </>
  );
};

export default MobileMenu;
