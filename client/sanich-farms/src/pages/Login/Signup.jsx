import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff, FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { authAPI } from '../../services/api';
import { ButtonSpinner } from '../../components/UI/LoadingSpinner';
import { logo } from '../../assets';

// User registration functionality with modern e-commerce design.
const Signup = () => {
  // Use state to manage all the form data for a new user.
  // The state properties now match the backend's expected field names.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
    confirm_password: '',
  });

  // State to manage the visibility of the password fields.
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // The useNavigate hook allows for programmatic navigation after a successful signup.
  const navigate = useNavigate();
  // Display success and error messages.
  const { addToast } = useToast();

  // This handler updates the state as the user types in the input fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // This function toggles the password visibility state.
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // This asynchronous function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return;
    
    setLoading(true);

    // --- Enhanced client-side validations ---

    // Validate email format with a regular expression.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      addToast('Please enter a valid email address.', 'error');
      setLoading(false);
      return;
    }

    // Validate phone number format to contain only digits and have a minimum length of 9.
    const phoneRegex = /^\d{9,}$/;
    // First, clean the input to remove any non-digit characters
    const cleanedPhoneNumber = formData.phone_number.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedPhoneNumber)) {
      addToast('Please enter a valid phone number with at least 9 digits.', 'error');
      setLoading(false);
      return;
    }
    
    // Validate password strength. Now requires at least 8 characters,
    // including an uppercase letter, a lowercase letter, a number, and a symbol.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      addToast(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one symbol.',
        'error'
      );
      setLoading(false);
      return;
    }

    // Basic client-side validation to ensure passwords match.
    // Check against the new state property name 'confirm_password'.
    if (formData.password !== formData.confirm_password) {
      addToast('Passwords do not match. Please try again.', 'error');
      setLoading(false);
      return;
    }

    try {
      // Use the new API service
      await authAPI.register(formData);
      
      // Display a success toast and redirect the user to the login page.
      addToast('Account created successfully! Please log in.', 'success');
      navigate('/login');
      
    } catch (error) {
      // Handle different types of errors
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Signup failed. Please try again.';
      addToast(errorMessage, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[320px] xs:max-w-sm sm:max-w-md">
        {/* Signup Card */}
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
                <h1 className="text-base sm:text-lg font-bold text-white">Join Sanich Farms</h1>
                <p className="text-green-100 text-xs">Create your account</p>
              </div>
            </div>
          </div>

          {/* Card Body - More Compact */}
          <div className="px-4 py-3 sm:px-5 sm:py-4">
            <form onSubmit={handleSubmit} className="space-y-3">
              {/* Full Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter your full name"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Email and Phone in Grid for larger screens */}
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
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Phone Number Field */}
                <div>
                  <label htmlFor="phone_number" className="block text-xs font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type="tel"
                      id="phone_number"
                      name="phone_number"
                      value={formData.phone_number}
                      onChange={handleChange}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Phone number"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>
              </div>

              {/* Password Fields in a Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-xs font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-8 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                      placeholder="Create password"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={loading}
                    >
                      {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                    </button>
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
                      type={showPassword ? 'text' : 'password'}
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

              {/* Compact Sign Up Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm min-h-[40px] sm:min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <ButtonSpinner className="w-4 h-4" /> : 'Create Account'}
              </button>

              {/* Login Link */}
              <div className="text-center text-xs text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-green-600 hover:text-blue-600 font-medium transition-colors"
                >
                  Sign in here
                </Link>
              </div>

              {/* Terms and Privacy - More Compact */}
              <div className="mt-3 text-xs text-gray-600 text-center leading-relaxed">
                By creating an account, you agree to our{' '}
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

export default Signup;
