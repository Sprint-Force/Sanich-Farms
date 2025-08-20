import React, { useRef, useEffect, forwardRef } from 'react';
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
    showShopDropdown,
    mobileSearchQuery,
    desktopSearchQuery,
    isNavbarHidden,
    navbarRef,
    searchInputRef,
    setMobileSearchQuery,
    setDesktopSearchQuery,
    setShowShopDropdown,
    toggleMobileMenu,
    closeMobileMenu,
    handleShopDropdownToggle,
    handleMobileSearchSubmit,
    handleDesktopSearchSubmit,
    handleLogout,
  } = useNavbar();

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { user, isAuthenticated } = useAuthContext();

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
      className={`sticky top-0 z-50 w-full bg-white shadow-md font-poppins transition-transform duration-300
                 ${isNavbarHidden ? '-translate-y-full' : 'translate-y-0'}`}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
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
              <div className="w-10"></div>
              <Link to="/" onClick={closeMobileMenu} className="flex-grow flex justify-center items-center gap-2">
                <img src={logo} alt="Sanich Farms Logo" className="h-10" />
                <span className={`${getTypographyClasses('mobileMenu.title')} text-[#00B207] font-bold`}>Sanich Farms</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                aria-label="Close mobile menu"
              >
                <FiX size={28} />
              </button>
            </div>
          
            <nav className={`flex flex-col gap-4 text-gray-800 ${getTypographyClasses('mobileMenu.links')}`}>
              <Link to="/" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Home</Link>
              <Link to="/about" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">About Us</Link>
              <div className="relative">
                <button
                  onClick={handleShopDropdownToggle}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200 flex items-center justify-between focus:outline-none"
                >
                  Shop
                  <FiChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
                </button>
                {showShopDropdown && (
                  <div className="flex flex-col pl-8 mt-2 space-y-2 animate-fade-in-down">
                    <Link to="/shop" onClick={closeMobileMenu} className={`block py-2 ${getTypographyClasses('mobileMenu.subLinks')} text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150`}>All Products</Link>
                    <Link to="/shop/chicks" onClick={closeMobileMenu} className={`block py-2 ${getTypographyClasses('mobileMenu.subLinks')} text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150`}>Chicks</Link>
                    <Link to="/shop/feeds" onClick={closeMobileMenu} className={`block py-2 ${getTypographyClasses('mobileMenu.subLinks')} text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150`}>Feeds</Link>
                  </div>
                )}
              </div>
              <Link to="/services" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Services</Link>
              <Link to="/contact" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Contact Us</Link>
              <Link to="/wishlist" onClick={closeMobileMenu} className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">
                <span>My Wishlist</span>
                {wishlistCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/dashboard" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">My Dashboard</Link>
              
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 mt-4 border-t border-gray-100">
                    <span className={`${getTypographyClasses('userGreeting')} text-green-600`}>Hi! {user?.name?.split(' ')[0] || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className={`block w-full text-center bg-red-600 text-white px-6 py-3 rounded-full ${getTypographyClasses('mobileMenu.links')} font-semibold hover:bg-red-700 transition duration-300 mt-4 shadow-md`}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className={`block text-center bg-green-600 text-white px-6 py-3 rounded-full ${getTypographyClasses('mobileMenu.links')} font-semibold hover:bg-green-700 transition duration-300 mt-4 shadow-md`}
                >
                  Login / Signup
                </Link>
              )}
              <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-gray-700">
                  <span className="text-lg">🇬🇧</span>
                  <span className={`${getTypographyClasses('topBar')} font-medium`}>ENG</span>
                </div>
                <div className="flex items-center gap-1 text-gray-700">
                  <span className={`${getTypographyClasses('topBar')} font-medium`}>GHS</span>
                </div>
              </div>
              <div className={`flex items-center justify-center gap-2 mt-4 text-gray-700`}>
                <FiPhoneCall className="text-green-700 text-xl" />
                <ClickablePhone 
                  phone="0243826137" 
                  className={`${getTypographyClasses('contact')} text-gray-700 hover:text-green-600`} 
                />
              </div>
            </nav>
          </div>
        </div>
      )}
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </header>
  );
});

export default Navbar;
