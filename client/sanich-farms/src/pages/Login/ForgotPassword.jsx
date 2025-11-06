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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[320px] xs:max-w-sm sm:max-w-md">
        {/* Forgot Password Card */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
          {/* Card Header with Logo */}
          <div className="px-4 py-4 sm:px-6 sm:py-5 bg-gradient-to-r from-green-600 to-blue-600">
            <div className="flex flex-col items-center space-y-1 sm:space-y-2">
              <Link to="/" className="hover:opacity-80 transition-opacity">
                <img 
                  src={logo} 
                  alt="Sanich Farms Logo" 
                  className="h-8 w-8 sm:h-10 sm:w-10 object-contain"
                />
              </Link>
              <div className="text-center">
                <h1 className="text-base sm:text-lg font-bold text-white">Forgot Password?</h1>
                <p className="text-green-100 text-xs">We'll help you reset it</p>
              </div>
            </div>
          </div>

          {/* Card Body - More Compact */}
          <div className="px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-gray-600 text-center mb-3 text-xs leading-relaxed">
              Enter your email address and we'll send you a verification code to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
                {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                  Email address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
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
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm min-h-[40px] sm:min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <ButtonSpinner className="w-4 h-4" /> : 'Send Reset Code'}
              </button>

              {/* Back to Sign In Link */}
              <div className="text-center text-xs text-gray-600">
                Remember your password?{' '}
                <Link 
                  to="/login" 
                  className="text-green-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </div>

              {/* Terms and Privacy - More Compact */}
              <div className="mt-3 text-xs text-gray-600 text-center leading-relaxed">
                By using this service, you agree to our{' '}
                <Link to="/terms" className="text-blue-600 hover:text-green-600 font-medium">
                  Terms
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-green-600 font-medium">
                  Privacy Policy
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Back to Home - More Compact */}
        <div className="text-center mt-3">
          <Link 
            to="/" 
            className="text-xs text-gray-600 hover:text-green-600 font-medium transition-colors"
          >
            ← Back to Sanich Farms
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
