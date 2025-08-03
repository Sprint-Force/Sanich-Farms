// // // // import React, { useState, useEffect, forwardRef } from 'react';
// // // // import { Link, useLocation } from 'react-router-dom';
// // // // import {
// // // //   FiMenu, FiX, FiPhoneCall, FiSearch,
// // // //   FiHeart, FiShoppingCart, FiUser, FiMapPin,
// // // //   FiChevronRight // <--- ADDED THIS IMPORT: Essential for dropdown arrows
// // // // } from 'react-icons/fi';
// // // // import logo from '../../../assets/logo.png'; // Corrected path to logo. If your logo is named differently, adjust here.
// // // // import { useCart } from '../../../context/CartContext';
// // // // import { useWishlist } from '../../../context/WishlistContext';


// // // // // Use forwardRef to allow MainLayout to pass a ref to Navbar
// // // // const Navbar = forwardRef((props, ref) => {
// // // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // // //   const [showShopDropdown, setShowShopDropdown] = useState(false);
// // // //   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
// // // //   const [mobileSearchQuery, setMobileSearchQuery] = useState('');

// // // //   // Use the custom hooks to get cart and wishlist counts from context
// // // //   const { cartCount } = useCart();
// // // //   const { wishlistCount } = useWishlist();

// // // //   const location = useLocation();

// // // //   // Close mobile menu and search when route changes
// // // //   useEffect(() => {
// // // //     setIsMobileMenuOpen(false);
// // // //     setIsMobileSearchOpen(false);
// // // //   }, [location]);

// // // //   const toggleMobileMenu = () => {
// // // //     setIsMobileMenuOpen(!isMobileMenuOpen);
// // // //     // Close mobile search if menu is opened/closed
// // // //     if (isMobileSearchOpen) setIsMobileSearchOpen(false);
// // // //   };

// // // //   const toggleMobileSearch = () => {
// // // //     setIsMobileSearchOpen(!isMobileSearchOpen);
// // // //     // Close mobile menu if search is opened/closed
// // // //     if (isMobileMenuOpen) setIsMobileSearchOpen(false);
// // // //     // Clear search query when closing
// // // //     if (isMobileSearchOpen) setMobileSearchQuery('');
// // // //   };

// // // //   const handleMobileSearchSubmit = (e) => {
// // // //     e.preventDefault();
// // // //     if (mobileSearchQuery.trim()) {
// // // //       console.log("Mobile Search submitted:", mobileSearchQuery);
// // // //       // Here you would typically navigate to a search results page
// // // //       // navigate(`/search?query=${encodeURIComponent(mobileSearchQuery)}`);
// // // //       setIsMobileSearchOpen(false); // Close search after submission
// // // //       setMobileSearchQuery(''); // Clear search query
// // // //     }
// // // //   };

// // // //   const handleShopDropdownToggle = () => {
// // // //     // This function is primarily for mobile dropdown behavior
// // // //     // Desktop uses onMouseEnter/onMouseLeave
// // // //     setShowShopDropdown(prev => !prev);
// // // //   };

// // // //   return (
// // // //     <header ref={ref} className="sticky top-0 z-50 w-full bg-white shadow-md font-poppins">
// // // //       {/* Top Bar */}
// // // //       <div className="hidden md:flex justify-between items-center px-4 md:px-6 lg:px-10 py-2 border-b border-gray-100 text-sm text-gray-600">
// // // //         <div className="flex items-center gap-2">
// // // //           <FiMapPin className="text-green-700 text-lg" />
// // // //           <p className="text-gray-700">Ejisu, Okese Avenue Fillet street, Kumasi Ghana</p>
// // // //         </div>
// // // //         <div className="flex items-center gap-4">
// // // //           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
// // // //             <option value="en">English</option>
// // // //             <option value="twi">Twi</option>
// // // //           </select>
// // // //           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
// // // //             <option value="GHS">GHS</option>
// // // //             <option value="USD">USD</option>
// // // //           </select>
// // // //         </div>
// // // //       </div>

// // // //       {/* Main Navigation */}
// // // //       <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4">
// // // //         {/* Logo */}
// // // //         <Link to="/" className="flex items-center gap-2 flex-shrink-0">
// // // //           <img src={logo} alt="Sanich Farms Logo" className="h-10 md:h-12" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; }}/>
// // // //           <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#00B207] whitespace-nowrap">Sanich Farms</span>
// // // //         </Link>

// // // //         {/* Search Bar (Desktop) */}
// // // //         <form className="hidden md:flex relative flex-grow mx-4 lg:mx-8 max-w-lg">
// // // //           <input
// // // //             type="text"
// // // //             placeholder="Search for products..."
// // // //             className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base transition duration-200"
// // // //             aria-label="Search products"
// // // //           />
// // // //           <button
// // // //             type="submit"
// // // //             className="absolute right-0 top-0 h-full bg-[#00B207] text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
// // // //             aria-label="Search button"
// // // //           >
// // // //             <FiSearch size={20} />
// // // //           </button>
// // // //           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // // //             <FiSearch size={20} />
// // // //           </span>
// // // //         </form>

// // // //         {/* Icons & Login/Signup (Desktop) */}
// // // //         <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 text-lg flex-shrink-0">
// // // //           {/* Wishlist Icon with Badge */}
// // // //           <Link to="/wishlist" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" aria-label="Wishlist">
// // // //             <FiHeart size={22} />
// // // //             {wishlistCount > 0 && (
// // // //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
// // // //                 {wishlistCount}
// // // //               </span>
// // // //             )}
// // // //           </Link>
// // // //           {/* Cart Icon with Badge */}
// // // //           <Link to="/cart" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" aria-label="Shopping Cart">
// // // //             <FiShoppingCart size={22} />
// // // //             {cartCount > 0 && (
// // // //               <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
// // // //                 {cartCount}
// // // //               </span>
// // // //             )}
// // // //           </Link>
// // // //           {/* User Profile / Dashboard Link */}
// // // //           <Link to="/dashboard" className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="User Dashboard">
// // // //             <FiUser size={22} />
// // // //           </Link>
// // // //           <Link
// // // //             to="/login"
// // // //             className="ml-2 lg:ml-3 bg-green-600 text-white px-5 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
// // // //           >
// // // //             Login / Signup
// // // //           </Link>
// // // //         </div>

// // // //         {/* Mobile Hamburger & Search Icon (visible on mobile) */}
// // // //         <div className="flex items-center md:hidden gap-4">
// // // //           {/* Mobile Search Icon button */}
// // // //           <button
// // // //             onClick={toggleMobileSearch}
// // // //             className="text-gray-700 hover:text-green-600 transition duration-200"
// // // //             aria-label="Toggle mobile search"
// // // //           >
// // // //             {isMobileSearchOpen ? <FiX size={24} /> : <FiSearch size={24} />}
// // // //           </button>
// // // //           {/* Hamburger Menu Button */}
// // // //           <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-green-600 transition duration-200" aria-label="Toggle mobile menu">
// // // //             {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
// // // //           </button>
// // // //         </div>
// // // //       </div>

// // // //       {/* Mobile Search Input (Conditionally rendered) */}
// // // //       {isMobileSearchOpen && (
// // // //         <div className="md:hidden bg-white border-t border-gray-100 p-4 animate-fade-in-down">
// // // //           <form onSubmit={handleMobileSearchSubmit} className="relative">
// // // //             <input
// // // //               type="text"
// // // //               placeholder="Search products..."
// // // //               value={mobileSearchQuery}
// // // //               onChange={(e) => setMobileSearchQuery(e.target.value)}
// // // //               className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
// // // //               aria-label="Mobile search input"
// // // //               autoFocus // Automatically focus the input when it appears
// // // //             />
// // // //             <button
// // // //               type="submit"
// // // //               className="absolute right-0 top-0 h-full bg-green-600 text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
// // // //               aria-label="Submit mobile search"
// // // //             >
// // // //               <FiSearch size={20} />
// // // //             </button>
// // // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // // //               <FiSearch size={20} />
// // // //             </span>
// // // //           </form>
// // // //         </div>
// // // //       )}

