// Enhanced Header Component - Dynamic Hero Section with Flash Sales & Trending Products
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiTruck, FiHeadphones, FiShield, FiGift, FiPercent } from 'react-icons/fi';
import PromoBanner from './PromoBanner';
import EnhancedCarousel from './EnhancedCarousel';
import FlashSales from './FlashSales';
import TrendingProducts from './TrendingProducts';
import { flashSaleData, trendingData, promoBanners, enhancedHeroSlides } from '../../../data/heroData';

const Header = () => {
  const navigate = useNavigate();

  // Get current promotional banner (you can cycle through them or use logic to pick one)
  const currentPromoBanner = promoBanners[0]; // You can add logic to rotate banners

  const handlePromoCTA = () => {
    if (currentPromoBanner.ctaText === 'Shop Now') {
      navigate('/shop');
    } else if (currentPromoBanner.ctaText === 'View Sale') {
      navigate('/shop?filter=sale');
    } else if (currentPromoBanner.ctaText === 'Sign Up') {
      navigate('/signup');
    }
  };

  // Enhanced hero slides with proper actions
  const heroSlidesWithActions = enhancedHeroSlides.map(slide => ({
    ...slide,
    ctaAction: () => {
      if (slide.ctaText === 'Shop Products') {
        navigate('/shop');
      } else if (slide.ctaText === 'Shop Flash Sale') {
        navigate('/shop?filter=flash-sales');
      } else if (slide.ctaText === 'Book Consultation') {
        navigate('/services');
      } else if (slide.ctaText === 'View Trending') {
        navigate('/shop?filter=trending');
      }
    },
    ctaSecondaryAction: () => {
      if (slide.ctaSecondary === 'Learn More') {
        navigate('/about');
      } else if (slide.ctaSecondary === 'View Timer') {
        // Scroll to flash sales section
        document.getElementById('flash-sales')?.scrollIntoView({ behavior: 'smooth' });
      } else if (slide.ctaSecondary === 'View Services') {
        navigate('/services');
      } else if (slide.ctaSecondary === 'All Products') {
        navigate('/shop');
      }
    }
  }));

  return (
    <div className='w-full font-poppins'>
      {/* PROMOTIONAL BANNER */}
      <PromoBanner
        message={currentPromoBanner.message}
        ctaText={currentPromoBanner.ctaText}
        ctaAction={handlePromoCTA}
        variant={currentPromoBanner.variant}
        icon={currentPromoBanner.icon === 'truck' ? FiTruck : 
              currentPromoBanner.icon === 'percent' ? FiPercent : FiGift}
      />

      {/* ENHANCED HERO CAROUSEL */}
      <EnhancedCarousel slides={heroSlidesWithActions} />

      {/* FLASH SALES SECTION */}
      <FlashSales 
        flashSaleData={flashSaleData} 
        className="border-b border-gray-100"
      />

      {/* TRENDING PRODUCTS SECTION */}
      <TrendingProducts 
        trendingData={trendingData}
        className="border-b border-gray-100"
      />

      {/* FEATURES SECTION - Simplified & Enhanced */}
      <section className='bg-gray-50 py-4 sm:py-6 lg:py-8'>
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