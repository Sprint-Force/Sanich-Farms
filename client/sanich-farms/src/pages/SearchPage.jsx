// // src/pages/SearchPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useLocation, Link } from 'react-router-dom';
// import { FiHome, FiChevronRight, FiSearch } from 'react-icons/fi';
// import { productsData } from '../data/productsData'; // Import your products data
// import { servicesData } from '../data/servicesData'; // Import your services data
// import ProductCard from '../components/UI/ProductCard'; // Re-use ProductCard for product results
// import ServiceCard from '../components/UI/ServiceCard'; // Assuming you have a ServiceCard component

// const SearchPage = () => {
//   const location = useLocation();
//   const searchQuery = new URLSearchParams(location.search).get('query') || '';

//   const [productResults, setProductResults] = useState([]);
//   const [serviceResults, setServiceResults] = useState([]);
//   const [hasSearched, setHasSearched] = useState(false);

//   useEffect(() => {
//     if (searchQuery.trim()) {
//       setHasSearched(true);
//       const lowerCaseQuery = searchQuery.toLowerCase();

//       // Filter Products
//       const filteredProducts = productsData.filter(product =>
//         product.name.toLowerCase().includes(lowerCaseQuery) ||
//         product.description.toLowerCase().includes(lowerCaseQuery) ||
//         product.category.toLowerCase().includes(lowerCaseQuery) ||
//         product.tags?.some(tag => tag.toLowerCase().includes(lowerCaseQuery))
//       );
//       setProductResults(filteredProducts);

//       // Filter Services
//       const filteredServices = servicesData.filter(service =>
//         service.title.toLowerCase().includes(lowerCaseQuery) ||
//         service.shortDesc?.toLowerCase().includes(lowerCaseQuery) ||
//         service.fullDescription?.toLowerCase().includes(lowerCaseQuery) ||
//         service.category?.toLowerCase().includes(lowerCaseQuery)
//       );
//       setServiceResults(filteredServices);
//     } else {
//       setHasSearched(false);
//       setProductResults([]);
//       setServiceResults([]);
//     }
//   }, [searchQuery]);

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
//           <span className="text-green-400 text-base font-semibold">Search Results</span>
//         </div>
//       </div>

//       {/* Search Results Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 text-center">
//           Search Results for "{searchQuery}"
//         </h1>

//         {hasSearched && productResults.length === 0 && serviceResults.length === 0 ? (
//           <div className="text-center py-20 text-gray-600 text-xl">
//             <FiSearch size={60} className="mx-auto mb-4 text-gray-400" />
//             <p className="mb-2">No products or services found matching your search.</p>
//             <p>Please try a different keyword or browse our categories.</p>
//             <Link to="/shop" className="text-green-600 hover:underline font-semibold mt-4 block">
//               Browse Products
//             </Link>
//           </div>
//         ) : (
//           <>
//             {productResults.length > 0 && (
//               <div className="mb-12">
//                 <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
//                   Products ({productResults.length})
//                 </h2>
//                 <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
//                   {productResults.map(product => (
//                     <ProductCard key={product.id} product={product} />
//                   ))}
//                 </div>
//               </div>
//             )}

//             {serviceResults.length > 0 && (
//               <div>
//                 <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
//                   Services ({serviceResults.length})
//                 </h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//                   {serviceResults.map(service => (
//                     <ServiceCard key={service.id} service={service} />
//                   ))}
//                 </div>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchPage;

// src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FiHome, FiChevronRight, FiSearch } from 'react-icons/fi';
import { productsData } from '../data/productsData'; // Import your products data
import { servicesData } from '../data/servicesData'; // Import your services data
import ProductCard from '../components/UI/ProductCard'; // Re-use ProductCard for product results
import ServiceCard from '../components/UI/ServiceCard'; // Assuming you have a ServiceCard component

const SearchPage = () => {
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('query') || '';

  const [productResults, setProductResults] = useState([]);
  const [serviceResults, setServiceResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setHasSearched(true);
      const lowerCaseQuery = searchQuery.toLowerCase();

      // Filter Products - Added robust checks for undefined properties
      const filteredProducts = productsData.filter(product => {
        const nameMatch = (product.name || '').toLowerCase().includes(lowerCaseQuery);
        const descriptionMatch = (product.description || product.shortDescription || '').toLowerCase().includes(lowerCaseQuery);
        const categoryMatch = (product.category || '').toLowerCase().includes(lowerCaseQuery);
        const tagsMatch = product.tags?.some(tag => (tag || '').toLowerCase().includes(lowerCaseQuery));

        return nameMatch || descriptionMatch || categoryMatch || tagsMatch;
      });
      setProductResults(filteredProducts);

      // Filter Services - Added robust checks for undefined properties
      const filteredServices = servicesData.filter(service => {
        const titleMatch = (service.title || '').toLowerCase().includes(lowerCaseQuery);
        const shortDescMatch = (service.shortDesc || '').toLowerCase().includes(lowerCaseQuery);
        const fullDescriptionMatch = (service.fullDescription || '').toLowerCase().includes(lowerCaseQuery);
        const categoryMatch = (service.category || '').toLowerCase().includes(lowerCaseQuery); // Assuming services can have a category

        return titleMatch || shortDescMatch || fullDescriptionMatch || categoryMatch;
      });
      setServiceResults(filteredServices);
    } else {
      setHasSearched(false);
      setProductResults([]);
      setServiceResults([]);
    }
  }, [searchQuery]);

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
          <span className="text-green-400 text-base font-semibold">Search Results</span>
        </div>
      </div>

      {/* Search Results Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-8 text-center">
          Search Results for "{searchQuery}"
        </h1>

        {hasSearched && productResults.length === 0 && serviceResults.length === 0 ? (
          <div className="text-center py-20 text-gray-600 text-xl">
            <FiSearch size={60} className="mx-auto mb-4 text-gray-400" />
            <p className="mb-2">No products or services found matching your search.</p>
            <p>Please try a different keyword or browse our categories.</p>
            <Link to="/shop" className="text-green-600 hover:underline font-semibold mt-4 block">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            {productResults.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                  Products ({productResults.length})
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
                  {productResults.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )}

            {serviceResults.length > 0 && (
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-3 border-gray-200">
                  Services ({serviceResults.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {serviceResults.map(service => (
                    <ServiceCard key={service.id} service={service} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