// // // //       {/* Navigation Links (Desktop) - Hidden on small screens, shown on md and up */}
// // // //       <nav className="hidden md:flex justify-between items-center bg-gray-800 px-4 md:px-6 lg:px-10 py-3 text-white text-base font-medium">
// // // //         <div className="flex gap-6 lg:gap-8">
// // // //           <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link>
// // // //           <Link to="/about" className="hover:text-green-400 transition duration-200">About Us</Link>

// // // //           {/* Shop Dropdown (Desktop) */}
// // // //           <div
// // // //             className="relative"
// // // //             onMouseEnter={() => setShowShopDropdown(true)}
// // // //             onMouseLeave={() => setShowShopDropdown(false)}
// // // //           >
// // // //             <button className="hover:text-green-400 transition duration-200 flex items-center gap-1 focus:outline-none">
// // // //               Shop
// // // //               {/* Using FiChevronRight instead of SVG for consistency */}
// // // //               <FiChevronRight className={`inline-block ml-1 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-90' : 'rotate-0'}`} />
// // // //             </button>
// // // //             {showShopDropdown && (
// // // //               <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 z-10 border border-gray-100 animate-fade-in-down">
// // // //                 <Link to="/shop" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">All Products</Link>
// // // //                 <Link to="/shop/chicks" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Chicks</Link>
// // // //                 <Link to="/shop/feeds" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Feeds</Link>
// // // //               </div>
// // // //             )}
// // // //           </div>

// // // //           <Link to="/services" className="hover:text-green-400 transition duration-200">Services</Link>
// // // //           <Link to="/contact" className="hover:text-green-400 transition duration-200">Contact Us</Link>
// // // //         </div>

// // // //         {/* Phone Contact (Desktop) */}
// // // //         <div className="flex items-center gap-2 text-white">
// // // //           <FiPhoneCall className="text-white text-xl" />
// // // //           <span className="text-base font-semibold">0243826137</span>
// // // //         </div>
// // // //       </nav>

// // // //       {/* Mobile Menu - Shown only when isMobileMenuOpen is true */}
// // // //       {isMobileMenuOpen && (
// // // //         <div className="md:hidden fixed inset-0 top-[var(--navbar-height)] bg-white z-40 flex flex-col pt-4 pb-8 overflow-y-auto animate-slide-in-right">
// // // //           <div className="px-4 py-2">
// // // //             {/* Mobile Icons - FIXED POSITIONING AND HOVER */}
// // // //             <div className="flex justify-around items-center mb-6 text-gray-700 text-lg border-b pb-4 border-gray-100">
// // // //               {/* Wishlist Icon with Badge */}
// // // //               <Link to="/wishlist" onClick={toggleMobileMenu} className="relative flex flex-col items-center gap-1 hover:text-green-600 transition duration-200" aria-label="Wishlist">
// // // //                 <FiHeart size={24} />
// // // //                 <span className="text-xs">Wishlist</span>
// // // //                 {wishlistCount > 0 && (
// // // //                   <span className="absolute -top-1 right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
// // // //                     {wishlistCount}
// // // //                   </span>
// // // //                 )}
// // // //               </Link>
// // // //               {/* Cart Icon with Badge */}
// // // //               <Link to="/cart" onClick={toggleMobileMenu} className="relative flex flex-col items-center gap-1 hover:text-green-600 transition duration-200" aria-label="Shopping Cart">
// // // //                 <FiShoppingCart size={24} />
// // // //                 <span className="text-xs">Cart</span>
// // // //                 {cartCount > 0 && (
// // // //                   <span className="absolute -top-1 right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
// // // //                     {cartCount}
// // // //                   </span>
// // // //                 )}
// // // //               </Link>
// // // //               {/* User Profile / Dashboard Link */}
// // // //               <Link to="/dashboard" onClick={toggleMobileMenu} className="flex flex-col items-center gap-1 hover:text-green-600 transition duration-200" aria-label="User Dashboard">
// // // //                 <FiUser size={24} />
// // // //                 <span className="text-xs">Dashboard</span>
// // // //               </Link>
// // // //             </div>

// // // //             {/* Mobile Navigation Links */}
// // // //             <nav className="flex flex-col gap-4 text-gray-800 text-lg font-medium">
// // // //               <Link to="/" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Home</Link>
// // // //               <Link to="/about" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">About Us</Link>

// // // //               {/* Shop Dropdown (Mobile) */}
// // // //               <div className="relative">
// // // //                 <button
// // // //                   onClick={handleShopDropdownToggle}
// // // //                   className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200 flex items-center justify-between focus:outline-none"
// // // //                 >
// // // //                   Shop
// // // //                   {/* Using FiChevronRight instead of SVG for consistency */}
// // // //                   <FiChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
// // // //                 </button>
// // // //                 {showShopDropdown && (
// // // //                   <div className="flex flex-col pl-8 mt-2 space-y-2 animate-fade-in-down">
// // // //                     <Link to="/shop" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">All Products</Link>
// // // //                     <Link to="/shop/chicks" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Chicks</Link>
// // // //                     <Link to="/shop/feeds" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Feeds</Link>
// // // //                   </div>
// // // //                 )}
// // // //               </div>

// // // //               <Link to="/services" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Services</Link>
// // // //               <Link to="/contact" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Contact Us</Link>

// // // //               {/* Mobile Login/Signup Button */}
// // // //               <Link
// // // //                 to="/login"
// // // //                 onClick={toggleMobileMenu}
// // // //                 className="block text-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 mt-4 shadow-md"
// // // //               >
// // // //                 Login / Signup
// // // //               </Link>

// // // //               {/* Mobile Language and Currency Selectors */}
// // // //               <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-100">
// // // //                 <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
// // // //                   <option value="en">English</option>
// // // //                   <option value="twi">Twi</option>
// // // //                 </select>
// // // //                 <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
// // // //                   <option value="GHS">GHS</option>
// // // //                   <option value="USD">USD</option>
// // // //                 </select>
// // // //               </div>

// // // //               {/* Mobile Phone Contact */}
// // // //               <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">
// // // //                 <FiPhoneCall className="text-green-700 text-xl" />
// // // //                 <span className="text-base font-semibold">0243826137</span>
// // // //               </div>
// // // //             </nav>
// // // //           </div>
// // // //         </div>
// // // //       )}
// // // //     </header>
// // // //   );
// // // // }); // End of forwardRef

// // // // export default Navbar;


// // // // src/components/Layout/Navbar/Navbar.jsx
// // // import React, { useState, useEffect, forwardRef } from 'react';
// // // import { Link, useLocation } from 'react-router-dom';
// // // import {
// // //   FiMenu, FiX, FiPhoneCall, FiSearch,
// // //   FiHeart, FiShoppingCart, FiUser, FiMapPin,
// // //   FiChevronRight
// // // } from 'react-icons/fi';
// // // import logo from '../../../assets/logo.png'; // Corrected path to logo. If your logo is named differently, adjust here.
// // // import { useCart } from '../../../context/CartContext';
// // // import { useWishlist } from '../../../context/WishlistContext';

// // // // Use forwardRef to allow MainLayout to pass a ref to Navbar
// // // const Navbar = forwardRef((props, ref) => {
// // //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// // //   const [showShopDropdown, setShowShopDropdown] = useState(false);
// // //   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
// // //   const [mobileSearchQuery, setMobileSearchQuery] = useState('');

// // //   // State for Navbar scroll behavior
// // //   const [isNavbarHidden, setIsNavbarHidden] = useState(false);
// // //   const [lastScrollY, setLastScrollY] = useState(0);

// // //   // Use the custom hooks to get cart and wishlist counts from context
// // //   const { cartCount } = useCart();
// // //   const { wishlistCount } = useWishlist();

