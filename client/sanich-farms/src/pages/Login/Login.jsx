// // // Login Page
// // import React, { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { FaEye, FaEyeSlash } from "react-icons/fa";
// // import LoginBC from '../../components/Breadcrumbs/LoginBC';
// // import MessageBox from '../../components/UI/MessageBox';

// // const Login = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [errors, setErrors] = useState({});
// //   const [messageBox, setMessageBox] = useState(null);

// //   const navigate = useNavigate();

// //   const handleTogglePassword = () => {
// //     setShowPassword(prev => !prev);
// //   };

// //   const testEmail = 'testuser@example.com';
// //   const testPassword = 'Test@1234';

// //   const validateForm = () => {
// //     let newErrors = {};
// //     let isValid = true;

// //     if (!email) {
// //       newErrors.email = "Email is required.";
// //       isValid = false;
// //     } else if (!/\S+@\S+\.\S+/.test(email)) {
// //       newErrors.email = "Email address is invalid.";
// //       isValid = false;
// //     }

// //     if (!password) {
// //       newErrors.password = "Password is required.";
// //       isValid = false;
// //     } else if (password.length < 8) {
// //       newErrors.password = "Password must be at least 8 characters long.";
// //       isValid = false;
// //     }

// //     setErrors(newErrors);
// //     return isValid;
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();

// //     if (validateForm()) {
// //       if (email === testEmail && password === testPassword) {
// //         setMessageBox('Login successful! Welcome, testuser.');
// //         // navigate('/dashboard'); // Uncomment to redirect after successful login
// //       } else {
// //         setMessageBox('Invalid email or password. Please try again.');
// //         setPassword('');
// //       }
// //     } else {
// //       setMessageBox('Please correct the errors in the form.');
// //     }
// //   };

// //   return (
// //     <>
// //       <LoginBC />
// //       <div className="flex justify-center items-center min-h-[calc(100vh-120px)] bg-gray-50 px-4 py-8 md:py-12 font-poppins">
// //         <div className="bg-white rounded-2xl shadow-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl p-6 md:p-10 transform transition-all duration-300 hover:shadow-xl">
// //           <h2 className="text-3xl md:text-4xl font-bold text-center text-green-700 mb-8 tracking-tight">
// //             Log In to Your Account
// //           </h2>
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div>
// //               <label htmlFor="email" className="block text-gray-700 mb-2 text-base font-medium">
// //                 Email Address
// //               </label>
// //               <input
// //                 id="email"
// //                 type="email"
// //                 placeholder="Enter your email"
// //                 value={email}
// //                 onChange={e => setEmail(e.target.value)}
// //                 className={`w-full px-6 py-4 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
// //                 required
// //                 autoComplete="username"
// //                 aria-label="Email address"
// //               />
// //               {errors.email && <p className="text-red-500 text-sm mt-1 ml-2">{errors.email}</p>}
// //             </div>
// //             <div className="relative">
// //               <label htmlFor="password" className="block text-gray-700 mb-2 text-base font-medium">
// //                 Password
// //               </label>
// //               <input
// //                 id="password"
// //                 type={showPassword ? 'text' : 'password'}
// //                 placeholder="Enter your password"
// //                 value={password}
// //                 onChange={e => setPassword(e.target.value)}
// //                 className={`w-full px-6 py-4 pr-12 rounded-xl border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-green-500 text-lg transition duration-200`}
// //                 required
// //                 autoComplete="current-password"
// //                 aria-label="Password"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={handleTogglePassword}
// //                 className="absolute right-4 top-1/2 translate-y-1/2 text-gray-500 hover:text-green-700 transition duration-200 focus:outline-none"
// //                 aria-label={showPassword ? 'Hide password' : 'Show password'}
// //               >
// //                 {showPassword ? (
// //                   <FaEyeSlash size={20} />
// //                 ) : (
// //                   <FaEye size={20} />
// //                 )}
// //               </button>
// //               {errors.password && <p className="text-red-500 text-sm mt-1 ml-2">{errors.password}</p>}
// //             </div>
// //             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 text-gray-600 text-sm md:text-base">
// //               <label className="flex items-center gap-2 cursor-pointer">
// //                 <input
// //                   type="checkbox"
// //                   className="w-5 h-5 rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-offset-0 transition duration-200"
// //                   aria-label="Remember me"
// //                 />
// //                 <span>Remember me</span>
// //               </label>
// //               <Link to="/forgot-password" className="text-green-700 font-semibold hover:underline hover:text-green-800 transition duration-200 mt-2 sm:mt-0">
// //                 Forgot password?
// //               </Link>
// //             </div>
// //             <button
// //               type="submit"
// //               className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white text-xl py-4 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 font-bold tracking-wide"
// //             >
// //               Login
// //             </button>
// //           </form>
// //           <p className="text-center text-gray-600 mt-8 text-base md:text-lg">
// //             Don’t have an account?{' '}
// //             <Link to="/signup" className="text-green-700 font-bold hover:underline hover:text-green-800 transition duration-200">
// //               Register here
// //             </Link>
// //           </p>
// //         </div>
// //       </div>
// //       <MessageBox
// //         message={messageBox}
// //         onClose={() => setMessageBox(null)}
// //       />
// //     </>
// //   );
// // };

