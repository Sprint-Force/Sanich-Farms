// import React, { useState } from 'react'
// import { Link } from "react-router-dom"
// import Navbar from '../../components/Navbar/Navbar'
// import Footer from '../../components/Footer/Footer'
// import SignupBC from '../../components/Breadcrumbs/SignupBC'


// const Signup = () => {
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [phone, setPhone] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [acceptTerms, setAcceptTerms] = useState(false);

//   const handleTogglePassword = () => setShowPassword((prev) => !prev);
//   const handleToggleConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

//   return (
//     <div>
//       <Navbar />
//       <SignupBC />
//       <div className="flex justify-center items-center min-h-[100vh] bg-transparent m-10">
//         <div className="bg-white rounded-xl border-2 border-gray-50 drop-shadow-md p-8 w-full max-w-[984px] h-[1046px]">
//           <h2 className="text-6xl md:text-[48px] font-semibold text-center mb-8">Create Account</h2>
//           <form>
//             <div className="mb-4">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 className="w-full px-8 py-6 rounded-xl border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-gray-700 text-3xl"
//                 autoComplete="username"
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 type="text"
//                 placeholder="User name"
//                 value={username}
//                 onChange={e => setUsername(e.target.value)}
//                 className="w-full px-8 py-6 rounded-xl border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-gray-700 text-3xl"
//                 autoComplete="name"
//               />
//             </div>
//             <div className="mb-4">
//               <input
//                 type="tel"
//                 placeholder="Phone"
//                 value={phone}
//                 onChange={e => setPhone(e.target.value)}
//                 className="w-full px-8 py-6 rounded-xl border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-gray-700 text-3xl"
//                 autoComplete="tel"
//               />
//             </div>
//             <div className="mb-4 relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 className="w-full px-8 py-6 rounded-xl border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-gray-700 text-3xl"
//                 autoComplete="new-password"
//               />
//               <span
//                 className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
//                 onClick={handleTogglePassword}
//                 tabIndex={0}
//                 role="button"
//                 aria-label={showPassword ? "Hide password" : "Show password"}
//               >
//                 {showPassword ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.442-3.943m3.31-2.522A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.205 5.442" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.835-.642 1.627-1.102 2.357M15.5 15.5l2.5 2.5" />
//                   </svg>
//                 )}
//               </span>
//             </div>
//             <div className="mb-4 relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 placeholder="Confirm Password"
//                 value={confirmPassword}
//                 onChange={e => setConfirmPassword(e.target.value)}
//                 className="w-full px-8 py-6 rounded-xl border-2 border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00B207] text-gray-700 text-3xl"
//                 autoComplete="new-password"
//               />
//               <span
//                 className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-400"
//                 onClick={handleToggleConfirmPassword}
//                 tabIndex={0}
//                 role="button"
//                 aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//               >
//                 {showConfirmPassword ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.442-3.943m3.31-2.522A9.953 9.953 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.96 9.96 0 01-4.205 5.442" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-.274.835-.642 1.627-1.102 2.357M15.5 15.5l2.5 2.5" />
//                   </svg>
//                 )}
//               </span>
//             </div>
//             <div className="flex items-center mb-6 py-3">
//               <label className='flex items-center gap-2 leading-[150%]'>
//               <input
//                 type="checkbox"
//                 checked={acceptTerms}
//                 onChange={e => setAcceptTerms(e.target.checked)}
//                 className="w-8 h-8 rounded border-gray-300"
//               />
//               <span className="text-gray-600 text-2xl">Accept all terms & Conditions</span>
//               </label>
//             </div>
//             <button type="submit" className="w-full bg-[#00B207] text-white rounded-full px-14 py-6 text-[26px] font-semibold hover:bg-green-600 transition-colors mb-4">Create Account</button>
//           </form>
//           <div className="text-center mt-12 pt-4 text-gray-600 text-2xl">
//             Already have account <Link to="/login" className="font-semibold text-black hover:underline">Login</Link>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }


// export default Signup

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
