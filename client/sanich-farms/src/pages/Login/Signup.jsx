// Signup Page
import React, { useState } from 'react'; 
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import SignupBC from '../../components/Breadcrumbs/SignupBC';
import MessageBox from '../../components/UI/MessageBox'; 

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [messageBox, setMessageBox] = useState(null);

  const handleTogglePassword = () => setShowPassword(prev => !prev);
  const handleToggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

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

    if (!username) {
      newErrors.username = "Username is required.";
      isValid = false;
    } else if (username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long.";
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\+?[0-9\s-()]{7,20}$/.test(phone)) {
      newErrors.phone = "Phone number is invalid.";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required.";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long.";
      isValid = false;
    } else if (!/[A-Z]/.test(password)) {
      newErrors.password = "Password must contain at least one uppercase letter.";
      isValid = false;
    } else if (!/[a-z]/.test(password)) {
      newErrors.password = "Password must contain at least one lowercase letter.";
      isValid = false;
    } else if (!/[0-9]/.test(password)) {
      newErrors.password = "Password must contain at least one number.";
      isValid = false;
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      newErrors.password = "Password must contain at least one special character.";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required.";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      isValid = false;
    }

    if (!acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      setMessageBox("Account created successfully!");
      console.log("Signup Data", { email, username, phone, password, confirmPassword });
    } else {
      setMessageBox("Please correct the errors in the form.");
    }
  };

  return (
    <>
      <SignupBC />
      <div className="flex justify-center items-center min-h-[calc(100vh-120px)] px-4 py-8 md:py-12 bg-gray-50 font-poppins">
        <div className="bg-white w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl rounded-2xl shadow-lg border border-gray-100 p-6 md:p-10 transform transition-all duration-300 hover:shadow-xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8 tracking-tight">
            Create Your Account
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full px-6 py-4 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
                aria-label="Email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className={`w-full px-6 py-4 rounded-xl border-2 ${errors.username ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
                aria-label="Username"
              />
              {errors.username && <p className="text-red-500 text-sm mt-1 ml-2">{errors.username}</p>}
            </div>
            <div>
              <input
                type="tel"
                placeholder="Phone Number"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className={`w-full px-6 py-4 rounded-xl border-2 ${errors.phone ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
                aria-label="Phone Number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1 ml-2">{errors.phone}</p>}
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full px-6 py-4 pr-12 rounded-xl border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
                aria-label="Password"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-green-700 transition duration-200"
                onClick={handleTogglePassword}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password}</p>}
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                className={`w-full px-6 py-4 pr-12 rounded-xl border-2 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
                aria-label="Confirm Password"
              />
              <span
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-green-700 transition duration-200"
                onClick={handleToggleConfirmPassword}
                aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
              </span>
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1 ml-2">{errors.confirmPassword}</p>}
            </div>
            <div>
              <label className="flex items-center space-x-3 text-gray-700 text-sm md:text-base cursor-pointer">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={e => setAcceptTerms(e.target.checked)}
                  className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-offset-0 transition duration-200"
                  aria-label="Accept terms and conditions"
                />
                <span>
                  I accept all <Link to="/terms" className="text-green-700 font-semibold hover:underline">terms & conditions</Link>
                </span>
              </label>
              {errors.acceptTerms && <p className="text-red-500 text-sm mt-1 ml-2">{errors.acceptTerms}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white text-xl py-4 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 font-bold tracking-wide"
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
      <MessageBox
        message={messageBox}
        onClose={() => setMessageBox(null)}
      />
    </>
  );
};

export default Signup;