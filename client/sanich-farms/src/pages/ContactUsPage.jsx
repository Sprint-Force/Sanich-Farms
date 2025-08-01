import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const ContactUsPage = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Contact form submitted:", formData);
    // In a real application, you would send this data to a backend API
    // e.g., fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) })
    // Then handle success/error and show a user message.

    alert("Your message has been sent successfully!"); // Using alert for simplicity
    setFormData({ // Clear form after submission
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

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
          <span className="text-green-400 text-base font-semibold">Contact Us</span>
        </div>
      </div>

      {/* Main Contact Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Contact Info
            </h2>
            <div className="flex items-start gap-4">
              <FiMapPin size={24} className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Our Address</h3>
                <p className="text-gray-600 text-base">Ejisu, Okese Avenue Fillet street, Kumasi Ghana</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiMail size={24} className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Email Us</h3>
                <p className="text-gray-600 text-base">Sanichfarms@gmail.com</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <FiPhone size={24} className="text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Call Us</h3>
                <p className="text-gray-600 text-base">0243826137</p>
                <p className="text-gray-600 text-base">0568160546</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
              Just Say Hello!
            </h2>
            <p className="text-gray-600 text-base mb-6">
              Do you fancy saying hi to me or you want to get started with your project and you need my help? Feel free to contact me.
            </p>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="subject" className="sr-only">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-green-600 text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="mt-12 md:mt-16 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 p-6 sm:p-8 border-b border-gray-200">
            Find Us on the Map
          </h2>
          <div className="w-full h-80 sm:h-96">
            <iframe
              title="Google Map of Sanich Farms Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.606248386629!2d-1.5000000000000002!3d6.440000000000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd27b8e1f0a0a01%3A0x123456789abcdef0!2sEjisu%2C%20Kumasi%2C%20Ghana!5e0!3m2!1sen!2sus!4v1678901234567!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
