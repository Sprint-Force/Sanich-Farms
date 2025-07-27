// Testimonials Component
import React, { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonialsData = [
  {
    id: 1,
    quote: "Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget",
    author: "Robert Fox",
    role: "Customer",
    avatar: "https://placehold.co/50x50/E0F2F7/2E8B57?text=RF",
    rating: 5,
  },
  {
    id: 2,
    quote: "Maecenas vehicula a justo quis laoreet. Sed in placerat nibh, a posuere ex. Morbi sem neque, aliquam sed orci et, rhoncus lobortis felis. Sed vestibulum nisl sit amet sapien.",
    author: "Dianne Russell",
    role: "Customer",
    avatar: "https://placehold.co/50x50/F0F8FF/36454F?text=DR",
    rating: 4,
  },
  {
    id: 3,
    quote: "Ut quis tempus erat. Phasellus euismod bibendum magna non tristique. Pellentesque semper vestibulum elit sed condimentum. Nunc pretium fermentum interdum.",
    author: "Eleanor Pena",
    role: "Customer",
    avatar: "https://placehold.co/50x50/FFF0F5/800000?text=EP",
    rating: 5,
  },
  {
    id: 4,
    quote: "This farm provides the freshest poultry products I've ever seen. Highly recommend for anyone looking for quality and natural options.",
    author: "John Doe",
    role: "Customer",
    avatar: "https://placehold.co/50x50/E6E6FA/4682B4?text=JD",
    rating: 5,
  },
  {
    id: 5,
    quote: "Excellent service and healthy chicks! My poultry business has seen significant improvement since I started sourcing from Sanich Farms.",
    author: "Jane Smith",
    role: "Business Owner",
    avatar: "https://placehold.co/50x50/F5FFFA/2F4F4F?text=JS",
    rating: 4,
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const getItemsPerPage = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };

  const itemsPerPage = getItemsPerPage();
  const totalPages = Math.ceil(testimonialsData.length / itemsPerPage);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + itemsPerPage;
      return nextIndex >= testimonialsData.length ? 0 : nextIndex;
    });
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => {
      const prev = prevIndex - itemsPerPage;
      return prev < 0 ? (totalPages - 1) * itemsPerPage : prev;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      const newItemsPerPage = getItemsPerPage();
      const newTotalPages = Math.ceil(testimonialsData.length / newItemsPerPage);
      setCurrentIndex(prevIndex => Math.min(prevIndex, (newTotalPages - 1) * newItemsPerPage));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleTestimonials = testimonialsData.slice(currentIndex, currentIndex + itemsPerPage);
  if (visibleTestimonials.length < itemsPerPage && currentIndex !== 0) {
    const remaining = itemsPerPage - visibleTestimonials.length;
    visibleTestimonials.push(...testimonialsData.slice(0, remaining));
  }

  return (
    <section className="w-full py-16 md:py-20 bg-gray-100 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 md:mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
              Clients Testimonial
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto md:mx-0 rounded-full"></div>
          </div>
          <div className="flex gap-4">
            <button
              onClick={goToPrev}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6 text-gray-600" />
            </button>
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shadow-md hover:bg-green-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {visibleTestimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out flex flex-col justify-between"
            >
              <div className="mb-6">
                <FaQuoteLeft className="w-10 h-10 text-green-600 mb-4 opacity-70" />
                <p className="text-gray-700 leading-relaxed text-base">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover border-2 border-green-200 flex-shrink-0"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/50x50/cccccc/333333?text=User"; }}
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 text-lg">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
                <div className="flex gap-0.5 flex-shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-4 h-4 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-2 mt-10">
          {Array.from({ length: totalPages }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx * itemsPerPage)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 ${
                idx === Math.floor(currentIndex / itemsPerPage) ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial page ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;