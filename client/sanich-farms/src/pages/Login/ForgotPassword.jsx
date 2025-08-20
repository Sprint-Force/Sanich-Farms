import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../../services/api';
import AuthFooter from '../../components/Layout/AuthFooter';

// This component handles the "Forgot Password" functionality,
// allowing a user to request a password reset code via email.
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
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Main Content */}
      <main className="max-w-sm md:max-w-md lg:max-w-lg mx-auto px-4 py-6">
        <div className="bg-white rounded border border-gray-300 p-6 md:p-8 lg:p-10">
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-medium text-gray-900 mb-4 md:mb-6">Password assistance</h1>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            Enter the email address associated with your Sanich Farms account.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 lg:space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm md:text-base font-medium text-gray-700 mb-1 md:mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full px-3 md:px-4 py-2 md:py-3 border border-gray-300 rounded text-sm md:text-base focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 md:py-3 px-4 md:px-6 rounded text-sm md:text-base font-medium focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Sending...' : 'Continue'}
            </button>
          </form>

          <div className="text-xs md:text-sm text-gray-600 mt-4 md:mt-6">
            Has your email address changed?{' '}
            <Link to="/contact" className="text-blue-600 hover:text-green-600 hover:underline">
              Contact us
            </Link>
          </div>
        </div>

        {/* Back to Sign In */}
        <div className="mt-4 md:mt-6 text-center">
          <Link 
            to="/login" 
            className="text-sm md:text-base text-blue-600 hover:text-green-600 hover:underline"
          >
            ← Back to sign in
          </Link>
        </div>

        {/* Auth Footer */}
        <AuthFooter />
      </main>
    </div>
  );
};

export default ForgotPassword;
