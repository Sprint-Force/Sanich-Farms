import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX, FiPhoneCall } from 'react-icons/fi';
import { FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import { HiMapPin } from 'react-icons/hi2'; // Better location icon
import { logo } from '../../assets';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showShopDropdown, setShowShopDropdown] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 w-full font-[Poppins] bg-white shadow-md">
      {/* Top Bar */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 border-b text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <HiMapPin className="text-green-700 text-lg" />
          <p>Ejisu, Okese Avenue Fillet street, Kumasi Ghana</p>
        </div>
        <div className="flex items-center gap-4">
          <select className="outline-none cursor-pointer">
            <option>Eng</option>
            <option>Twi</option>
          </select>
          <select className="outline-none cursor-pointer">
            <option>GHS</option>
            <option>USD</option>
          </select>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12" />
          <span className="text-2xl md:text-3xl font-bold text-[#00B207]">Sanich Farms</span>
        </Link>

        {/* Search Bar */}
        <form className="hidden md:flex relative flex-grow mx-8 max-w-lg">
          <input
            type="text"
            placeholder="Search"
            className="w-full border border-gray-200 pl-10 pr-4 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="bg-[#00B207] text-white px-4 rounded-r-lg hover:bg-green-800 transition">Search</button>
          <span className="absolute left-3 top-2.5 text-gray-400">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 21">
              <path d="M9.16667 16.3333..." stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </span>
        </form>

        {/* Icons */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 text-lg">
          <Link className="hover:text-green-600"><FaHeart /></Link>
          <div className="relative">
            <Link className="hover:text-green-600"><FaShoppingCart /></Link>
            <span className="absolute -top-2 -right-2 bg-green-700 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
              {cartCount}
            </span>
          </div>
          <Link className="hover:text-green-600"><FaUser /></Link>
          <Link to="/login" className="ml-3 bg-[#00B207] text-white px-4 py-1.5 rounded-md text-sm font-medium hover:bg-green-800 transition">
            Login / Signup
          </Link>
        </div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="hidden md:flex justify-between items-center bg-gray-800 px-6 py-3 text-white text-sm">
        <div className="flex gap-6">
          <Link to="/" className="hover:text-green-400 transition">Home</Link>
          <Link to="/about" className="hover:text-green-400 transition">About Us</Link>

          {/* Shop Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowShopDropdown(true)}
            onMouseLeave={() => setShowShopDropdown(false)}
          >
            <button className="hover:text-green-400 transition">Shop</button>
            {showShopDropdown && (
              <div className="absolute top-8 left-0 bg-white text-gray-800 shadow-lg rounded-md py-2 w-40 z-10">
                <Link to="/shop" className="block px-4 py-2 hover:bg-gray-100">All Products</Link>
                <Link to="/shop/chicks" className="block px-4 py-2 hover:bg-gray-100">Chicks</Link>
                <Link to="/shop/feeds" className="block px-4 py-2 hover:bg-gray-100">Feeds</Link>
              </div>
            )}
          </div>

          <Link to="/services" className="hover:text-green-400 transition">Services</Link>
          <Link to="/contact" className="hover:text-green-400 transition">Contact Us</Link>
        </div>

        {/* Phone */}
        <div className="flex items-center gap-2">
          <FiPhoneCall className="text-white text-base" />
          <span className="text-sm">0243826137</span>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t text-gray-800 text-sm">
          <div className="flex flex-col p-4 gap-4">
            <Link to="/" onClick={toggleMobileMenu}>Home</Link>
            <Link to="/about" onClick={toggleMobileMenu}>About Us</Link>
            <Link to="/shop" onClick={toggleMobileMenu}>Shop</Link>
            <Link to="/services" onClick={toggleMobileMenu}>Services</Link>
            <Link to="/contact" onClick={toggleMobileMenu}>Contact Us</Link>
            <Link to="/login" onClick={toggleMobileMenu} className="text-green-700 font-medium">Login / Signup</Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
