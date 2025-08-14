// import React from "react";
// import { Link } from "react-router-dom";
// import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
// import { FiMail, FiPhoneCall, FiMapPin } from 'react-icons/fi';

// const Footer = () => {
//   const handleNewsletterSubmit = (e) => {
//     e.preventDefault();
//     const email = e.target.elements.email.value;
//     console.log("Newsletter subscribed with:", email);
//     alert("Thank you for subscribing to our newsletter!"); // Consider replacing with MessageBox
//     e.target.reset();
//   };

//   return (
//     <footer className="bg-gray-900 text-gray-300 text-sm font-poppins">
//       {/* Newsletter Section - Top Section */}
// <div className="bg-white py-10 md:py-12 shadow-inner"> 
//   <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
//     <div className="text-gray-800 mb-6 md:mb-0 text-center md:text-left"> 
//       <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
//         Subscribe to Our Newsletter
//       </h2>
//       <p className="text-gray-600 text-base sm:text-lg opacity-90">
//         Get information about new products, exclusive offers, and coupons!
//       </p>
//     </div>
//     <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 w-full md:w-auto max-w-lg">
//       <input
//         type="email"
//         name="email"
//         placeholder="Your email address"
//         className="flex-1 px-5 py-3 rounded-full text-gray-800 border-2 border-green-300 focus:outline-none focus:ring-4 focus:ring-green-500 w-full transition duration-200"
//         required
//         aria-label="Your email address for newsletter"
//       />
//       <button
//         type="submit"
//         className="bg-green-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600"
//       >
//         Subscribe
//       </button>
//     </form>
//   </div>
// </div>

//       {/* Main Footer Content */}
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 px-4 sm:px-6 lg:px-8">
//         {/* Company Info */}
//         <div className="col-span-1 lg:col-span-2 text-base">
//           <h2 className="text-xl font-bold text-white mb-4">Sanich Farms</h2>
//           <p className="mb-4 leading-relaxed text-gray-400">
//             Poultry farming business and services playing a fundamental
//             role in tackling challenges in the poultry industry for existing and
//             startup poultry farmers to improve their
//             productivity, profitability, as well as business expansion
//             through our services and products.
//           </p>
//           <div className="space-y-2 text-gray-400">
//             <p className="flex items-center gap-2"><FiMapPin className="text-green-400" /> Ejisu, Okese Avenue, Fillet Street</p>
//             <p className="flex items-center gap-2"><FiMapPin className="text-green-400" /> Kumasi, Ghana</p>
//             <p className="flex items-center gap-2"><FiMail className="text-green-400" /> Sanichfarms@gmail.com</p>
//             <p className="flex items-center gap-2"><FiPhoneCall className="text-green-400" /> 0243826137</p>
//             <p className="flex items-center gap-2"><FiPhoneCall className="text-green-400" /> 0598990595</p>
//           </div>
//         </div>

//         {/* My Account */}
//         <div>
//           <h2 className="text-lg font-bold text-white mb-5">My Account</h2>
//           <ul className="space-y-3 text-gray-400">
//             <li><Link to="/my-account" className="hover:text-green-400 transition-colors duration-200">My Account</Link></li>
//             <li><Link to="/order-history" className="hover:text-green-400 transition-colors duration-200">Order History</Link></li>
//             <li><Link to="/cart" className="hover:text-green-400 transition-colors duration-200">Shopping Cart</Link></li>
//             <li><Link to="/wishlist" className="hover:text-green-400 transition-colors duration-200">Wishlist</Link></li>
//           </ul>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h2 className="text-lg font-bold text-white mb-5">Quick Links</h2>
//           <ul className="space-y-3 text-gray-400">
//             <li><Link to="/contact" className="hover:text-green-400 transition-colors duration-200">Contact Us</Link></li>
//             <li><Link to="/terms" className="hover:text-green-400 transition-colors duration-200">Terms & Conditions</Link></li>
//             <li><Link to="/privacy" className="hover:text-green-400 transition-colors duration-200">Privacy Policy</Link></li>
//             <li><Link to="/faq" className="hover:text-green-400 transition-colors duration-200">FAQs</Link></li>
//           </ul>
//         </div>

