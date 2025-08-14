// // src/pages/ShopPage.jsx
// import React, { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { FiHome, FiChevronRight, FiFilter, FiSliders, FiChevronDown, FiX } from 'react-icons/fi';
// import ProductCard from '../components/UI/ProductCard';
// import { productsData } from '../data/productsData';

// const ShopPage = () => {
//   const location = useLocation();

//   // State for filters and sorting
//   const [selectedCategory, setSelectedCategory] = useState('All Categories');
//   const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
//   const [selectedRating, setSelectedRating] = useState('All Ratings');
//   const [sortBy, setSortBy] = useState('latest');
//   const [showCount, setShowCount] = useState('12');

//   // State for active filters (to display below the filter bar)
//   const [activeFilters, setActiveFilters] = useState([]);

//   // State for mobile filter menu visibility
//   const [isMobileFilterMenuOpen, setIsMobileFilterMenuOpen] = useState(false);

//   // Effect to set initial category from URL (e.g., /shop/chicks)
//   useEffect(() => {
//     const pathParts = location.pathname.split('/');
//     const categoryFromUrl = pathParts[pathParts.length - 1];
//     if (categoryFromUrl && categoryFromUrl !== 'shop' && categoryFromUrl !== '') {
//       const formattedCategory = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
//       const availableCategories = ['All Categories', 'Chicks', 'Feeds', 'Eggs', 'Vitamins', 'Equipment']; // Ensure all categories are listed
//       if (availableCategories.includes(formattedCategory)) {
//         setSelectedCategory(formattedCategory);
//       } else {
//         setSelectedCategory('All Categories');
//       }
//     } else {
//       setSelectedCategory('All Categories');
//     }
//   }, [location.pathname]);


//   // Simulate applying filters (for demonstration purposes)
//   useEffect(() => {
//     const filters = [];
//     if (selectedCategory !== 'All Categories') filters.push(`Category: ${selectedCategory}`);
//     if (selectedPriceRange !== 'All Prices') filters.push(`Price: ${selectedPriceRange}`);
//     if (selectedRating !== 'All Ratings') filters.push(`Rating: ${selectedRating}`);
//     setActiveFilters(filters);
//   }, [selectedCategory, selectedPriceRange, selectedRating]);

//   // Filter and sort products (simplified client-side logic)
//   const getFilteredAndSortedProducts = () => {
//     let filteredProducts = [...productsData];

//     if (selectedCategory !== 'All Categories') {
//       filteredProducts = filteredProducts.filter(product =>
//         product.category === selectedCategory
//       );
//     }

//     if (selectedPriceRange !== 'All Prices') {
//       const [min, max] = selectedPriceRange.split('-').map(Number);
//       filteredProducts = filteredProducts.filter(product =>
//         (product.currentPrice >= min && product.currentPrice <= max)
//       );
//     }

//     if (selectedRating !== 'All Ratings') {
//       const minRating = parseInt(selectedRating.split(' ')[0]);
//       filteredProducts = filteredProducts.filter(product => product.rating >= minRating);
//     }

//     filteredProducts.sort((a, b) => {
//       if (sortBy === 'latest') {
//         return b.id - a.id;
//       } else if (sortBy === 'price-asc') {
//         return (a.currentPrice || 0) - (b.currentPrice || 0); // Handle potential undefined prices
//       } else if (sortBy === 'price-desc') {
//         return (b.currentPrice || 0) - (a.currentPrice || 0); // Handle potential undefined prices
//       } else if (sortBy === 'name-asc') {
//         return (a.name || '').localeCompare(b.name || ''); // Handle potential undefined names
//       }
//       return 0;
//     });

//     return filteredProducts.slice(0, parseInt(showCount));
//   };

//   const displayedProducts = getFilteredAndSortedProducts();

//   // Function to remove an active filter
//   const removeFilter = (filterText) => {
//     if (filterText.includes('Category:')) setSelectedCategory('All Categories');
//     if (filterText.includes('Price:')) setSelectedPriceRange('All Prices');
//     if (filterText.includes('Rating:')) setSelectedRating('All Ratings');
//   };

