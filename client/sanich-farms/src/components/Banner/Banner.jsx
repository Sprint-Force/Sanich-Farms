import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'
import { bannerList } from '.'
import { image6, image7, feed, wheat, eggs, sevice1, sevice2, sevice3 } from '../../assets'
import Footer from '../Footer/Footer'

const Banner = () => {
  const navigate = useNavigate()

  const handleBannerClick = (link) => {
    navigate(link)
  }

  return (
    <div className='w-full h-[1339px]'>
        {/* Hero */}
        <div>
            <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: true }}
            loop={true}
            className="w-full"
            >
                {
                    bannerList.map((banner) => (
                        <SwiperSlide key={banner.id}>
                            <div className='flex flex-col relative h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh] w-full bg-gray-500/50'>
                                <img src={banner.image} className='h-full w-full object-cover' alt={banner.title} />
                                {/* Banner description */}
                                <div className='absolute flex items-center text-left top-10 md:top-16 lg:top-20 xl:top-24 left-4 md:left-6 lg:left-8 xl:left-12 w-[280px] md:w-[380px] lg:w-[480px] xl:w-[600px] h-[180px] md:h-[280px] lg:h-[350px] xl:h-[400px] bg-[#999999]/50 rounded-xl px-4 md:px-6 lg:px-8 xl:px-10'>
                                    <div className='flex flex-col justify-center gap-2 md:gap-3 lg:gap-4 w-full'>
                                        <h1 className='text-xs md:text-sm lg:text-base text-[#00B207] font-bold uppercase'>Welcome to SANICH FARMS</h1>
                                        <p className='text-black text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight'>{banner.subTitle}</p>
                                        <div className='flex'>
                                            <p className='text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold bg-black text-[#FF8A00] py-1'>Very Affordable</p>
                                        </div>
                                        <button 
                                            onClick={() => handleBannerClick(banner.link)}
                                            className='flex justify-center items-center gap-2 px-3 md:px-4 lg:px-6 py-2 md:py-2 lg:py-3 bg-[#00B207] text-white w-[100px] md:w-[130px] lg:w-[160px] xl:w-[172px] rounded-[53px] hover:bg-green-600 text-xs md:text-sm lg:text-base transition-colors duration-300 cursor-pointer'
                                        >
                                        {banner.buttonText}
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>

            {/* Featured */}
            <div className='w-full  bg-gray-100 flex justify-center relative'>
                {/* <svg className="w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]" viewBox="0 0 1280 768" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.32" filter="url(#filter0_f_46_1394)">
                    <rect x="53" y="53" width="1174.79" height="662.697" fill="#999999"/>
                    </g>
                    <defs>
                    <filter id="filter0_f_46_1394" x="0.911526" y="0.911526" width="1278.97" height="766.874" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                    <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feGaussianBlur stdDeviation="26.0442" result="effect1_foregroundBlur_46_1394"/>
                    </filter>
                    </defs>
                </svg> */}

                <div className='w-[997px] h-[117px] rounded-lg bg-white flex items-center justify-around px-6'>
                    {/* Fast Delivery */}
                    <div className='flex items-center gap-4'>
                        <div>
                            <svg className="w-8 h-8 text-[#00B207]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800'>Fast Delivery</h3>
                            <p className='text-sm text-gray-600'>Fast delivery on all your order</p>
                        </div>
                    </div>

                    {/* Customer Support */}
                    <div className='flex items-center gap-4'>
                        <div>
                            <svg className="w-8 h-8 text-[#00B207]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.2c.27-.27.35-.67.24-1.02C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800'>Customer Support 24/7</h3>
                            <p className='text-sm text-gray-600'>Instant access to Support</p>
                        </div>
                    </div>

                    {/* Secure Payment */}
                    <div className='flex items-center gap-4'>
                        <div>
                            <svg className="w-8 h-8 text-[#00B207]" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11H16V18H8V11H9.2V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.4,8.7 10.4,10V11H13.6V10C13.6,8.7 12.8,8.2 12,8.2Z"/>
                            </svg>
                        </div>
                        <div>
                            <h3 className='text-lg font-semibold text-gray-800'>100% Secure Payment</h3>
                            <p className='text-sm text-gray-600'>We ensure your money is safe</p>
                        </div>
                    </div>
                </div>    
            </div>
        </div>

        {/* Why Us Section */}
        <div className='flex justify-between w-full py-16 bg-white'>
            <div className='max-w-[1200px] mx-auto px-6'>
                {/* Section Title */}
                <div className='text-center mb-12'>
                    <h2 className='text-5xl font-semibold text-gray-800'>Why Us?</h2>
                    <div className='w-16 h-1 bg-[#00B207] mx-auto'></div>
                </div>
                
                {/* Content */}
                <div className='flex items-center gap-12'>
                    {/* Image */}
                    <div className='flex-1'>
                        <img 
                            src={image6}
                            alt="Baby chicks" 
                            className='w-full h-[608px] object-cover rounded-lg'
                        />
                    </div>
                    
                    {/* Content */}
                    <div className='flex-1 h-[608px]'>
                        <h3 className='text-5xl font-bold text-gray-800 mb-6'>
                            100% Trusted<br />
                            Poultry Products
                        </h3>
                        
                        {/* Feature 1 */}
                        <div className='flex justify-between items-start gap-4 mb-6'>
                            <div className='bg-[#00B207] rounded-full'>
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h4 className='text-xl font-medium text-gray-800 mb-3'>
                                    Healthy & natural for lovers of healthy food.
                                </h4>
                                <p className='font-normal text-lg text-gray-600 leading-relaxed'>
                                    Ut quis tempus erat. Phasellus euismod bibendum magna non tristique. Pellentesque semper vestibulum elit sed condimentum. Nunc pretium fermentum interdum.
                                </p>
                            </div>
                        </div>
                        
                        {/* Feature 2 */}
                        <div className='flex items-start gap-4 mb-8'>
                            <div className='bg-[#00B207] rounded-full'>
                                <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div>
                                <h4 className='text-xl font-medium text-gray-800 mb-3'>
                                    Every day fresh and quality products for you.
                                </h4>
                                <p className='font-normal text-lg text-gray-600 leading-relaxed'>
                                    Maecenas vehicula a justo quis laoreet. Sed in placerat nibh, a posuere ex. Morbi sem neque, aliquam sed orci et, rhoncus lobortis felis. Sed vestibulum nisl sit amet sapien.
                                </p>
                            </div>
                        </div>
                        
                        {/* Shop Now Button */}
                        <button 
                            onClick={() => handleBannerClick('/shop')}
                            className='flex items-center gap-5 bg-[#00B207] text-white px-12 py-5 rounded-full font-semibold hover:bg-green-600 transition-colors duration-300'
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
        
        {/* Products Section */}
        <div className='w-full h-[514px] bg-white'>
            <div className='max-w-[1200px] mx-auto px-6'>
                {/* Section Title */}
                <div className='text-center mb-12'>
                    <h2 className='text-4xl font-semibold text-gray-800'>Products</h2>
                </div>
                
                {/* Products Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                    {/* Product 1 - Broiler Day Old Chicks */}
                    <div className='bg-white rounded-md border border-gray-100 w-[269px] h-[328px] px-1 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative mb-4'>
                            <img 
                                src={image7}
                                alt="Broiler Day Old Chicks" 
                                className='w-full h-48 object-cover rounded-md'
                            />
                            <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50'>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                                
                            <h3 className='text-lg font-normal text-gray-700'>Broiler Day Old Chicks</h3>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-base font-medium text-gray-900'>GH₵14.99</span>
                                    <span className='text-base text-gray-400 line-through'>GH₵20.99</span>
                                </div>
                                <button className='flex justify-center items-center w-[40px] h-[40px] bg-gray-100  hover:bg-gray-200 mr-2 rounded-full transition-colors'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart">
                                    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                                    </svg>                        
                                </button>
                            </div>
                            <div className='flex items-center'>
                                {[...Array(4)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                    </div>

                    {/* Product 2 - Feed Additive */}
                    <div className='bg-white rounded-md   w-[269px] h-[328px] px-1 shadow-sm hover:shadow-md transition-shadow border-2 border-[#00B207]'>
                        <div className='relative mb-4'>
                            <img 
                                src={feed} 
                                alt="Feed Additive" 
                                className='w-full h-48 object-cover rounded-md'
                            />
                            <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50'>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className=''>
                            <h3 className='text-lg font-normal text-gray-700 mb-2'>Feed Additive</h3>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-base font-medium text-gray-900'>GH₵12.00</span>
                                </div>
                                <button className='flex justify-center items-center w-[40px] h-[40px] bg-[#00B207] hover:bg-green-600 text-white rounded-full transition-colors'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart">
                                    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                                    </svg>                        
                                </button>
                            </div>
                            <div className='flex items-center mb-3'>
                                {[...Array(4)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Product 3 - Wheat Bran */}
                    <div className='bg-white rounded-md border border-gray-100 w-[269px] h-[328px] px-1 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative mb-4'>
                            <img 
                                src={wheat}
                                alt="Wheat Bran" 
                                className='w-full h-48 object-cover rounded-md'
                            />
                            <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50'>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className=''>
                            <h3 className='text-lg font-normal text-gray-700 mb-2'>Wheat Bran</h3>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-base font-medium text-gray-900'>GH₵14.99</span>
                                    <span className='text-base text-gray-400 line-through'>GH₵20.99</span>
                                </div>
                                <button className='flex justify-center items-center w-[40px] h-[40px] bg-gray-100  hover:bg-gray-200 rounded-full transition-colors'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart">
                                    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                                    </svg>                        
                                </button>
                            </div>
                            <div className='flex items-center mb-3'>
                                {[...Array(4)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                ))}
                                <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Product 4 - Fresh Eggs */}
                    <div className='bg-white rounded-md border border-gray-100 w-[269px] h-[328px] px-1 shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative mb-4'>
                            <img 
                                src={eggs}
                                alt="Fresh Eggs" 
                                className='w-full h-48 object-cover rounded-md'
                            />
                            <button className='absolute top-3 right-3 bg-white p-2 rounded-full shadow-sm hover:bg-gray-50'>
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                        </div>
                        <div className=''>
                            <h3 className='text-lg font-normal text-gray-700 mb-2'>Fresh Eggs</h3>
                            <div className='flex items-center justify-between mb-2'>
                                <div className='flex items-center gap-2'>
                                    <span className='text-base font-medium text-gray-900'>GH₵14.99</span>
                                    <span className='text-base text-gray-400 line-through'>GH₵20.99</span>
                                </div>
                                <button className='flex justify-center items-center w-[40px] h-[40px] bg-gray-100  hover:bg-gray-200 rounded-full transition-colors'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart-icon lucide-shopping-cart">
                                    <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
                                    </svg>                        
                                </button>
                            </div>
                            <div className='flex items-center mb-3'>
                                {[...Array(4)].map((_, i) => (
                                    <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                    </svg>
                                      ))}
                                   <svg className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                </svg>
                            </div>
                        </div>
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
        
        {/* Services Section */}
        <div className='w-full py-16 bg-white'>
            <div className='max-w-[1200px] mx-auto px-6'>
                {/* Section Title */}
                <div className='text-center mb-12'>
                    <h2 className='text-4xl font-semibold text-gray-800'>Services</h2>
                </div>
                
                {/* Services Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-8'>
                    {/* Service 1 - Brooding Training */}
                    <div className='w-[381px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative h-64'>
                            <img 
                                src={sevice1}
                                alt="Brooding Training Service" 
                                className='w-full h-full object-cover'
                            />
                    
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
                    <div className='w-[381px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative h-64'>
                            <img 
                                src={sevice2}
                                alt="Our Services" 
                                className='w-full h-full object-cover'
                            />
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
                    <div className='w-[381px] bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
                        <div className='relative h-64'>
                            <img 
                                src={sevice3} 
                                alt="Consultancy Service" 
                                className='w-full h-full object-cover'
                            />
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
                        className='bg-[#EBF2E8] hover:bg-[#def7d3] text-black px-4 py-3 rounded-3xl font-bold transition-colors duration-300'
                    >
                        View All Services
                    </button>
                </div>
            </div>
        </div>
        
        {/* Statistics Section */}
        <div className="w-full py-16 bg-[url('/src/assets/statistic.jpg')] bg-cover bg-center relative">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/85"></div>
            <div className='max-w-[1200px] mx-auto px-6 relative z-10'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                    {/* Years of Hard Work */}
                    <div className='bg-white/7 rounded-lg p-8 text-center hover:bg-white/14 transition-colors duration-300'>
                        <div className='text-5xl font-bold text-[#00B207] mb-2'>5+</div>
                        <div className='text-white text-lg font-medium'>Years of Hard Work</div>
                    </div>

                    {/* Happy Customer */}
                    <div className='bg-white/7 rounded-lg p-8 text-center hover:bg-white/14 transition-colors duration-300'>
                        <div className='text-5xl font-bold text-[#00B207] mb-2'>500k+</div>
                        <div className='text-white text-lg font-medium'>Happy Customer</div>
                    </div>

                    {/* Qualified Team Member */}
                    <div className='bg-white/7 rounded-lg p-8 text-center hover:bg-white/14 transition-colors duration-300'>
                        <div className='text-5xl font-bold text-[#00B207] mb-2'>28</div>
                        <div className='text-white text-lg font-medium'>Qualified Team Member</div>
                    </div>

                    {/* Monthly Orders */}
                    <div className='bg-white/7 rounded-lg p-8 text-center hover:bg-white/14 transition-colors duration-300'>
                        <div className='text-5xl font-bold text-[#00B207] mb-2'>750k+</div>
                        <div className='text-white text-lg font-medium'>Monthly Orders</div>
                    </div>
                </div>
            </div>
        </div>
        
        {/* Client Testimonial Section */}
        <div className='w-full py-16 bg-white'>
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
        <Footer />
    </div>
  )
}

export default Banner

