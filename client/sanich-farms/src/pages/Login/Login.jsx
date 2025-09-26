import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { authAPI } from '../../services/api';
import { ButtonSpinner } from '../../components/UI/LoadingSpinner';
import { logo } from '../../assets';

// This component handles the user login functionality with modern e-commerce design.
const Login = () => {
  // Use state to manage the form data for email and password.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  // State to manage the visibility of the password field.
  const [showPassword, setShowPassword] = useState(false);
  
  // The useNavigate hook allows for programmatic navigation after a successful login.
  const navigate = useNavigate();
  const location = useLocation();
  // The useToast hook provides a consistent way to display success and error messages.
  const { addToast } = useToast();
  // Auth context for managing authentication state
  const { login, isAuthenticated, user } = useAuthContext();

  // Redirect already authenticated users
  useEffect(() => {
    if (isAuthenticated && user) {
      // Check if we're coming from admin logout
      const wasAdminLogout = location.pathname === '/login' && location.state?.fromAdminLogout;
      
      // If coming from admin logout, don't auto-redirect even if user has admin role
      if (wasAdminLogout) {
        return;
      }

      if (user.role === 'admin') {
        navigate('/admin', { replace: true });
      } else {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    }
  }, [isAuthenticated, user, navigate, location.state, location.pathname]);

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

    // Basic form validation
    if (!formData.email || !formData.password) {
      addToast('Please fill in all fields.', 'error');
      setLoading(false);
      return;
    }

    try {
      //  // Temporary admin user for testing (remove in production)
      // if (formData.email === 'admin@sanichfarms.com' && formData.password === 'admin123') {
      //   const tempAdminUser = {
      //     email: 'admin@sanichfarms.com',
      //     name: 'Admin User',
      //     role: 'admin',
      //     id: 'admin-temp-001'
      //   };
        
      //   // Use the login function from auth context
      //   login(tempAdminUser, 'temp-admin-token');
        
      //   // Store admin session for compatibility with admin routes
      //   localStorage.setItem('adminAuth', JSON.stringify({
      //     email: tempAdminUser.email,
      //     role: 'admin',
      //     name: tempAdminUser.name,
      //     timestamp: Date.now()
      //   }));
        
      //   // Display success message
      //   addToast('Login successful! Welcome Admin.', 'success');
        
      //   // Redirect to admin dashboard
      //   navigate('/admin', { replace: true });
      //   return;
      // }

      // Use the API service for all users (no hardcoded admin)
      const data = await authAPI.login(formData);
      
      // Extract user data from the response
      const userData = data.user || {
        email: formData.email,
        // Fallback if user data is not available
      };

      // Use the login function from auth context
      login(userData, data.accessToken);
      
      // Display a success toast
      addToast('Login successful! Welcome back.', 'success');
      
      // Check if user has admin role (from API response)
      if (userData.role === 'admin') {
        // Store admin session for compatibility with admin routes
        localStorage.setItem('adminAuth', JSON.stringify({
          email: userData.email,
          role: 'admin',
          name: userData.name,
          timestamp: Date.now()
        }));
        
        // Redirect to admin dashboard
        navigate('/admin', { replace: true });
      } else {
        // Redirect to the intended page or user dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
      
    } catch (error) {
      // Handle different types of errors
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'An error occurred. Please try again later.';
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

        <div className="w-full max-w-[280px] xs:max-w-sm sm:max-w-md">
          {/* Login Card */}
          <div className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 overflow-hidden">
            {/* Card Header */}
            <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:py-8 bg-gradient-to-r from-green-600 to-blue-600">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center">Welcome Back</h1>
              <p className="text-green-100 text-center mt-1 text-xs sm:text-sm md:text-base">Sign in to your account</p>
            </div>

            {/* Card Body */}
            <div className="px-3 py-4 sm:px-4 sm:py-5 md:px-6 md:py-6 lg:py-8">
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
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
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm"
                      placeholder="Enter your email"
                      required
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <FiLock className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-8 sm:pl-10 pr-9 sm:pr-12 py-2.5 sm:py-3 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-xs sm:text-sm"
                      placeholder="Enter your password"
                      required
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-2.5 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={loading}
                    >
                      {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-1.5 sm:ml-2 block text-gray-700">
                      Remember me
                    </label>
                  </div>

                  <div>
                    <Link
                      to="/forgot-password"
                      className="font-medium text-blue-600 hover:text-green-600 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Sign In Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white py-2.5 sm:py-3 px-4 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  {loading && <ButtonSpinner />}
                  {loading ? 'Signing in...' : 'Sign in'}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-4 sm:my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-xs sm:text-sm">
                  <span className="px-3 sm:px-4 bg-white text-gray-500">New to Sanich Farms?</span>
                </div>
              </div>

              {/* Create Account Button */}
              <Link
                to="/signup"
                className="w-full bg-white border-2 border-gray-300 hover:border-blue-500 hover:bg-gray-50 text-gray-700 py-2.5 sm:py-3 px-4 rounded-md sm:rounded-lg text-xs sm:text-sm font-semibold text-center transition-all duration-200 block"
              >
                Create your account
              </Link>

              {/* Terms */}
              <div className="mt-4 sm:mt-6 text-xs text-gray-600 text-center leading-relaxed">
                By signing in, you agree to our{' '}
                <Link to="/terms" className="text-blue-600 hover:text-green-600 font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:text-green-600 font-medium">
                  Privacy Policy
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

export default Login;