//   // Toggle mobile filter menu
//   const toggleMobileFilterMenu = () => {
//     setIsMobileFilterMenuOpen(!isMobileFilterMenuOpen);
//   };

//   // Close mobile filter menu on apply/clear
//   const closeMobileFilterMenu = () => {
//     setIsMobileFilterMenuOpen(false);
//   };


//   return (
//     <div className="font-poppins bg-gray-50 min-h-screen">
//       {/* Breadcrumbs - Remains the same, already responsive */}
//       <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
//           <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
//             <FiHome className="w-5 h-5" />
//             <span className="text-base font-medium hidden sm:inline">Home</span>
//           </Link>
//           <FiChevronRight className="w-4 h-4 text-gray-400" />
//           <span className="text-green-400 text-base font-semibold">Shop</span>
//         </div>
//       </div>

//       {/* NEW: Modernized Shop Heading Section */}
//       <div className="bg-white py-10 sm:py-12 md:py-16 border-b border-gray-100 shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
//             Explore Our Products
//           </h1>
//           <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//             Discover a wide range of high-quality poultry products and essential farm supplies.
//           </p>
//         </div>
//       </div>

//       {/* Main Shop Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
//         {/* Mobile Filter Toggle Button */}
//         <div className="md:hidden flex justify-end mb-6">
//           <button
//             onClick={toggleMobileFilterMenu}
//             className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//           >
//             <FiFilter size={20} />
//             Filters
//           </button>
//         </div>

//         {/* Filter and Sort Bar (Desktop View) */}
//         <div className="hidden md:block bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 md:mb-12">
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
//             {/* Filter Dropdowns */}
//             <div className="flex flex-wrap gap-3 md:gap-4 flex-grow">
//               {/* Category Filter */}
//               <div className="relative flex-1 min-w-[150px]">
//                 <select
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//                 >
//                   <option value="All Categories">All Categories</option>
//                   <option value="Chicks">Chicks</option>
//                   <option value="Feeds">Feeds</option>
//                   <option value="Eggs">Eggs</option>
//                   <option value="Vitamins">Vitamins</option>
//                   <option value="Equipment">Equipment</option> {/* Added Equipment */}
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>

//               {/* Price Filter */}
//               <div className="relative flex-1 min-w-[150px]">
//                 <select
//                   value={selectedPriceRange}
//                   onChange={(e) => setSelectedPriceRange(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//                 >
//                   <option value="All Prices">All Prices</option>
//                   <option value="0-10">GH₵0 - GH₵10</option>
//                   <option value="10-20">GH₵10 - GH₵20</option>
//                   <option value="20-50">GH₵20 - GH₵50</option>
//                   <option value="50-100">GH₵50 - GH₵100</option>
//                   <option value="100-500">GH₵100 - GH₵500</option> {/* Added higher range */}
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>

//               {/* Rating Filter */}
//               <div className="relative flex-1 min-w-[150px]">
//                 <select
//                   value={selectedRating}
//                   onChange={(e) => setSelectedRating(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//                 >
//                   <option value="All Ratings">All Ratings</option>
//                   <option value="5 Stars">5 Stars</option>
//                   <option value="4 Stars">4 Stars & Up</option>
//                   <option value="3 Stars">3 Stars & Up</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Sort By and Show Count */}
//             <div className="flex flex-wrap gap-3 md:gap-4 md:justify-end">
//               {/* Sort By */}
//               <div className="relative flex-1 min-w-[120px] md:flex-none">
//                 <select
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//                 >
//                   <option value="latest">Sort by: Latest</option>
//                   <option value="price-asc">Price: Low to High</option>
//                   <option value="price-desc">Price: High to Low</option>
//                   <option value="name-asc">Name: A to Z</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>

//               {/* Show Count */}
//               <div className="relative flex-1 min-w-[100px] md:flex-none">
//                 <select
//                   value={showCount}
//                   onChange={(e) => setShowCount(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
//                 >
//                   <option value="12">Show: 12</option>
//                   <option value="24">Show: 24</option>
//                   <option value="48">Show: 48</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//             </div>
//           </div>

