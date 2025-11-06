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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[320px] xs:max-w-sm sm:max-w-md">
        {/* Reset Password Card */}
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
                <h1 className="text-base sm:text-lg font-bold text-white">Reset Password</h1>
                <p className="text-green-100 text-xs">Create a new password</p>
              </div>
            </div>
          </div>

          {/* Card Body - More Compact */}
          <div className="px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-gray-600 text-center mb-3 text-xs leading-relaxed">
              Enter your email, verification code, and new password below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Email and Code in Grid for larger screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Your email"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Verification Code Field */}
                <div>
                  <label htmlFor="code" className="block text-xs font-medium text-gray-700 mb-1">
                    Code
                  </label>
                  <div className="relative">
                    <FiKey className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="text"
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="6-digit code"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Password Fields in a Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* New Password Field */}
                <div>
                  <label htmlFor="new_password" className="block text-xs font-medium text-gray-700 mb-1">
                    New Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="password"
                      id="new_password"
                      name="new_password"
                      value={formData.new_password}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="New password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirm_password" className="block text-xs font-medium text-gray-700 mb-1">
                    Confirm
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      value={formData.confirm_password}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Confirm password"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

                {/* Reset Password Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm min-h-[40px] sm:min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <ButtonSpinner className="w-4 h-4" /> : 'Reset Password & Sign In'}
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

export default ResetPassword;