// // //   const location = useLocation();

// // //   // Close mobile menu and search when route changes
// // //   useEffect(() => {
// // //     setIsMobileMenuOpen(false);
// // //     setIsMobileSearchOpen(false);
// // //   }, [location]);

// // //   // Navbar scroll behavior logic
// // //   useEffect(() => {
// // //     const handleScroll = () => {
// // //       // Only apply scroll-hide behavior on screens smaller than large (lg)
// // //       // This allows the full Navbar to remain sticky on desktop.
// // //       if (window.innerWidth < 1024) { // Tailwind's 'lg' breakpoint is 1024px
// // //         if (window.scrollY > lastScrollY && window.scrollY > 100) { // Scroll down
// // //           setIsNavbarHidden(true);
// // //         } else { // Scroll up
// // //           setIsNavbarHidden(false);
// // //         }
// // //         setLastScrollY(window.scrollY);
// // //       } else {
// // //         setIsNavbarHidden(false); // Ensure Navbar is always visible on large screens
// // //       }
// // //     };

// // //     window.addEventListener('scroll', handleScroll);
// // //     return () => {
// // //       window.removeEventListener('scroll', handleScroll);
// // //     };
// // //   }, [lastScrollY]);


// // //   const toggleMobileMenu = () => {
// // //     setIsMobileMenuOpen(!isMobileMenuOpen);
// // //     // Close mobile search if menu is opened/closed
// // //     if (isMobileSearchOpen) setIsMobileSearchOpen(false);
// // //   };

// // //   const toggleMobileSearch = () => {
// // //     setIsMobileSearchOpen(!isMobileSearchOpen);
// // //     // Close mobile menu if search is opened/closed
// // //     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
// // //     // Clear search query when closing
// // //     if (isMobileSearchOpen) setMobileSearchQuery('');
// // //   };

// // //   const handleMobileSearchSubmit = (e) => {
// // //     e.preventDefault();
// // //     if (mobileSearchQuery.trim()) {
// // //       console.log("Mobile Search submitted:", mobileSearchQuery);
// // //       // Here you would typically navigate to a search results page
// // //       // navigate(`/search?query=${encodeURIComponent(mobileSearchQuery)}`);
// // //       setIsMobileSearchOpen(false); // Close search after submission
// // //       setMobileSearchQuery(''); // Clear search query
// // //     }
// // //   };

// // //   const handleShopDropdownToggle = () => {
// // //     // This function is primarily for mobile dropdown behavior
// // //     // Desktop uses onMouseEnter/onMouseLeave
// // //     setShowShopDropdown(prev => !prev);
// // //   };

// // //   return (
// // //     <header
// // //       ref={ref}
// // //       className={`sticky top-0 z-50 w-full bg-white shadow-md font-poppins transition-transform duration-300
// // //                  ${isNavbarHidden ? '-translate-y-full' : 'translate-y-0'}`} // Apply scroll hide/show
// // //     >
// // //       {/* Top Bar */}
// // //       <div className="hidden md:flex justify-between items-center px-4 md:px-6 lg:px-10 py-2 border-b border-gray-100 text-sm text-gray-600">
// // //         <div className="flex items-center gap-2">
// // //           <FiMapPin className="text-green-700 text-lg" />
// // //           <p className="text-gray-700">Ejisu, Okese Avenue Fillet street, Kumasi Ghana</p>
// // //         </div>
// // //         <div className="flex items-center gap-4">
// // //           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
// // //             <option value="en">English</option>
// // //             <option value="twi">Twi</option>
// // //           </select>
// // //           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
// // //             <option value="GHS">GHS</option>
// // //             <option value="USD">USD</option>
// // //           </select>
// // //         </div>
// // //       </div>

// // //       {/* Main Navigation */}
// // //       <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4">
// // //         {/* Logo */}
// // //         <Link to="/" className="flex items-center gap-2 flex-shrink-0">
// // //           <img src={logo} alt="Sanich Farms Logo" className="h-10 md:h-12" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; }}/>
// // //           <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#00B207] whitespace-nowrap">Sanich Farms</span>
// // //         </Link>

// // //         {/* Search Bar (Desktop) */}
// // //         <form className="hidden lg:flex relative flex-grow mx-4 lg:mx-8 max-w-lg"> {/* Changed md:flex to lg:flex */}
// // //           <input
// // //             type="text"
// // //             placeholder="Search for products..."
// // //             className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base transition duration-200"
// // //             aria-label="Search products"
// // //           />
// // //           <button
// // //             type="submit"
// // //             className="absolute right-0 top-0 h-full bg-[#00B207] text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
// // //             aria-label="Search button"
// // //           >
// // //             <FiSearch size={20} />
// // //           </button>
// // //           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // //             <FiSearch size={20} />
// // //           </span>
// // //         </form>

// // //         {/* Icons & Login/Signup (Desktop) */}
// // //         <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 text-lg flex-shrink-0">
// // //           {/* Wishlist Icon with Badge */}
// // //           <Link to="/wishlist" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" aria-label="Wishlist">
// // //             <FiHeart size={22} />
// // //             {wishlistCount > 0 && (
// // //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
// // //                 {wishlistCount}
// // //               </span>
// // //             )}
// // //           </Link>
// // //           {/* Cart Icon with Badge */}
// // //           <Link to="/cart" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" aria-label="Shopping Cart">
// // //             <FiShoppingCart size={22} />
// // //             {cartCount > 0 && (
// // //               <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
// // //                 {cartCount}
// // //               </span>
// // //             )}
// // //           </Link>
// // //           {/* User Profile / Dashboard Link */}
// // //           <Link to="/dashboard" className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="User Dashboard">
// // //             <FiUser size={22} />
// // //           </Link>
// // //           <Link
// // //             to="/login"
// // //             className="ml-2 lg:ml-3 bg-green-600 text-white px-5 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
// // //           >
// // //             Login / Signup
// // //           </Link>
// // //         </div>

// // //         {/* Mobile Icons (visible on mobile) - Wishlist, Cart, Search, Menu */}
// // //         <div className="flex items-center md:hidden gap-4">
// // //           {/* Wishlist Icon (Mobile) - Visible outside hamburger */}
// // //           <Link to="/wishlist" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition duration-200" aria-label="Wishlist">
// // //             <FiHeart size={24} />
// // //             {wishlistCount > 0 && (
// // //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
// // //                 {wishlistCount}
// // //               </span>
// // //             )}
// // //           </Link>
// // //           {/* Cart Icon (Mobile) - Visible outside hamburger */}
// // //           <Link to="/cart" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Shopping Cart">
// // //             <FiShoppingCart size={24} />
// // //             {cartCount > 0 && (
// // //               <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
// // //                 {cartCount}
// // //               </span>
// // //             )}
// // //           </Link>
// // //           {/* Mobile Search Icon button */}
// // //           <button
// // //             onClick={toggleMobileSearch}
// // //             className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100"
// // //             aria-label="Toggle mobile search"
// // //           >
// // //             {isMobileSearchOpen ? <FiX size={24} /> : <FiSearch size={24} />}
// // //           </button>
// // //           {/* Hamburger Menu Button */}
// // //           <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="Toggle mobile menu">
// // //             {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* Mobile Search Input (Conditionally rendered) */}
// // //       {isMobileSearchOpen && (
// // //         <div className="md:hidden bg-white border-t border-gray-100 p-4 animate-fade-in-down">
// // //           <form onSubmit={handleMobileSearchSubmit} className="relative">
// // //             <input
// // //               type="text"
// // //               placeholder="Search products..."
// // //               value={mobileSearchQuery}
// // //               onChange={(e) => setMobileSearchQuery(e.target.value)}
// // //               className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
// // //               aria-label="Mobile search input"
// // //               autoFocus // Automatically focus the input when it appears
// // //             />
// // //             <button
// // //               type="submit"
// // //               className="absolute right-0 top-0 h-full bg-green-600 text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
// // //               aria-label="Submit mobile search"
// // //             >
// // //               <FiSearch size={20} />
// // //             </button>
// // //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// // //               <FiSearch size={20} />
// // //             </span>
// // //           </form>
// // //         </div>
// // //       )}

