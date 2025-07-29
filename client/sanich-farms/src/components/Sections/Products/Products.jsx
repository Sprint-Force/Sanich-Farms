// Products Component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaStar } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

//images
import Image7 from '../../../assets/image7.png';
import Wheat from '../../../assets/wheat.jpg';
import Egg from '../../../assets/egg.jpg';
import Additive from '../../../assets/additive.jpg';
const productsData = [
  {
    id: 1,
    name: "Broiler Day Old Chicks",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    image: {Image7},
    imageAlt: "Broiler Day Old Chicks",
    isFeatured: false,
  },
//   {
//     id: 2,
//     name: "Premium Feed Additive",
//     currentPrice: 12.00,
//     oldPrice: null,
//     rating: 4,
//     image: {}
//     imageAlt: "Feed Additive",
//     isFeatured: true,
//   },
  {
    id: 3,
    name: "Feed Additive",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    image: {Additive},
    imageAlt: "Feed Additive",
    isFeatured: false,
  },
  {
    id: 4,
    name: "Wheat Bran",
    currentPrice: 14.99,
    oldPrice: 20.99,
    rating: 4,
    image: {Wheat},
    imageAlt: "Wheat Bran",
    isFeatured: false,
  },
  {
    id: 5,
    name: "Farm Fresh Eggs (Dozen)",
    currentPrice: 16.50,
    oldPrice: 22.00,
    rating: 5,
    image: {Egg},
    imageAlt: "Farm Fresh Eggs (Dozen)",
    isFeatured: false,
  },
//   {
//     id: 6,
//     name: "Poultry Vitamins",
//     currentPrice: 8.75,
//     oldPrice: null,
//     rating: 3,
//     image: "https://placehold.co/400x300/B0E0E6/0000CD?text=Poultry+Vitamins",
//     imageAlt: "Poultry Vitamins",
//     isFeatured: false,
//   },
];

const Products = () => {
  const navigate = useNavigate();


  const handleViewAllClick = () => {
    navigate('/shop');
  };

  const handleAddToCart = (productId) => {
    console.log(`Added product ${productId} to cart!`);
  };

  const handleAddToWishlist = (productId) => {
    console.log(`Added product ${productId} to wishlist!`);
  };

  return (
    <section className="w-full py-16 md:py-20 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-4 tracking-tight">
            Our Products
          </h2>
          <div className="w-20 h-1.5 bg-green-600 mx-auto rounded-full"></div>
        </div>
        <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16 hide-scrollbar">
          {productsData.map((product) => (
            <div
              key={product.id}
               className={`flex-none w-64 sm:w-72 md:w-auto snap-center
              bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-300 ease-in-out ${
                product.isFeatured ? 'border-2 border-green-600 ring-2 ring-green-200' : ''
              }`}
              >
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="w-full h-48 object-cover rounded-lg"
                  onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/400x300/cccccc/333333?text=Product+Image+Error"; }}
                />
                <button
                  onClick={() => handleAddToWishlist(product.id)}
                  className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 text-gray-600 hover:text-red-500 transition duration-200 focus:outline-none focus:ring-2 focus:ring-green-500"
                  aria-label={`Add ${product.name} to wishlist`}
                >
                  <FaHeart className="w-5 h-5" />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2 leading-tight">
                {product.name}
              </h3>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-xl font-bold text-green-700">
                  GH₵{product.currentPrice.toFixed(2)}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    GH₵{product.oldPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">({product.rating}/5)</span>
              </div>
              <button
                onClick={() => handleAddToCart(product.id)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                aria-label={`Add ${product.name} to cart`}
              >
                <FiShoppingCart className="w-5 h-5" />
                <span className="hidden sm:inline">Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <button
            onClick={handleViewAllClick}
            className="bg-white border-2 border-gray-300 text-gray-800 px-10 py-4 rounded-full font-bold text-lg shadow-md hover:bg-gray-100 hover:border-green-600 hover:text-green-700 transform hover:-translate-y-0.5 transition duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-gray-300 focus:ring-opacity-50"
          >
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;