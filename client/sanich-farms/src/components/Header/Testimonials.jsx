import React from 'react'

const Testimonials = () => {
  return (
    <div>
              {/* Client Testimonial Section */}
        <div className='w-full py-16 bg-gray-100'>
            <div className='max-w-[1200px] mx-auto px-6'>
                {/* Section Header */}
                <div className='flex items-center justify-between mb-12'>
                    <div>
                        <h2 className='text-4xl font-bold text-gray-800 mb-2'>Client Testimonial</h2>
                        <div className='w-16 h-1 bg-[#00B207]'></div>
                    </div>
                    
                    {/* Navigation Arrows */}
                    <div className='flex gap-2'>
                        <button className='w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors'>
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button className='w-12 h-12 bg-[#00B207] rounded-full flex items-center justify-center shadow-sm hover:bg-green-600 transition-colors'>
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                {/* Testimonials Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
                    {/* Testimonial 1 */}
                    <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='mb-4'>
                            <svg className="w-8 h-8 text-[#00B207] mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                            <p className='text-gray-600 leading-relaxed mb-6'>
                                Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget
                            </p>
                        </div>
                        
                        <div className='flex items-center gap-4'>
                            <img 
                                src="/api/placeholder/50/50" 
                                alt="Robert Fox" 
                                className='w-12 h-12 rounded-full object-cover'
                            />
                            <div className='flex-1'>
                                <h4 className='font-semibold text-gray-800'>Robert Fox</h4>
                                <p className='text-sm text-gray-500'>Customer</p>
                            </div>
                            <div className='flex gap-1'>
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 2 */}
                    <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='mb-4'>
                            <svg className="w-8 h-8 text-[#00B207] mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                            <p className='text-gray-600 leading-relaxed mb-6'>
                                Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget
                            </p>
                        </div>
                        
                        <div className='flex items-center gap-4'>
                            <img 
                                src="/api/placeholder/50/50" 
                                alt="Dianne Russell" 
                                className='w-12 h-12 rounded-full object-cover'
                            />
                            <div className='flex-1'>
                                <h4 className='font-semibold text-gray-800'>Dianne Russell</h4>
                                <p className='text-sm text-gray-500'>Customer</p>
                            </div>
                            <div className='flex gap-1'>
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Testimonial 3 */}
                    <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='mb-4'>
                            <svg className="w-8 h-8 text-[#00B207] mb-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                            </svg>
                            <p className='text-gray-600 leading-relaxed mb-6'>
                                Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget
                            </p>
                        </div>
                        
                        <div className='flex items-center gap-4'>
                            <img 
                                src="/api/placeholder/50/50" 
                                alt="Eleanor Pena" 
                                className='w-12 h-12 rounded-full object-cover'
                            />
                            <div className='flex-1'>
                                <h4 className='font-semibold text-gray-800'>Eleanor Pena</h4>
                                <p className='text-sm text-gray-500'>Customer</p>
                            </div>
                            <div className='flex gap-1'>
                                {[...Array(5)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className='flex justify-center gap-2'>
                    <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                    <div className='w-3 h-3 bg-[#00B207] rounded-full'></div>
                    <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                    <div className='w-3 h-3 bg-gray-300 rounded-full'></div>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Testimonials
