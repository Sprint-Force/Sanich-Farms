import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiMenu, FiX, FiPhoneCall, FiSearch,
  FiHeart, FiShoppingCart, FiUser, FiMapPin,
  FiChevronRight, FiLogOut
} from 'react-icons/fi';
import logo from '../../../assets/logo.png';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useToast } from '../../../context/ToastContext';
import { useAuthContext } from '../../../hooks/useAuthContext';

// Tailwind CSS for the new animation
const style = `
@keyframes slideInFromRight {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}

.animate-slide-in-from-right {
  animation: slideInFromRight 0.3s ease-out forwards;
}

@keyframes slideOutToRight {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}

.animate-slide-out-to-right {
  animation: slideOutToRight 0.3s ease-in forwards;
}
`;


const Navbar = forwardRef((props, ref) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [desktopSearchQuery, setDesktopSearchQuery] = useState('');

  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);
  const searchInputRef = useRef(null);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { addToast } = useToast();
  const { user, isAuthenticated, logout } = useAuthContext();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

      if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
        setIsNavbarHidden(true);
      } else {
        isMobileMenuOpen ? setIsNavbarHidden(true) : setIsNavbarHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isMobileMenuOpen]);

  // NEW: Effect to control body scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function to ensure scroll is re-enabled on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isMobileSearchOpen]);


  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  const toggleMobileSearch = () => {
    if (!isMobileSearchOpen) {
      setIsMobileSearchOpen(true);
      if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    }
  };
  
  const closeMobileSearch = () => {
    setIsMobileSearchOpen(false);
    setMobileSearchQuery('');
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(mobileSearchQuery.trim())}`);
      closeMobileSearch();
    } else {
      addToast("Please enter a search term.", "error");
    }
  };

  const handleDesktopSearchSubmit = (e) => {
            e.preventDefault();
            if (desktopSearchQuery.trim()) {
              navigate(`/search?query=${encodeURIComponent(desktopSearchQuery.trim())}`);
              setDesktopSearchQuery('');
            } else {
              addToast("Please enter a search term.", "error");
            }
          };

  const handleShopDropdownToggle = () => {
    setShowShopDropdown(prev => !prev);
  };

  // Handle user logout
  const handleLogout = () => {
    logout();
    addToast('You have been logged out successfully.', 'success');
    navigate('/');
    closeMobileMenu();
  };

  // Re-calculate navbar height or use a fixed one if possible
  const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

  return (
    <header
      ref={navbarRef}
      className={`sticky top-0 z-50 w-full bg-white shadow-md font-poppins transition-transform duration-300
                 ${isNavbarHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
       <style>{style}</style>
      {/* Top Bar - No change needed here */}
      <div className="hidden md:flex justify-between items-center px-4 md:px-6 lg:px-10 py-2 border-b border-gray-100 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FiMapPin className="text-green-700 text-lg" />
          <p className="text-gray-700">Ejisu, Okese Avenue Fillet street, Kumasi Ghana</p>
        </div>
        <div className="flex items-center gap-4">
           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
             <option value="en">English</option>
             <option value="twi">Twi</option>
           </select>
           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
             <option value="GHS">GHS</option>
             <option value="USD">USD</option>
           </select>
         </div>
       </div>

      {/* Main Navigation - This is the primary area for changes */}
      <div className="px-4 md:px-6 lg:px-10 py-3 md:py-4">

        {/* =======================
            MOBILE/TABLET NAV
            ======================= */}
        <div className="flex items-center justify-between lg:hidden mb-2">
          {/* Logo on the left */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Sanich Farms Logo" className="h-10 md:h-12" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; }}/>
            <span className="hidden md:block text-xl md:text-2xl font-bold text-[#00B207] whitespace-nowrap ml-2">Sanich Farms</span>
          </Link>
          
          {/* Icons on the right */}
          <div className="flex items-center gap-2 md:gap-4">
             <Link to="/wishlist" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition duration-200" aria-label="Wishlist">
               <FiHeart size={24} />
               {wishlistCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                   {wishlistCount}
                 </span>
               )}
             </Link>
             <Link to="/cart" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Shopping Cart">
               <FiShoppingCart size={24} />
               {cartCount > 0 && (
                 <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                   {cartCount}
                 </span>
               )}
             </Link>
             <Link to="/dashboard" className="hidden md:block hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="User Dashboard">
              <FiUser size={24} />
            </Link>

            {/* Hamburger Button on the right */}
            <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="Toggle mobile menu">
              {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </button>
          </div>
        </div>

        {/* Search Bar for Mobile/Tablet - Jumia-like full-width design */}
        <div className="lg:hidden">
          <form onSubmit={handleMobileSearchSubmit} className="relative w-full">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search for products or services..."
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
              aria-label="Mobile and tablet search input"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full bg-[#00B207] text-white px-4 rounded-r-md flex items-center justify-center hover:bg-green-700 transition duration-200"
              aria-label="Submit mobile search"
            >
              <FiSearch size={20} />
            </button>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch size={20} />
            </span>
          </form>
        </div>


        {/* =======================
            DESKTOP NAVBAR
            ======================= */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo (Desktop) */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Sanich Farms Logo" className="h-12" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; }}/>
            <span className="text-2xl lg:text-3xl font-bold text-[#00B207] whitespace-nowrap">Sanich Farms</span>
          </Link>

          {/* Search Bar (Desktop) */}
          <form onSubmit={handleDesktopSearchSubmit} className="relative flex-grow mx-8 max-w-lg">
            <input
              type="text"
              placeholder="Search for products or services..."
              value={desktopSearchQuery}
              onChange={(e) => setDesktopSearchQuery(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base transition duration-200"
              aria-label="Search products and services"
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full bg-[#00B207] text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
              aria-label="Search button"
            >
              <FiSearch size={20} />
            </button>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch size={20} />
            </span>
          </form>

          {/* Icons & User Info/Login (Desktop) */}
          <div className="flex items-center gap-6 text-gray-700 text-lg flex-shrink-0">
            <Link to="/wishlist" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" aria-label="Wishlist">
              <FiHeart size={22} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-200" aria-label="Shopping Cart">
              <FiShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link to="/dashboard" className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="User Dashboard">
                  <FiUser size={22} />
                </Link>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">Hi! {user?.name || user?.email || 'User'}</span>
                  <button
                    onClick={handleLogout}
                    className="ml-2 text-red-600 hover:text-red-700 transition duration-200 p-2 rounded-full hover:bg-red-50"
                    aria-label="Logout"
                  >
                    <FiLogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/dashboard" className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="User Dashboard">
                  <FiUser size={22} />
                </Link>
                <Link
                  to="/login"
                  className="ml-3 bg-green-600 text-white px-5 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
                >
                  Login / Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Links (Desktop) - No change needed here */}
      <nav className="hidden lg:flex justify-between items-center bg-gray-800 px-4 md:px-6 lg:px-10 py-3 text-white text-base font-medium">
        <div className="flex gap-6 lg:gap-8">
          <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-green-400 transition duration-200">About Us</Link>
          <div
            className="relative"
            onMouseEnter={() => setShowShopDropdown(true)}
            onMouseLeave={() => setShowShopDropdown(false)}
          >
            <button className="hover:text-green-400 transition duration-200 flex items-center gap-1 focus:outline-none">
              Shop
              <FiChevronRight className={`inline-block ml-1 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
            </button>
            {showShopDropdown && (
              <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 z-10 border border-gray-100 animate-fade-in-down">
                <Link to="/shop" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">All Products</Link>
                <Link to="/shop/chicks" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Chicks</Link>
                <Link to="/shop/feeds" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Feeds</Link>
              </div>
            )}
          </div>
          <Link to="/services" className="hover:text-green-400 transition duration-200">Services</Link>
          <Link to="/contact" className="hover:text-green-400 transition duration-200">Contact Us</Link>
        </div>
        <div className="flex items-center gap-2 text-white">
          <FiPhoneCall className="text-white text-xl" />
          <span className="text-base font-semibold">0243826137</span>
        </div>
      </nav>

      {/* Mobile Menu - The fix is here */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-y-0 right-0 z-40 flex flex-col w-full bg-white overflow-y-auto animate-slide-in-from-right shadow-lg"
          style={{ top: `0`, height: `100vh` }}
        >
          <div className="flex-1 p-4 overflow-y-auto">

            {/* Mobile Header with Logo and Close Button centered */}
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
              {/* Spacer div to push the logo to the center */}
              <div className="w-10"></div>
              <Link to="/" onClick={closeMobileMenu} className="flex-grow flex justify-center items-center gap-2">
                <img src={logo} alt="Sanich Farms Logo" className="h-10" />
                <span className="text-xl font-bold text-[#00B207]">Sanich Farms</span>
              </Link>
              <button
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                aria-label="Close mobile menu"
              >
                <FiX size={28} />
              </button>
            </div>
          
            <nav className="flex flex-col gap-4 text-gray-800 text-lg font-medium">
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
                    <Link to="/shop" onClick={closeMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">All Products</Link>
                    <Link to="/shop/chicks" onClick={closeMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Chicks</Link>
                    <Link to="/shop/feeds" onClick={closeMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Feeds</Link>
                  </div>
                )}
              </div>
              <Link to="/services" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Services</Link>
              <Link to="/contact" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Contact Us</Link>
              <Link to="/dashboard" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">My Dashboard</Link>
              
              {isAuthenticated ? (
                <>
                  <div className="px-4 py-2 mt-4 border-t border-gray-100">
                    <span className="text-green-600 font-medium">Hi! {user?.name || user?.email || 'User'}</span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-center bg-red-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition duration-300 mt-4 shadow-md"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className="block text-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 mt-4 shadow-md"
                >
                  Login / Signup
                </Link>
              )}
              <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-100">
                <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
                  <option value="en">English</option>
                  <option value="twi">Twi</option>
                </select>
                <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
                  <option value="GHS">GHS</option>
                  <option value="USD">USD</option>
                </select>
              </div>
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">
                <FiPhoneCall className="text-green-700 text-xl" />
                <span className="text-base font-semibold">0243826137</span>
              </div>
            </nav>
          </div>
        </div>
      )}
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