// // export default Login;

// // src/pages/Login/Login.jsx
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FiMail, FiLock } from 'react-icons/fi';
// import { useToast } from '../../context/ToastContext'; // NEW: Import useToast

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });
//   const navigate = useNavigate();
//   const { addToast } = useToast(); // NEW: Use the toast hook

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log('Login attempt:', formData);

//     // Basic validation (replace with actual authentication logic)
//     if (formData.email === 'test@example.com' && formData.password === 'password123') {
//       addToast('Login successful! Welcome back.', 'success'); // NEW: Success toast
//       navigate('/'); // Redirect to home on successful login
//     } else {
//       addToast('Invalid email or password. Please try again.', 'error'); // NEW: Error toast
//     }
//   };

//   return (
//     <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center p-4">
//       <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-5">
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//               Email Address
//             </label>
//             <div className="relative">
//               <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//                 placeholder="you@example.com"
//                 required
//               />
//             </div>
//           </div>
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//                 placeholder="********"
//                 required
//               />
//             </div>
//           </div>
//           <div className="flex items-center justify-between text-sm">
//             <div className="flex items-center">
//               <input
//                 id="remember-me"
//                 name="remember-me"
//                 type="checkbox"
//                 className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
//               />
//               <label htmlFor="remember-me" className="ml-2 block text-gray-900">
//                 Remember me
//               </label>
//             </div>
//             <Link to="/forgot-password" className="font-medium text-green-600 hover:text-green-800 transition duration-200">
//               Forgot your password?
//             </Link>
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             Login
//           </button>
//         </form>
//         <p className="mt-6 text-center text-sm text-gray-600">
//           Don't have an account?{' '}
//           <Link to="/signup" className="font-medium text-green-600 hover:text-green-800 transition duration-200">
//             Sign Up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock } from 'react-icons/fi';
import { useToast } from '../../context/ToastContext';
import { useAuthContext } from '../../hooks/useAuthContext';
import { authAPI } from '../../services/api';

// This component handles the user login functionality.
const Login = () => {
  // Use state to manage the form data for email and password.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  
  // The useNavigate hook allows for programmatic navigation after a successful login.
  const navigate = useNavigate();
  const location = useLocation();
  // The useToast hook provides a consistent way to display success and error messages.
  const { addToast } = useToast();
  // Auth context for managing authentication state
  const { login } = useAuthContext();

  // This handler updates the state as the user types in the input fields.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
      // Use the new API service
      const data = await authAPI.login(formData);
      
      // Extract user data from the token or response
      // Since we don't have user data in the response, we'll store basic info
      const userData = {
        email: formData.email,
        // Add other user fields as they become available from the API
      };

      // Use the login function from auth context
      login(userData, data.accessToken);
      
      // Display a success toast and redirect the user.
      addToast('Login successful! Welcome back.', 'success');
      
      // Redirect to the intended page or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
      
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
    <div className="font-poppins bg-gray-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>
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
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="you@example.com"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                placeholder="********"
                required
                disabled={loading}
              />
            </div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                Remember me
              </label>
            </div>
            <Link 
              to="/forgot-password" 
              className="font-medium text-green-600 hover:text-green-800 transition duration-200"
            >
              Forgot your password?
            </Link>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing In...' : 'Login'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/signup" className="font-medium text-green-600 hover:text-green-800 transition duration-200">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

