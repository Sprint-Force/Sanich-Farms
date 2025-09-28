import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiShoppingCart, FiSearch } from 'react-icons/fi';
import logo from '../../../../assets/logo.png';
import { getTypographyClasses } from '../config/typography';
import SearchBar from './SearchBar';

/**
 * MobileNavbar component - Mobile-specific navbar layout
 */
const MobileNavbar = ({ 
  isMobileMenuOpen, 
  toggleMobileMenu, 
  cartCount,
  showMobileSearch,
  setShowMobileSearch,
  mobileSearchQuery,
  setMobileSearchQuery,
  handleMobileSearchSubmit,
  searchInputRef
}) => {
  const navbarRef = useRef(null);

  // Handle click outside to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showMobileSearch && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMobileSearch, setShowMobileSearch]);

  return (
    <div ref={navbarRef} className="lg:hidden">
      {!showMobileSearch ? (
        // Normal navbar layout
        <div className="flex items-center justify-between">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <img 
          src={logo} 
          alt="Sanich Farms Logo" 
          className="h-7 xs:h-8 sm:h-9 md:h-10 filter drop-shadow-sm" 
          onError={(e) => { 
            e.target.onerror = null; 
            e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; 
          }}
        />
        <span className={`${getTypographyClasses('logo')} text-green-600 whitespace-nowrap ml-1 font-bold text-base xs:text-lg sm:text-xl`}>
          Sanich Farms
        </span>
      </Link>
      
      {/* Icons on the right */}
      <div className="flex items-center gap-0.5 xs:gap-1 sm:gap-2 ml-2 xs:ml-3 sm:ml-4">
        {/* Search Icon */}
                <button
          type="button"
          onClick={() => setShowMobileSearch(true)}
          className="relative flex items-center justify-center p-1.5 xs:p-2 sm:p-2.5 rounded-xl hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 mobile-touch-target mobile-nav-button"
          aria-label="Search products"
        >
          <FiSearch className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
        </button>
        
        {/* Cart */}
        <Link 
          to="/cart" 
          className="relative flex items-center justify-center p-1.5 xs:p-2 sm:p-2.5 rounded-xl hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 mobile-touch-target mobile-nav-button" 
          aria-label="Shopping Cart"
        >
          <FiShoppingCart className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold rounded-full w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 flex items-center justify-center shadow-lg">
              {cartCount > 99 ? '99+' : cartCount}
            </span>
          )}
        </Link>

        {/* Menu Toggle - Clean and Simple */}
        <button
          type="button"
          onClick={toggleMobileMenu}
          className="flex items-center justify-center p-1.5 xs:p-2 sm:p-2.5 rounded-xl hover:bg-gray-50 hover:text-gray-700 transition-all duration-200 mobile-touch-target mobile-nav-button"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <FiX className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
          ) : (
            <FiMenu className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>
        </div>
      ) : (
        // Expanded search layout - fills entire navbar
        <div className="flex items-center gap-3 w-full animate-fadeIn">
          <button
            onClick={() => setShowMobileSearch(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="Close search"
          >
            <FiX className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex-1">
            <SearchBar
              isMobile={true}
              searchQuery={mobileSearchQuery}
              setSearchQuery={setMobileSearchQuery}
              onSearchSubmit={(e) => {
                handleMobileSearchSubmit(e);
                setShowMobileSearch(false);
              }}
              searchInputRef={searchInputRef}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNavbar;
