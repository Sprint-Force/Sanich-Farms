import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiCheckCircle } from 'react-icons/fi';

// Import the TeamSlider component
import TeamSlider from '../components/Sections/TeamSlider/TeamSlider';

// Placeholder images for About Us sections
import aboutUsBanner from '../assets/tsetimage.jpg';
import ourStoryImage from '../assets/test2.jpg';
import ourMissionImage from '../assets/image5.png'; // Corrected path if needed

const AboutUsPage = () => {
  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">About Us</span>
        </div>
      </div>

      {/* About Us Banner/Hero */}
      <div className="relative w-full h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
        <img
          src={aboutUsBanner}
          alt="About Us Banner"
          className="w-full h-full object-cover"
          onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1920x400/4CAF50/FFFFFF?text=About+Us+Banner"; }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-center">
            About Sanich Farms
          </h1>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="w-full py-16 md:py-20 bg-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight tracking-tight">
                Our Story: <span className="text-green-600">From Humble Beginnings</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Founded with a passion for sustainable agriculture and healthy produce, Sanich Farms began as a small family venture. Over the years, we've grown, but our commitment to quality, ethical farming practices, and community well-being has remained unwavering. We believe in providing products that are not just fresh, but truly wholesome.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Vestibulum ligula ipsum, varius sagittis ipsum dul nisi, laoreet ut tempor oc, cursus vitae eros. Cras quis ultricies elit. Proin ac eros non massa vulputate ornare. Vivamus ornare commodo tortor, ut commodo felis volutpat vitae.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={ourStoryImage}
                alt="Our Story - Sanich Farms"
                className="w-full max-w-md h-auto rounded-xl shadow-lg border border-gray-100 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Our+Story"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="w-full py-16 md:py-20 bg-gray-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <img
                src={ourMissionImage}
                alt="Our Mission - Healthy Chicks"
                className="w-full max-w-md h-auto rounded-xl shadow-lg border border-gray-100 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Our+Mission"; }}
              />
            </div>
            <div className="text-center md:text-left order-1 md:order-2">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 leading-tight tracking-tight">
                Our Mission: <span className="text-green-600">Quality & Sustainability</span>
              </h2>
              <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                Our mission is to provide the highest quality poultry products while upholding the strictest standards of animal welfare and environmental sustainability. We are dedicated to continuous improvement, ensuring that every product from Sanich Farms contributes to a healthier lifestyle for our customers and a healthier planet for all.
              </p>
              <ul className="list-none space-y-2 text-gray-700 text-base md:text-lg">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <FiCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  Ethical and sustainable farming practices.
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <FiCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  Delivering fresh, healthy, and nutritious products.
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <FiCheckCircle className="text-green-600 text-xl flex-shrink-0" />
                  Building a trusted relationship with our community.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* NEW: Our Awesome Team Section (Slider) */}
      <TeamSlider />

    </div>
  );
};

export default AboutUsPage;
