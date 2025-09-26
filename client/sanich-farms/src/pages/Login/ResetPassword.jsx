import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiKey, FiArrowLeft } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { authAPI } from '../../services/api';
import { ButtonSpinner } from '../../components/UI/LoadingSpinner';
import { logo } from '../../assets';

// This component handles the "Reset Password" functionality with modern e-commerce design.
const ResetPassword = () => {
  // State to manage all the form data for password reset.
  const [formData, setFormData] = useState({
    email: '',
    code: '',
    new_password: '',
    confirm_password: '',
  });
  const [loading, setLoading] = useState(false);

  const { addToast } = useToast();
  const navigate = useNavigate();

  // This handler updates the state as the user types in the input fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // This asynchronous function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;

    // Basic client-side validation
    if (!formData.email || !formData.code || !formData.new_password || !formData.confirm_password) {
      addToast('Please fill in all fields.', 'error');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!passwordRegex.test(formData.new_password)) {
      addToast(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.',
        'error'
      );
      return;
    }

    // Basic client-side validation to ensure passwords match.
    if (formData.new_password !== formData.confirm_password) {
      addToast('Passwords do not match.', 'error');
      return;
    }

    setLoading(true);

    try {
      // Use the new API service
      const data = await authAPI.resetPassword(formData);
      addToast(data.message || 'Password has been reset successfully.', 'success');
      // On success, navigate the user back to the login page.
      navigate('/login');
    } catch (error) {
      // Handle different types of errors
      const errorMessage = error.response?.data?.error || 
                          error.response?.data?.message || 
                          'Failed to reset password. Please check your email and code.';
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen py-4 sm:py-6 md:py-8 px-3 sm:px-4">
        {/* Logo and Brand - Centered above card */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-3 mb-4 sm:mb-6 md:mb-8">
          <img 
            src={logo} 
            alt="Sanich Farms Logo" 
            className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 object-contain"
          />
          <Link 
            to="/" 
            className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 hover:text-green-600 transition-colors"
          >
            Sanich Farms
          </Link>
        </div>

        <div className="w-full max-w-[300px] xs:max-w-sm sm:max-w-md">
          {/* Reset Password Card */}
          <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 bg-gradient-to-r from-green-600 to-blue-600">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">Reset Password</h1>
              <p className="text-green-100 text-center mt-1 text-xs sm:text-sm md:text-base">Create a new password</p>
            </div>

            {/* Card Body */}
            <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6">
              <p className="text-gray-600 text-center mb-4 sm:mb-6 text-xs sm:text-sm leading-relaxed">
                Enter your email, verification code, and new password below.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Email and Code in Grid for larger screens */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      Email
                    </label>
                    <div className="relative">
                      <FiMail className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-7 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm"
                        placeholder="Your email"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Verification Code Field */}
                  <div>
                    <label htmlFor="code" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      Code
                    </label>
                    <div className="relative">
                      <FiKey className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="text"
                        id="code"
                        name="code"
                        value={formData.code}
                        onChange={handleChange}
                        className="w-full pl-7 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm"
                        placeholder="6-digit code"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Password Fields in a Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {/* New Password Field */}
                  <div>
                    <label htmlFor="new_password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      New Password
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="password"
                        id="new_password"
                        name="new_password"
                        value={formData.new_password}
                        onChange={handleChange}
                        className="w-full pl-7 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm"
                        placeholder="New password"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div>
                    <label htmlFor="confirm_password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-1.5">
                      Confirm
                    </label>
                    <div className="relative">
                      <FiLock className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                      <input
                        type="password"
                        id="confirm_password"
                        name="confirm_password"
                        value={formData.confirm_password}
                        onChange={handleChange}
                        className="w-full pl-7 sm:pl-10 pr-3 py-2 sm:py-2.5 md:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm"
                        placeholder="Confirm password"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>
                </div>

                {/* Reset Password Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 sm:py-3 px-4 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    {loading && <ButtonSpinner />}
                    {loading ? 'Resetting password...' : 'Reset password & sign in'}
                  </button>
                </div>
              </form>

              {/* Divider */}
              <div className="relative my-3 sm:my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 bg-white text-gray-500">Remember your password?</span>
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

              {/* Password Requirements - Compact */}
              <div className="mt-3 sm:mt-4 text-xs text-gray-600">
                <p className="font-medium mb-1">Password must have:</p>
                <div className="grid grid-cols-2 gap-1 text-gray-500">
                  <span>• 8+ characters</span>
                  <span>• Upper & lowercase</span>
                  <span>• One number</span>
                  <span>• One symbol</span>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-3 sm:mt-4">
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

export default ResetPassword;
