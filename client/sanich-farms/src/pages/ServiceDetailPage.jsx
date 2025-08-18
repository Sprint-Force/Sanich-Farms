import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiHome, FiChevronRight, FiCheckCircle, FiBookOpen, FiDollarSign, FiCalendar, FiHelpCircle } from 'react-icons/fi';
import axios from 'axios';

const ServiceDetailPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();

  // Define your backend API URL
  const BASE_URL = 'https://sanich-farms-tnac.onrender.com/api/services';

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Effect to fetch service data from the API
  useEffect(() => {
    const fetchService = async () => {
      // Ensure serviceId is available and valid before making the API call
      if (!serviceId) {
        setError("No service ID provided in the URL.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/${serviceId}`);
        const fetchedService = response.data;
        if (fetchedService) {
          setService(fetchedService);
        } else {
          setError("Service not found.");
        }
      } catch (err) {
        console.error("Failed to fetch service details:", err);
        setError("Failed to load service details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleBookService = () => {
    // Navigate to the booking page. The booking page will now fetch its own data.
    navigate(`/book-service/${serviceId}`);
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] bg-gray-50 font-poppins text-gray-700 text-xl col-span-full">
        Loading service details...
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-120px)] bg-gray-50 font-poppins text-gray-700 text-xl p-4 text-center">
        <p className="mb-4 text-red-500">{error || "Service not found."}</p>
        <Link to="/services" className="text-green-600 hover:underline ml-2 px-4 py-2 bg-white rounded-lg shadow-md">View All Services</Link>
      </div>
    );
  }

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
          <Link to="/services" className="text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Services page">
            <span className="text-base font-medium">Our Services</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold truncate max-w-[150px] sm:max-w-none">{service.title}</span>
        </div>
      </div>

      {/* Service Detail Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Service Image and Summary */}
          <div className="flex flex-col gap-6 bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
            <img
              src={service.image}
              alt={service.imageAlt}
              className="w-full h-auto object-cover rounded-lg shadow-md"
              onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/600x400/cccccc/333333?text=Service+Image+Error"; }}
            />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-tight">{service.title}</h1>
            <p className="text-gray-600 text-lg leading-relaxed">{service.shortDesc}</p>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-3xl sm:text-4xl font-bold text-green-700">
                {service.price}
              </span>
            </div>

            <button
              onClick={handleBookService}
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Book This Service
            </button>
          </div>

          {/* Service Details (Description, Benefits, Process, FAQs) */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
            {/* Full Description */}
            <div className="mb-8 pb-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                <FiBookOpen className="text-green-600" /> Description
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">{service.fullDescription}</p>
            </div>

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <FiCheckCircle className="text-green-600" /> Benefits
                </h2>
                <ul className="list-none space-y-2 text-gray-700 text-base">
                  {service.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FiCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Process Steps */}
            {service.processSteps && service.processSteps.length > 0 && (
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <FiCalendar className="text-green-600" /> Our Process
                </h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-700 text-base">
                  {service.processSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            )}

            {/* Pricing Details */}
            {service.priceDetails && (
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <FiDollarSign className="text-green-600" /> Pricing
                </h2>
                <p className="text-gray-700 leading-relaxed text-base">{service.priceDetails}</p>
              </div>
            )}

            {/* FAQs */}
            {service.faqs && service.faqs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-3">
                  <FiHelpCircle className="text-green-600" /> FAQs
                </h2>
                <div className="space-y-4">
                  {service.faqs.map((faq, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h3 className="font-semibold text-gray-800 mb-1">{faq.question}</h3>
                      <p className="text-gray-700 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
