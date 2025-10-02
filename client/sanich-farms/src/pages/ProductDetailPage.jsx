import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FiHome, 
  FiChevronRight, 
  FiStar, 
  FiMinus, 
  FiPlus, 
  FiShoppingCart, 
  FiHeart, 
  FiCheckCircle,
  FiShield,
  FiTruck,
  FiRefreshCw,
  FiImage,
  FiTag,
  FiInfo,
  FiBox
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useToast } from '../context/ToastContext';
import { productsAPI } from '../services/api';
import ProductCard from '../components/UI/ProductCard';

/**
 * ProductDetailPage - Modern, responsive product detail view
 * Features: Image gallery, product info, tabs, related products
 */

const ProductDetailPage = () => {
  const { productId } = useParams();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToast } = useToast();

  // Helper function to safely format price
  const formatPrice = (price) => {
    const numPrice = typeof price === 'number' ? price : parseFloat(price || 0);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  // State management
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [imageLoaded, setImageLoaded] = useState(false);
  
    // Touch state for swipe functionality
  const [touchStart, setTouchStart] = useState(null);

  // Fetch product and related products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await productsAPI.getById(productId);
        const fetchedProduct = response.product || response;
        
        if (!fetchedProduct) {
          throw new Error('Product not found');
        }

        setProduct(fetchedProduct);
        
        // Fetch related products
        try {
          const relatedResponse = await productsAPI.getRelated(productId);
          console.log('Related products response:', relatedResponse);
          setRelatedProducts(relatedResponse.relatedProducts || []);
        } catch (relatedError) {
          console.warn('Failed to fetch related products:', relatedError);
          setRelatedProducts([]);
        }
        
      } catch (err) {
        console.error('Error fetching product:', err);
        setError(err.message || 'Failed to load product');
        addToast('Failed to load product details', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId, addToast]);

  // Handlers
  const handleQuantityChange = (action) => {
    if (action === 'increase') {
      setQuantity(prev => Math.min(prev + 1, product?.stock_quantity || 99));
    } else if (action === 'decrease') {
      setQuantity(prev => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = () => {
    if (!product) {
      addToast("Product details are not available.", "error");
      return;
    }

    const cartItem = {
      ...product,
      quantity,
      subtotal: product.price * quantity
    };

    addToCart(cartItem);
    addToast(`${product.name} (${quantity}) added to cart!`, 'success');
  };

  const isWishlisted = product ? isInWishlist(product.id) : false;

  const handleToggleWishlist = () => {
    if (!product) {
      addToast("Product details are not available.", "error");
      return;
    }
    
    if (isWishlisted) {
      removeFromWishlist(product.id);
      addToast(`${product.name} removed from wishlist!`, 'info');
    } else {
      addToWishlist(product);
      addToast(`${product.name} added to wishlist!`, 'success');
    }
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;
    
    if (Math.abs(diff) > minSwipeDistance) {
      const productImages = getProductImages();
      if (diff > 0) {
        // Swiped left - next image
        setSelectedImage(prev => (prev + 1) % productImages.length);
      } else {
        // Swiped right - previous image  
        setSelectedImage(prev => prev === 0 ? productImages.length - 1 : prev - 1);
      }
    }
    
    setTouchStart(null);
  };

  // Get product images array - handle up to 3 images
  const getProductImages = () => {
    if (!product) return [];
    const images = [];
    
    // Primary image
    if (product.image_url) {
      images.push(product.image_url);
    }
    
    // For now, since backend only has one image field, we'll create variations
    // TODO: Update this when backend supports multiple images per product
    if (product.image_url) {
      // Generate different angles/views for demo (replace with actual additional images when available)
      const baseImage = product.image_url;
      
      // Add the same image twice more for now (you should replace this with actual additional image fields)
      if (images.length < 3) {
        images.push(baseImage); // Second view
      }
      if (images.length < 3) {
        images.push(baseImage); // Third view  
      }
    }
    
    // Fallback to default if no images
    if (images.length === 0) {
      return [
        'https://placehold.co/600x600/f3f4f6/6b7280?text=No+Image',
        'https://placehold.co/600x600/e5e7eb/9ca3af?text=View+2',
        'https://placehold.co/600x600/d1d5db/6b7280?text=View+3'
      ];
    }
    
    // Ensure we always have exactly 3 images
    while (images.length < 3) {
      images.push(images[0]); // Duplicate first image
    }
    
    return images.slice(0, 3); // Limit to 3 images
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        {/* Loading Breadcrumbs */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-2">
              <div className="w-16 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-3 h-3 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-24 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Loading Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Skeleton Image */}
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse"></div>
              <div className="flex gap-2 md:w-20">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-16 h-16 md:w-20 md:h-20 bg-gray-200 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Skeleton Product Info */}
            <div className="space-y-6">
              {/* Skeleton Title */}
              <div className="space-y-3">
                <div className="w-3/4 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-1/2 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Skeleton Rating */}
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
                <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Skeleton Price */}
              <div className="flex items-center gap-4">
                <div className="w-24 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-20 h-6 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Skeleton Description */}
              <div className="space-y-3">
                <div className="w-full h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-5/6 h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-4/5 h-4 bg-gray-200 rounded animate-pulse"></div>
              </div>

              {/* Skeleton Features */}
              <div className="space-y-2">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="w-32 h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>

              {/* Skeleton Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-32 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>
                <div className="w-full h-12 bg-gray-200 rounded-xl animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiTag className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <Link 
              to="/shop" 
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <FiHome className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const productImages = getProductImages();
  const currentImage = productImages[selectedImage] || productImages[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Modern Breadcrumbs */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center gap-1.5 text-gray-600 hover:text-green-600 transition-colors">
              <FiHome className="w-4 h-4" />
              <span className="font-medium hidden sm:inline">Home</span>
            </Link>
            <FiChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <Link to="/shop" className="text-gray-600 hover:text-green-600 transition-colors font-medium">
              Shop
            </Link>
            <FiChevronRight className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-green-600 font-semibold truncate">{product?.name || 'Product'}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Image */}
            <div 
              className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden group"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="aspect-square">
                <img
                  src={currentImage}
                  alt={product?.name}
                  className={`w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={(e) => {
                    e.target.src = 'https://placehold.co/600x600/f3f4f6/6b7280?text=No+Image';
                    setImageLoaded(true);
                  }}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
                    <FiImage className="w-8 h-8 sm:w-12 sm:h-12 text-gray-300" />
                  </div>
                )}
                {/* Stock Badge */}
                {product?.stock_quantity > 0 && product?.stock_quantity < 10 && (
                  <div className="absolute top-2 left-2 sm:top-4 sm:left-4">
                    <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-2 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-lg">
                      Only {product.stock_quantity} left!
                    </span>
                  </div>
                )}
                {!product?.is_available && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="bg-red-600 text-white text-sm sm:text-lg font-bold px-4 py-2 sm:px-6 sm:py-3 rounded-lg shadow-lg">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery - Always show for 3 images */}
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-green-500 shadow-lg scale-105'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product?.name} view ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = `https://placehold.co/100x100/f3f4f6/6b7280?text=View+${index + 1}`;
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-4 sm:space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-2">
                {product?.name}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        star <= Math.round(product?.rating || 0) 
                          ? 'text-yellow-400 fill-current' 
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm sm:text-base text-gray-600">
                  {product?.rating ? `${product.rating.toFixed(1)} out of 5` : 'No ratings yet'}
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="text-2xl sm:text-3xl font-bold text-green-600">
                  ₵{formatPrice(product?.price)}
                </span>
                {product?.compare_price && parseFloat(product.compare_price) > parseFloat(product.price) && (
                  <>
                    <span className="text-lg sm:text-xl text-gray-400 line-through">
                      ₵{formatPrice(product.compare_price)}
                    </span>
                    <span className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm font-semibold px-2 py-1 rounded">
                      Save {Math.round(((parseFloat(product.compare_price) - parseFloat(product.price)) / parseFloat(product.compare_price)) * 100)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="prose prose-gray max-w-none">
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                {product?.description || 'Premium quality product from Sanich Farms.'}
              </p>
            </div>

            {/* Product Info */}
            <div className="space-y-2 sm:space-y-3">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">Product Information:</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">Category: {product?.category || 'General'}</span>
                </div>
                {product?.unit_of_measure && (
                  <div className="flex items-center gap-2">
                    <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm sm:text-base text-gray-700">Unit: {product.unit_of_measure}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm sm:text-base text-gray-700">
                    Stock: {product?.stock_quantity > 0 ? `${product.stock_quantity} available` : 'Out of stock'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base text-gray-700">Status:</span>
                  <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-bold ${
                    product?.is_available 
                      ? 'bg-green-100 text-green-800 border border-green-200' 
                      : 'bg-red-100 text-red-800 border border-red-200'
                  }`}>
                    {product?.is_available ? '✓ Available' : '✗ Unavailable'}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Quantity & Actions - Hidden on mobile */}
            <div className="space-y-4 hidden md:block">
              {product?.is_available && (
                <div className="flex items-center gap-4">
                  <span className="text-sm lg:text-base font-medium text-gray-700">Quantity:</span>
                  <div className="flex items-center border-2 border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange('decrease')}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 font-semibold text-gray-900 min-w-[3rem] text-center text-base lg:text-lg">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange('increase')}
                      disabled={quantity >= (product?.stock_quantity || 99)}
                      className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!product?.is_available || product?.stock_quantity <= 0}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-3 lg:py-4 px-6 rounded-xl font-semibold text-base lg:text-lg shadow-lg hover:shadow-xl hover:from-green-700 hover:to-green-800 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-green-700 disabled:active:scale-100 transition-all duration-200 flex items-center justify-center gap-3 transform"
                >
                  <FiShoppingCart className="w-5 h-5" />
                  {product?.is_available ? 'Add to Cart' : 'Out of Stock'}
                </button>
                
                <button
                  onClick={handleToggleWishlist}
                  className={`p-3 lg:p-4 rounded-xl border-2 transition-all ${
                    isWishlisted
                      ? 'border-red-500 bg-red-50 text-red-600 hover:bg-red-100'
                      : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500'
                  }`}
                  title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <FiHeart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <FiShield className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Quality Guaranteed</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <FiTruck className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Fast Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-1 sm:mb-2">
                  <FiRefreshCw className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-600" />
                </div>
                <span className="text-xs sm:text-sm text-gray-600">Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Tab Headers */}
          <div className="border-b border-gray-100 bg-gray-50">
            <div className="flex overflow-x-auto">
              {[
                { id: 'description', label: 'Description', icon: FiInfo },
                { id: 'specifications', label: 'Specifications', icon: FiBox },
                { id: 'reviews', label: 'Reviews', icon: FiStar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-green-600 bg-white border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-600'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-4 sm:p-6 lg:p-8">
            {activeTab === 'description' && (
              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Product Description</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">
                  {product?.description || 'This is a premium quality product from Sanich Farms, carefully selected and processed to ensure the highest standards of quality and freshness.'}
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  Our products are sourced from trusted farmers and undergo strict quality control measures to ensure you receive only the best.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Category:</span>
                      <span className="font-medium">{product?.category || 'General'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Stock Quantity:</span>
                      <span className="font-medium">{product?.stock_quantity || 'In Stock'}</span>
                    </div>
                    {product?.unit_of_measure && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Unit of Measure:</span>
                        <span className="font-medium">{product.unit_of_measure}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b border-gray-100">
                      <span className="text-gray-600">Availability:</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold border-2 ${
                        product?.is_available 
                          ? 'bg-green-50 text-green-700 border-green-200' 
                          : 'bg-red-50 text-red-700 border-red-200'
                      }`}>
                        {product?.is_available ? (
                          <>
                            <span className="mr-1">✓</span>
                            Available
                          </>
                        ) : (
                          <>
                            <span className="mr-1">✗</span>
                            Out of Stock
                          </>
                        )}
                      </span>
                    </div>
                    {product?.rating && (
                      <div className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-medium">{product.rating.toFixed(1)} / 5.0</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                <div className="text-center py-8">
                  <FiStar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No reviews yet</p>
                  <p className="text-sm text-gray-400 mt-1">Be the first to review this product!</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="p-6 lg:p-8 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
              <p className="text-gray-600 mt-1">You might also like these products</p>
            </div>
            <div className="p-6 lg:p-8">
              {/* Desktop: Grid Layout */}
              <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.slice(0, 4).map((relatedProduct) => (
                  <ProductCard key={relatedProduct.id} product={relatedProduct} />
                ))}
              </div>
              
              {/* Mobile: Horizontal Scroll */}
              <div className="sm:hidden">
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory">
                  {relatedProducts.slice(0, 6).map((relatedProduct) => (
                    <div key={relatedProduct.id} className="flex-none w-64 snap-start">
                      <ProductCard product={relatedProduct} />
                    </div>
                  ))}
                </div>
                {/* Scroll indicator */}
                {relatedProducts.length > 1 && (
                  <div className="flex justify-center mt-3">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <span>Swipe to see more</span>
                      <span className="text-gray-400">→</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Sticky Actions Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 p-3 sm:p-4 z-50 md:hidden shadow-lg">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quantity Selector */}
          {product?.is_available && (
            <div className="flex items-center border-2 border-gray-200 rounded-lg bg-white">
              <button
                onClick={() => handleQuantityChange('decrease')}
                disabled={quantity <= 1}
                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiMinus className="w-4 h-4" />
              </button>
              <span className="px-2 sm:px-3 py-2 font-semibold text-gray-900 min-w-[2rem] sm:min-w-[2.5rem] text-center text-sm sm:text-base">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange('increase')}
                disabled={quantity >= (product?.stock_quantity || 99)}
                className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiPlus className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            disabled={!product?.is_available || product?.stock_quantity <= 0}
            className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-green-600 disabled:hover:to-green-700 disabled:active:scale-100 transition-all duration-200 flex items-center justify-center gap-2 transform"
          >
            <FiShoppingCart className="w-4 h-4" />
            <span className="text-sm">
              {product?.is_available ? 'Add to Cart' : 'Out of Stock'}
            </span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={handleToggleWishlist}
            className={`p-2.5 sm:p-3 rounded-lg border-2 transition-all ${
              isWishlisted
                ? 'border-red-500 bg-red-50 text-red-600'
                : 'border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-500 bg-white'
            }`}
          >
            <FiHeart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile spacer to prevent content overlap */}
      <div className="h-16 sm:h-20 md:hidden"></div>
    </div>
  );
};

export default ProductDetailPage;