// // //       {/* Navigation Links (Desktop) - Hidden on small screens, shown on md and up */}
// // //       <nav className="hidden md:flex justify-between items-center bg-gray-800 px-4 md:px-6 lg:px-10 py-3 text-white text-base font-medium">
// // //         <div className="flex gap-6 lg:gap-8">
// // //           <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link>
// // //           <Link to="/about" className="hover:text-green-400 transition duration-200">About Us</Link>

// // //           {/* Shop Dropdown (Desktop) */}
// // //           <div
// // //             className="relative"
// // //             onMouseEnter={() => setShowShopDropdown(true)}
// // //             onMouseLeave={() => setShowShopDropdown(false)}
// // //           >
// // //             <button className="hover:text-green-400 transition duration-200 flex items-center gap-1 focus:outline-none">
// // //               Shop
// // //               <FiChevronRight className={`inline-block ml-1 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
// // //             </button>
// // //             {showShopDropdown && (
// // //               <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 z-10 border border-gray-100 animate-fade-in-down">
// // //                 <Link to="/shop" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">All Products</Link>
// // //                 <Link to="/shop/chicks" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Chicks</Link>
// // //                 <Link to="/shop/feeds" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Feeds</Link>
// // //               </div>
// // //             )}
// // //           </div>

// // //           <Link to="/services" className="hover:text-green-400 transition duration-200">Services</Link>
// // //           <Link to="/contact" className="hover:text-green-400 transition duration-200">Contact Us</Link>
// // //         </div>

// // //         {/* Phone Contact (Desktop) */}
// // //         <div className="flex items-center gap-2 text-white">
// // //           <FiPhoneCall className="text-white text-xl" />
// // //           <span className="text-base font-semibold">0243826137</span>
// // //         </div>
// // //       </nav>

// // //       {/* Mobile Menu - Shown only when isMobileMenuOpen is true */}
// // //       {isMobileMenuOpen && (
// // //         <div className="md:hidden fixed inset-0 top-[var(--navbar-height)] bg-white z-40 flex flex-col pt-4 pb-8 overflow-y-auto animate-slide-in-right">
// // //           <div className="px-4 py-2">
// // //             {/* Mobile Icons - REMOVED from here as they are now outside the menu */}
// // //             {/* Mobile Navigation Links */}
// // //             <nav className="flex flex-col gap-4 text-gray-800 text-lg font-medium">
// // //               <Link to="/" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Home</Link>
// // //               <Link to="/about" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">About Us</Link>

// // //               {/* Shop Dropdown (Mobile) */}
// // //               <div className="relative">
// // //                 <button
// // //                   onClick={handleShopDropdownToggle}
// // //                   className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200 flex items-center justify-between focus:outline-none"
// // //                 >
// // //                   Shop
// // //                   <FiChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
// // //                 </button>
// // //                 {showShopDropdown && (
// // //                   <div className="flex flex-col pl-8 mt-2 space-y-2 animate-fade-in-down">
// // //                     <Link to="/shop" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">All Products</Link>
// // //                     <Link to="/shop/chicks" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Chicks</Link>
// // //                     <Link to="/shop/feeds" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Feeds</Link>
// // //                   </div>
// // //                 )}
// // //               </div>

// // //               <Link to="/services" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Services</Link>
// // //               <Link to="/contact" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Contact Us</Link>

// // //               {/* Dashboard Link (Mobile) - Moved here from icons section */}
// // //               <Link to="/dashboard" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">My Dashboard</Link>

// // //               {/* Mobile Login/Signup Button */}
// // //               <Link
// // //                 to="/login"
// // //                 onClick={toggleMobileMenu}
// // //                 className="block text-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 mt-4 shadow-md"
// // //               >
// // //                 Login / Signup
// // //               </Link>

// // //               {/* Mobile Language and Currency Selectors */}
// // //               <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-100">
// // //                 <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
// // //                   <option value="en">English</option>
// // //                   <option value="twi">Twi</option>
// // //                 </select>
// // //                 <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
// // //                   <option value="GHS">GHS</option>
// // //                   <option value="USD">USD</option>
// // //                 </select>
// // //               </div>

// // //               {/* Mobile Phone Contact */}
// // //               <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">
// // //                 <FiPhoneCall className="text-green-700 text-xl" />
// // //                 <span className="text-base font-semibold">0243826137</span>
// // //               </div>
// // //             </nav>
// // //           </div>
// // //         </div>
// // //       )}
// // //     </header>
// // //   );
// // // }); // End of forwardRef

// // // export default Navbar;


// // // src/components/Layout/Navbar/Navbar.jsx
// // import React, { useState, useEffect, useRef, forwardRef } from 'react';
// // import { Link, useLocation } from 'react-router-dom';
// // import {
// //   FiMenu, FiX, FiPhoneCall, FiSearch,
// //   FiHeart, FiShoppingCart, FiUser, FiMapPin,
// //   FiChevronRight
// // } from 'react-icons/fi';
// // import logo from '../../../assets/logo.png'; // Corrected path to logo. If your logo is named differently, adjust here.
// // import { useCart } from '../../../context/CartContext';
// // import { useWishlist } from '../../../context/WishlistContext';

// // // Use forwardRef to allow MainLayout to pass a ref to Navbar
// // const Navbar = forwardRef((props, ref) => {
// //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
// //   const [showShopDropdown, setShowShopDropdown] = useState(false);
// //   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
// //   const [mobileSearchQuery, setMobileSearchQuery] = useState('');

// //   // State for Navbar scroll behavior
// //   const [isNavbarHidden, setIsNavbarHidden] = useState(false);
// //   const [lastScrollY, setLastScrollY] = useState(0);
// //   const navbarRef = useRef(null); // Ref to measure Navbar height

// //   // Use the custom hooks to get cart and wishlist counts from context
// //   const { cartCount } = useCart();
// //   const { wishlistCount } = useWishlist();

// //   const location = useLocation();

// //   // Close mobile menu and search when route changes
// //   useEffect(() => {
// //     setIsMobileMenuOpen(false);
// //     setIsMobileSearchOpen(false);
// //   }, [location]);

// //   // Navbar scroll behavior logic
// //   useEffect(() => {
// //     const handleScroll = () => {
// //       const currentScrollY = window.scrollY;
// //       const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

// //       // Only apply scroll-hide behavior on screens smaller than large (lg)
// //       // and only if scrolled past the initial navbar height
// //       if (window.innerWidth < 1024) { // Tailwind's 'lg' breakpoint is 1024px
// //         if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) { // Scrolling down
// //           setIsNavbarHidden(true);
// //         } else { // Scrolling up
// //           setIsNavbarHidden(false);
// //         }
// //       } else {
// //         setIsNavbarHidden(false); // Ensure Navbar is always visible on large screens
// //       }
// //       setLastScrollY(currentScrollY);
// //     };

// //     window.addEventListener('scroll', handleScroll);
// //     return () => {
// //       window.removeEventListener('scroll', handleScroll);
// //     };
// //   }, [lastScrollY]); // lastScrollY is the dependency to re-run effect when it changes

// //   const toggleMobileMenu = () => {
// //     setIsMobileMenuOpen(!isMobileMenuOpen);
// //     // Close mobile search if menu is opened/closed
// //     if (isMobileSearchOpen) setIsMobileSearchOpen(false);
// //   };

// //   const toggleMobileSearch = () => {
// //     setIsMobileSearchOpen(!isMobileSearchOpen);
// //     // Close mobile menu if search is opened/closed
// //     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
// //     // Clear search query when closing
// //     if (isMobileSearchOpen) setMobileSearchQuery('');
// //   };

