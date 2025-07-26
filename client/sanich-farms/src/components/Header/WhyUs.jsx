import React from 'react'

const WhyUs = () => {
  return (
    <div>
              {/* Why Us Section */}
        <div className='w-full py-16 bg-white'>
            <div className='max-w-[1200px] mx-auto px-6'>
                {/* Section Title */}
                <div className='text-center mb-12'>
                    <h2 className='text-4xl font-bold text-gray-800 mb-2'>Why Us?</h2>
                    <div className='w-16 h-1 bg-[#00B207] mx-auto'></div>
                </div>
                
                {/* Content */}
                <div className='flex items-center gap-12'>
                    {/* Image */}
                    <div className='flex-1'>
                        <img 
                            src="/api/placeholder/500/400" 
                            alt="Baby chicks" 
                            className='w-full h-[400px] object-cover rounded-lg'
                        />
                    </div>
                    
                    {/* Content */}
                    <div className='flex-1'>
                        <h3 className='text-3xl font-bold text-gray-800 mb-6'>
                            100% Trusted<br />
                            Poultry Products
                        </h3>
                        
                        {/* Feature 1 */}
                        <div className='flex items-start gap-4 mb-6'>
                            <div className='bg-[#00B207] rounded-full p-1 mt-1'>
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h4 className='text-xl font-semibold text-gray-800 mb-2'>
                                    Healthy & natural for lovers of healthy food.
                                </h4>
                                <p className='text-gray-600 leading-relaxed'>
                                    Ut quis tempus erat. Phasellus euismod bibendum magna non tristique. Pellentesque semper vestibulum elit sed condimentum. Nunc pretium fermentum interdum.
                                </p>
                            </div>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className='flex items-start gap-4 mb-8'>
                            <div className='bg-[#00B207] rounded-full p-1 mt-1'>
                                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h4 className='text-xl font-semibold text-gray-800 mb-2'>
                                    Every day fresh and quality products for you.
                                </h4>
                                <p className='text-gray-600 leading-relaxed'>
                                    Maecenas vehicula a justo quis laoreet. Sed in placerat nibh, a posuere ex. Morbi sem neque, aliquam sed orci et, rhoncus lobortis felis. Sed vestibulum nisl sit amet sapien.
                                </p>
                            </div>
                        </div>
                        
                        {/* Shop Now Button */}
                        <button 
                            onClick={() => handleBannerClick('/shop')}
                            className='flex items-center gap-3 bg-[#00B207] text-white px-8 py-4 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300'
                        >
                            Shop Now
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default WhyUs
