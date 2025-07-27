import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import SignupBC from '../../components/Breadcrumbs/SignupBC';

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleTogglePassword = () => setShowPassword(prev => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      alert("Please accept the terms and conditions");
      return;
    }

    // Handle registration logic
    console.log("Signup Data", { email, username, phone, password, confirmPassword });
  };

  return (
    <div className="font-poppins">
      <Navbar />
      <SignupBC />

      <div className="flex justify-center items-center px-4 py-12 md:py-20 bg-gray-50">
        <div className="bg-white w-full max-w-3xl rounded-xl shadow-md border border-gray-100 p-6 md:p-10">
          <h2 className="text-3xl md:text-4xl font-semibold text-center text-green-700 mb-8">Create Account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />

            {/* Username */}
            <input
              type="text"
              placeholder="User name"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />

            {/* Phone */}
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              required
              className="w-full px-6 py-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full px-6 py-4 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={handleTogglePassword}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                required
                className="w-full px-6 py-4 pr-12 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={handleToggleConfirmPassword}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>

            {/* Terms */}
            <label className="flex items-center space-x-3 text-gray-700 text-sm md:text-base">
              <input
                type="checkbox"
                checked={acceptTerms}
                onChange={e => setAcceptTerms(e.target.checked)}
                className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <span>Accept all terms & conditions</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white text-lg py-3 rounded-full hover:bg-green-700 transition duration-300"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6 text-sm md:text-base">
            Already have an account?{" "}
            <Link to="/login" className="text-green-700 font-semibold hover:underline">Login</Link>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;
