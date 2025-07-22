import React from 'react'
import { Link } from 'react-router-dom'
import { logo } from '../../assets'
import { FaPhoneVolume } from 'react-icons/fa'

const Navbar = () => {
  return (
    <div>
        
        {/* Navbar Top */}
        <div className='flex justify-between items-center w-full bg-white py-1.5 px-7 border-b-2 border-gray-200 text-gray-600'>
            <div className='flex justify-center items-center gap-2'>
                {/* location Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                
                {/* location */}
                <div >
                    <p>
                    Location: Ejisu,Okese Avenue Fillet street, Kumasi Ghana
                    </p>
                </div>
            </div>

            {/* Language and Currency Selectors */}
            <div className='flex items-center gap-5'>
                <select name="language" className='cursor-pointer focus:outline-none'>
                    <option value="English">Eng</option>
                    <option value="Twi">Twi</option>
                </select>
                <select name="Currency" className='cursor-pointer focus:outline-none'>
                    <option value="GHS">GHS</option>
                    <option value="USD">USD</option>
                </select>
            </div>
        </div>

      {/* Navbar Middle */}
        <div className='flex justify-between items-center p-6 w-full'>
            {/* logo */}
            <div className='logo_container'>
                <Link to="/" className='flex items-center gap-2'>
                    <img src={logo} alt="Logo" className='h-14'/>
                    <h1 className=' text-4xl text-[#00B207] font-extrabold ml-4 w-[239px]'>Sanich Farms</h1>
                </Link>
            </div>

            {/* Search */}
            <div className='relative'>
                <form action='#' id='searchForms' className='flex items-center w-[497px] h-[45px]'>
                    <div className='absolute left-2 pointer-events-none'>
                        <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.16667 16.3333C12.8486 16.3333 15.8333 13.3486 15.8333 9.66667C15.8333 5.98477 12.8486 3 9.16667 3C5.48477 3 2.5 5.98477 2.5 9.66667C2.5 13.3486 5.48477 16.3333 9.16667 16.3333Z" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M17.4999 18L13.8749 14.375" stroke="#1A1A1A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <input type="text" placeholder='Search' className='w-[400px] h-full pl-8 pr-4 border-2 border-gray-100 rounded-l-md focus:outline-none focus:border-[#00B207]' />
                    <button type="submit" className='w-[98px] h-full bg-[#00B207] text-white font-semibold p-2 rounded-r-md cursor-pointer'>Search</button>
                </form>
            </div>

            {/* Wishlist, Cart, Profile*/}
            <div className='flex justify-between items-center gap-4 w-[200px] h-[45px] px-2 py-1'>
                <Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                    </svg>
                </Link>
                <Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </Link>
                <Link>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                    </svg>
                </Link>
            </div>

            {/* SignUp/Login */}
            <div className='flex flex-row items-center gap-2 w-[73px] h-[45px] px-2 py-1 bg-[#00B207] rounded-r-md'>
                <Link to="/login" className='text-center text-[14px] text-white font-semibold rounded-r-lg'>Login/ Sign Up</Link>
            </div>
      </div>

      {/* Navbar Bottom */}
        <div className='flex justify-between items-center w-full h-[60px] bg-gray-800 px-4'>
            {/* Nav Details */}
            <div className='flex justify-between item-center mx-6'>

                <nav className='flex justify-between items-center gap-[32px] font-medium text-gray-400'>
                    <Link to="/">Home</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/shop">Shop<select name="Shop"></select></Link>
                    <Link to="/services">Services</Link>
                    <Link to="/contact">Contact Us</Link>
                </nav>

            </div>

            {/* Phone Details */}
            <div>
                <div className='flex items-center gap-2 text-white'>
                    <svg width="29" height="28" viewBox="0 0 29 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.936 4.375C19.4193 4.77396 20.7718 5.55567 21.858 6.64184C22.9442 7.72801 23.7259 9.08051 24.1249 10.5639" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17.0306 7.75687C17.9205 7.99625 18.7318 8.46521 19.3833 9.11678C20.0349 9.76835 20.5039 10.5797 20.7433 11.4695" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M10.615 13.6517C11.5224 15.5074 13.0263 17.0049 14.8859 17.9042C15.022 17.9688 15.1727 17.9966 15.3229 17.9851C15.4731 17.9736 15.6178 17.9231 15.7425 17.8386L18.4812 16.0134C18.6022 15.9326 18.7414 15.8833 18.8862 15.8698C19.0311 15.8564 19.177 15.8793 19.3107 15.9364L24.4339 18.1326C24.6079 18.2065 24.7532 18.335 24.8479 18.4987C24.9426 18.6623 24.9815 18.8523 24.9589 19.04C24.7967 20.307 24.1784 21.4714 23.2196 22.3154C22.2608 23.1593 21.0273 23.6249 19.75 23.625C15.8049 23.625 12.0214 22.0578 9.23179 19.2682C6.44218 16.4786 4.875 12.6951 4.875 8.75C4.87512 7.47279 5.34074 6.23941 6.18471 5.28077C7.02867 4.32213 8.1931 3.70396 9.46 3.542C9.64771 3.51936 9.83769 3.55832 10.0013 3.653C10.165 3.74769 10.2934 3.89298 10.3674 4.067L12.5654 9.1945C12.6219 9.32698 12.6449 9.47137 12.6322 9.61485C12.6195 9.75833 12.5716 9.89647 12.4928 10.017L10.6728 12.7977C10.5901 12.923 10.5414 13.0675 10.5313 13.2171C10.5212 13.3668 10.55 13.5165 10.615 13.6517V13.6517Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>0243826137</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar
