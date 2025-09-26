import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiMapPin, FiMail, FiPhone, FiClock, FiSend } from 'react-icons/fi';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { ClickableEmail, ClickablePhone } from '../utils/contactUtils';

const ContactUsPage = () => {
  const { addToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      addToast("Please fill in all required fields.", "error");
      setLoading(false);
      return;
    }

    try {
      // Send the form data to your backend API
      const response = await axios.post('https://sanich-farms-tnac.onrender.com/api/contact', formData);
      
      console.log("Contact form submitted successfully:", response.data);
      addToast("Your message has been sent successfully!", "success");
      
      setFormData({ // Clear form after successful submission
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } catch (error) {
      console.error("Failed to send contact message:", error);
      addToast("Failed to send message. Please try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs - Enhanced Mobile Responsiveness */}
      <div className="w-full py-6 sm:py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-4 h-4 xs:w-5 xs:h-5" />
            <span className="text-sm xs:text-base font-medium hidden xs:inline">Home</span>
          </Link>
          <FiChevronRight className="w-3 h-3 xs:w-4 xs:h-4 text-gray-400" />
          <span className="text-green-400 text-sm xs:text-base font-semibold">Contact Us</span>
        </div>
      </div>

      {/* Main Content - Enhanced Responsive Layout */}
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-8 xs:py-10 sm:py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 xs:gap-8 md:gap-12">
          
          {/* Contact Information - Enhanced Mobile Layout */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-4 xs:p-6 sm:p-8 space-y-4 xs:space-y-6">
              <h2 className="text-xl xs:text-2xl font-bold text-gray-800 mb-4 xs:mb-6 border-b pb-3 xs:pb-4 border-gray-200">
                Contact Info
              </h2>
              
              {/* Enhanced Grid Layout for All Devices */}
              <div className="grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 xs:gap-6">
                {/* Visit Us - Enhanced Mobile */}
                <div className="flex items-start gap-3 xs:gap-4">
                  <FiMapPin size={20} className="text-blue-600 mt-1 flex-shrink-0 xs:w-6 xs:h-6" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base xs:text-lg font-semibold text-gray-800 mb-1">Our Address</h3>
                    <p className="text-gray-600 text-sm xs:text-base leading-relaxed">Ejisu, Okese Avenue Fillet street, Kumasi Ghana</p>
                  </div>
                </div>
                
                {/* Email Us - Enhanced Mobile */}
                <div className="flex items-start gap-3 xs:gap-4">
                  <FiMail size={20} className="text-blue-600 mt-1 flex-shrink-0 xs:w-6 xs:h-6" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base xs:text-lg font-semibold text-gray-800 mb-1">Email Us</h3>
                    <ClickableEmail 
                      email="Sanichfarms@gmail.com" 
                      className="text-green-600 hover:text-green-700 font-medium text-sm xs:text-base break-all" 
                    />
                  </div>
                </div>
                
                {/* Call Us - Enhanced Mobile */}
                <div className="flex items-start gap-3 xs:gap-4">
                  <FiPhone size={20} className="text-blue-600 mt-1 flex-shrink-0 xs:w-6 xs:h-6" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base xs:text-lg font-semibold text-gray-800 mb-1">Call Us</h3>
                    <div className="space-y-1">
                      <ClickablePhone 
                        phone="0243826137" 
                        className="text-green-600 hover:text-green-700 font-medium text-sm xs:text-base block" 
                      />
                      <ClickablePhone 
                        phone="0568160546" 
                        className="text-green-600 hover:text-green-700 font-medium text-sm xs:text-base block" 
                      />
                    </div>
                  </div>
                </div>
                
                {/* Business Hours - Enhanced Mobile */}
                <div className="flex items-start gap-3 xs:gap-4">
                  <FiClock size={20} className="text-blue-600 mt-1 flex-shrink-0 xs:w-6 xs:h-6" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base xs:text-lg font-semibold text-gray-800 mb-1">Business Hours</h3>
                    <p className="text-gray-600 text-sm xs:text-base leading-relaxed whitespace-pre-line">Mon - Sat: 8AM - 6PM{'\n'}Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Enhanced Mobile Responsiveness */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg xs:rounded-xl shadow-md p-4 xs:p-6 sm:p-8">
              <h2 className="text-xl xs:text-2xl font-bold text-gray-800 mb-4 xs:mb-6 border-b pb-3 xs:pb-4 border-gray-200">
                Send us a Message
              </h2>
              <p className="text-gray-600 text-sm xs:text-base mb-4 xs:mb-6 leading-relaxed">
                Fill out the form below and we'll get back to you within 48 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 xs:space-y-6">
                {/* Name and Email Row - Enhanced Mobile */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 xs:gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                </div>

                {/* Subject - Enhanced Mobile */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                {/* Message - Enhanced Mobile */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 xs:mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-3 xs:px-4 py-2 xs:py-3 text-sm xs:text-base border border-gray-300 rounded-md xs:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  ></textarea>
                </div>

                {/* Submit Button - Enhanced Mobile Responsiveness */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 xs:px-8 py-3 xs:py-4 rounded-md xs:rounded-lg font-semibold text-base xs:text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 ${
                      loading 
                        ? 'bg-blue-500 cursor-not-allowed text-white scale-95' 
                        : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white focus:ring-blue-300'
                    }`}
                  >
                    {loading ? (
                      <>
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                        <span className="text-sm xs:text-base">Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <FiSend className="w-4 h-4 xs:w-5 xs:h-5" />
                        <span className="text-sm xs:text-base">Send Message</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Map Section - Enhanced Mobile Responsiveness */}
        <div className="mt-12 xs:mt-16 sm:mt-20">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 xs:p-6 sm:p-8 border-b border-gray-200">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Find Our Location
              </h2>
              <p className="text-gray-600 text-sm xs:text-base">
                Visit us at our farm in Kumasi, Ghana
              </p>
            </div>
            <div className="relative">
              <div className="w-full h-56 xs:h-64 sm:h-80 lg:h-96">
                <iframe
                  title="Sanich Farms Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.606248386629!2d-1.5000000000000002!3d6.440000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd27b8e1f0a0a01%3A0x123456789abcdef0!2sEjisu%2C%20Kumasi%2C%20Ghana!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-300"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
