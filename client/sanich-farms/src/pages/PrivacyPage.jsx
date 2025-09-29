import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiShield, FiCheck, FiPhone, FiMail, FiMapPin, FiUser, FiLock, FiEye, FiUserCheck, FiSettings } from 'react-icons/fi';

const PrivacyPage = () => {
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
            <span className="breadcrumb-current text-sm xs:text-base font-semibold">Privacy Policy</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 py-6 xs:py-8 sm:py-10 lg:py-12">
        {/* Header Section */}
        <div className="text-center mb-6 xs:mb-8 sm:mb-10">
          <div className="flex items-center justify-center gap-2 xs:gap-3 mb-3 xs:mb-4">
            <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-green-100 rounded-full flex items-center justify-center shadow-md">
              <FiShield className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-green-600" />
            </div>
            <h1 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Privacy Policy
            </h1>
          </div>
          <p className="text-gray-600 text-sm xs:text-base sm:text-lg leading-relaxed max-w-3xl mx-auto px-2">
            Your privacy is important to us. Learn how we collect, use, and protect your information.
          </p>
          <div className="mt-3 xs:mt-4">
            <span className="inline-flex items-center gap-1.5 px-3 xs:px-4 py-1.5 xs:py-2 bg-blue-100 text-blue-700 rounded-full text-xs xs:text-sm font-medium">
              <FiLock className="w-3 h-3 xs:w-4 xs:h-4" />
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Privacy Content */}
        <div className="grid gap-4 xs:gap-5 sm:gap-6">
          {/* Information We Collect */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-blue-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-blue-200 rounded-lg flex items-center justify-center">
                  <FiUser className="w-3 h-3 xs:w-4 xs:h-4 text-blue-700" />
                </div>
                Information We Collect
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed mb-4">
                We collect information you provide directly to us, such as when you:
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3">
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Create an account or make a purchase</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Subscribe to our newsletter</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Contact us for support or services</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Book consultation or training services</span>
                </div>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-green-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-green-200 rounded-lg flex items-center justify-center">
                  <FiSettings className="w-3 h-3 xs:w-4 xs:h-4 text-green-700" />
                </div>
                How We Use Your Information
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed mb-4">
                We use the information we collect to:
              </p>
              <div className="grid grid-cols-1 gap-2 xs:gap-3">
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Process and fulfill your orders</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Provide customer support and respond to inquiries</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Send you promotional materials and newsletters (with your consent)</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Improve our products and services</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-green-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Comply with legal obligations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Information Sharing */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-yellow-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-yellow-200 rounded-lg flex items-center justify-center">
                  <FiEye className="w-3 h-3 xs:w-4 xs:h-4 text-yellow-700" />
                </div>
                Information Sharing
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to outside parties except as 
                described in this policy. We may share your information with trusted partners who assist us in 
                operating our website and conducting our business, as long as they agree to keep this information confidential.
              </p>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-green-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-green-200 rounded-lg flex items-center justify-center">
                  <FiLock className="w-3 h-3 xs:w-4 xs:h-4 text-green-700" />
                </div>
                Data Security
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed">
                We implement appropriate security measures to protect your personal information against unauthorized 
                access, alteration, disclosure, or destruction. However, no method of transmission over the internet 
                is 100% secure.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-blue-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-blue-200 rounded-lg flex items-center justify-center">
                  <FiUserCheck className="w-3 h-3 xs:w-4 xs:h-4 text-blue-700" />
                </div>
                Your Rights
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed mb-4">
                You have the right to:
              </p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-2 xs:gap-3">
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Access and update your personal information</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Request deletion of your personal data</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Opt-out of marketing communications</span>
                </div>
                <div className="flex items-center gap-2 xs:gap-3 p-2 xs:p-3 bg-blue-50 rounded-lg">
                  <FiCheck className="w-4 h-4 xs:w-5 xs:h-5 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700 text-sm xs:text-base">Request a copy of your data</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
            <div className="bg-gradient-to-r from-green-50 to-green-100 px-4 xs:px-5 sm:px-6 py-3 xs:py-4 border-b border-green-200">
              <h2 className="text-base xs:text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 xs:gap-3">
                <div className="w-6 h-6 xs:w-7 xs:h-7 bg-green-200 rounded-lg flex items-center justify-center">
                  <span className="text-green-700 font-bold text-sm xs:text-base">6</span>
                </div>
                Contact Us
              </h2>
            </div>
            <div className="p-4 xs:p-5 sm:p-6">
              <p className="text-gray-700 text-sm xs:text-base leading-relaxed mb-4">
                If you have any questions about this Privacy Policy, please contact us:
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

export default PrivacyPage;