// //   const handleMobileSearchSubmit = (e) => {
// //     e.preventDefault();
// //     if (mobileSearchQuery.trim()) {
// //       console.log("Mobile Search submitted:", mobileSearchQuery);
// //       // Here you would typically navigate to a search results page
// //       // navigate(`/search?query=${encodeURIComponent(mobileSearchQuery)}`);
// //       setIsMobileSearchOpen(false); // Close search after submission
// //       setMobileSearchQuery(''); // Clear search query
// //     }
// //   };

// //   const handleShopDropdownToggle = () => {
// //     setShowShopDropdown(prev => !prev);
// //   };

// //   // Calculate dynamic top offset for mobile menu
// //   const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

// //   return (
// //     <header
// //       ref={navbarRef} // Assign ref to the header
// //       className={`sticky top-0 z-50 w-full bg-white shadow-md font-poppins transition-transform duration-300
// //                  ${isNavbarHidden ? '-translate-y-full' : 'translate-y-0'}`} // Apply scroll hide/show
// //     >
// //       {/* Top Bar */}
// //       <div className="hidden md:flex justify-between items-center px-4 md:px-6 lg:px-10 py-2 border-b border-gray-100 text-sm text-gray-600">
// //         <div className="flex items-center gap-2">
// //           <FiMapPin className="text-green-700 text-lg" />
// //           <p className="text-gray-700">Ejisu, Okese Avenue Fillet street, Kumasi Ghana</p>
// //         </div>
// //         <div className="flex items-center gap-4">
// //           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
// //             <option value="en">English</option>
// //             <option value="twi">Twi</option>
// //           </select>
// //           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
// //             <option value="GHS">GHS</option>
// //             <option value="USD">USD</option>
// //           </select>
// //         </div>
// //       </div>

// //       {/* Main Navigation */}
// //       <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4">
// //         {/* Logo */}
// //         <Link to="/" className="flex items-center gap-2 flex-shrink-0">
// //           <img src={logo} alt="Sanich Farms Logo" className="h-10 md:h-12" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; }}/>
// //           <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#00B207] whitespace-nowrap">Sanich Farms</span>
// //         </Link>

// //         {/* Search Bar (Desktop) */}
// //         <form className="hidden lg:flex relative flex-grow mx-4 lg:mx-8 max-w-lg">
// //           <input
// //             type="text"
// //             placeholder="Search for products..."
// //             className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base transition duration-200"
// //             aria-label="Search products"
// //           />
// //           <button
// //             type="submit"
// //             className="absolute right-0 top-0 h-full bg-[#00B207] text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
// //             aria-label="Search button"
// //           >
// //             <FiSearch size={20} />
// //           </button>
// //           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// //             <FiSearch size={20} />
// //           </span>
// //         </form>

// //         {/* Icons & Login/Signup (Desktop) */}
// //         <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 text-lg flex-shrink-0">
// //           {/* Wishlist Icon with Badge */}
// //           <Link to="/wishlist" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" aria-label="Wishlist">
// //             <FiHeart size={22} />
// //             {wishlistCount > 0 && (
// //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
// //                 {wishlistCount}
// //               </span>
// //             )}
// //           </Link>
// //           {/* Cart Icon with Badge */}
// //           <Link to="/cart" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-200" aria-label="Shopping Cart">
// //             <FiShoppingCart size={22} />
// //             {cartCount > 0 && (
// //               <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
// //                 {cartCount}
// //               </span>
// //             )}
// //           </Link>
// //           {/* User Profile / Dashboard Link */}
// //           <Link to="/dashboard" className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="User Dashboard">
// //             <FiUser size={22} />
// //           </Link>
// //           <Link
// //             to="/login"
// //             className="ml-2 lg:ml-3 bg-green-600 text-white px-5 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
// //           >
// //             Login / Signup
// //           </Link>
// //         </div>

// //         {/* Mobile Icons (visible on mobile) - Wishlist, Cart, Search, Menu */}
// //         <div className="flex items-center md:hidden gap-4">
// //           {/* Wishlist Icon (Mobile) - Visible outside hamburger */}
// //           <Link to="/wishlist" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition duration-200" aria-label="Wishlist">
// //             <FiHeart size={24} />
// //             {wishlistCount > 0 && (
// //               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
// //                 {wishlistCount}
// //               </span>
// //             )}
// //           </Link>
// //           {/* Cart Icon (Mobile) - Visible outside hamburger */}
// //           <Link to="/cart" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Shopping Cart">
// //             <FiShoppingCart size={24} />
// //             {cartCount > 0 && (
// //               <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
// //                 {cartCount}
// //               </span>
// //             )}
// //           </Link>
// //           {/* Mobile Search Icon button */}
// //           <button
// //             onClick={toggleMobileSearch}
// //             className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100"
// //             aria-label="Toggle mobile search"
// //           >
// //             {isMobileSearchOpen ? <FiX size={24} /> : <FiSearch size={24} />}
// //           </button>
// //           {/* Hamburger Menu Button */}
// //           <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="Toggle mobile menu">
// //             {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
// //           </button>
// //         </div>
// //       </div>

// //       {/* Mobile Search Input (Conditionally rendered) */}
// //       {isMobileSearchOpen && (
// //         <div className="md:hidden bg-white border-t border-gray-100 p-4 animate-fade-in-down">
// //           <form onSubmit={handleMobileSearchSubmit} className="relative">
// //             <input
// //               type="text"
// //               placeholder="Search products..."
// //               value={mobileSearchQuery}
// //               onChange={(e) => setMobileSearchQuery(e.target.value)}
// //               className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
// //               aria-label="Mobile search input"
// //               autoFocus // Automatically focus the input when it appears
// //             />
// //             <button
// //               type="submit"
// //               className="absolute right-0 top-0 h-full bg-green-600 text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
// //               aria-label="Submit mobile search"
// //             >
// //               <FiSearch size={20} />
// //             </button>
// //             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
// //               <FiSearch size={20} />
// //             </span>
// //           </form>
// //         </div>
// //       )}

// //       {/* Navigation Links (Desktop) - Hidden on small screens, shown on md and up */}
// //       <nav className="hidden md:flex justify-between items-center bg-gray-800 px-4 md:px-6 lg:px-10 py-3 text-white text-base font-medium">
// //         <div className="flex gap-6 lg:gap-8">
// //           <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link>
// //           <Link to="/about" className="hover:text-green-400 transition duration-200">About Us</Link>

// //           {/* Shop Dropdown (Desktop) */}
// //           <div
// //             className="relative"
// //             onMouseEnter={() => setShowShopDropdown(true)}
// //             onMouseLeave={() => setShowShopDropdown(false)}
// //           >
// //             <button className="hover:text-green-400 transition duration-200 flex items-center gap-1 focus:outline-none">
// //               Shop
// //               <FiChevronRight className={`inline-block ml-1 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
// //             </button>
// //             {showShopDropdown && (
// //               <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 z-10 border border-gray-100 animate-fade-in-down">
// //                 <Link to="/shop" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">All Products</Link>
// //                 <Link to="/shop/chicks" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Chicks</Link>
// //                 <Link to="/shop/feeds" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Feeds</Link>
// //               </div>
// //             )}
// //           </div>

// //           <Link to="/services" className="hover:text-green-400 transition duration-200">Services</Link>
// //           <Link to="/contact" className="hover:text-green-400 transition duration-200">Contact Us</Link>
// //         </div>

// //         {/* Phone Contact (Desktop) */}
// //         <div className="flex items-center gap-2 text-white">
// //           <FiPhoneCall className="text-white text-xl" />
// //           <span className="text-base font-semibold">0243826137</span>
// //         </div>
// //       </nav>

