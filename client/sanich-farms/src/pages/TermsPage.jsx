import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiFileText, FiCheck, FiPhone, FiMail, FiMapPin, FiShield } from 'react-icons/fi';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Modern Breadcrumbs - Clean & Responsive */}
      <div className="w-full breadcrumb-modern">
        <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 xs:gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link flex items-center gap-1 text-slate-600 hover:text-green-600" aria-label="Go to Home page">
              <FiHome className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              <span className="font-medium hidden xs:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3 h-3 xs:w-3.5 xs:h-3.5 breadcrumb-separator" />
            <span className="breadcrumb-current text-sm xs:text-base font-semibold">Terms & Conditions</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-6 xs:mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 xs:gap-3 mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center shadow-md">
              <FiFileText className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-green-600" />
            </div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Terms & Conditions
            </h1>
          </div>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg leading-relaxed max-w-3xl mx-auto px-2">
            Please read these terms and conditions carefully before using our services
          </p>
          <div className="mt-3 xs:mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-100 text-blue-700 rounded-full text-xs xs:text-sm font-medium">
              <FiShield className="w-3 h-3 xs:w-4 xs:h-4" />
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Terms Content */}
        <div className="grid gap-4 xs:gap-5 sm:gap-6">
          {/* Agreement to Terms */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-green-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-green-700 font-bold text-sm xs:text-base">1</span>
                </div>
                Agreement to Terms
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed">
                By accessing and using Sanich Farms website and services, you accept and agree to be bound by the terms 
                and provisions of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </div>
          </div>

          {/* Products and Services */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-blue-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm xs:text-base">2</span>
                </div>
                Products and Services
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed mb-4">
                Sanich Farms provides high-quality poultry products, farming supplies, and agricultural services including:
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3">
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Poultry chicks and laying birds</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Premium feeds and supplements</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Farm consultation services</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Equipment installation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Orders and Payment */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-yellow-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-yellow-200 rounded-lg flex items-center justify-center">
                  <span className="text-yellow-700 font-bold text-sm xs:text-base">3</span>
                </div>
                Orders and Payment
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed">
                All orders are subject to availability and confirmation. Payment must be completed before order processing. 
                We accept mobile money, bank transfers, and cash on delivery for eligible locations.
              </p>
            </div>
          </div>

          {/* Delivery and Returns */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-green-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-green-700 font-bold text-sm xs:text-base">4</span>
                </div>
                Delivery and Returns
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed">
                Delivery times vary by location and product type. Live animals require special handling and have specific 
                return policies. Please contact us immediately if you have concerns about your order.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-blue-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-blue-200 rounded-lg flex items-center justify-center">
                  <span className="text-blue-700 font-bold text-sm xs:text-base">5</span>
                </div>
                Contact Information
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed mb-4">
                For questions about these Terms & Conditions, please contact us at:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xs:gap-4">
                <a 
                  href="mailto:Sanichfarms@gmail.com"
                  className="flex items-center gap-2 xs:gap-3 p-3 xs:p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all duration-200 border border-green-200"
                >
                  <div className="w-8 h-8 xs:w-9 xs:h-9 bg-green-200 rounded-full flex items-center justify-center">
                    <FiMail className="w-4 h-4 xs:w-5 xs:h-5 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs xs:text-sm font-medium text-green-800 mb-1">Email</p>
                    <p className="text-xs xs:text-sm text-green-700 truncate">Sanichfarms@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="tel:0243826137"
                  className="flex items-center gap-2 xs:gap-3 p-3 xs:p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all duration-200 border border-blue-200"
                >
                  <div className="w-8 h-8 xs:w-9 xs:h-9 bg-blue-200 rounded-full flex items-center justify-center">
                    <FiPhone className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs xs:text-sm font-medium text-blue-800 mb-1">Phone</p>
                    <p className="text-xs xs:text-sm text-blue-700">0243826137</p>
                  </div>
                </a>
                
                <div className="flex items-center gap-2 xs:gap-3 p-3 xs:p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg border border-yellow-200 sm:col-span-3 lg:col-span-1">
                  <div className="w-8 h-8 xs:w-9 xs:h-9 bg-yellow-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <FiMapPin className="w-4 h-4 xs:w-5 xs:h-5 text-yellow-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs xs:text-sm font-medium text-yellow-800 mb-1">Address</p>
                    <p className="text-xs xs:text-sm text-yellow-700 leading-relaxed">
                      Ejisu, Okese Avenue, Fillet Street, Kumasi, Ghana
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