//           {/* Active Filters and Results Count */}
//           <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-100 gap-4">
//             <div className="flex flex-wrap items-center gap-2">
//               <span className="text-gray-700 font-medium text-base">Active Filters:</span>
//               {activeFilters.length > 0 ? (
//                 activeFilters.map((filter, index) => (
//                   <span key={index} className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
//                     {filter}
//                     <button onClick={() => removeFilter(filter)} className="ml-1 text-green-600 hover:text-green-800" aria-label={`Remove filter ${filter}`}>
//                       <FiX size={12} />
//                     </button>
//                   </span>
//                 ))
//               ) : (
//                 <span className="text-gray-500 text-sm">None</span>
//               )}
//             </div>
//             <p className="text-gray-700 font-medium text-sm">
//               {displayedProducts.length} Results found (out of {productsData.length} total)
//             </p>
//           </div>
//         </div>

//         {/* Mobile Filter Sidebar (Off-Canvas Menu) */}
//         <div
//           className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
//             ${isMobileFilterMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
//         >
//           <div className="flex items-center justify-between p-4 border-b border-gray-200">
//             <h3 className="text-xl font-bold text-gray-800">Filters</h3>
//             <button onClick={toggleMobileFilterMenu} className="text-gray-600 hover:text-gray-800" aria-label="Close filters">
//               <FiX size={24} />
//             </button>
//           </div>
//           <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-64px)]"> {/* Adjusted height for mobile filter menu */}
//             {/* Category Filter */}
//             <div>
//               <label htmlFor="mobile-category" className="block text-gray-700 font-semibold mb-2 text-base">Category</label>
//               <div className="relative">
//                 <select
//                   id="mobile-category"
//                   value={selectedCategory}
//                   onChange={(e) => setSelectedCategory(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="All Categories">All Categories</option>
//                   <option value="Chicks">Chicks</option>
//                   <option value="Feeds">Feeds</option>
//                   <option value="Eggs">Eggs</option>
//                   <option value="Vitamins">Vitamins</option>
//                   <option value="Equipment">Equipment</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Price Filter */}
//             <div>
//               <label htmlFor="mobile-price" className="block text-gray-700 font-semibold mb-2 text-base">Price Range</label>
//               <div className="relative">
//                 <select
//                   id="mobile-price"
//                   value={selectedPriceRange}
//                   onChange={(e) => setSelectedPriceRange(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="All Prices">All Prices</option>
//                   <option value="0-10">GH₵0 - GH₵10</option>
//                   <option value="10-20">GH₵10 - GH₵20</option>
//                   <option value="20-50">GH₵20 - GH₵50</option>
//                   <option value="50-100">GH₵50 - GH₵100</option>
//                   <option value="100-500">GH₵100 - GH₵500</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Rating Filter */}
//             <div>
//               <label htmlFor="mobile-rating" className="block text-gray-700 font-semibold mb-2 text-base">Rating</label>
//               <div className="relative">
//                 <select
//                   id="mobile-rating"
//                   value={selectedRating}
//                   onChange={(e) => setSelectedRating(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="All Ratings">All Ratings</option>
//                   <option value="5 Stars">5 Stars</option>
//                   <option value="4 Stars">4 Stars & Up</option>
//                   <option value="3 Stars">3 Stars & Up</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Sort By */}
//             <div>
//               <label htmlFor="mobile-sort" className="block text-gray-700 font-semibold mb-2 text-base">Sort By</label>
//               <div className="relative">
//                 <select
//                   id="mobile-sort"
//                   value={sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="latest">Latest</option>
//                   <option value="price-asc">Price: Low to High</option>
//                   <option value="price-desc">Price: High to Low</option>
//                   <option value="name-asc">Name: A to Z</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Show Count */}
//             <div>
//               <label htmlFor="mobile-show-count" className="block text-gray-700 font-semibold mb-2 text-base">Show</label>
//               <div className="relative">
//                 <select
//                   id="mobile-show-count"
//                   value={showCount}
//                   onChange={(e) => setShowCount(e.target.value)}
//                   className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
//                 >
//                   <option value="12">12</option>
//                   <option value="24">24</option>
//                   <option value="48">48</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
//               </div>
//             </div>

