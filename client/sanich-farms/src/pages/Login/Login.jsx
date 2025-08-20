import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { authAPI } from '../../services/api';
import { ButtonSpinner } from '../../components/UI/LoadingSpinner';
import AuthFooter from '../../components/Layout/AuthFooter';

// This component handles the user login functionality.
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
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Main Content */}
      <main className="max-w-sm mx-auto px-4 py-6">
        <div className="bg-white rounded border border-gray-300 p-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Login</h1>
          
          <form onSubmit={handleSubmit} className="space-y-3">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && <ButtonSpinner />}
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>

          <div className="text-xs text-gray-600 mt-4">
            By continuing, you agree to Sanich Farms{' '}
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

        {/* Forgot Password */}
        <div className="mt-4 text-center">
          <Link 
            to="/forgot-password" 
            className="text-sm text-blue-600 hover:text-green-600 hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        {/* Divider */}
        <div className="mt-6 mb-4 text-center text-xs text-gray-500">
          <span className="bg-gray-50 px-2">New to Sanich Farms?</span>
          <hr className="border-gray-300 -mt-2" />
        </div>

        {/* Create Account Button */}
        <Link
          to="/signup"
          className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-4 rounded text-sm font-medium text-center border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Create Account
        </Link>

        {/* Auth Footer */}
        <AuthFooter />
      </main>
    </div>
  );
};

export default Login;

