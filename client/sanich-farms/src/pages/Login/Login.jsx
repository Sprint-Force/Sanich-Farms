// Login Page
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import LoginBC from '../../components/Breadcrumbs/LoginBC';
import MessageBox from '../../components/UI/MessageBox';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [messageBox, setMessageBox] = useState(null);

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const testEmail = 'testuser@example.com';
  const testPassword = 'Test@1234';

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!email) {
      newErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      if (email === testEmail && password === testPassword) {
        setMessageBox('Login successful! Welcome, testuser.');
        // navigate('/dashboard'); // Uncomment to redirect after successful login
      } else {
        setMessageBox('Invalid email or password. Please try again.');
        setPassword('');
      }
    } else {
      setMessageBox('Please correct the errors in the form.');
    }
  };

  return (
    <>
      <LoginBC />
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] bg-gray-50 px-4 py-8 md:py-12 font-poppins">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 md:p-10 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8 tracking-tight">
            Log In to Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2 text-base font-medium">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full px-6 py-4 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
                required
                autoComplete="username"
                aria-label="Email address"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-gray-700 mb-2 text-base font-medium">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full px-6 py-4 pr-12 rounded-xl border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
                required
                autoComplete="current-password"
                aria-label="Password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-4 top-1/2 translate-y-1/2 text-gray-500 hover:text-green-700 transition duration-200 focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <FaEyeSlash size={20} />
                ) : (
                  <FaEye size={20} />
                )}
              </button>
              {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password}</p>}
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 text-gray-600 text-sm md:text-base">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 transition duration-200"
                  aria-label="Remember me"
                />
                <span>Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-green-700 font-semibold hover:underline hover:text-green-800 transition duration-200 mt-2 sm:mt-0">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white text-xl py-4 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 font-bold tracking-wide"
            >
              Login
            </button>
          </form>
          <p className="text-center text-gray-600 mt-8 text-base md:text-lg">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-green-700 font-bold hover:underline hover:text-green-800 transition duration-200">
              Register here
            </Link>
          </p>
        </div>
      </div>
      <MessageBox
        message={messageBox}
        onClose={() => setMessageBox(null)}
      />
    </>
  );
};

export default Login;