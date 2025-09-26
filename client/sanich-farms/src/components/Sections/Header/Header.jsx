// Header Component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiArrowRight, FiTruck, FiHeadphones, FiShield, FiShoppingCart } from 'react-icons/fi';
import { bannerList } from '../../../data/bannerList';

const Header = () => {
  const navigate = useNavigate();

  const handleBannerClick = (link) => {
    navigate(link);
  };

  return (
    <div className='w-full font-poppins'>
      {/* Modern Responsive Hero Section - Optimized Mobile Heights */}
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/60 !w-2 !h-2 xs:!w-2.5 xs:!h-2.5 sm:!w-3 sm:!h-3',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-green-500'
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[50vh] xs:h-[55vh] sm:h-[60vh] md:h-[65vh] lg:h-[70vh] xl:h-[75vh]"
      >
        {bannerList.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className='relative h-full w-full'>
              <img
                src={banner.image}
                className='h-full w-full object-cover'
                alt={banner.title}
                onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/1920x1080/E5F3F6/2E8B57?text=Sanich+Farms"; }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
              
              {/* Hero Content - Following About Page Responsive Pattern */}
              <div className='absolute inset-0 flex items-center'>
                <div className="w-full max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
                  <div className="max-w-sm xs:max-w-md sm:max-w-lg lg:max-w-2xl px-2 xs:px-0">
                    {/* Category Badge */}
                    <div className="inline-block px-2 xs:px-3 py-1 xs:py-1.5 bg-green-500/90 backdrop-blur-sm rounded-full mb-2 xs:mb-3 sm:mb-4">
                      <span className="text-xs xs:text-xs sm:text-sm font-semibold text-white uppercase tracking-wide">
                        {banner.title}
                      </span>
                    </div>
                    
                    {/* Main Headline - About Page Pattern */}
                    <h1 className='text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 leading-tight'>
                      {banner.subTitle}
                    </h1>
                    
                    {/* Subtext - About Page Pattern */}
                    <p className="text-sm xs:text-base sm:text-lg lg:text-xl text-gray-200 mb-3 xs:mb-4 sm:mb-6 leading-relaxed max-w-md sm:max-w-lg lg:max-w-xl">
                      Fresh, quality poultry products delivered to your doorstep. Trusted by thousands across Ghana.
                    </p>
                    
                    {/* Action Buttons - About Page Responsive Pattern */}
                    <div className="flex flex-col xs:flex-col sm:flex-row gap-2 xs:gap-3 sm:gap-4">
                      <button
                        onClick={() => handleBannerClick(banner.link)}
                        className='group inline-flex items-center justify-center gap-2
                                   px-4 xs:px-5 sm:px-6 lg:px-8 py-2.5 xs:py-3 sm:py-3.5
                                   bg-green-600 hover:bg-green-700 text-white rounded-lg
                                   font-semibold text-sm xs:text-base sm:text-base
                                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                                   transition-all duration-200 ease-out
                                   focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2
                                   active:transform active:scale-95'
                      >
                        <FiShoppingCart className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform duration-200" />
                        <span>{banner.buttonText}</span>
                      </button>
                      
                      <button
                        onClick={() => navigate('/services')}
                        className="group inline-flex items-center justify-center gap-2
                                   px-4 xs:px-5 sm:px-6 lg:px-8 py-2.5 xs:py-3 sm:py-3.5
                                   bg-white/10 hover:bg-white/20 backdrop-blur-sm
                                   text-white border border-white/30 hover:border-white/50 rounded-lg
                                   font-semibold text-sm xs:text-base sm:text-base
                                   shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
                                   transition-all duration-200 ease-out
                                   focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2
                                   active:transform active:scale-95"
                      >
                        <span>Learn More</span>
                        <FiArrowRight className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform duration-200" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Enhanced Features Section - Full Device Responsive */}
            {/* Compact Modern Features Section - About Page Pattern */}
      <section className='bg-white py-4 xs:py-6 sm:py-8 lg:py-12 shadow-sm border-t'>
        <div className='max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 lg:gap-8'>
            
            {/* Fast Delivery */}
            <div className='flex items-center gap-3 xs:gap-3 sm:gap-4 p-3 xs:p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group'>
              <div className='bg-green-100 group-hover:bg-green-200 p-2 xs:p-2.5 sm:p-3 rounded-full flex-shrink-0 shadow-sm transition-colors duration-200'>
                <FiTruck className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-green-600" />
              </div>
              <div>
                <h3 className='text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-0.5 xs:mb-1'>
                  Fast Delivery
                </h3>
                <p className='text-xs xs:text-sm sm:text-sm text-gray-600 leading-tight'>
                  Same day delivery available
                </p>
              </div>
            </div>
            
            {/* 24/7 Support */}
            <div className='flex items-center gap-3 xs:gap-3 sm:gap-4 p-3 xs:p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group'>
              <div className='bg-blue-100 group-hover:bg-blue-200 p-2 xs:p-2.5 sm:p-3 rounded-full flex-shrink-0 shadow-sm transition-colors duration-200'>
                <FiHeadphones className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className='text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-0.5 xs:mb-1'>
                  24/7 Support
                </h3>
                <p className='text-xs xs:text-sm sm:text-sm text-gray-600 leading-tight'>
                  Expert help anytime
                </p>
              </div>
            </div>
            
            {/* Quality Guarantee */}
            <div className='flex items-center gap-3 xs:gap-3 sm:gap-4 p-3 xs:p-3 sm:p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 group sm:col-span-2 lg:col-span-1'>
              <div className='bg-purple-100 group-hover:bg-purple-200 p-2 xs:p-2.5 sm:p-3 rounded-full flex-shrink-0 shadow-sm transition-colors duration-200'>
                <FiShield className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-purple-600" />
              </div>
              <div>
                <h3 className='text-sm xs:text-base sm:text-lg font-semibold text-gray-900 mb-0.5 xs:mb-1'>
                  Quality Guaranteed
                </h3>
                <p className='text-xs xs:text-sm sm:text-sm text-gray-600 leading-tight'>
                  100% satisfaction promise
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;