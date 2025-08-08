import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

// This component handles the "Forgot Password" functionality,
// allowing a user to request a password reset code via email.
const ForgotPassword = () => {
  // State to hold the email address the user enters.
  const [email, setEmail] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  // This handler updates the state as the user types in the email input.
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // This asynchronous function handles the form submission.
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Forgot password request for:', email);

    // Frontend validation to ensure an email is provided.
    if (!email) {
      addToast('Please enter your email address.', 'error');
      return;
    }

    try {
      // API call to the backend's forgot password endpoint.
      // The URL is consistent with the other authentication endpoints.
      const backendUrl = 'https://sanich-farms-tnac.onrender.com/api/auth/forgot-password';
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      // Handle the server's response.
      if (response.ok) {
        // If the request was successful, display a success message and
        // navigate the user to the reset password page.
        const data = await response.json();
        addToast(data.message || 'Password reset code sent to your email.', 'success');
        navigate('/reset-password');
      } else {
        // If there was a server-side error, display the error message.
        const errorData = await response.json();
        addToast(errorData.error || 'Failed to send reset code. Please try again.', 'error');
      }
    } catch (error) {
      // Catch network-related errors.
      console.error('Forgot password failed:', error);
      addToast('An error occurred. Please try again later.', 'error');
    }
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Forgot Password</h2>
        <p className="text-center text-gray-600 mb-6">
          Enter your email address to receive a password reset code.
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Send Reset Code
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          <Link to="/login" className="font-medium text-green-600 hover:text-green-800 transition duration-200">
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
