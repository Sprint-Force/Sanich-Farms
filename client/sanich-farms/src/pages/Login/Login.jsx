import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import LoginBC from '../../components/Breadcrumbs/LoginBC';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const testEmail = 'testuser@example.com';
  const testPassword = 'Test@1234';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (email === testEmail && password === testPassword) {
      setSuccess('Login successful! Welcome, testuser.');
      // navigate('/dashboard') - Optional redirect
    } else {
      setError('Invalid email or password. Enter the correct credentials.');
    }
  };

  return (
    <div className="font-poppins">
      <Navbar />
      <LoginBC />
      <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-8 sm:p-10">
          <h2 className="text-3xl sm:text-4xl font-semibold text-center mb-8">Log In</h2>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 mb-2 text-sm sm:text-base">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-base"
                required
                autoComplete="username"
              />
            </div>

            {/* Password */}
            <div className="mb-6 relative">
              <label htmlFor="password" className="block text-gray-700 mb-2 text-sm sm:text-base">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-base"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={handleTogglePassword}
                className="absolute right-4 top-10 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.442-3.943m3.31-2.522A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.205 5.442" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                )}
              </button>
            </div>

            {/* Options */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 text-gray-600 text-sm sm:text-base">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 focus:ring-[#00B207]"
                />
                Remember me
              </label>
              <a href="#" className="text-sm sm:text-base hover:underline mt-2 sm:mt-0">
                Forgot password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-[#00B207] hover:bg-green-600 text-white py-3 rounded-full text-lg font-semibold transition-colors"
            >
              Login
            </button>
          </form>

          {/* Feedback */}
          {error && <p className="text-center text-red-500 text-sm mt-4">{error}</p>}
          {success && <p className="text-center text-green-600 text-sm mt-4">{success}</p>}

          {/* Register Link */}
          <div className="text-center text-gray-600 text-sm mt-6">
            Don’t have an account?{' '}
            <Link to="/signup" className="text-black font-semibold hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;

