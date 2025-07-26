import React from 'react'

const Products = () => {
  return (
    <div>
              {/* Products Section */}
        <div className='w-full py-16 bg-gray-50'>
            <div className='max-w-[1200px] mx-auto px-6'>
                {/* Section Title */}
                <div className='text-center mb-12'>
                    <h2 className='text-4xl font-bold text-gray-800'>Products</h2>
                </div>
                
                {/* Products Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {/* Product 1 - Broiler Day Old Chicks */}
                    <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative mb-4'>
                            <img 
                                src="/api/placeholder/200/200" 
                                alt="Broiler Day Old Chicks" 
                                className='w-full h-48 object-cover rounded-lg'
                            />
                            <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50'>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800 mb-2'>Broiler Day Old Chicks</h3>
                        <div className='flex items-center gap-2 mb-2'>
                            <span className='text-xl font-bold text-gray-800'>GH₵14.99</span>
                            <span className='text-sm text-gray-500 line-through'>GH₵20.99</span>
                        </div>
                        <div className='flex items-center mb-4'>
                            {[...Array(4)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            ))}
                            <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        <button className='w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors'>
                            <svg className="w-5 h-5 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0-5h10" />
                            </svg>
                        </button>
                    </div>

                    {/* Product 2 - Feed Additive */}
                    <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border-2 border-[#00B207]'>
                        <div className='relative mb-4'>
                            <img 
                                src="/api/placeholder/200/200" 
                                alt="Feed Additive" 
                                className='w-full h-48 object-cover rounded-lg'
                            />
                            <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50'>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800 mb-2'>Feed Additive</h3>
                        <div className='flex items-center gap-2 mb-2'>
                            <span className='text-xl font-bold text-gray-800'>GH₵12.00</span>
                        </div>
                        <div className='flex items-center mb-4'>
                            {[...Array(4)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            ))}
                            <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        <button className='w-full bg-[#00B207] hover:bg-green-600 text-white p-3 rounded-lg transition-colors'>
                            <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0-5h10" />
                            </svg>
                        </button>
                    </div>

                    {/* Product 3 - Wheat Bran */}
                    <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative mb-4'>
                            <img 
                                src="/api/placeholder/200/200" 
                                alt="Wheat Bran" 
                                className='w-full h-48 object-cover rounded-lg'
                            />
                            <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50'>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800 mb-2'>Wheat Bran</h3>
                        <div className='flex items-center gap-2 mb-2'>
                            <span className='text-xl font-bold text-gray-800'>GH₵14.99</span>
                            <span className='text-sm text-gray-500 line-through'>GH₵20.99</span>
                        </div>
                        <div className='flex items-center mb-4'>
                            {[...Array(4)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            ))}
                            <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        <button className='w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors'>
                            <svg className="w-5 h-5 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0-5h10" />
                            </svg>
                        </button>
                    </div>

                    {/* Product 4 - Fresh Eggs */}
                    <div className='bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative mb-4'>
                            <img 
                                src="/api/placeholder/200/200" 
                                alt="Fresh Eggs" 
                                className='w-full h-48 object-cover rounded-lg'
                            />
                            <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50'>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <h3 className='text-lg font-semibold text-gray-800 mb-2'>Fresh Eggs</h3>
                        <div className='flex items-center gap-2 mb-2'>
                            <span className='text-xl font-bold text-gray-800'>GH₵14.99</span>
                            <span className='text-sm text-gray-500 line-through'>GH₵20.99</span>
                        </div>
                        <div className='flex items-center mb-4'>
                            {[...Array(4)].map((_, i) => (
                                <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            ))}
                            <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                            </svg>
                        </div>
                        <button className='w-full bg-gray-100 hover:bg-gray-200 p-3 rounded-lg transition-colors'>
                            <svg className="w-5 h-5 mx-auto text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0-5h10" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* View All Button */}
                <div className='text-center'>
                    <button 
                        onClick={() => handleBannerClick('/shop')}
                        className='bg-white border border-gray-300 hover:border-[#00B207] text-gray-700 hover:text-[#00B207] px-8 py-3 rounded-lg font-semibold transition-colors duration-300'
                    >
                        View All
                    </button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Products
