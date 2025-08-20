import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiFileText } from 'react-icons/fi';

const TermsPage = () => {
  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Terms & Conditions</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center gap-3 mb-8">
            <FiFileText className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-800">Terms & Conditions</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 text-lg mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing and using Sanich Farms website and services, you accept and agree to be bound by the terms 
                and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Products and Services</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Sanich Farms provides high-quality poultry products, farming supplies, and agricultural services including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Poultry chicks and laying birds</li>
                <li>Premium chicken feeds and supplements</li>
                <li>Farm consultation and training services</li>
                <li>Equipment installation and maintenance</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Orders and Payment</h2>
              <p className="text-gray-600 leading-relaxed">
                All orders are subject to availability and confirmation. Payment must be completed before order processing. 
                We accept mobile money, bank transfers, and cash on delivery for eligible locations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Delivery and Returns</h2>
              <p className="text-gray-600 leading-relaxed">
                Delivery times vary by location and product type. Live animals require special handling and have specific 
                return policies. Please contact us immediately if you have concerns about your order.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Contact Information</h2>
              <p className="text-gray-600 leading-relaxed">
                For questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">Email: Sanichfarms@gmail.com</p>
                <p className="text-gray-700">Phone: 0243826137</p>
                <p className="text-gray-700">Address: Ejisu, Okese Avenue, Fillet Street, Kumasi, Ghana</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
