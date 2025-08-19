import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiCheckCircle, FiArrowRight, FiShoppingCart, FiPhone } from 'react-icons/fi';

// Import the TeamSlider component
import TeamSlider from '../components/Sections/TeamSlider/TeamSlider';
// ABOUT US FIX: Import CompanyValues component
import CompanyValues from '../components/Sections/CompanyValues/CompanyValues';

// Placeholder images for About Us sections
import ourStoryImage from '../assets/test2.jpg';
import ourMissionImage from '../assets/image5.png'; // Corrected path if needed

const AboutUsPage = () => {
  const navigate = useNavigate(); // ABOUT US FIX: Add navigation hook for CTAs

  // ABOUT US FIX: Add structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sanich Farms",
    "description": "Leading poultry farm in Ghana providing fresh, healthy, and ethically-raised poultry products and services.",
    "url": "https://sanichfarms.com",
    "logo": "https://sanichfarms.com/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Ejisu, Okese Avenue Fillet street",
      "addressLocality": "Kumasi",
      "addressCountry": "Ghana"
    },
    "foundingDate": "2013",
    "employee": [
      { "@type": "Person", "name": "Saaka Nicholas", "jobTitle": "CEO & Founder" },
      { "@type": "Person", "name": "Grace Mensah", "jobTitle": "Farm Operations Manager" }
    ]
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* ABOUT US FIX: Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      {/* Breadcrumbs */}
      <div className="w-full py-4 md:py-6 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">About Us</span>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="w-full py-12 md:py-16 bg-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight tracking-tight">
              About <span className="text-green-600">Sanich Farms</span>
            </h1>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full mb-6"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                From Humble Beginnings to Trusted Excellence
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                Founded with a passion for sustainable agriculture and healthy produce, Sanich Farms began as a small family venture. Over the years, we've grown, but our commitment to quality, ethical farming practices, and community well-being has remained unwavering.
              </p>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Since our establishment in 2013, we have built strong relationships with local communities and have become a trusted name in Ghana's poultry industry. Our modern facilities, combined with traditional values, ensure that every product meets the highest standards.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src={ourStoryImage}
                alt="Our Story - Sanich Farms"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl shadow-lg border border-gray-100 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Our+Story"; }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="w-full py-12 md:py-16 bg-gray-100 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex justify-center md:justify-start order-2 md:order-1">
              <img
                src={ourMissionImage}
                alt="Our Mission - Healthy Chicks"
                className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl shadow-lg border border-gray-100 object-cover"
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Our+Mission"; }}
              />
            </div>
            <div className="text-center md:text-left order-1 md:order-2">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-4 leading-tight">
                Our Mission: <span className="text-green-600">Quality & Sustainability</span>
              </h2>
              <p className="text-gray-600 text-base md:text-lg mb-4 leading-relaxed">
                Our mission is to provide the highest quality poultry products while upholding the strictest standards of animal welfare and environmental sustainability.
              </p>
              <ul className="list-none space-y-3 text-gray-700 text-sm md:text-base">
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <FiCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                  Ethical and sustainable farming practices
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <FiCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                  Fresh, healthy, and nutritious products
                </li>
                <li className="flex items-center gap-2 justify-center md:justify-start">
                  <FiCheckCircle className="text-green-600 text-lg flex-shrink-0" />
                  Trusted community relationships
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT US FIX: Add Company Values Section */}
      <CompanyValues />

      {/* ABOUT US FIX: Add Call-to-Action Section */}
      <section className="w-full py-12 md:py-16 bg-gradient-to-r from-green-600 to-green-700 font-poppins">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-white mb-6 md:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Ready to Experience <span className="text-yellow-300">Quality Poultry Products?</span>
            </h2>
            <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-6 opacity-90">
              Join thousands of satisfied customers who trust Sanich Farms for fresh, healthy, and ethically-raised poultry products.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <button
              onClick={() => navigate('/shop')}
              className="group inline-flex items-center justify-center gap-2 bg-white text-green-700 px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-50 min-w-[180px]"
            >
              <FiShoppingCart className="w-5 h-5" />
              Shop Products
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={() => navigate('/services')}
              className="group inline-flex items-center justify-center gap-2 bg-yellow-400 text-gray-800 px-6 py-3 rounded-full font-bold text-base shadow-lg hover:shadow-xl hover:bg-yellow-300 transform hover:-translate-y-1 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 min-w-[180px]"
            >
              <FiPhone className="w-5 h-5" />
              Book Services
              <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Contact info as backup CTA */}
          <div className="mt-6 pt-6 border-t border-green-500 border-opacity-30">
            <p className="text-white text-sm md:text-base opacity-80 mb-2">
              Need personalized assistance?
            </p>
            <Link 
              to="/contact"
              className="text-yellow-300 hover:text-yellow-200 font-semibold text-base underline decoration-2 underline-offset-4 hover:no-underline transition duration-200"
            >
              Contact our team directly
            </Link>
          </div>
        </div>
      </section>

      {/* Our Awesome Team Section (Slider) */}
      <TeamSlider />

    </div>
  );
};

export default AboutUsPage;
