import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm">
      {/* Newsletter Section - Top Section */}
      <div className="bg-[#e6e6fa] py-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between px-6">
          <div className="text-gray-800 mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">Subcribe our Newsletter</h2>
            <p className="text-gray-600">Subcribe to get information about products and coupons</p>
          </div>
          <form className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-md text-black focus:outline-none w-full md:w-[350px]"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-md font-semibold"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 py-12 px-6">
        {/* Company Info */}
        <div className="col-span-2">
          <p className="mb-4 leading-relaxed">
            Poultry farming business and services playing a fundamental
            role of tackling challenges in poultry industry to existing and
            startups poultry farmers to improve their
            productivity,profitability as well as business expansion
            through our services,Products etc
          </p>
          <p className="mb-1">Ejisu,Okese Avenue</p>
          <p className="mb-1">Fillet street</p>
          <p className="mb-4">Kumasi,Ghana</p>
          <p className="mb-1">Sanichfarms@gmail.com</p>
          <p className="mb-1">0243826137</p>
          <p>0598990595</p>
        </div>

        {/* My Account */}
        <div>
          <h2 className="text-lg font-semibold mb-5">My Account</h2>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-gray-300">My Account</a></li>
            <li><a href="#" className="hover:text-gray-300">Order History</a></li>
            <li><a href="#" className="hover:text-gray-300">Shoping Cart</a></li>
            <li><a href="#" className="hover:text-gray-300">Wishlist</a></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-5">Quick Links</h2>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-gray-300">Contact</a></li>
            <li><a href="#" className="hover:text-gray-300">Terms & Condition</a></li>
            <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
          </ul>
        </div>

        {/* Menu */}
        <div>
          <h2 className="text-lg font-semibold mb-5">Menu</h2>
          <ul className="space-y-3">
            <li><a href="#" className="hover:text-gray-300">About</a></li>
            <li><a href="#" className="hover:text-gray-300">Shop</a></li>
            <li><a href="#" className="hover:text-gray-300">Services</a></li>
            <li><a href="#" className="hover:text-gray-300">Track Order</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="border-t border-gray-700 py-6 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6">
        <p>© 2025 Sanich Farms. All Rights Reserved.</p>
        <div className="flex items-center gap-4 mt-4 md:mt-0 text-lg">
          <div className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 cursor-pointer">
            <FaFacebookF />
          </div>
          <div className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 cursor-pointer">
            <FaTiktok />
          </div>
          <div className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 cursor-pointer">
            <FaYoutube />
          </div>
          <div className="bg-gray-700 p-3 rounded-full hover:bg-gray-600 cursor-pointer">
            <FaInstagram />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          {/* Placeholder for secure payment icon/text */}
          <span className="text-xs">Secure Payment</span>
          {/* You might want to add an actual payment icon here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