//         {/* Menu */}
//         <div>
//           <h2 className="text-lg font-bold text-white mb-5">Menu</h2>
//           <ul className="space-y-3 text-gray-400">
//             <li><Link to="/about" className="hover:text-green-400 transition-colors duration-200">About Us</Link></li>
//             <li><Link to="/shop" className="hover:text-green-400 transition-colors duration-200">Shop</Link></li>
//             <li><Link to="/services" className="hover:text-green-400 transition-colors duration-200">Services</Link></li>
//             <li><Link to="/track-order" className="hover:text-green-400 transition-colors duration-200">Track Order</Link></li>
//           </ul>
//         </div>
//       </div>

//       {/* Bottom Row - Copyright & Social Media */}
//       <div className="border-t border-gray-700 py-6 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-400 text-xs sm:text-sm">
//         <p className="mb-4 sm:mb-0 text-center sm:text-left">
//           &copy; {new Date().getFullYear()} Sanich Farms. All Rights Reserved.
//         </p>
//         <div className="flex items-center gap-4 text-lg">
//           <a href="https://facebook.com/sanichfarms" target="_blank" rel="noopener noreferrer"
//              className="bg-gray-700 p-3 rounded-full hover:bg-green-600 text-white transition-colors duration-300 shadow-md hover:shadow-lg"
//              aria-label="Facebook">
//             <FaFacebookF />
//           </a>
//           <a href="https://tiktok.com/@sanichfarms" target="_blank" rel="noopener noreferrer"
//              className="bg-gray-700 p-3 rounded-full hover:bg-green-600 text-white transition-colors duration-300 shadow-md hover:shadow-lg"
//              aria-label="TikTok">
//             <FaTiktok />
//           </a>
//           <a href="https://youtube.com/sanichfarms" target="_blank" rel="noopener noreferrer"
//              className="bg-gray-700 p-3 rounded-full hover:bg-green-600 text-white transition-colors duration-300 shadow-md hover:shadow-lg"
//              aria-label="YouTube">
//             <FaYoutube />
//           </a>
//           <a href="https://instagram.com/sanichfarms" target="_blank" rel="noopener noreferrer"
//              className="bg-gray-700 p-3 rounded-full hover:bg-green-600 text-white transition-colors duration-300 shadow-md hover:shadow-lg"
//              aria-label="Instagram">
//             <FaInstagram />
//           </a>
//         </div>
//         <div className="flex items-center gap-2 mt-4 sm:mt-0">
//           <span className="text-xs sm:text-sm">Secure Payment</span>
//           <img src="https://placehold.co/40x25/FFFFFF/000000?text=Visa" alt="Visa" className="h-5" />
//           <img src="https://placehold.co/40x25/FFFFFF/000000?text=Mastercard" alt="Mastercard" className="h-5" />
//           <img src="https://placehold.co/40x25/FFFFFF/000000?text=Momo" alt="Mobile Money" className="h-5" />
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// src/components/Footer.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { FiMail, FiPhoneCall, FiMapPin } from 'react-icons/fi';
import axios from 'axios'; // Import axios for API calls

