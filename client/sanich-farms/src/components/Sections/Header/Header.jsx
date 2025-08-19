// Header Component
import React from 'react';
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
                              top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-6 lg:left-8 xl:left-12
                              w-[95%] sm:w-[90%] max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] xl:max-w-[700px]
                              p-3 sm:p-4 md:p-6 lg:p-8 xl:p-10
                              bg-black/50 backdrop-blur-sm rounded-lg sm:rounded-xl shadow-lg
                              animate-fade-in-left'
              >
                <h1 className='text-xs sm:text-sm md:text-base lg:text-lg text-green-400 font-bold uppercase mb-1 sm:mb-2'>
                  {banner.title}
                </h1>
                <p className='text-white text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-extrabold leading-tight mb-2 sm:mb-3'>
                  {banner.subTitle}
                </p>
                <div className='flex mb-3'>
                  <p className='text-xs sm:text-sm md:text-base lg:text-lg font-semibold bg-orange-500 text-white px-2 sm:px-3 py-1 rounded-md shadow-md'>
                    Very Affordable
                  </p>
                </div>
                <button
                  onClick={() => handleBannerClick(banner.link)}
                  className='inline-flex items-center justify-center gap-2
                             px-4 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-full
                             font-semibold text-xs sm:text-sm md:text-base lg:text-lg
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
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
            <div className='flex items-center gap-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <div className='bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0 shadow-sm'>
                <FiTruck className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div>
                <h3 className='text-sm sm:text-lg font-semibold text-gray-800 mb-1'>Fast Delivery</h3>
                <p className='text-xs sm:text-sm text-gray-600'>Fast delivery on all orders</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <div className='bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0 shadow-sm'>
                <FiHeadphones className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div>
                <h3 className='text-sm sm:text-lg font-semibold text-gray-800 mb-1'>24/7 Support</h3>
                <p className='text-xs sm:text-sm text-gray-600'>Instant access to Support</p>
              </div>
            </div>
            <div className='flex items-center gap-3 p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200'>
              <div className='bg-green-100 p-2 sm:p-3 rounded-full flex-shrink-0 shadow-sm'>
                <FiShield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div>
                <h3 className='text-sm sm:text-lg font-semibold text-gray-800 mb-1'>Secure Payment</h3>
                <p className='text-xs sm:text-sm text-gray-600'>Your money is safe</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;