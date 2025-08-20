import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { authAPI } from '../../services/api';
import AuthFooter from '../../components/Layout/AuthFooter';

// This component handles the "Reset Password" functionality,
// allowing a user to set a new password using a reset code.
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
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Main Content */}
      <main className="max-w-sm mx-auto px-4 py-6">
        <div className="bg-white rounded border border-gray-300 p-6">
          <h1 className="text-2xl font-medium text-gray-900 mb-4">Create new password</h1>
          <p className="text-sm text-gray-600 mb-4">
            We'll ask for this password whenever you login.
          </p>
          
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
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Verification code
              </label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                placeholder="Enter 6-digit code"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="new_password" className="block text-sm font-medium text-gray-700 mb-1">
                New password
              </label>
              <input
                type="password"
                id="new_password"
                name="new_password"
                value={formData.new_password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                placeholder="At least 6 characters"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
                Re-enter password
              </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400"
                placeholder="Re-enter password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm font-medium focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save changes and sign in'}
            </button>
          </form>
        </div>

        {/* Back to Sign In */}
        <div className="mt-4 text-center">
          <Link 
            to="/login" 
            className="text-sm text-blue-600 hover:text-green-600 hover:underline"
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

export default ResetPassword;
