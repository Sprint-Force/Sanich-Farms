import React, { useEffect, useRef, useState } from 'react';
import { FiShield, FiTruck, FiAward, FiUsers, FiHeart } from 'react-icons/fi';
import { FaLeaf } from 'react-icons/fa'; 

// Company values component for better brand positioning
const CompanyValues = () => {
  const scrollRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollAmount = 0;
    const scrollStep = 1;
    const scrollDelay = 30;

    const autoScroll = () => {
      if (isPaused) return;
      
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        scrollAmount = 0;
        scrollContainer.scrollLeft = 0;
      } else {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;
      }
    };

    // Only auto-scroll on mobile devices
    const isMobile = window.innerWidth < 768;
    let scrollInterval;
    
    if (isMobile) {
      scrollInterval = setInterval(autoScroll, scrollDelay);
    }

    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isPaused]);

  const handleTouchStart = () => {
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000); // Resume after 3 seconds
  };

  const values = [
    {
      id: 1,
      icon: <FiShield className="w-8 h-8" />,
      title: "Quality Assurance",
      description: "Every product undergoes rigorous quality checks to ensure freshness and safety for your family."
    },
    {
      id: 2,
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Sustainable Farming",
      description: "We practice eco-friendly farming methods that protect the environment for future generations."
    },
    {
      id: 3,
      icon: <FiTruck className="w-8 h-8" />,
      title: "Fast Delivery",
      description: "Fresh products delivered to your doorstep quickly with our efficient logistics network."
    },
    {
      id: 4,
      icon: <FiAward className="w-8 h-8" />,
      title: "Proven Expertise",
      description: "Over a decade of experience in poultry farming with industry-leading best practices."
    },
    {
      id: 5,
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Focus",
      description: "Supporting local communities and empowering farmers through knowledge sharing and partnerships."
    },
    {
      id: 6,
      icon: <FiHeart className="w-8 h-8" />,
      title: "Animal Welfare",
      description: "Committed to ethical treatment of animals with spacious, clean, and stress-free environments."
    }
  ];

  return (
    <section className="w-full py-16 md:py-20 bg-white font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Our Core Values
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            These values guide everything we do at Sanich Farms, from how we raise our animals to how we serve our customers.
          </p>
        </div>

        {/* Mobile: Horizontal auto-scroll, Desktop: Grid layout */}
        <div 
          ref={scrollRef}
          onTouchStart={handleTouchStart}
          className="flex overflow-x-auto gap-6 snap-x snap-mandatory pb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 lg:gap-12 hide-scrollbar"
        >
          {values.map((value) => (
            <div key={value.id} className="flex-none w-80 snap-center md:w-auto group text-center p-6 rounded-xl bg-gray-50 hover:bg-green-50 transition duration-300 hover:shadow-lg">
              <div className="flex justify-center mb-4">
                <div className="bg-green-600 text-white p-4 rounded-full group-hover:bg-green-700 transition duration-300">
                  {value.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyValues;
