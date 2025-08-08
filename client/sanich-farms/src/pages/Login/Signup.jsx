import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiPhone, FiEye, FiEyeOff } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';

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
    console.log('Signup attempt:', formData);

    // --- Enhanced client-side validations ---

    // Validate email format with a regular expression.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    // Validate phone number format to contain only digits and have a minimum length of 9.
    const phoneRegex = /^\d{9,}$/;
    // First, clean the input to remove any non-digit characters
    const cleanedPhoneNumber = formData.phone_number.replace(/\D/g, '');
    if (!phoneRegex.test(cleanedPhoneNumber)) {
      addToast('Please enter a valid phone number with at least 9 digits.', 'error');
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
      return;
    }

    // Basic client-side validation to ensure passwords match.
    // Check against the new state property name 'confirm_password'.
    if (formData.password !== formData.confirm_password) {
      addToast('Passwords do not match. Please try again.', 'error');
      return;
    }

    // --- INTEGRATION POINT: Call to your Render backend API ---
    try {
      // 1. Define the full URL of your Render backend's signup endpoint.
      const backendUrl = 'https://sanich-farms-tnac.onrender.com/api/auth/register';

      // 2. Make an API call using the browser's built-in fetch API.
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The formData object is sent as a JSON string. The keys now match the backend.
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone_number: formData.phone_number,
          password: formData.password,
          confirm_password: formData.confirm_password,
        }),
      });

      // 3. Check if the response from the server was successful.
      if (response.ok) {
        // Parse the JSON response from the server.
        const data = await response.json();
        console.log('Signup successful:', data);

        // Display a success toast and redirect the user to the login page.
        addToast('Account created successfully! Please log in.', 'success');
        navigate('/login');
      } else {
        // If the response was not successful, handle the error.
        const errorData = await response.json();
        addToast(errorData.message || 'Signup failed. Please try again.', 'error');
      }
    } catch (error) {
      // Catch network-related errors.
      console.error('Signup failed:', error);
      addToast('An error occurred. Please try again later.', 'error');
    }
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                id="name"
                name="name" // Changed name to 'name'
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="John Doe"
                required
              />
            </div>
          </div>
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
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="tel"
                id="phone_number"
                name="phone_number" // Changed name to 'phone_number'
                value={formData.phone_number}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="e.g., 055 123 4567"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {/* Dynamic input type based on state */}
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="********"
                required
              />
              {/* Password visibility toggle button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              {/* Dynamic input type based on state */}
              <input
                type={showPassword ? 'text' : 'password'}
                id="confirm_password"
                name="confirm_password" // Changed name to 'confirm_password'
                value={formData.confirm_password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="********"
                required
              />
              {/* Password visibility toggle button */}
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-green-600 hover:text-green-800 transition duration-200">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;

