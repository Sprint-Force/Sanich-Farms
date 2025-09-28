// EnhancedCarousel - Improved carousel with dynamic features and better CTAs
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { FiShoppingCart, FiArrowRight, FiPlay } from 'react-icons/fi';
import Badge from '../../UI/Badge';

const EnhancedCarousel = ({ slides = [], className = '' }) => {
  const navigate = useNavigate();

  if (!slides || slides.length === 0) {
    return null;
  }

  const handleSlideAction = (action, slideId) => {
    if (action) {
      action();
    } else {
      // Default action
      navigate('/shop');
    }
  };

  const getBadgeVariant = (badgeVariant) => {
    const variants = {
      'flash': 'flash',
      'new': 'new',
      'trending': 'trending',
      'sale': 'sale',
      'hot': 'hot'
    };
    return variants[badgeVariant] || 'primary';
  };

  return (
    <section className={`relative w-full ${className}`} role="banner" aria-label="Hero carousel">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        pagination={{ 
          clickable: true,
          bulletClass: 'swiper-pagination-bullet !bg-white/70 !w-3 !h-3 !mx-1',
          bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !scale-125'
        }}
        autoplay={{ 
          delay: 6000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        speed={800}
        className="w-full h-[60vh] sm:h-[70vh] lg:h-[80vh]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className='relative h-full w-full'>
              {/* Background Image with Better Loading */}
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  className='h-full w-full object-cover'
                  alt={slide.headline}
                  loading={slide.id === 1 ? "eager" : "lazy"}
                />
                {/* Enhanced Overlay with Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
              </div>
              
              {/* Content Container */}
              <div className='absolute inset-0 flex items-center'>
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="max-w-3xl">
                    
                    {/* Badge */}
                    {slide.badge && (
                      <div className="mb-4 animate-pulse">
                        <Badge 
                          variant={getBadgeVariant(slide.badgeVariant)} 
                          size="lg"
                          className="!text-base !px-4 !py-2"
                        >
                          {slide.badge}
                        </Badge>
                      </div>
                    )}
                    
                    {/* Category/Title */}
                    <div className="mb-2">
                      <span className="text-green-400 text-sm font-semibold uppercase tracking-wide">
                        {slide.title}
                      </span>
                    </div>
                    
                    {/* Headline with Animation */}
                    <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight'>
                      {slide.headline}
                    </h1>
                    
                    {/* Description */}
                    <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                      {slide.description}
                    </p>

                    {/* Features List */}
                    {slide.features && slide.features.length > 0 && (
                      <div className="flex flex-wrap gap-3 mb-8">
                        {slide.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-2 text-white">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-sm font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Primary CTA */}
                      <button
                        onClick={() => handleSlideAction(slide.ctaAction, slide.id)}
                        className='inline-flex items-center gap-3 px-8 py-4 
                                   bg-green-600 hover:bg-green-700 text-white 
                                   rounded-xl font-bold text-lg
                                   shadow-xl hover:shadow-2xl 
                                   transform hover:-translate-y-1 hover:scale-105
                                   transition-all duration-300
                                   border-2 border-green-600 hover:border-green-500'
                      >
                        <FiShoppingCart className="w-5 h-5" />
                        <span>{slide.ctaText || 'Shop Now'}</span>
                      </button>
                      
                      {/* Secondary CTA */}
                      {slide.ctaSecondary && (
                        <button
                          onClick={() => handleSlideAction(slide.ctaSecondaryAction, slide.id)}
                          className='inline-flex items-center gap-3 px-8 py-4 
                                     bg-transparent hover:bg-white/10 text-white 
                                     rounded-xl font-semibold text-lg
                                     border-2 border-white/50 hover:border-white
                                     transform hover:-translate-y-1
                                     transition-all duration-300'
                        >
                          {slide.ctaSecondary.includes('Timer') ? 
                            <FiPlay className="w-5 h-5" /> : 
                            <FiArrowRight className="w-5 h-5" />
                          }
                          <span>{slide.ctaSecondary}</span>
                        </button>
                      )}
                    </div>
                    
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-tl from-green-600/20 to-transparent"></div>
              <div className="absolute top-0 left-0 w-1/4 h-1/4 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Dots Enhancement */}
      <style jsx>{`
        .swiper-pagination {
          bottom: 30px !important;
        }
        .swiper-pagination-bullet {
          opacity: 0.7;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet:hover {
          opacity: 1;
          transform: scale(1.2);
        }
      `}</style>
    </section>
  );
};

export default EnhancedCarousel;