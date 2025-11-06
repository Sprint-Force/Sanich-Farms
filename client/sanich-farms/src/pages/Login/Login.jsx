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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-2 sm:p-4">
      <div className="w-full max-w-[320px] xs:max-w-sm sm:max-w-md">
        {/* Login Card */}
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
                <h1 className="text-base sm:text-lg font-bold text-white">Welcome Back</h1>
                <p className="text-green-100 text-xs">Sign in to your account</p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="px-4 py-3 sm:px-5 sm:py-4">
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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter your email"
                    required
                    disabled={loading}
                  />
                </div>
              </div>

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
                    className="w-full pl-8 pr-9 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm"
                    placeholder="Enter your password"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-3 w-3 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-1.5 block text-gray-700">
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
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-2.5 px-4 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 font-medium text-sm min-h-[40px] sm:min-h-[44px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? <ButtonSpinner className="w-4 h-4" /> : 'Sign In'}
              </button>
            </form>

            {/* Signup Link */}
            <div className="text-center text-xs text-gray-600">
              New to Sanich Farms?{' '}
              <Link 
                to="/signup" 
                className="text-green-600 hover:text-blue-600 font-medium transition-colors"
              >
                Create account here
              </Link>
            </div>

            {/* Terms and Privacy - More Compact */}
            <div className="mt-3 text-xs text-gray-600 text-center leading-relaxed">
              By signing in, you agree to our{' '}
              <Link to="/terms" className="text-blue-600 hover:text-green-600 font-medium">
                Terms
              </Link>{' '}
              and{' '}
              <Link to="/privacy" className="text-blue-600 hover:text-green-600 font-medium">
                Privacy Policy
              </Link>
            </div>
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

export default Login;

