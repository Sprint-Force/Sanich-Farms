// Homepage
import React from 'react';
import Header from '../components/Sections/Header/Header';
import WhyUs from '../components/Sections/WhyUs/WhyUs';
import Products from '../components/Sections/Products/Products';
import Services from '../components/Sections/Services/Services';
import Testimonials from '../components/Sections/Testimonials/Testimonials';

const Home = () => {
  return (
    <>
      <Header />        {/* Your main banner/hero */}
      <WhyUs />         {/* Why Us section */}
      <Products />      {/* Products section */}
      <Services />      {/* Services section */}
      {/* <Testimonials />  Testimonials section - Hidden as requested */}
    </>
  );
};

export default Home;