// //       {/* Mobile Menu - Shown only when isMobileMenuOpen is true */}
// //       {isMobileMenuOpen && (
// //         <div
// //           className="md:hidden fixed inset-0 z-40 flex flex-col pt-4 pb-8 overflow-y-auto animate-slide-in-right"
// //           style={{ top: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }} // Dynamic top and height
// //         >
// //           <div className="bg-white flex-1 p-4 overflow-y-auto"> {/* Removed fixed height, added overflow-y-auto here */}
// //             {/* Mobile Icons - REMOVED from here as they are now outside the menu */}
// //             {/* Mobile Navigation Links */}
// //             <nav className="flex flex-col gap-4 text-gray-800 text-lg font-medium">
// //               <Link to="/" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Home</Link>
// //               <Link to="/about" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">About Us</Link>

// //               {/* Shop Dropdown (Mobile) */}
// //               <div className="relative">
// //                 <button
// //                   onClick={handleShopDropdownToggle}
// //                   className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200 flex items-center justify-between focus:outline-none"
// //                 >
// //                   Shop
// //                   <FiChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
// //                 </button>
// //                 {showShopDropdown && (
// //                   <div className="flex flex-col pl-8 mt-2 space-y-2 animate-fade-in-down">
// //                     <Link to="/shop" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">All Products</Link>
// //                     <Link to="/shop/chicks" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Chicks</Link>
// //                     <Link to="/shop/feeds" onClick={toggleMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Feeds</Link>
// //                   </div>
// //                 )}
// //               </div>

// //               <Link to="/services" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Services</Link>
// //               <Link to="/contact" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Contact Us</Link>

// //               {/* Dashboard Link (Mobile) */}
// //               <Link to="/dashboard" onClick={toggleMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">My Dashboard</Link>

// //               {/* Mobile Login/Signup Button */}
// //               <Link
// //                 to="/login"
// //                 onClick={toggleMobileMenu}
// //                 className="block text-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 mt-4 shadow-md"
// //               >
// //                 Login / Signup
// //               </Link>

// //               {/* Mobile Language and Currency Selectors */}
// //               <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-100">
// //                 <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
// //                   <option value="en">English</option>
// //                   <option value="twi">Twi</option>
// //                 </select>
// //                 <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
// //                   <option value="GHS">GHS</option>
// //                   <option value="USD">USD</option>
// //                 </select>
// //               </div>

// //               {/* Mobile Phone Contact */}
// //               <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">
// //                 <FiPhoneCall className="text-green-700 text-xl" />
// //                 <span className="text-base font-semibold">0243826137</span>
// //               </div>
// //             </nav>
// //           </div>
// //         </div>
// //       )}
// //       {/* Overlay for mobile menu */}
// //       {isMobileMenuOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
// //           onClick={toggleMobileMenu}
// //         ></div>
// //       )}
// //     </header>
// //   );
// // }); // End of forwardRef

// // export default Navbar;

// // src/components/Layout/Navbar/Navbar.jsx
// import React, { useState, useEffect, useRef, forwardRef } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import {
//   FiMenu, FiX, FiPhoneCall, FiSearch,
//   FiHeart, FiShoppingCart, FiUser, FiMapPin,
//   FiChevronRight
// } from 'react-icons/fi';
// import logo from '../../../assets/logo.png'; // Corrected path to logo. If your logo is named differently, adjust here.
// import { useCart } from '../../../context/CartContext';
// import { useWishlist } from '../../../context/WishlistContext';

// // Use forwardRef to allow MainLayout to pass a ref to Navbar
// const Navbar = forwardRef((props, ref) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [showShopDropdown, setShowShopDropdown] = useState(false);
//   const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
//   const [mobileSearchQuery, setMobileSearchQuery] = useState('');

//   // State for Navbar scroll behavior
//   const [isNavbarHidden, setIsNavbarHidden] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const navbarRef = useRef(null); // Ref to measure Navbar height

//   // Use the custom hooks to get cart and wishlist counts from context
//   const { cartCount } = useCart();
//   const { wishlistCount } = useWishlist();

//   const location = useLocation();

//   // Close mobile menu and search when route changes
//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//     setIsMobileSearchOpen(false);
//   }, [location]);

//   // Navbar scroll behavior logic - NOW APPLIES TO ALL SCREEN SIZES
//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScrollY = window.scrollY;
//       const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

//       // Determine if scrolling down significantly past the navbar height
//       if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) {
//         setIsNavbarHidden(true);
//       } else { // Scrolling up or near the top
//         setIsNavbarHidden(false);
//       }
//       setLastScrollY(currentScrollY);
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, [lastScrollY]); // lastScrollY is the dependency to re-run effect when it changes

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//     // Close mobile search if menu is opened/closed
//     if (isMobileSearchOpen) setIsMobileSearchOpen(false);
//   };

//   // NEW: Function to explicitly close the mobile menu
//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const toggleMobileSearch = () => {
//     setIsMobileSearchOpen(!isMobileSearchOpen);
//     // Close mobile menu if search is opened/closed
//     if (isMobileMenuOpen) setIsMobileMenuOpen(false);
//     // Clear search query when closing
//     if (isMobileSearchOpen) setMobileSearchQuery('');
//   };

//   const handleMobileSearchSubmit = (e) => {
//     e.preventDefault();
//     if (mobileSearchQuery.trim()) {
//       console.log("Mobile Search submitted:", mobileSearchQuery);
//       // Here you would typically navigate to a search results page
//       // navigate(`/search?query=${encodeURIComponent(mobileSearchQuery)}`);
//       setIsMobileSearchOpen(false); // Close search after submission
//       setMobileSearchQuery(''); // Clear search query
//     }
//   };

//   const handleShopDropdownToggle = () => {
//     setShowShopDropdown(prev => !prev);
//   };

//   // Calculate dynamic top offset for mobile menu
//   const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

//   return (
//     <header
//       ref={navbarRef} // Assign ref to the header
//       className={`sticky top-0 z-50 w-full bg-white shadow-md font-poppins transition-transform duration-300
//                  ${isNavbarHidden ? '-translate-y-full' : 'translate-y-0'}`} // Apply scroll hide/show
//     >
//       {/* Top Bar */}
//       <div className="hidden md:flex justify-between items-center px-4 md:px-6 lg:px-10 py-2 border-b border-gray-100 text-sm text-gray-600">
//         <div className="flex items-center gap-2">
//           <FiMapPin className="text-green-700 text-lg" />
//           <p className="text-gray-700">Ejisu, Okese Avenue Fillet street, Kumasi Ghana</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
//             <option value="en">English</option>
//             <option value="twi">Twi</option>
//           </select>
//           <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200">
//             <option value="GHS">GHS</option>
//             <option value="USD">USD</option>
//           </select>
//         </div>
//       </div>

//       {/* Main Navigation */}
//       <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4">
//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 flex-shrink-0">
//           <img src={logo} alt="Sanich Farms Logo" className="h-10 md:h-12" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; }}/>
//           <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#00B207] whitespace-nowrap">Sanich Farms</span>
//         </Link>

//         {/* Search Bar (Desktop) */}
//         <form className="hidden lg:flex relative flex-grow mx-4 lg:mx-8 max-w-lg">
//           <input
//             type="text"
//             placeholder="Search for products..."
//             className="w-full border border-gray-300 pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base transition duration-200"
//             aria-label="Search products"
//           />
//           <button
//             type="submit"
//             className="absolute right-0 top-0 h-full bg-[#00B207] text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
//             aria-label="Search button"
//           >
//             <FiSearch size={20} />
//           </button>
//           <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//             <FiSearch size={20} />
//           </span>
//         </form>

//         {/* Icons & Login/Signup (Desktop) */}
//         <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 text-lg flex-shrink-0">
//           {/* Wishlist Icon with Badge */}
//           <Link to="/wishlist" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" aria-label="Wishlist">
//             <FiHeart size={22} />
//             {wishlistCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
//                 {wishlistCount}
//               </span>
//             )}
//           </Link>
//           {/* Cart Icon with Badge */}
//           <Link to="/cart" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-200" aria-label="Shopping Cart">
//             <FiShoppingCart size={22} />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//           {/* User Profile / Dashboard Link */}
//           <Link to="/dashboard" className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="User Dashboard">
//             <FiUser size={22} />
//           </Link>
//           <Link
//             to="/login"
//             className="ml-2 lg:ml-3 bg-green-600 text-white px-5 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
//           >
//             Login / Signup
//           </Link>
//         </div>

