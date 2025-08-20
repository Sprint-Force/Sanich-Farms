import React, { useRef, useEffect, forwardRef } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import { FiX, FiChevronRight, FiHeart, FiPhoneCall } from 'react-icons/fi';
import logo from '../../../assets/logo.png';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useNavbar } from './hooks/useNavbar';
import { getTypographyClasses } from './config/typography';
import TopBar from './components/TopBar';
import { ClickablePhone } from '../../../utils/contactUtils';
import SearchBar from './components/SearchBar';
import MobileNavbar from './components/MobileNavbar';
import DesktopNavbar from './components/DesktopNavbar';

// CSS for mobile menu animations
const style = `
@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.animate-slide-in-from-right {
  animation: slideInFromRight 0.3s ease-out forwards;
}

.animate-slide-out-to-right {
  animation: slideOutToRight 0.3s ease-in forwards;
}
`;

const Navbar = forwardRef(() => {
  // Ref for dropdown close timeout
  const dropdownTimeoutRef = useRef(null);

  // Use custom navbar hook for state management
  const { 
    isMobileMenuOpen, 
    isNavbarHidden, 
    navbarAnimationClass,
    showShopDropdown, 
    mobileSearchQuery,
    setMobileSearchQuery,
    desktopSearchQuery,
    setDesktopSearchQuery,
    toggleMobileMenu, 
    closeMobileMenu, 
    handleShopDropdownToggle,
    handleMobileSearchSubmit,
    handleDesktopSearchSubmit,
    handleLogout,
    setShowShopDropdown,
    searchInputRef,
    navbarRef 
  } = useNavbar();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuthContext();

  // Force mobile menu to update when authentication state changes
  useEffect(() => {
    // Small delay to ensure state has propagated
    const timer = setTimeout(() => {
      // Force a re-render by briefly closing and reopening if menu is open
      if (isMobileMenuOpen) {
        // This ensures the mobile menu reflects the current auth state
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isAuthenticated, user?.id, isMobileMenuOpen]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  // Enhanced dropdown handlers with delay
  const handleDropdownEnter = () => {
    // Clear any existing timeout
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setShowShopDropdown(true);
  };

  const handleDropdownLeave = () => {
    // Add a delay before closing the dropdown
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowShopDropdown(false);
    }, 300); // 300ms delay
  };

  const handleDropdownEnterContent = () => {
    // Clear timeout when mouse enters dropdown content
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const handleDropdownLeaveContent = () => {
    // Add delay when leaving dropdown content too
    dropdownTimeoutRef.current = setTimeout(() => {
      setShowShopDropdown(false);
    }, 200); // Shorter delay for content
  };

  return (
    <header
      ref={navbarRef}
      className={`fixed top-0 z-50 w-full bg-white shadow-md font-poppins transition-all duration-500 ease-in-out
                 ${isNavbarHidden ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'}
                 ${navbarAnimationClass}`}
    >
      <style>{style}</style>
      
      {/* Top Bar */}
      <TopBar />

      {/* Main Navigation */}
      <div className="px-4 md:px-6 lg:px-10 py-3 md:py-4">
        {/* Mobile/Tablet Navigation */}
        <MobileNavbar
          isMobileMenuOpen={isMobileMenuOpen}
          toggleMobileMenu={toggleMobileMenu}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
        />

        {/* Mobile Search Bar */}
        <SearchBar
          isMobile={true}
          searchQuery={mobileSearchQuery}
          setSearchQuery={setMobileSearchQuery}
          onSearchSubmit={handleMobileSearchSubmit}
          searchInputRef={searchInputRef}
        />

        {/* Desktop Navigation */}
        <DesktopNavbar
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          isAuthenticated={isAuthenticated}
          user={user}
          desktopSearchQuery={desktopSearchQuery}
          setDesktopSearchQuery={setDesktopSearchQuery}
          handleDesktopSearchSubmit={handleDesktopSearchSubmit}
        />
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden lg:flex justify-between items-center bg-gray-800 px-4 md:px-6 lg:px-10 py-3 text-white text-base font-medium">
        <div className="flex gap-6 lg:gap-8">
          <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-green-400 transition duration-200">About Us</Link>
          <div
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button className="hover:text-green-400 transition duration-200 flex items-center gap-1 focus:outline-none">
              Shop
              <FiChevronRight className={`inline-block ml-1 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {showShopDropdown && (
              <div 
                className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2"
                onMouseEnter={handleDropdownEnterContent}
                onMouseLeave={handleDropdownLeaveContent}
              >
                <Link to="/shop" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150">All Products</Link>
                <Link to="/shop/chicks" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150">Chicks</Link>
                <Link to="/shop/feeds" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-150">Feeds</Link>
              </div>
            )}
          </div>
          <Link to="/services" className="hover:text-green-400 transition duration-200">Services</Link>
          <Link to="/contact" className="hover:text-green-400 transition duration-200">Contact Us</Link>
        </div>
        <div className="flex items-center gap-2 text-white">
          <FiPhoneCall className="text-white text-xl" />
          <ClickablePhone 
            phone="0243826137" 
            className="text-base font-semibold text-white hover:text-green-300" 
          />
        </div>
      </nav>

      {/* Mobile Menu Portal */}
      {isMobileMenuOpen && ReactDOM.createPortal(
        <div 
          key={`mobile-menu-${isAuthenticated}-${user?.id || 'guest'}`}
          className="lg:hidden fixed inset-0 w-screen h-screen mobile-menu-overlay" 
          style={{ zIndex: 10000 }}
        >
          {/* Menu Content - Full Screen */}
          <div 
            className="flex flex-col w-full h-full bg-white overflow-hidden mobile-menu-content animate-slide-in-from-right"
            style={{ zIndex: 10001 }}
          >
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-4 border-b border-gray-100 bg-white flex-shrink-0">
              <div className="w-10" />
              <Link to="/" onClick={closeMobileMenu} className="flex justify-center items-center gap-2 flex-1 min-w-0">
                <img src={logo} alt="Sanich Farms Logo" className="h-10 flex-shrink-0" />
                <span className={`${getTypographyClasses('mobileMenu.title')} text-[#00B207] font-bold truncate`}>
                  Sanich Farms
                </span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200 flex-shrink-0"
                aria-label="Close mobile menu"
              >
                <FiX size={28} />
              </button>
            </div>

            {/* User Greeting - Compact */}
            {isAuthenticated && user && (
              <div className="px-4 py-2 bg-green-50 border-b border-gray-100 flex-shrink-0 mobile-menu-item">
                <span className="text-green-600 font-medium text-sm">
                  Hi! {user?.name?.split(' ')[0] || 'User'}, welcome back
                </span>
              </div>
            )}
          
            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-2">
              <nav className={`flex flex-col gap-1 text-gray-800 ${getTypographyClasses('mobileMenu.links')}`}>
                <Link to="/" onClick={closeMobileMenu} className="block px-4 py-2.5 hover:bg-gray-100 rounded-lg transition duration-200 mobile-menu-item">
                  Home
                </Link>
                <Link to="/about" onClick={closeMobileMenu} className="block px-4 py-2.5 hover:bg-gray-100 rounded-lg transition duration-200 mobile-menu-item">
                  About Us
                </Link>
                
                {/* Shop Dropdown */}
                <div className="relative mobile-menu-item">
                  <button
                    onClick={handleShopDropdownToggle}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-100 rounded-lg transition duration-200 flex items-center justify-between focus:outline-none"
                  >
                    Shop
                    <FiChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
                  </button>
                  {showShopDropdown && (
                    <div className="flex flex-col pl-6 mt-1 space-y-0.5 animate-fade-in-down">
                      <Link to="/shop" onClick={closeMobileMenu} className={`block py-1.5 px-4 ${getTypographyClasses('mobileMenu.subLinks')} text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150`}>
                        All Products
                      </Link>
                      <Link to="/shop/chicks" onClick={closeMobileMenu} className={`block py-1.5 px-4 ${getTypographyClasses('mobileMenu.subLinks')} text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150`}>
                        Chicks
                      </Link>
                      <Link to="/shop/feeds" onClick={closeMobileMenu} className={`block py-1.5 px-4 ${getTypographyClasses('mobileMenu.subLinks')} text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150`}>
                        Feeds
                      </Link>
                    </div>
                  )}
                </div>
                
                <Link to="/services" onClick={closeMobileMenu} className="block px-4 py-2.5 hover:bg-gray-100 rounded-lg transition duration-200 mobile-menu-item">
                  Services
                </Link>
                <Link to="/contact" onClick={closeMobileMenu} className="block px-4 py-2.5 hover:bg-gray-100 rounded-lg transition duration-200 mobile-menu-item">
                  Contact Us
                </Link>
                <Link to="/wishlist" onClick={closeMobileMenu} className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-100 rounded-lg transition duration-200 mobile-menu-item">
                  <span>My Wishlist</span>
                  {wishlistCount > 0 && (
                    <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Link>
                <Link to="/dashboard" onClick={closeMobileMenu} className="block px-4 py-2.5 hover:bg-gray-100 rounded-lg transition duration-200 mobile-menu-item">
                  My Dashboard
                </Link>

                {/* Settings and Info Section */}
                <div className="pt-3 mt-3 border-t border-gray-100 mobile-menu-item">
                  <div className="flex items-center justify-between px-4 py-2 text-gray-600">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">🇬🇭</span>
                        <span className="font-medium text-xs">GHS</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-sm">🇬🇧</span>
                        <span className="font-medium text-xs">ENG</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiPhoneCall className="text-green-600 text-sm" />
                      <ClickablePhone 
                        phone="0243826137" 
                        className="text-gray-600 hover:text-green-600 font-medium text-xs" 
                      />
                    </div>
                  </div>
                  
                  {/* Auth Button - Right after settings */}
                  <div className="px-4 pt-3 mobile-menu-item">
                    {(() => {
                      const authState = isAuthenticated;
                      const userData = user;
                      
                      if (authState && userData) {
                        return (
                          <button
                            key={`logout-${userData.id || Date.now()}`}
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-red-600 transition duration-200 text-sm"
                          >
                            Logout
                          </button>
                        );
                      } else {
                        return (
                          <Link
                            key={`login-${Date.now()}`}
                            to="/login"
                            onClick={closeMobileMenu}
                            className="block w-full text-center bg-green-600 text-white px-4 py-2.5 rounded-lg font-medium hover:bg-green-700 transition duration-200 text-sm"
                          >
                            Login / Signup
                          </Link>
                        );
                      }
                    })()}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
  );
});

export default Navbar;
