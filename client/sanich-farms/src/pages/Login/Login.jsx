import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import LoginBC from '../../components/Breadcrumbs/LoginBC'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);


  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Test credentials
  const testEmail = "testuser@example.com";
  const testPassword = "Test@1234";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (email === testEmail && password === testPassword) {
      setSuccess("Login successful! Welcome, testuser.");
    } else {
      setError("Invalid email or password. Enter the correct credentials.");
    }
  };

  return (
    <div>
      <Navbar />
      <LoginBC />
      <div className="flex justify-center items-center min-h-[100vh] bg-transparent">
        <div className="bg-white rounded-xl border-2 border-gray-50 shadow-lg px-12 pt-12 pb-16 w-full max-w-[1047px] h-[746px]">
          {/* Login Text */}
          <h2 className="text-[64px] font-semibold text-center mb-8">Log In</h2>
          {/* Login Field */}
          <form onSubmit={handleSubmit}>
            <div className='my-6'>
              {/* Input Fields */}
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-8 py-7 rounded-xl border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-gray-700 text-3xl font-normal"
                  autoComplete="username"
                />
              </div>
              <div className="my-6 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-8 py-7 rounded-xl border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-gray-700 text-3xl font-normal"
                  autoComplete="current-password"
                />
                <span
                  className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
                  onClick={handleTogglePassword}
                  tabIndex={0}
                  role="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.442-3.943m3.31-2.522A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.205 5.442" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                  )}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between my-4 text-gray-600 font-normal leading-[150%]">
              <label className="flex items-center gap-2 text-2xl">
                <input type="checkbox" className="w-8 h-8 rounded-xl border-4 border-gray-300" />
                Remember me
              </label>
              <a href="#" className="text-2xl  hover:underline">Forget Password</a>
            </div>
            <button type="submit" className="w-full bg-[#00B207] text-white text-2xl font-semibold rounded-full px-16 py-7 my-6 hover:bg-green-600 transition-colors">Login</button>
          </form>
          {/* Error/Success Message */}
          {error && <div className="text-center text-red-500 text-xl font-medium mt-2">{error}</div>}
          {success && <div className="text-center text-green-600 text-xl font-medium mt-2">{success}</div>}
          <div className="text-center mx-auto my-auto text-gray-600 text-2xl font-normal leading-[150%] pt-2">
            Don't have account? <Link to="/signup" className="font-semibold text-black hover:underline">Register</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login