//         {/* Mobile Icons (visible on mobile) - Wishlist, Cart, Search, Menu */}
//         <div className="flex items-center md:hidden gap-4">
//           {/* Wishlist Icon (Mobile) - Visible outside hamburger */}
//           <Link to="/wishlist" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition duration-200" aria-label="Wishlist">
//             <FiHeart size={24} />
//             {wishlistCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {wishlistCount}
//               </span>
//             )}
//           </Link>
//           {/* Cart Icon (Mobile) - Visible outside hamburger */}
//           <Link to="/cart" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Shopping Cart">
//             <FiShoppingCart size={24} />
//             {cartCount > 0 && (
//               <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//           {/* Mobile Search Icon button */}
//           <button
//             onClick={toggleMobileSearch}
//             className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100"
//             aria-label="Toggle mobile search"
//           >
//             {isMobileSearchOpen ? <FiX size={24} /> : <FiSearch size={24} />}
//           </button>
//           {/* Hamburger Menu Button */}
//           <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="Toggle mobile menu">
//             {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Search Input (Conditionally rendered) */}
//       {isMobileSearchOpen && (
//         <div className="md:hidden bg-white border-t border-gray-100 p-4 animate-fade-in-down">
//           <form onSubmit={handleMobileSearchSubmit} className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={mobileSearchQuery}
//               onChange={(e) => setMobileSearchQuery(e.target.value)}
//               className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
//               aria-label="Mobile search input"
//               autoFocus // Automatically focus the input when it appears
//             />
//             <button
//               type="submit"
//               className="absolute right-0 top-0 h-full bg-green-600 text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
//               aria-label="Submit mobile search"
//             >
//               <FiSearch size={20} />
//             </button>
//             <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
//               <FiSearch size={20} />
//             </span>
//           </form>
//         </div>
//       )}

//       {/* Navigation Links (Desktop) - Hidden on small screens, shown on md and up */}
//       <nav className="hidden md:flex justify-between items-center bg-gray-800 px-4 md:px-6 lg:px-10 py-3 text-white text-base font-medium">
//         <div className="flex gap-6 lg:gap-8">
//           <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link>
//           <Link to="/about" className="hover:text-green-400 transition duration-200">About Us</Link>

//           {/* Shop Dropdown (Desktop) */}
//           <div
//             className="relative"
//             onMouseEnter={() => setShowShopDropdown(true)}
//             onMouseLeave={() => setShowShopDropdown(false)}
//           >
//             <button className="hover:text-green-400 transition duration-200 flex items-center gap-1 focus:outline-none">
//               Shop
//               <FiChevronRight className={`inline-block ml-1 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
//             </button>
//             {showShopDropdown && (
//               <div className="absolute top-full left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-48 z-10 border border-gray-100 animate-fade-in-down">
//                 <Link to="/shop" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">All Products</Link>
//                 <Link to="/shop/chicks" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Chicks</Link>
//                 <Link to="/shop/feeds" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Feeds</Link>
//               </div>
//             )}
//           </div>

//           <Link to="/services" className="hover:text-green-400 transition duration-200">Services</Link>
//           <Link to="/contact" className="hover:text-green-400 transition duration-200">Contact Us</Link>
//         </div>

//         {/* Phone Contact (Desktop) */}
//         <div className="flex items-center gap-2 text-white">
//           <FiPhoneCall className="text-white text-xl" />
//           <span className="text-base font-semibold">0243826137</span>
//         </div>
//       </nav>

//       {/* Mobile Menu - Shown only when isMobileMenuOpen is true */}
//       {isMobileMenuOpen && (
//         <div
//           className="md:hidden fixed inset-0 z-40 flex flex-col pt-4 pb-8 overflow-y-auto animate-slide-in-right"
//           style={{ top: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }} // Dynamic top and height
//         >
//           <div className="bg-white flex-1 p-4 overflow-y-auto">
//             {/* NEW: Close button inside the mobile menu */}
//             <div className="flex justify-end mb-4 pr-4"> {/* Added pr-4 for spacing */}
//               <button
//                 onClick={closeMobileMenu}
//                 className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200"
//                 aria-label="Close mobile menu"
//               >
//                 <FiX size={28} />
//               </button>
//             </div>

//             {/* Mobile Navigation Links */}
//             <nav className="flex flex-col gap-4 text-gray-800 text-lg font-medium">
//               <Link to="/" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Home</Link>
//               <Link to="/about" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">About Us</Link>

//               {/* Shop Dropdown (Mobile) */}
//               <div className="relative">
//                 <button
//                   onClick={handleShopDropdownToggle}
//                   className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200 flex items-center justify-between focus:outline-none"
//                 >
//                   Shop
//                   <FiChevronRight className={`w-5 h-5 transform transition-transform duration-200 ${showShopDropdown ? 'rotate-180' : 'rotate-0'}`} />
//                 </button>
//                 {showShopDropdown && (
//                   <div className="flex flex-col pl-8 mt-2 space-y-2 animate-fade-in-down">
//                     <Link to="/shop" onClick={closeMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">All Products</Link>
//                     <Link to="/shop/chicks" onClick={closeMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Chicks</Link>
//                     <Link to="/shop/feeds" onClick={closeMobileMenu} className="block py-2 text-base text-gray-700 hover:bg-gray-50 rounded-lg transition duration-150">Feeds</Link>
//                   </div>
//                 )}
//               </div>

//               <Link to="/services" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Services</Link>
//               <Link to="/contact" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Contact Us</Link>

//               {/* Dashboard Link (Mobile) */}
//               <Link to="/dashboard" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">My Dashboard</Link>

//               {/* Mobile Login/Signup Button */}
//               <Link
//                 to="/login"
//                 onClick={closeMobileMenu}
//                 className="block text-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 mt-4 shadow-md"
//               >
//                 Login / Signup
//               </Link>

//               {/* Mobile Language and Currency Selectors */}
//               <div className="flex justify-around items-center mt-6 pt-4 border-t border-gray-100">
//                 <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
//                   <option value="en">English</option>
//                   <option value="twi">Twi</option>
//                 </select>
//                 <select className="outline-none cursor-pointer bg-transparent text-gray-700 hover:text-green-700 transition duration-200 text-base">
//                   <option value="GHS">GHS</option>
//                   <option value="USD">USD</option>
//                 </select>
//               </div>

//               {/* Mobile Phone Contact */}
//               <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">
//                 <FiPhoneCall className="text-green-700 text-xl" />
//                 <span className="text-base font-semibold">0243826137</span>
//               </div>
//             </nav>
//           </div>
//         </div>
//       )}
//       {/* Overlay for mobile menu */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
//           onClick={closeMobileMenu} // Click overlay to close menu
//         ></div>
//       )}
//     </header>
//   );
// }); // End of forwardRef

// export default Navbar;


// src/components/Layout/Navbar/Navbar.jsx
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // NEW: Import useNavigate
import {
  FiMenu, FiX, FiPhoneCall, FiSearch,
  FiHeart, FiShoppingCart, FiUser, FiMapPin,
  FiChevronRight
} from 'react-icons/fi';
import logo from '../../../assets/logo.png';
import { useCart } from '../../../context/CartContext';
import { useWishlist } from '../../../context/WishlistContext';
import { useToast } from '../../../context/ToastContext'; // Import useToast for search feedback

