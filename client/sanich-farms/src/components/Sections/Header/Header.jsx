// Header Component
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiArrowRight, FiTruck, FiHeadphones, FiShield } from 'react-icons/fi';
import { bannerList } from '../../../data/bannerList';

const Header = () => {
  const navigate = useNavigate();

  const handleBannerClick = (link) => {
    navigate(link);
  };

  return (
    <div className='w-full font-poppins'>
      {/* Hero Section (Swiper) */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[90vh]"
      >
        {bannerList.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className='relative h-full w-full'>
              <img
                src={banner.image}
                className='h-full w-full object-cover'
                alt={banner.title}
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1920x1080/cccccc/333333?text=Image+Load+Error"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>
              <div className='absolute flex flex-col justify-center text-left
                              top-1/2 -translate-y-1/2 left-4 sm:left-6 md:left-8 lg:left-12 xl:left-20
                              w-[90%] max-w-[280px] sm:max-w-[380px] md:max-w-[480px] lg:max-w-[600px] xl:max-w-[700px]
                              p-4 sm:p-6 md:p-8 lg:p-10
                              bg-black/40 backdrop-blur-sm rounded-xl shadow-lg
                              animate-fade-in-left'
              >
                <h1 className='text-xs sm:text-sm md:text-base lg:text-lg text-green-400 font-bold uppercase mb-2 sm:mb-3'>
                  {banner.title}
                </h1>
                <p className='text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-3 sm:mb-4'>
                  {banner.subTitle}
                </p>
                <div className='flex mb-4'>
                  <p className='text-sm sm:text-base md:text-lg lg:text-xl font-semibold bg-orange-500 text-white px-3 py-1 rounded-md shadow-md'>
                    Very Affordable
                  </p>
                </div>
                <button
                  onClick={() => handleBannerClick(banner.link)}
                  className='inline-flex items-center justify-center gap-2
                             px-6 py-3 bg-green-600 text-white rounded-full
                             font-semibold text-sm sm:text-base md:text-lg
                             hover:bg-green-700 transition duration-300 ease-in-out
                             shadow-md hover:shadow-lg transform hover:-translate-y-0.5
                             focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50'
                >
                  {banner.buttonText}
                  <FiArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Featured Section (Below Hero) */}
      <div className='w-full py-8 md:py-12 bg-gray-100 flex justify-center relative -mt-12 md:-mt-16 lg:-mt-20 z-10'>
        <div className='w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-xl p-6 md:p-8 transform transition-all duration-300 hover:shadow-2xl'>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
            <div className='flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <div className='bg-green-100 p-3 rounded-full flex-shrink-0 shadow-sm'>
                <FiTruck className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>Fast Delivery</h3>
                <p className='text-sm text-gray-600'>Fast delivery on all your orders</p>
              </div>
            </div>
            <div className='flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <div className='bg-green-100 p-3 rounded-full flex-shrink-0 shadow-sm'>
                <FiHeadphones className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>Customer Support 24/7</h3>
                <p className='text-sm text-gray-600'>Instant access to Support</p>
              </div>
            </div>
            <div className='flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <div className='bg-green-100 p-3 rounded-full flex-shrink-0 shadow-sm'>
                <FiShield className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className='text-lg font-semibold text-gray-800 mb-1'>100% Secure Payment</h3>
                <p className='text-sm text-gray-600'>We ensure your money is safe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;