// // import React from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { FiHome, FiChevronRight, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

// // // CORRECTED IMPORT PATH: Ensure this points to your new servicesData.js file
// // import { servicesData } from '../data/servicesData';

// // const AllServicesPage = () => {
// //   const navigate = useNavigate();

// //   const handleNavigate = (serviceId) => {
// //     // console.log("Navigating to service detail:", `/services/${serviceId}`); // Debugging log
// //     navigate(`/services/${serviceId}`);
// //   };

// //   return (
// //     <div className="font-poppins bg-gray-50 min-h-screen">
// //       {/* Breadcrumbs */}
// //       <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
// //         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
// //           <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
// //             <FiHome className="w-5 h-5" />
// //             <span className="text-base font-medium hidden sm:inline">Home</span>
// //           </Link>
// //           <FiChevronRight className="w-4 h-4 text-gray-400" />
// //           <span className="text-green-400 text-base font-semibold">Our Services</span>
// //         </div>
// //       </div>

// //       {/* Main Services Content */}
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
// //         <div className="text-center mb-12 md:mb-16">
// //           <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
// //             Our Comprehensive Services
// //           </h2>
// //           <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
// //           {servicesData.map((service) => (
// //             <div
// //               key={service.id}
// //               className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out"
// //             >
// //               <div className="relative h-64 sm:h-56 md:h-64 lg:h-72">
// //                 <img
// //                   src={service.image}
// //                   alt={service.imageAlt}
// //                   className="w-full h-full object-cover"
// //                   onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/cccccc/333333?text=Service+Image+Error"; }}
// //                 />
// //                 {/* Text Overlay */}
// //                 <div className={`absolute inset-0 ${service.overlayBg} flex items-center justify-center p-4`}>
// //                   <div className="text-center text-white p-2">
// //                     <h3 className="text-xl sm:text-2xl font-bold mb-3 leading-tight">{service.title}</h3>
// //                     {service.shortDesc && (
// //                       <p className="text-sm sm:text-base mb-4 opacity-90">{service.shortDesc}</p>
// //                     )}
// //                     {service.details && (
// //                       <div className="space-y-2 text-sm text-left inline-block">
// //                         {service.details.map((detail, i) => (
// //                           <div key={i} className="flex items-center gap-2">
// //                             <FiCheckCircle className="w-4 h-4 text-yellow-300 flex-shrink-0" />
// //                             <span className="opacity-90">{detail}</span>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                     {service.note && (
// //                       <p className="text-xs sm:text-sm mt-4 opacity-80">{service.note}</p>
// //                     )}
// //                     {service.price && (
// //                       <p className="text-yellow-300 font-bold text-lg sm:text-xl mt-2">{service.price}</p>
// //                     )}
// //                     {service.tags && (
// //                       <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm mt-4">
// //                         {service.tags.map((tag, i) => (
// //                           <span key={i} className={`px-3 py-1 rounded-md font-medium ${i % 2 === 0 ? 'bg-green-700' : 'bg-gray-700'} `}>
// //                             {tag}
// //                           </span>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //               <div className="p-6 md:p-7">
// //                 <h3 className="text-xl font-semibold text-gray-800 mb-3">Service Details</h3>
// //                 <p className="text-gray-600 mb-4 leading-relaxed text-base">
// //                   {service.cardDesc}
// //                 </p>
// //                 <button
// //                   onClick={() => handleNavigate(service.id)}
// //                   className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2 -ml-2"
// //                 >
// //                   Read More
// //                   <FiArrowRight className="w-5 h-5" />
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AllServicesPage;

// // src/pages/AllServicesPage.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiHome, FiChevronRight } from 'react-icons/fi';
// import { servicesData } from '../data/servicesData';
// import ServiceCard from '../components/UI/ServiceCard'; // Assuming you have this component

// const AllServicesPage = () => {
//   return (
//     <div className="font-poppins bg-gray-50 min-h-screen">
//       {/* Breadcrumbs */}
//       <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
//           <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
//             <FiHome className="w-5 h-5" />
//             <span className="text-base font-medium hidden sm:inline">Home</span>
//           </Link>
//           <FiChevronRight className="w-4 h-4 text-gray-400" />
//           <span className="text-green-400 text-base font-semibold">Our Services</span>
//         </div>
//       </div>

//       {/* NEW: Modernized Services Heading Section */}
//       <div className="bg-white py-10 sm:py-12 md:py-16 border-b border-gray-100 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
//             Our Expert Services
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             From brooding to consultancy, we offer comprehensive services to support your poultry farm.
//           </p>
//         </div>
//       </div>

//       {/* Services Grid */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         {servicesData.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"> {/* Responsive grid */}
//             {servicesData.map((service) => (
//               <ServiceCard key={service.id} service={service} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10 text-gray-600 text-lg">
//             No services available at the moment. Please check back later!
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllServicesPage;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChevronRight } from 'react-icons/fi';
import { servicesAPI } from '../services/api';
import ServiceCard from '../components/UI/ServiceCard';

const AllServicesPage = () => {
  // State for services, loading, and errors
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all services from the API
  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await servicesAPI.getAll();
      // Ensure the response is an array of service objects
      const servicesData = Array.isArray(response) ? response : 
                          Array.isArray(response?.data) ? response.data : 
                          Array.isArray(response?.services) ? response.services : [];
      setServices(servicesData);
    } catch (err) {
      console.error("Failed to fetch services:", err);
      setError("Failed to load services. Please try again later.");
      setServices([]); // Clear services on error
    } finally {
      setLoading(false);
    }
  };

  // Effect to fetch services when the component mounts
  useEffect(() => {
    fetchServices();
  }, []);


  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Our Services</span>
        </div>
      </div>

      {/* NEW: Modernized Services Heading Section */}
      <div className="bg-white py-10 sm:py-12 md:py-16 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Our Expert Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From brooding to consultancy, we offer comprehensive services to support your poultry farm.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {loading ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            Loading services...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 text-lg">
            {error}
          </div>
        ) : services.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-600 text-lg">
            No services available at the moment. Please check back later!
          </div>
        )}
      </div>
    </div>
  );
};

export default AllServicesPage;