const Navbar = forwardRef((props, ref) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [desktopSearchQuery, setDesktopSearchQuery] = useState(''); // NEW: State for desktop search input

  // State for Navbar scroll behavior
  const [isNavbarHidden, setIsNavbarHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navbarRef = useRef(null);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { addToast } = useToast(); // Use toast for search feedback
  const location = useLocation();
  const navigate = useNavigate(); // Initialize useNavigate

  // Close mobile menu and search when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMobileSearchOpen(false);
  }, [location]);

  // Navbar scroll behavior logic - NOW APPLIES TO ALL SCREEN SIZES
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

      if (currentScrollY > lastScrollY && currentScrollY > navbarHeight) { // Scrolling down
        setIsNavbarHidden(true);
      } else { // Scrolling up or near the top
        setIsNavbarHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (isMobileSearchOpen) setIsMobileSearchOpen(false);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    if (isMobileMenuOpen) setIsMobileMenuOpen(false);
    if (isMobileSearchOpen) setMobileSearchQuery(''); // Clear search query when closing
  };

  // NEW: Handle Mobile Search Submission
  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(mobileSearchQuery.trim())}`);
      setIsMobileSearchOpen(false); // Close search after submission
      setMobileSearchQuery(''); // Clear search query
    } else {
      addToast("Please enter a search term.", "error");
    }
  };

  // NEW: Handle Desktop Search Submission
  const handleDesktopSearchSubmit = (e) => {
    e.preventDefault();
    if (desktopSearchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(desktopSearchQuery.trim())}`);
      setDesktopSearchQuery(''); // Clear search query
    } else {
      addToast("Please enter a search term.", "error");
    }
  };

  const handleShopDropdownToggle = () => {
    setShowShopDropdown(prev => !prev);
  };

  const navbarHeight = navbarRef.current ? navbarRef.current.offsetHeight : 0;

  return (
    <header
      ref={navbarRef}
      className={`sticky top-0 z-50 w-full bg-white shadow-md font-poppins transition-transform duration-300
                 ${isNavbarHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >

      {/* Top Bar */}
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

      {/* Main Navigation */}
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-10 py-3 md:py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Sanich Farms Logo" className="h-10 md:h-12" onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/120x48/cccccc/333333?text=Logo"; }}/>
          <span className="text-xl md:text-2xl lg:text-3xl font-bold text-[#00B207] whitespace-nowrap">Sanich Farms</span>
        </Link>

        {/* Search Bar (Desktop) - Now uses desktopSearchQuery state */}
        <form onSubmit={handleDesktopSearchSubmit} className="hidden lg:flex relative flex-grow mx-4 lg:mx-8 max-w-lg">
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

        {/* Icons & Login/Signup (Desktop) */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6 text-gray-700 text-lg flex-shrink-0">
          {/* Wishlist Icon with Badge */}
          <Link to="/wishlist" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition duration-200" aria-label="Wishlist">
            <FiHeart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
                {wishlistCount}
              </span>
            )}
          </Link>
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative inline-flex items-center justify-center p-2 rounded-full hover:bg-gray-100 hover:text-green-600 transition-colors duration-200" aria-label="Shopping Cart">
            <FiShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-bounce-once">
                {cartCount}
              </span>
            )}
          </Link>
          {/* User Profile / Dashboard Link */}
          <Link to="/dashboard" className="hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="User Dashboard">
            <FiUser size={22} />
          </Link>
          <Link
            to="/login"
            className="ml-2 lg:ml-3 bg-green-600 text-white px-5 py-2 rounded-full text-base font-medium hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            Login / Signup
          </Link>
        </div>

        {/* Mobile Icons (visible on mobile) - Wishlist, Cart, Search, Menu */}
        <div className="flex items-center md:hidden gap-4">
          {/* Wishlist Icon (Mobile) - Visible outside hamburger */}
          <Link to="/wishlist" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition duration-200" aria-label="Wishlist">
            <FiHeart size={24} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          {/* Cart Icon (Mobile) - Visible outside hamburger */}
          <Link to="/cart" className="relative text-gray-700 hover:text-green-600 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200" aria-label="Shopping Cart">
            <FiShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green-700 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          {/* Mobile Search Icon button */}
          <button
            onClick={toggleMobileSearch}
            className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100"
            aria-label="Toggle mobile search"
          >
            {isMobileSearchOpen ? <FiX size={24} /> : <FiSearch size={24} />}
          </button>
          {/* Hamburger Menu Button */}
          <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-green-600 transition duration-200 p-2 rounded-full hover:bg-gray-100" aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Search Input (Conditionally rendered) - Now uses mobileSearchQuery state */}
      {isMobileSearchOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 animate-fade-in-down">
          <form onSubmit={handleMobileSearchSubmit} className="relative">
            <input
              type="text"
              placeholder="Search products or services..."
              value={mobileSearchQuery}
              onChange={(e) => setMobileSearchQuery(e.target.value)}
              className="w-full border border-gray-300 pl-10 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-base"
              aria-label="Mobile search input"
              autoFocus
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full bg-green-600 text-white px-4 rounded-r-full flex items-center justify-center hover:bg-green-700 transition duration-200"
              aria-label="Submit mobile search"
            >
              <FiSearch size={20} />
            </button>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FiSearch size={20} />
            </span>
          </form>
        </div>
      )}

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex justify-between items-center bg-gray-800 px-4 md:px-6 lg:px-10 py-3 text-white text-base font-medium">
        <div className="flex gap-6 lg:gap-8">
          <Link to="/" className="hover:text-green-400 transition duration-200">Home</Link>
          <Link to="/about" className="hover:text-green-400 transition duration-200">About Us</Link>

          {/* Shop Dropdown (Desktop) */}
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
                <Link to="/shop/chicks" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Chicks</Link>
                <Link to="/shop/feeds" className="block px-4 py-2 hover:bg-gray-100 transition duration-150">Feeds</Link>
              </div>
            )}
          </div>

          <Link to="/services" className="hover:text-green-400 transition duration-200">Services</Link>
          <Link to="/contact" className="hover:text-green-400 transition duration-200">Contact Us</Link>
        </div>

        {/* Phone Contact (Desktop) */}
        <div className="flex items-center gap-2 text-white">
          <FiPhoneCall className="text-white text-xl" />
          <span className="text-base font-semibold">0243826137</span>
        </div>
      </nav>

      {/* Mobile Menu - Shown only when isMobileMenuOpen is true */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 flex flex-col pt-4 pb-8 overflow-y-auto animate-slide-in-right"
          style={{ top: `${navbarHeight}px`, height: `calc(100vh - ${navbarHeight}px)` }}
        >
          <div className="bg-white flex-1 p-4 overflow-y-auto">
            {/* Close button inside the mobile menu */}
            <div className="flex justify-end mb-4 pr-4">
              <button
                onClick={closeMobileMenu}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition duration-200"
                aria-label="Close mobile menu"
              >
                <FiX size={28} />
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col gap-4 text-gray-800 text-lg font-medium">
              <Link to="/" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">Home</Link>
              <Link to="/about" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">About Us</Link>

              {/* Shop Dropdown (Mobile) */}
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

              {/* Dashboard Link (Mobile) */}
              <Link to="/dashboard" onClick={closeMobileMenu} className="block px-4 py-2 hover:bg-gray-100 rounded-lg transition duration-200">My Dashboard</Link>

              {/* Mobile Login/Signup Button */}
              <Link
                to="/login"
                onClick={closeMobileMenu}
                className="block text-center bg-green-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-green-700 transition duration-300 mt-4 shadow-md"
              >
                Login / Signup
              </Link>

              {/* Mobile Language and Currency Selectors */}
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

              {/* Mobile Phone Contact */}
              <div className="flex items-center justify-center gap-2 mt-4 text-gray-700">
                <FiPhoneCall className="text-green-700 text-xl" />
                <span className="text-base font-semibold">0243826137</span>
              </div>
            </nav>
          </div>
        </div>
      )}
      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={closeMobileMenu}
        ></div>
      )}
    </header>
  );
});

export default Navbar;