const Footer = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Define your backend API URL for newsletter subscription
  const NEWSLETTER_API_URL = 'https://sanich-farms-tnac.onrender.com/api/newsletter/subscribe';

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      // Make an API call to your backend
      const response = await axios.post(NEWSLETTER_API_URL, { email });

      // Assuming the API returns a success message
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
    <footer className="bg-gray-900 text-gray-300 text-sm font-poppins">
      {/* Newsletter Section - Top Section */}
      <div className="bg-white py-10 md:py-12 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="text-gray-800 mb-6 md:mb-0 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2 tracking-tight">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-600 text-base sm:text-lg opacity-90">
              Get information about new products, exclusive offers, and coupons!
            </p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 w-full md:w-auto max-w-lg">
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-3 rounded-full text-gray-800 border-2 border-green-300 focus:outline-none focus:ring-4 focus:ring-green-500 w-full transition duration-200"
              required
              aria-label="Your email address for newsletter"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold text-base shadow-md hover:shadow-lg transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
        {message && (
          <div className={`mt-4 text-center text-sm font-medium ${isError ? 'text-red-500' : 'text-green-600'}`}>
            {message}
          </div>
        )}
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 py-12 px-4 sm:px-6 lg:px-8">
        {/* Company Info */}
        <div className="col-span-1 lg:col-span-2 text-base">
          <h2 className="text-xl font-bold text-white mb-4">Sanich Farms</h2>
          <p className="mb-4 leading-relaxed text-gray-400">
            Poultry farming business and services playing a fundamental
            role in tackling challenges in the poultry industry for existing and
            startup poultry farmers to improve their
            productivity, profitability, as well as business expansion
            through our services and products.
          </p>
          <div className="space-y-2 text-gray-400">
            <p className="flex items-center gap-2"><FiMapPin className="text-green-400" /> Ejisu, Okese Avenue, Fillet Street</p>
            <p className="flex items-center gap-2"><FiMapPin className="text-green-400" /> Kumasi, Ghana</p>
            <p className="flex items-center gap-2"><FiMail className="text-green-400" /> Sanichfarms@gmail.com</p>
            <p className="flex items-center gap-2"><FiPhoneCall className="text-green-400" /> 0243826137</p>
            <p className="flex items-center gap-2"><FiPhoneCall className="text-green-400" /> 0598990595</p>
          </div>
        </div>

        {/* My Account */}
        <div>
          <h2 className="text-lg font-bold text-white mb-5">My Account</h2>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/my-account" className="hover:text-green-400 transition-colors duration-200">My Account</Link></li>
            <li><Link to="/order-history" className="hover:text-green-400 transition-colors duration-200">Order History</Link></li>
            <li><Link to="/cart" className="hover:text-green-400 transition-colors duration-200">Shopping Cart</Link></li>
            <li><Link to="/wishlist" className="hover:text-green-400 transition-colors duration-200">Wishlist</Link></li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-bold text-white mb-5">Quick Links</h2>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/contact" className="hover:text-green-400 transition-colors duration-200">Contact Us</Link></li>
            <li><Link to="/terms" className="hover:text-green-400 transition-colors duration-200">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="hover:text-green-400 transition-colors duration-200">Privacy Policy</Link></li>
            <li><Link to="/faq" className="hover:text-green-400 transition-colors duration-200">FAQs</Link></li>
          </ul>
        </div>

        {/* Menu */}
        <div>
          <h2 className="text-lg font-bold text-white mb-5">Menu</h2>
          <ul className="space-y-3 text-gray-400">
            <li><Link to="/about" className="hover:text-green-400 transition-colors duration-200">About Us</Link></li>
            <li><Link to="/shop" className="hover:text-green-400 transition-colors duration-200">Shop</Link></li>
            <li><Link to="/services" className="hover:text-green-400 transition-colors duration-200">Services</Link></li>
            <li><Link to="/track-order" className="hover:text-green-400 transition-colors duration-200">Track Order</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Row - Copyright & Social Media */}
      <div className="border-t border-gray-700 py-6 flex flex-col sm:flex-row items-center justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-gray-400 text-xs sm:text-sm">
        <p className="mb-4 sm:mb-0 text-center sm:text-left">
          &copy; {new Date().getFullYear()} Sanich Farms. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4 text-lg">
          <a href="https://facebook.com/sanichfarms" target="_blank" rel="noopener noreferrer"
             className="bg-gray-700 p-3 rounded-full hover:bg-green-600 text-white transition-colors duration-300 shadow-md hover:shadow-lg"
             aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="https://tiktok.com/@sanichfarms" target="_blank" rel="noopener noreferrer"
             className="bg-gray-700 p-3 rounded-full hover:bg-green-600 text-white transition-colors duration-300 shadow-md hover:shadow-lg"
             aria-label="TikTok">
            <FaTiktok />
          </a>
          <a href="https://youtube.com/sanichfarms" target="_blank" rel="noopener noreferrer"
             className="bg-gray-700 p-3 rounded-full hover:bg-green-600 text-white transition-colors duration-300 shadow-md hover:shadow-lg"
             aria-label="YouTube">
            <FaYoutube />
          </a>
          <a href="https://instagram.com/sanichfarms" target="_blank" rel="noopener noreferrer"
             className="bg-gray-700 p-3 rounded-full hover:bg-green-600 text-white transition-colors duration-300 shadow-md hover:shadow-lg"
             aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <span className="text-xs sm:text-sm">Secure Payment</span>
          <img src="https://placehold.co/40x25/FFFFFF/000000?text=Visa" alt="Visa" className="h-5" />
          <img src="https://placehold.co/40x25/FFFFFF/000000?text=Mastercard" alt="Mastercard" className="h-5" />
          <img src="https://placehold.co/40x25/FFFFFF/000000?text=Momo" alt="Mobile Money" className="h-5" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
