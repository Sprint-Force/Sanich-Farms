// Services Component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';


//images
import Service1 from '../../../assets/sevice1.jpg';
import Service2 from '../../../assets/sevice2.jpg';
import Service3 from '../../../assets/sevice3.jpg';
const servicesData = [
  {
    id: 1,
    title: "BROODING TRAINING",
    shortDesc: "Practical intensive brooding training with",
    details: [
      "Poultry experts and knowledgeable professionals",
      "Certificate will be awarded",
    ],
    note: "⭐ Register or fill the form",
    price: "GH₵1,000",
    image: {Service1},
    imageAlt: "Brooding Training Service",
    overlayBg: "bg-blue-600 bg-opacity-85",
    link: "/services/brooding-training",
    cardDesc: "Nulla libero lorem, euismod venenatis nibh sed, sodales dictum ex. Etiam nisl quam, malesuada et pulvinar at, posuere eu neque.",
  },
  {
    id: 2,
    title: "OUR SERVICES",
    shortDesc: "Comprehensive poultry solutions:",
    tags: ["CONSULTANCY", "DEBEAKING", "INJECTING", "BROODING", "BUDGET ESTIMATION", "FARM MANAGEMENT"],
    image: {Service2},
    imageAlt: "Our Services",
    overlayBg: "bg-gradient-to-r from-green-600 to-green-800 bg-opacity-90",
    link: "/services",
    cardDesc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
  {
    id: 3,
    title: "CONSULTANCY",
    shortDesc: "Our Service you can count on. Results you can see.",
    image: {Service3},
    imageAlt: "Consultancy Service",
    overlayBg: "bg-green-700 bg-opacity-85",
    link: "/services/consultancy",
    cardDesc: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit.",
  },
];

const statisticsData = [
  { id: 1, value: "5+", label: "Years of Hard Work" },
  { id: 2, value: "500k+", label: "Happy Customers" },
  { id: 3, value: "28", label: "Qualified Team Members" },
  { id: 4, value: "750k+", label: "Monthly Orders" },
];

const Services = () => {
  const navigate = useNavigate();


  const handleNavigate = (link) => {
    navigate(link);
  };

  return (
    <>
      <section className="w-full py-16 md:py-20 bg-white font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
              Our Services
            </h2>
            <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 md:mb-16">
            {servicesData.map((service) => (
              <div
                key={service.id}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <div className="relative h-64 sm:h-56 md:h-64 lg:h-72">
                  <img
                    src={service.image}
                    alt={service.imageAlt}
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/cccccc/333333?text=Service+Image+Error"; }}
                  />
                  <div className={`absolute inset-0 ${service.overlayBg} flex items-center justify-center p-4`}>
                    <div className="text-center text-white p-2">
                      <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight">{service.title}</h3>
                      {service.shortDesc && (
                        <p className="text-sm sm:text-base mb-4 opacity-90">{service.shortDesc}</p>
                      )}
                      {service.details && (
                        <div className="space-y-2 text-sm text-left inline-block">
                          {service.details.map((detail, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4 text-yellow-300 flex-shrink-0" />
                              <span className="opacity-90">{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                      {service.note && (
                        <p className="text-xs sm:text-sm mt-4 opacity-80">{service.note}</p>
                      )}
                      {service.price && (
                        <p className="text-yellow-300 font-bold text-lg sm:text-xl mt-2">{service.price}</p>
                      )}
                      {service.tags && (
                        <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm mt-4">
                          {service.tags.map((tag, i) => (
                            <span key={i} className={`px-3 py-1 rounded-md font-medium ${i % 2 === 0 ? 'bg-green-700' : 'bg-gray-700'} `}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6 md:p-7">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Details</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed text-base">
                    {service.cardDesc}
                  </p>
                  <button
                    onClick={() => handleNavigate(service.link)}
                    className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2 -ml-2"
                  >
                    Read More
                    <FiArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button
              onClick={() => handleNavigate('/services')}
              className="bg-gray-200 text-gray-800 px-10 py-4 rounded-full font-bold text-lg shadow-md hover:bg-gray-300 hover:shadow-lg transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>

      <section className="w-full py-16 md:py-20 bg-gray-900 font-poppins">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {statisticsData.map((stat) => (
              <div
                key={stat.id}
                className="bg-gray-800 rounded-xl p-8 text-center shadow-lg hover:bg-gray-700 transform hover:-translate-y-1 transition duration-300 ease-in-out"
              >
                <div className="text-5xl sm:text-6xl font-extrabold text-green-500 mb-3 animate-pulse-once">
                  {stat.value}
                </div>
                <div className="text-white text-lg sm:text-xl font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;