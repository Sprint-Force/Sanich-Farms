import React from 'react'

const Services = () => {
      const handleBannerClick = (link) => {
    navigate(link)
  }

  return (
    <div>
              {/* Services Section */}
        <div className='w-full py-16 bg-white'>
            <div className='max-w-[1200px] mx-auto px-6'>
                {/* Section Title */}
                <div className='text-center mb-12'>
                    <h2 className='text-4xl font-bold text-gray-800'>Services</h2>
                </div>
                
                {/* Services Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
                    {/* Service 1 - Brooding Training */}
                    <div className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative h-64'>
                            <img 
                                src="/api/placeholder/400/300" 
                                alt="Brooding Training Service" 
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-blue-600 bg-opacity-75 flex items-center justify-center'>
                                <div className='text-center text-white p-6'>
                                    <h3 className='text-2xl font-bold mb-2'>BROODING TRAINING</h3>
                                    <p className='text-sm mb-4'>Practical intensive brooding training with</p>
                                    <div className='space-y-2 text-sm'>
                                        <div className='flex items-center justify-center gap-2'>
                                            <span className='w-2 h-2 bg-yellow-400 rounded-full'></span>
                                            <span>Poultry experts and knowledgeable professionals</span>
                                        </div>
                                        <div className='flex items-center justify-center gap-2'>
                                            <span className='w-2 h-2 bg-yellow-400 rounded-full'></span>
                                            <span>Certificate will be awarded</span>
                                        </div>
                                    </div>
                                    <p className='text-xs mt-4'>⭐ Register or fill the form</p>
                                    <p className='text-yellow-400 font-bold text-lg mt-2'>GH₵1,000</p>
                                </div>
                            </div>
                        </div>
                        <div className='p-6'>
                            <h3 className='text-xl font-semibold text-gray-800 mb-3'>Service</h3>
                            <p className='text-gray-600 mb-4 leading-relaxed'>
                                Nulla libero lorem, euismod venenatis nibh sed, sodales dictum ex. Etiam nisl quam, malesuada et pulvinar at, posuere eu neque.
                            </p>
                            <button 
                                onClick={() => handleBannerClick('/services')}
                                className='flex items-center gap-2 text-[#00B207] font-semibold hover:gap-3 transition-all duration-300'
                            >
                                Read More
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Service 2 - Our Services */}
                    <div className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative h-64'>
                            <img 
                                src="/api/placeholder/400/300" 
                                alt="Our Services" 
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-gradient-to-r from-green-600 to-yellow-500 bg-opacity-90 flex items-center justify-center'>
                                <div className='text-center text-white p-6'>
                                    <h3 className='text-lg font-bold mb-4 text-yellow-300'>OUR SERVICES</h3>
                                    <div className='grid grid-cols-2 gap-2 text-xs'>
                                        <div className='bg-green-600 px-2 py-1 rounded'>CONSULTANCY</div>
                                        <div className='bg-gray-600 px-2 py-1 rounded'>DEBEAKING</div>
                                        <div className='bg-gray-600 px-2 py-1 rounded'>INJECTING</div>
                                        <div className='bg-green-600 px-2 py-1 rounded'>BROODING</div>
                                        <div className='bg-gray-600 px-2 py-1 rounded'>BUDGET ESTIMATION</div>
                                        <div className='bg-gray-600 px-2 py-1 rounded'>FARM MANAGEMENT</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-6'>
                            <h3 className='text-xl font-semibold text-gray-800 mb-3'>Service</h3>
                            <p className='text-gray-600 mb-4 leading-relaxed'>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                            </p>
                            <button className='flex items-center gap-2 text-[#00B207] font-semibold hover:gap-3 transition-all duration-300'>
                                Read More
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Service 3 - Consultancy */}
                    <div className='bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative h-64'>
                            <img 
                                src="/api/placeholder/400/300" 
                                alt="Consultancy Service" 
                                className='w-full h-full object-cover'
                            />
                            <div className='absolute inset-0 bg-green-600 bg-opacity-80 flex items-center justify-center'>
                                <div className='text-center text-white p-6'>
                                    <h3 className='text-2xl font-bold mb-4'>Consultancy</h3>
                                    <div className='bg-blue-600 px-4 py-2 rounded-lg inline-block'>
                                        <p className='text-sm font-semibold'>Our Service you can count on.</p>
                                        <p className='text-sm'>Results you can see.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='p-6'>
                            <h3 className='text-xl font-semibold text-gray-800 mb-3'>Service</h3>
                            <p className='text-gray-600 mb-4 leading-relaxed'>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.
                            </p>
                            <button className='flex items-center gap-2 text-[#00B207] font-semibold hover:gap-3 transition-all duration-300'>
                                Read More
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* View All Services Button */}
                <div className='text-center'>
                    <button 
                        onClick={() => handleBannerClick('/services')}
                        className='bg-gray-100 hover:bg-gray-200 text-gray-700 px-8 py-3 rounded-lg font-semibold transition-colors duration-300'
                    >
                        View All Services
                    </button>
                </div>
            </div>
        </div>
        
        {/* Statistics Section */}
        <div className='w-full py-16 bg-gray-900'>
            <div className='max-w-[1200px] mx-auto px-6'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Years of Hard Work */}
                    <div className='bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors duration-300'>
                        <div className='text-5xl font-bold text-[#00B207] mb-2'>5+</div>
                        <div className='text-white text-lg font-medium'>Years of Hard Work</div>
                    </div>

                    {/* Happy Customer */}
                    <div className='bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors duration-300'>
                        <div className='text-5xl font-bold text-[#00B207] mb-2'>500k+</div>
                        <div className='text-white text-lg font-medium'>Happy Customer</div>
                    </div>

                    {/* Qualified Team Member */}
                    <div className='bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors duration-300'>
                        <div className='text-5xl font-bold text-[#00B207] mb-2'>28</div>
                        <div className='text-white text-lg font-medium'>Qualified Team Member</div>
                    </div>

                    {/* Monthly Orders */}
                    <div className='bg-gray-800 rounded-lg p-8 text-center hover:bg-gray-700 transition-colors duration-300'>
                        <div className='text-5xl font-bold text-[#00B207] mb-2'>750k+</div>
                        <div className='text-white text-lg font-medium'>Monthly Orders</div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Services
