import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination, Autoplay } from 'swiper/modules'

const Header = () => {
  return (
    <div className='w-full h-[1339px]'>
        {/* Hero */}
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
                            <div className='absolute flex items-center text-left top-8 md:top-12 lg:top-16 xl:top-20 left-4 md:left-6 lg:left-8 xl:left-12 w-[280px] md:w-[380px] lg:w-[480px] xl:w-[600px] h-[180px] md:h-[280px] lg:h-[350px] xl:h-[400px] bg-[#999999]/50 rounded-xl px-4 md:px-6 lg:px-8 xl:px-10'>
                                <div className='flex flex-col justify-center gap-2 md:gap-3 lg:gap-4 w-full'>
                                    <h1 className='text-xs md:text-sm lg:text-base text-[#00B207] font-bold uppercase'>Welcome to SANICH FARMS</h1>
                                    <p className='text-black text-xl md:text-3xl lg:text-5xl xl:text-6xl font-bold leading-tight'>{banner.subTitle}</p>
                                    <div className='flex'>
                                        <p className='text-sm md:text-lg lg:text-2xl xl:text-3xl font-semibold bg-black text-[#FF8A00] px-2 py-1 rounded'>Very Affordable</p>
                                    </div>
                                    <button 
                                        onClick={() => handleBannerClick(banner.link)}
                                        className='flex justify-center items-center gap-2 px-3 md:px-4 lg:px-6 py-2 md:py-2 lg:py-3 bg-[#00B207] text-white w-[100px] md:w-[130px] lg:w-[160px] xl:w-[172px] rounded-[53px] hover:bg-green-600 text-xs md:text-sm lg:text-base transition-colors duration-300'
                                    >
                                    {banner.buttonText}
                                    <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14.4293 7.5H1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M14.4293 1.00299L19.8458 7.49946L14.4293 13.997" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
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
        <div className='w-full h-[651px] bg-gray-300 flex justify-center relative'>

            <div className='w-[997px] h-[117px] rounded-lg bg-white flex items-center justify-around px-6'>
                {/* Fast Delivery */}
                <div className='flex items-center gap-4'>
                    <div className='bg-green-100 p-3 rounded-full'>
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
                    <div className='bg-green-100 p-3 rounded-full'>
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
                    <div className='bg-green-100 p-3 rounded-full'>
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
  )
}

export default Header
