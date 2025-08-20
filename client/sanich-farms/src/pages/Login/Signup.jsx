import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { authAPI } from '../../services/api';
import { ButtonSpinner } from '../../components/UI/LoadingSpinner';
import AuthFooter from '../../components/Layout/AuthFooter';

// User registration functionality.
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
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Main Content */}
      <main className="max-w-sm mx-auto px-4 py-6">
        <div className="bg-white rounded border border-gray-300 p-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Create Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                placeholder="John Doe"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                placeholder="e.g., 055 123 4567"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  placeholder="********"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  disabled={loading}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirm_password"
                  name="confirm_password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                  placeholder="********"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  disabled={loading}
                >
                  {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <ButtonSpinner />}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="text-xs text-gray-600 mt-4">
            By creating an account, you agree to Sanich Farms{' '}
            <Link to="/terms" className="text-blue-600 hover:text-green-600 hover:underline">
              Terms & Conditions
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:text-green-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </div>

        {/* Divider */}
        <div className="mt-6 mb-4 text-center text-xs text-gray-500">
          <span className="bg-gray-50 px-2">Already have an account?</span>
          <hr className="border-gray-300 -mt-2" />
        </div>

        {/* Sign In Button */}
        <Link
          to="/login"
          className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded text-sm font-medium text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Login
        </Link>

        {/* Auth Footer */}
        <AuthFooter />
      </main>
    </div>
  );
};

export default Signup;