//             {/* Apply Filters Button (Optional, can just apply on change) */}
//             <button
//               onClick={closeMobileFilterMenu}
//               className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 mt-6 text-lg"
//             >
//               Apply Filters
//             </button>
//           </div>
//         </div>

//         {/* Mobile Filter Menu Backdrop */}
//         {isMobileFilterMenuOpen && (
//           <div
//             className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
//             onClick={toggleMobileFilterMenu}
//           ></div>
//         )}


//         {/* Product Grid - Responsive columns based on screen size */}
//         {displayedProducts.length > 0 ? (
//           <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
//             {displayedProducts.map((product) => (
//               <ProductCard key={product.id} product={product} />
//             ))}
//           </div>
//         ) : (
//           <div className="text-center py-10 text-gray-600 text-lg col-span-full">
//             No products match your current filters.
//           </div>
//         )}

//         {/* Pagination (Placeholder) */}
//         <div className="flex justify-center mt-12">
//           <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-700 transition duration-300 text-lg">
//             Load More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShopPage;


// src/pages/ShopPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiChevronRight, FiFilter, FiChevronDown, FiX } from 'react-icons/fi';
import ProductCard from '../components/UI/ProductCard';
import axios from 'axios'; // Import axios for API calls

const ShopPage = () => {
  const location = useLocation();

  // State for products, loading, and errors
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);

  // State for filters and sorting
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All Prices');
  const [selectedRating, setSelectedRating] = useState('All Ratings');
  const [sortBy, setSortBy] = useState('latest');
  const [showCount, setShowCount] = useState('12');

  // State for active filters (to display below the filter bar)
  const [activeFilters, setActiveFilters] = useState([]);

  // State for mobile filter menu visibility
  const [isMobileFilterMenuOpen, setIsMobileFilterMenuOpen] = useState(false);

  // Define API URL
  const BASE_URL = 'https://sanich-farms-tnac.onrender.com/api/products';

  // Function to fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query parameters based on current state
      const params = {};
      if (selectedCategory !== 'All Categories') {
        params.category = selectedCategory.toLowerCase();
      }
      if (selectedPriceRange !== 'All Prices') {
        const [min, max] = selectedPriceRange.split('-').map(Number);
        params.minPrice = min;
        params.maxPrice = max;
      }
      if (selectedRating !== 'All Ratings') {
        params.minRating = parseInt(selectedRating.split(' ')[0]);
      }
      // Pass sort and limit parameters
      params.sort = sortBy;
      params.limit = showCount;

      const response = await axios.get(BASE_URL, { params });
      setProducts(response.data.products);
      setTotalProducts(response.data.totalCount || response.data.products.length); // Use totalCount if provided, otherwise fallback
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError("Failed to load products. Please try again later.");
      setProducts([]); // Clear products on error
      setTotalProducts(0);
    } finally {
      setLoading(false);
    }
  };

  // Effect to set initial category from URL and fetch products
  useEffect(() => {
    const pathParts = location.pathname.split('/');
    const categoryFromUrl = pathParts[pathParts.length - 1];
    if (categoryFromUrl && categoryFromUrl !== 'shop' && categoryFromUrl !== '') {
      const formattedCategory = categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1);
      const availableCategories = ['All Categories', 'Chicks', 'Feeds', 'Eggs', 'Vitamins', 'Equipment'];
      if (availableCategories.includes(formattedCategory)) {
        setSelectedCategory(formattedCategory);
      } else {
        setSelectedCategory('All Categories');
      }
    } else {
      setSelectedCategory('All Categories');
    }

    // Call fetchProducts whenever the component mounts or URL changes
    fetchProducts();
  }, [location.pathname]); // Dependency on location.pathname to handle direct URL access

  // Effect to trigger product fetch whenever filters or sort options change
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, selectedPriceRange, selectedRating, sortBy, showCount]);

  // Effect to update active filters for display
  useEffect(() => {
    const filters = [];
    if (selectedCategory !== 'All Categories') filters.push(`Category: ${selectedCategory}`);
    if (selectedPriceRange !== 'All Prices') filters.push(`Price: ${selectedPriceRange}`);
    if (selectedRating !== 'All Ratings') filters.push(`Rating: ${selectedRating}`);
    setActiveFilters(filters);
  }, [selectedCategory, selectedPriceRange, selectedRating]);

  // Function to remove an active filter
  const removeFilter = (filterText) => {
    if (filterText.includes('Category:')) setSelectedCategory('All Categories');
    if (filterText.includes('Price:')) setSelectedPriceRange('All Prices');
    if (filterText.includes('Rating:')) setSelectedRating('All Ratings');
  };

  // Toggle mobile filter menu
  const toggleMobileFilterMenu = () => {
    setIsMobileFilterMenuOpen(!isMobileFilterMenuOpen);
  };

  // Close mobile filter menu on apply/clear
  const closeMobileFilterMenu = () => {
    setIsMobileFilterMenuOpen(false);
  };

  return (
    <div className="font-poppins bg-gray-50 min-h-screen">
      {/* Breadcrumbs - Remains the same, already responsive */}
      <div className="w-full py-8 md:py-10 bg-gradient-to-r from-gray-800 to-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-2 text-white">
          <Link to="/" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors duration-200" aria-label="Go to Home page">
            <FiHome className="w-5 h-5" />
            <span className="text-base font-medium hidden sm:inline">Home</span>
          </Link>
          <FiChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-green-400 text-base font-semibold">Shop</span>
        </div>
      </div>

      {/* NEW: Modernized Shop Heading Section */}
      <div className="bg-white py-10 sm:py-12 md:py-16 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            Explore Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover a wide range of high-quality poultry products and essential farm supplies.
          </p>
        </div>
      </div>

      {/* Main Shop Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Mobile Filter Toggle Button */}
        <div className="md:hidden flex justify-end mb-6">
          <button
            onClick={toggleMobileFilterMenu}
            className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-full shadow-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <FiFilter size={20} />
            Filters
          </button>
        </div>

        {/* Filter and Sort Bar (Desktop View) */}
        <div className="hidden md:block bg-white p-4 sm:p-6 rounded-xl shadow-md mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-6">
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3 md:gap-4 flex-grow">
              {/* Category Filter */}
              <div className="relative flex-1 min-w-[150px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Chicks">Chicks</option>
                  <option value="Feeds">Feeds</option>
                  <option value="Eggs">Eggs</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Equipment">Equipment</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative flex-1 min-w-[150px]">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="All Prices">All Prices</option>
                  <option value="0-10">GH₵0 - GH₵10</option>
                  <option value="10-20">GH₵10 - GH₵20</option>
                  <option value="20-50">GH₵20 - GH₵50</option>
                  <option value="50-100">GH₵50 - GH₵100</option>
                  <option value="100-500">GH₵100 - GH₵500</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Rating Filter */}
              <div className="relative flex-1 min-w-[150px]">
                <select
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="All Ratings">All Ratings</option>
                  <option value="5 Stars">5 Stars</option>
                  <option value="4 Stars">4 Stars & Up</option>
                  <option value="3 Stars">3 Stars & Up</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Sort By and Show Count */}
            <div className="flex flex-wrap gap-3 md:gap-4 md:justify-end">
              {/* Sort By */}
              <div className="relative flex-1 min-w-[120px] md:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="latest">Sort by: Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>

              {/* Show Count */}
              <div className="relative flex-1 min-w-[100px] md:flex-none">
                <select
                  value={showCount}
                  onChange={(e) => setShowCount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
                >
                  <option value="12">Show: 12</option>
                  <option value="24">Show: 24</option>
                  <option value="48">Show: 48</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters and Results Count */}
          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 pt-4 border-t border-gray-100 gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-gray-700 font-medium text-base">Active Filters:</span>
              {activeFilters.length > 0 ? (
                activeFilters.map((filter, index) => (
                  <span key={index} className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1">
                    {filter}
                    <button onClick={() => removeFilter(filter)} className="ml-1 text-green-600 hover:text-green-800" aria-label={`Remove filter ${filter}`}>
                      <FiX size={12} />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-gray-500 text-sm">None</span>
              )}
            </div>
            <p className="text-gray-700 font-medium text-sm">
              {products.length} Results found (out of {totalProducts} total)
            </p>
          </div>
        </div>

        {/* Mobile Filter Sidebar (Off-Canvas Menu) */}
        <div
          className={`fixed inset-y-0 left-0 w-64 bg-white z-50 transform transition-transform duration-300 ease-in-out md:hidden
            ${isMobileFilterMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-800">Filters</h3>
            <button onClick={toggleMobileFilterMenu} className="text-gray-600 hover:text-gray-800" aria-label="Close filters">
              <FiX size={24} />
            </button>
          </div>
          <div className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-64px)]">
            {/* Category Filter */}
            <div>
              <label htmlFor="mobile-category" className="block text-gray-700 font-semibold mb-2 text-base">Category</label>
              <div className="relative">
                <select
                  id="mobile-category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All Categories">All Categories</option>
                  <option value="Chicks">Chicks</option>
                  <option value="Feeds">Feeds</option>
                  <option value="Eggs">Eggs</option>
                  <option value="Vitamins">Vitamins</option>
                  <option value="Equipment">Equipment</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Price Filter */}
            <div>
              <label htmlFor="mobile-price" className="block text-gray-700 font-semibold mb-2 text-base">Price Range</label>
              <div className="relative">
                <select
                  id="mobile-price"
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All Prices">All Prices</option>
                  <option value="0-10">GH₵0 - GH₵10</option>
                  <option value="10-20">GH₵10 - GH₵20</option>
                  <option value="20-50">GH₵20 - GH₵50</option>
                  <option value="50-100">GH₵50 - GH₵100</option>
                  <option value="100-500">GH₵100 - GH₵500</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label htmlFor="mobile-rating" className="block text-gray-700 font-semibold mb-2 text-base">Rating</label>
              <div className="relative">
                <select
                  id="mobile-rating"
                  value={selectedRating}
                  onChange={(e) => setSelectedRating(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="All Ratings">All Ratings</option>
                  <option value="5 Stars">5 Stars</option>
                  <option value="4 Stars">4 Stars & Up</option>
                  <option value="3 Stars">3 Stars & Up</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label htmlFor="mobile-sort" className="block text-gray-700 font-semibold mb-2 text-base">Sort By</label>
              <div className="relative">
                <select
                  id="mobile-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="latest">Latest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Show Count */}
            <div>
              <label htmlFor="mobile-show-count" className="block text-gray-700 font-semibold mb-2 text-base">Show</label>
              <div className="relative">
                <select
                  id="mobile-show-count"
                  value={showCount}
                  onChange={(e) => setShowCount(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg appearance-none bg-white pr-8 text-gray-700 text-base focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="12">12</option>
                  <option value="24">24</option>
                  <option value="48">48</option>
                </select>
                <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Apply Filters Button (Optional, can just apply on change) */}
            <button
              onClick={closeMobileFilterMenu}
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 mt-6 text-lg"
            >
              Apply Filters
            </button>
          </div>
        </div>

        {/* Mobile Filter Menu Backdrop */}
        {isMobileFilterMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={toggleMobileFilterMenu}
          ></div>
        )}

        {/* Product Grid and Loading/Error States */}
        {loading ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            Loading products...
          </div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 text-lg">
            {error}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 auto-rows-fr">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-600 text-lg col-span-full">
            No products match your current filters.
          </div>
        )}

        {/* Pagination (Placeholder) */}
        <div className="flex justify-center mt-12">
          {/* Note: In a real-world scenario, this button would load more data from the API */}
          <button className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md hover:bg-green-700 transition duration-300 text-lg">
            Load More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
