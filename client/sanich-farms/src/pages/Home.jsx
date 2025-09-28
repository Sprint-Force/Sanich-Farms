// Homepage
import React from 'react';
import Header from '../components/Sections/Header/Header';
import WhyUs from '../components/Sections/WhyUs/WhyUs';
import Products from '../components/Sections/Products/Products';
import Services from '../components/Sections/Services/Services';
import Testimonials from '../components/Sections/Testimonials/Testimonials';
import RecentlyViewed from '../components/UI/RecentlyViewed';

const Home = () => {
  return (
    <>
      <Header />        {/* Your main banner/hero */}
      <WhyUs />         {/* Why Us section */}
      <Products />      {/* Products section */}
      
      {/* Recently Viewed Section - Positioned after Products */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecentlyViewed 
            limit={8} 
            compact={true}
            className="bg-white"
          />
        </div>
      </section>
      
      <Services />      {/* Services section */}
      {/* <Testimonials />  Testimonials section - Hidden as requested */}
    </>
  );
};

export default Home;