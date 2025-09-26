// Header Component - Clean & Simple Design
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { FiTruck, FiHeadphones, FiShield, FiShoppingCart } from 'react-icons/fi';
import { slider1, slider2, slider3 } from '../../../assets';

const Header = () => {
  const navigate = useNavigate();

  // Clean and simple hero slides
  const heroSlides = [
    {
      id: 1,
      title: "Fresh Poultry Products",
      headline: "Farm-Fresh Poultry at Your Fingertips", 
      description: "Quality poultry products delivered fresh to your doorstep",
      image: slider1,
      ctaText: "Shop Now",
      ctaAction: () => navigate('/shop')
    },
    {
      id: 2, 
      title: "Farm Services",
      headline: "Reliable Farm Services, Anytime",
      description: "Professional poultry consulting and farm management support",
      image: slider2,
      ctaText: "Explore Services", 
      ctaAction: () => navigate('/services')
    },
    {
      id: 3,
      title: "Special Offers", 
      headline: "Save More with Weekly Deals",
      description: "Exclusive weekly offers on premium poultry products",
      image: slider3,
      ctaText: "Shop Offers",
      ctaAction: () => navigate('/shop'),
      badge: "Up to 25% OFF"
    }
  ];

  const handleSlideClick = (action) => {
    if (action) action();
  };

  return (
    <div className='w-full font-poppins'>
      {/* CLEAN & SIMPLE HERO CAROUSEL */}
      <section className='relative w-full' role="banner" aria-label="Hero carousel">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ 
            clickable: true,
            bulletClass: 'swiper-pagination-bullet !bg-white/70 !w-2.5 !h-2.5',
            bulletActiveClass: 'swiper-pagination-bullet-active !bg-green-500'
          }}
          autoplay={{ 
            delay: 5000, 
            disableOnInteraction: false
          }}
          loop={true}
          speed={600}
          className="w-full h-[60vh] sm:h-[70vh] lg:h-[75vh]"
        >
          {heroSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className='relative h-full w-full'>
                {/* Background Image */}
                <img
                  src={slide.image}
                  className='h-full w-full object-cover'
                  alt={slide.headline}
                  loading={slide.id === 1 ? "eager" : "lazy"}
                />
                
                {/* Simple Overlay */}
                <div className="absolute inset-0 bg-black/50"></div>
                
                {/* Content */}
                <div className='absolute inset-0 flex items-center'>
                  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl">
                      
                      {/* Badge */}
                      {slide.badge && (
                        <div className="inline-block px-3 py-1 bg-yellow-500 rounded-full mb-4">
                          <span className="text-sm font-semibold text-white">
                            {slide.badge}
                          </span>
                        </div>
                      )}
                      
                      {/* Headline */}
                      <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight'>
                        {slide.headline}
                      </h1>
                      
                      {/* Description */}
                      <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      
                      {/* Simple CTA Button */}
                      <button
                        onClick={() => handleSlideClick(slide.ctaAction)}
                        className='inline-flex items-center gap-3 px-8 py-4 
                                   bg-green-600 hover:bg-green-700 text-white 
                                   rounded-lg font-semibold text-lg
                                   shadow-lg hover:shadow-xl 
                                   transform hover:-translate-y-0.5
                                   transition-all duration-200'
                      >
                        <FiShoppingCart className="w-5 h-5" />
                        <span>{slide.ctaText}</span>
                      </button>
                      
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* SIMPLE FEATURES SECTION */}
            {/* Compact Features Section - All Visible */}
      <section className='bg-gray-50 py-3 sm:py-4 lg:py-6 border-t border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          
          {/* Mobile: Compact 3-column grid - All visible */}
          <div className='grid grid-cols-3 gap-2 sm:hidden'>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-green-100 p-2 rounded-full mb-1'>
                <FiTruck className="w-4 h-4 text-green-600" />
              </div>
              <h3 className='text-xs font-semibold text-gray-900 mb-0.5'>Fast Delivery</h3>
              <p className='text-xs text-gray-600 leading-tight'>Same day</p>
            </div>
            
            <div className='flex flex-col items-center text-center'>
              <div className='bg-blue-100 p-2 rounded-full mb-1'>
                <FiHeadphones className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className='text-xs font-semibold text-gray-900 mb-0.5'>24/7 Support</h3>
              <p className='text-xs text-gray-600 leading-tight'>Expert help</p>
            </div>
            
            <div className='flex flex-col items-center text-center'>
              <div className='bg-purple-100 p-2 rounded-full mb-1'>
                <FiShield className="w-4 h-4 text-purple-600" />
              </div>
              <h3 className='text-xs font-semibold text-gray-900 mb-0.5'>Quality</h3>
              <p className='text-xs text-gray-600 leading-tight'>Guaranteed</p>
            </div>
          </div>
          
          {/* Tablet & Desktop: Horizontal layout with more space */}
          <div className='hidden sm:grid sm:grid-cols-3 gap-6 lg:gap-8'>
            <div className='flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm'>
              <div className='bg-green-100 p-2.5 rounded-full flex-shrink-0'>
                <FiTruck className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className='text-base font-semibold text-gray-900'>Fast Delivery</h3>
                <p className='text-sm text-gray-600'>Same day delivery available</p>
              </div>
            </div>
            
            <div className='flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm'>
              <div className='bg-blue-100 p-2.5 rounded-full flex-shrink-0'>
                <FiHeadphones className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className='text-base font-semibold text-gray-900'>24/7 Support</h3>
                <p className='text-sm text-gray-600'>Expert help anytime</p>
              </div>
            </div>
            
            <div className='flex items-center gap-3 p-3 rounded-lg bg-white shadow-sm'>
              <div className='bg-purple-100 p-2.5 rounded-full flex-shrink-0'>
                <FiShield className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className='text-base font-semibold text-gray-900'>Quality Guaranteed</h3>
                <p className='text-sm text-gray-600'>100% satisfaction promise</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Header;