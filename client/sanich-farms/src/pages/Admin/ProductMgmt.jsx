import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiStar, FiToggleLeft, FiToggleRight, FiX, FiUpload, FiTag, FiChevronDown } from 'react-icons/fi';

const ProductMgmt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'active', 'inactive'
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    originalPrice: '',
    discount: '',
    stock: '',
    description: '',
    tags: '',
    featured: false,
    active: true,
    seasonal: false,
    bulkAvailable: false,
    bulkMinQuantity: '',
    bulkDiscount: '',
    seasonStartDate: '',
    seasonEndDate: '',
    images: []
  });

  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false); // PRODUCT API FIX: Add loading state for actions
  const [error, setError] = useState(null); // PRODUCT API FIX: Add error state
  const [successMessage, setSuccessMessage] = useState(''); // PRODUCT API FIX: Add success message

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingProducts(true);
      try {
        // Use admin endpoint that includes inactive products
        const data = await productsAPI.getAllAdmin();
        if (!mounted) return;
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch {
        console.warn('Failed to fetch products from admin API, trying regular API');
        // fallback to regular API
        try {
          const data = await productsAPI.getAll();
          if (!mounted) return;
          setProducts(Array.isArray(data) ? data : data.products || []);
        } catch {
          console.warn('Failed to fetch products from both APIs, using empty array');
          if (mounted) setProducts([]);
        }
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const categories = ['all', 'chicks', 'feeds', 'eggs', 'vitamins', 'equipment'];

  const formatCategoryLabel = (key) => {
    if (!key) return '';
    if (key === 'feeds') return 'Feeds';
    if (key === 'chicks') return 'Chicks';
    if (key === 'eggs') return 'Eggs';
    if (key === 'vitamins') return 'Vitamins';
    if (key === 'equipment') return 'Equipment';
    return String(key).charAt(0).toUpperCase() + String(key).slice(1);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-800';
      case 'Out of Stock': return 'bg-red-100 text-red-800';
      case 'Inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // PRODUCT API FIX: Helper function to compute product status based on backend fields
  const getProductStatus = (product) => {
    if (!product) return 'Unknown';
    const stock = product.stock_quantity || product.stock || 0;
    const isAvailable = product.is_available !== false; // Default to true if undefined
    
    if (!isAvailable) return 'Inactive';
    if (stock <= 0) return 'Out of Stock';
    return 'Active';
  };

  // PRODUCT API FIX: Helper function to get stock quantity from various field names
  const getStockQuantity = (product) => {
    return product?.stock_quantity || product?.stock || 0;
  };

  const filteredProducts = products.filter(product => {
    const name = (product && product.name) ? String(product.name) : '';
    const category = (product && product.category) ? String(product.category).toLowerCase() : '';
    const isActive = product.is_available !== false; // Default to true if undefined
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || category === String(filterCategory).toLowerCase();
    
    // Status filter logic
    let matchesStatusFilter = true;
    if (statusFilter === 'active') {
      matchesStatusFilter = isActive;
    } else if (statusFilter === 'inactive') {
      matchesStatusFilter = !isActive;
    }
    // If statusFilter === 'all', matchesStatusFilter remains true
    
    return matchesSearch && matchesCategory && matchesStatusFilter;
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // PRODUCT API FIX: Simplified image upload handling
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Store files for upload and create previews
    const previews = files.map(file => ({ 
      file, 
      url: URL.createObjectURL(file),
      name: file.name 
    }));
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...previews]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
    // Build images array from multiple possible fields returned by API
    const imagesArr = [];
    if (Array.isArray(product.images)) imagesArr.push(...product.images);
    else if (product.images) imagesArr.push(product.images);
    if (product.image_url) imagesArr.unshift(product.image_url);
    if (product.image) imagesArr.unshift(product.image);
    if (product.thumbnail) imagesArr.push(product.thumbnail);

    // remove duplicates while preserving order
    const uniqueImages = Array.from(new Set(imagesArr.filter(Boolean)));

    setFormData({
  name: product.name || '',
  category: product.category || '',
  price: product.price != null ? String(product.price) : '',
  originalPrice: product.originalPrice != null ? String(product.originalPrice) : '',
  discount: product.discount != null ? String(product.discount) : '',
  stock: product.stock_quantity != null ? String(product.stock_quantity) : (product.stock != null ? String(product.stock) : ''),
  description: product.description || '',
  tags: Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags ? String(product.tags) : ''),
  featured: !!product.featured,
  active: product.is_available !== false, // Use is_available field from backend
  seasonal: !!product.seasonal,
  bulkAvailable: !!product.bulkAvailable,
  bulkMinQuantity: product.bulkMinQuantity != null ? String(product.bulkMinQuantity) : '',
  bulkDiscount: product.bulkDiscount != null ? String(product.bulkDiscount) : '',
  seasonStartDate: product.seasonStartDate || '',
  seasonEndDate: product.seasonEndDate || '',
  images: uniqueImages
    });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        originalPrice: '',
        discount: '',
        stock: '',
        description: '',
        tags: '',
        featured: false,
        active: true,
        seasonal: false,
        bulkAvailable: false,
        bulkMinQuantity: '',
        bulkDiscount: '',
        seasonStartDate: '',
        seasonEndDate: '',
        images: []
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // PRODUCT API FIX: Validate required fields
    if (!formData.name.trim() || !formData.category || !formData.price || !formData.stock) {
      setError('Please fill in all required fields: name, category, price, and stock quantity.');
      return;
    }

    setLoadingAction(true);
    setError(null);
    setSuccessMessage('');

    try {
      // PRODUCT API FIX: Create FormData for multipart/form-data to match backend
      const submitData = new FormData();
      
      // Map frontend fields to backend field names exactly
      submitData.append('name', formData.name.trim());
      submitData.append('description', formData.description || '');
      submitData.append('category', formData.category);
      submitData.append('price', parseFloat(formData.price));
      submitData.append('stock_quantity', parseInt(formData.stock));
      submitData.append('rating', 0); // Default rating
      submitData.append('is_available', formData.active ? 'true' : 'false'); // Map active to is_available
      
      // Add image if present
      const imageFile = formData.images.find(img => img.file)?.file;
      if (imageFile) {
        submitData.append('file', imageFile);
      }

      if (editingProduct) {
        // Update existing product
        const idToUse = editingProduct._id || editingProduct.id;
        await productsAPI.updateAdmin(idToUse, submitData);
        setSuccessMessage('Product updated successfully!');
      } else {
        // Create new product
        await productsAPI.createAdmin(submitData);
        setSuccessMessage('Product added successfully!');
      }

      // Reload all products to ensure fresh data
      const refreshedData = await productsAPI.getAllAdmin();
      setProducts(Array.isArray(refreshedData) ? refreshedData : refreshedData.products || []);
      
      // Invalidate product cache for other components
      localStorage.setItem('productCacheInvalidated', Date.now().toString());
      
      closeModal();
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
      
    } catch (error) {
      console.error('Product save failed:', error);
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to save product. Please try again.';
      setError(errorMessage);
    } finally {
      setLoadingAction(false);
    }
  };

  const deleteProduct = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        setLoadingAction(true);
        const product = products.find(p => p.id === id);
        const idToUse = product?._id || product?.id || id;
        
        try {
          await productsAPI.removeAdmin(idToUse);
        } catch {
          // fallback to generic delete
          await productsAPI.remove(idToUse);
        }
        
        // Reload all products to ensure fresh data
        const refreshedData = await productsAPI.getAllAdmin();
        setProducts(Array.isArray(refreshedData) ? refreshedData : refreshedData.products || []);
        
        // Invalidate product cache for other components
        localStorage.setItem('productCacheInvalidated', Date.now().toString());
        
        setSuccessMessage('Product deleted successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        console.error('Failed to delete product:', error);
        setError('Failed to delete product. Please try again.');
        setTimeout(() => setError(''), 3000);
      } finally {
        setLoadingAction(false);
      }
    }
  };

  const toggleFeatured = async (id) => {
    try {
      const product = products.find(p => p.id === id);
      if (!product) return;

      // PRODUCT API FIX: Update featured status via API
      const updateData = new FormData();
      updateData.append('featured', !product.featured);
      
      const idToUse = product._id || product.id;
      await productsAPI.updateAdmin(idToUse, updateData);
      
      // Update local state
      setProducts(prev => prev.map(p => 
        p.id === id ? { ...p, featured: !p.featured } : p
      ));
      
      setSuccessMessage(`Product ${!product.featured ? 'marked as featured' : 'removed from featured'}!`);
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
      setError('Failed to update featured status');
      setTimeout(() => setError(''), 3000);
    }
  };

  const toggleActive = async (id) => {
    try {
      const product = products.find(p => p.id === id);
      if (!product) return;

      // PRODUCT API FIX: Update is_available status via API
      const newActive = !(product.is_available !== false);
      const updateData = new FormData();
      updateData.append('is_available', newActive);
      
      const idToUse = product._id || product.id;
      await productsAPI.updateAdmin(idToUse, updateData);
      
      // Update local state
      setProducts(prev => prev.map(p => {
        if (p.id === id) {
          return { 
            ...p, 
            is_available: newActive,
            active: newActive
          };
        }
        return p;
      }));
      
      setSuccessMessage(`Product ${newActive ? 'activated' : 'deactivated'}!`);
      setTimeout(() => setSuccessMessage(''), 2000);
    } catch (error) {
      console.error('Failed to toggle active status:', error);
      setError('Failed to update active status');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="p-3 sm:p-4 lg:p-6">
      {/* Header */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 mb-4 sm:mb-6">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">Products</h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 truncate">Manage your product inventory</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition text-sm sm:text-base"
        >
          <FiPlus className="w-4 h-4" />
          <span className="hidden sm:inline">Add</span> Product
        </button>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 lg:mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium">{successMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 lg:mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-4 sm:mb-6">
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
            />
          </div>
          <div className="flex items-center gap-2 sm:flex-shrink-0">
            <FiFilter className="text-gray-400 w-4 h-4" />
            <div className="relative min-w-0 flex-1 sm:w-48">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none text-sm sm:text-base"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : formatCategoryLabel(category)}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">Status:</span>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none text-sm"
              >
                <option value="all">All Products</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
              <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <FiTag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loadingProducts && (
          <div className="p-4 text-center text-gray-600">Loading products...</div>
        )}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Special
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500">ID: {product.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div>
                      <span className="font-medium">GH₵{product && product.price != null ? product.price : '0.00'}</span>
                      {(product && product.discount > 0) && (
                        <div className="text-xs text-gray-500">
                          <span className="line-through">GH₵{product.originalPrice != null ? product.originalPrice : ''}</span>
                          <span className="text-red-500 ml-1">(-{product.discount}%)</span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {getStockQuantity(product)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(getProductStatus(product))}`}>
                      {getProductStatus(product)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      {product.seasonal && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-800">
                          Seasonal
                        </span>
                      )}
                      {product.bulkAvailable && (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Bulk ({product.bulkMinQuantity}+ items, {product.bulkDiscount}% off)
                        </span>
                      )}
                      {!product.seasonal && !product.bulkAvailable && (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => toggleFeatured(product.id)}
                      disabled={loadingAction}
                      className={`p-1 rounded ${product.featured ? 'text-yellow-500' : 'text-gray-300'} ${loadingAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <FiStar className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleActive(product.id)}
                        disabled={loadingAction}
                        className={`p-1 ${(product.is_available !== false) ? 'text-green-600' : 'text-gray-400'} ${loadingAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title={(product.is_available !== false) ? 'Deactivate' : 'Activate'}
                      >
                        {(product.is_available !== false) ? (
                          <FiToggleRight className="w-5 h-5" />
                        ) : (
                          <FiToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                      <button 
                        onClick={() => openModal(product)}
                        disabled={loadingAction}
                        className={`text-blue-600 hover:text-blue-900 p-1 ${loadingAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Edit"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        disabled={loadingAction}
                        className={`text-red-600 hover:text-red-900 p-1 ${loadingAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-start justify-center p-4 pt-16 z-[60] overflow-y-auto">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[calc(100vh-8rem)] overflow-y-auto my-4">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button onClick={closeModal} className="text-gray-400 hover:text-gray-600">
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <div className="relative">
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none"
                    >
                      <option value="">Select Category</option>
                      {categories.filter(cat => cat !== 'all').map(category => (
                        <option key={category} value={category}>{formatCategoryLabel(category)}</option>
                      ))}
                    </select>
                    <FiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Price (GH₵) *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price (GH₵)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity *
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Seasonal & Bulk Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Special Status</h3>
                
                {/* Seasonal Status */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      name="seasonal"
                      checked={formData.seasonal}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700">Seasonal Product</span>
                  </label>
                  
                  {formData.seasonal && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Season Start Date
                        </label>
                        <input
                          type="date"
                          name="seasonStartDate"
                          value={formData.seasonStartDate}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Season End Date
                        </label>
                        <input
                          type="date"
                          name="seasonEndDate"
                          value={formData.seasonEndDate}
                          onChange={handleInputChange}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Bulk Purchase */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <label className="flex items-center mb-3">
                    <input
                      type="checkbox"
                      name="bulkAvailable"
                      checked={formData.bulkAvailable}
                      onChange={handleInputChange}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mr-3"
                    />
                    <span className="text-sm font-medium text-gray-700">Bulk Purchase Available</span>
                  </label>
                  
                  {formData.bulkAvailable && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Minimum Quantity for Bulk
                        </label>
                        <input
                          type="number"
                          name="bulkMinQuantity"
                          value={formData.bulkMinQuantity}
                          onChange={handleInputChange}
                          min="1"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Bulk Discount (%)
                        </label>
                        <input
                          type="number"
                          name="bulkDiscount"
                          value={formData.bulkDiscount}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  placeholder="organic, fresh, premium"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>

              {/* Images */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center">
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Click to upload images</span>
                  </label>
                </div>
                {formData.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {formData.images.map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Product ${index + 1}`}
                          className="w-full h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Settings */}
              <div className="flex items-center gap-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Featured Product</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mr-2"
                  />
                  <span className="text-sm text-gray-700">Active</span>
                </label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loadingAction}
                  className={`bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors ${loadingAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {loadingAction ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={loadingAction}
                  className={`bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors ${loadingAction ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductMgmt;