import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiArrowLeft } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { authAPI } from '../../services/api';
import { ButtonSpinner } from '../../components/UI/LoadingSpinner';
import { logo } from '../../assets';

// This component handles the "Forgot Password" functionality with modern e-commerce design.
const ForgotPassword = () => {
  // State to hold the email address the user enters.
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();
  const navigate = useNavigate();

  // This handler updates the state as the user types in the email input.
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // This asynchronous function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;

    // Frontend validation to ensure an email is provided.
    if (!email) {
      addToast('Please enter your email address.', 'error');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setLoading(true);

    try {
      // Use the new API service
      const data = await authAPI.forgotPassword(email);
      addToast(data.message || 'Password reset code sent to your email.', 'success');
      navigate('/reset-password');
    } catch (error) {
      // Handle different types of errors
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Failed to send reset code. Please try again.';
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Header with Logo */}
      <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6 z-10">
        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3">
          <img 
            src={logo} 
            alt="Sanich Farms Logo" 
            className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 lg:h-10 lg:w-10 object-contain"
          />
          <Link 
            to="/" 
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-800 hover:text-green-600 transition-colors"
          >
            Sanich Farms
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        <div className="w-full max-w-[280px] xs:max-w-sm sm:max-w-md">
          {/* Forgot Password Card */}
          <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:py-8 bg-gradient-to-r from-green-600 to-blue-600">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">Forgot Password?</h1>
              <p className="text-green-100 text-center mt-1 text-xs sm:text-sm md:text-base">We'll help you reset it</p>
            </div>

            {/* Card Body */}
            <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:py-8">
              <p className="text-gray-600 text-center mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                Enter your email address and we'll send you a verification code to reset your password.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Email address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm"
                      placeholder="Enter your email address"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Send Reset Code Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 sm:py-3 px-4 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {loading && <ButtonSpinner />}
                  {loading ? 'Sending code...' : 'Send reset code'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-4 sm:my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-white text-gray-500">Remember your password?</span>
                </div>
              </div>

              {/* Back to Sign In Button */}
              <Link
                to="/login"
                className="w-full bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-gray-50 text-gray-700 py-2.5 sm:py-3 px-4 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold text-center transition-all duration-200 flex items-center justify-center gap-2"
              >
                <FiArrowLeft size={14} />
                Back to sign in
              </Link>

              {/* Help */}
              <div className="mt-4 sm:mt-6 text-xs text-gray-600 text-center leading-relaxed">
                Need more help?{' '}
                <Link to="/contact" className="text-blue-600 hover:text-green-600 font-medium">
                  Contact our support team
                </Link>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4 sm:mt-6">
            <Link 
              to="/" 
              className="text-xs sm:text-sm text-gray-600 hover:text-green-600 font-medium transition-colors"
            >
              ← Back to Sanich Farms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
