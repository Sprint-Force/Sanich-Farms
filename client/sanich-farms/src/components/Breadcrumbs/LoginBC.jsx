import React from 'react'


const LoginBC = () => {
  return (
    <div className="w-full h-[117px] flex items-center px-7 py-12 bg-gradient-to-r from-[#232323] to-[#808080]">
      <div className="flex items-center gap-2">
        {/* Home Icon */}
        <svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 8.5L9 1.5L17 8.5V18.5H12V14.5C12 13.7044 11.6839 12.9413 11.1213 12.3787C10.5587 11.8161 9.79565 11.5 9 11.5C8.20435 11.5 7.44129 11.8161 6.87868 12.3787C6.31607 12.9413 6 13.7044 6 14.5V18.5H1V8.5Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        {/* Chevron */}
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {/* Log In Text */}
        <span className="text-[#00B207] text-lg font-normal">Log In</span>
      </div>
    </div>
  )
}

export default LoginBC
