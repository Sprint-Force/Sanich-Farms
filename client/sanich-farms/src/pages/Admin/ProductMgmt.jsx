import React, { useState, useEffect } from 'react';
import { 
  FiPlus, FiEdit, FiTrash2, FiEye, FiEyeOff, 
  FiSearch, FiFilter, FiChevronDown, FiGrid, FiList,
  FiImage, FiPackage, FiBarChart, FiTrendingUp, FiPause
} from 'react-icons/fi';
import { productsAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const ProductMgmt = () => {
  // Toast hook
  const { addToast } = useToast();
  
  // State management
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState(null);
  
  // Search and filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  
  // Modern UI states
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  // eslint-disable-next-line no-unused-vars
  const [selectedProducts, setSelectedProducts] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [showFilters, setShowFilters] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, productId: null, productName: '' });
  
  // Form data
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    stock_quantity: '', // Fixed: Use backend field name
    description: '',
    rating: '',
    unit_of_measure: '',
    is_available: true, // Fixed: Use backend field name
    images: []
  });

  // Categories - matching backend enum
  const categories = ['all', 'chicks', 'feeds', 'eggs', 'vitamins', 'equipment'];

  // Image handling functions
  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...formData.images];
      newImages[index] = {
        file: file,
        url: URL.createObjectURL(file),
        isNew: true
      };
      setFormData({ ...formData, images: newImages });
    }
  };

  const removeImage = (index) => {
    const newImages = [...formData.images];
    if (newImages[index] && newImages[index].url && newImages[index].isNew) {
      URL.revokeObjectURL(newImages[index].url);
    }
    newImages[index] = null;
    setFormData({ ...formData, images: newImages });
  };

  // Load products on component mount
  useEffect(() => {
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch products from API with fallback support
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await productsAPI.getAllAdmin();
      const productsData = Array.isArray(response) ? response : response.products || [];
      
      const processedProducts = productsData.map((product, index) => ({
        ...product,
        id: product.id || product._id || `temp-${index}`,
        status: getProductStatus(product)
      }));
      
      setProducts(processedProducts);
    } catch (error) {
      // Try fallback to regular products endpoint
      try {
        const fallbackResponse = await productsAPI.getAll();
        const fallbackData = Array.isArray(fallbackResponse) ? fallbackResponse : fallbackResponse.products || [];
        const processedProducts = fallbackData.map((product, index) => ({
          ...product,
          id: product.id || product._id || `temp-${index}`,
          status: getProductStatus(product)
        }));
        
        setProducts(processedProducts);
        setError(null);
      } catch {
        setError(`Failed to load products: ${error.response?.data?.message || error.message}`);
        setProducts([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getProductStatus = (product) => {
    if (product.is_available === false) return 'Inactive';
    if (product.stock_quantity === 0 || product.stock === 0) return 'Out of Stock';
    if ((product.stock_quantity || product.stock || 0) < 10) return 'Low Stock';
    return 'Active';
  };

  const formatCategoryLabel = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || product.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      const imagesArr = [];
      if (Array.isArray(product.images)) imagesArr.push(...product.images);
      else if (product.images) imagesArr.push(product.images);
      if (product.image_url) imagesArr.unshift(product.image_url);
      if (product.image) imagesArr.unshift(product.image);
      if (product.thumbnail) imagesArr.push(product.thumbnail);

      const uniqueImages = Array.from(new Set(imagesArr.filter(Boolean)));

      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: product.price != null ? String(product.price) : '',
        stock_quantity: product.stock_quantity != null ? String(product.stock_quantity) : '',
        description: product.description || '',
        rating: product.rating != null ? String(product.rating) : '',
        unit_of_measure: product.unit_of_measure || '',
        is_available: product.is_available !== false,
        images: uniqueImages
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        price: '',
        stock_quantity: '',
        description: '',
        rating: '',
        unit_of_measure: '',
        is_available: true,
        images: []
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingProduct(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.category || !formData.price || !formData.stock_quantity) {
      setError('Please fill in all required fields: name, category, price, and stock quantity.');
      return;
    }

    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }

    if (isNaN(parseInt(formData.stock_quantity)) || parseInt(formData.stock_quantity) < 0) {
      setError('Please enter a valid stock quantity (0 or greater).');
      return;
    }

    // Validate rating if provided
    if (formData.rating && (isNaN(parseFloat(formData.rating)) || parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5)) {
      setError('Please enter a valid rating between 0 and 5.');
      return;
    }

    setLoadingAction(true);
    setError(null);

    try {
      const submitData = new FormData();
      
      submitData.append('name', formData.name.trim());
      submitData.append('description', formData.description || '');
      submitData.append('category', formData.category);
      submitData.append('price', parseFloat(formData.price));
      submitData.append('stock_quantity', parseInt(formData.stock_quantity));
      submitData.append('rating', formData.rating ? parseFloat(formData.rating) : 0);
      submitData.append('unit_of_measure', formData.unit_of_measure || '');
      submitData.append('is_available', formData.is_available ? 'true' : 'false');
      
      // Handle multiple images - for now, use the first image as the main image
      const imageFiles = formData.images.filter(img => img && img.file);
      if (imageFiles.length > 0) {
        submitData.append('file', imageFiles[0].file);
      } else if (!editingProduct) {
        // At least one image is required for new products
        setError('Please upload at least one product image.');
        setLoadingAction(false);
        return;
      }

      if (editingProduct) {
        const idToUse = editingProduct._id || editingProduct.id;
        if (!idToUse) {
          throw new Error('Product ID is missing for update operation');
        }
        await productsAPI.updateAdmin(idToUse, submitData);
        addToast('Product updated successfully!');
      } else {
        await productsAPI.createAdmin(submitData);
        addToast('Product added successfully!');
      }

      const refreshedData = await productsAPI.getAllAdmin();
      setProducts(Array.isArray(refreshedData) ? refreshedData : refreshedData.products || []);
      
      closeModal();
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to save product';
      addToast(errorMessage, 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id) => {
    const product = products.find(p => p.id === id);
    setDeleteConfirm({
      show: true,
      productId: id,
      productName: product?.name || 'this product'
    });
  };

  const confirmDelete = async () => {
    const { productId } = deleteConfirm;
    setLoadingAction(true);
    try {
      const idToUse = products.find(p => p.id === productId)?._id || productId;
      await productsAPI.removeAdmin(idToUse);
      setProducts(prev => prev.filter(p => p.id !== productId));
      addToast('Product deleted successfully!');
    } catch {
      addToast('Failed to delete product', 'error');
    } finally {
      setLoadingAction(false);
      setDeleteConfirm({ show: false, productId: null, productName: '' });
    }
  };

  const toggleActive = async (id) => {
    try {
      const product = products.find(p => p.id === id);
      if (!product) return;

      const newActive = !(product.is_available !== false);
      const updateData = new FormData();
      updateData.append('is_available', newActive);
      
      const idToUse = product._id || product.id;
      await productsAPI.updateAdmin(idToUse, updateData);
      
      setProducts(prev => prev.map(p => {
        if (p.id === id) {
          return { 
            ...p, 
            is_available: newActive,
            active: newActive,
            status: getProductStatus({ ...p, is_available: newActive })
          };
        }
        return p;
      }));
      
      addToast(`Product ${newActive ? 'activated' : 'deactivated'}!`);
    } catch {
      addToast('Failed to update active status', 'error');
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden" style={{ 
      scrollBehavior: 'smooth',
      paddingBottom: 'env(safe-area-inset-bottom, 0px)'
    }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 pb-8 sm:pb-12 lg:pb-16">
      {/* Modern Header */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0">
              <FiPackage className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
                Product Management
              </h1>
              <p className="text-sm sm:text-base text-gray-600 mt-0.5 sm:mt-1">
                Manage your inventory and product catalog
              </p>
            </div>
          </div>
          
          <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3">
            {/* View Mode Toggle */}
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="Grid View"
              >
                <FiGrid className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 sm:p-2 rounded-md transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                title="List View"
              >
                <FiList className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>

            {/* Add Product Button */}
            <button 
              onClick={() => openModal()}
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium flex items-center space-x-1.5 sm:space-x-2 transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:hidden">Add</span>
              <span className="hidden sm:inline">Add Product</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mt-4 sm:mt-6">
          <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-blue-600 text-xs sm:text-sm font-medium truncate">Total Products</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-900">{products.length}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiPackage className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-green-600 text-xs sm:text-sm font-medium truncate">Active Products</p>
                <p className="text-lg sm:text-2xl font-bold text-green-900">
                  {products.filter(p => p.status === 'Active').length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiTrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-gray-600 text-xs sm:text-sm font-medium truncate">Inactive Products</p>
                <p className="text-lg sm:text-2xl font-bold text-gray-900">
                  {products.filter(p => p.status === 'Inactive').length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiPause className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-yellow-600 text-xs sm:text-sm font-medium truncate">Low Stock</p>
                <p className="text-lg sm:text-2xl font-bold text-yellow-900">
                  {products.filter(p => p.status === 'Low Stock').length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FiBarChart className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-600 text-xs sm:text-sm font-medium">Out of Stock</p>
                <p className="text-lg sm:text-2xl font-bold text-red-900">
                  {products.filter(p => p.status === 'Out of Stock').length}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <FiEyeOff className="w-4 h-4 sm:w-5 sm:h-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error Messages */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Modern Filters */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
            />
          </div>

          {/* Filters Row */}
          <div className="flex gap-2 sm:gap-3">
            {/* Category Filter */}
            <div className="relative flex-1 sm:flex-none min-w-0">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 py-2.5 sm:py-3 pr-7 sm:pr-8 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base w-full sm:min-w-[120px] truncate"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : formatCategoryLabel(category)}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>

            {/* Status Filter */}
            <div className="relative flex-1 sm:flex-none">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-3 pr-8 sm:pr-10 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 min-w-0 sm:min-w-[130px] text-sm sm:text-base w-full sm:w-auto"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
              <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>
      </div>

      {/* Products Grid/List */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <FiPackage className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm || filterCategory !== 'all' || filterStatus !== 'all' 
              ? 'Try adjusting your search or filters' 
              : 'Get started by adding your first product'}
          </p>
          {(!searchTerm && filterCategory === 'all' && filterStatus === 'all') && (
            <button 
              onClick={() => openModal()}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium inline-flex items-center gap-2 transition-colors"
            >
              <FiPlus className="w-4 h-4" />
              Add Your First Product
            </button>
          )}
        </div>
      ) : (
        <div className={`w-full ${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 lg:gap-6' 
          : 'space-y-3 sm:space-y-4'
        } pb-8 sm:pb-12 lg:pb-16 mb-4 sm:mb-8`} 
        style={{ scrollPaddingBottom: '2rem' }}>
          {filteredProducts.map((product) => (
            viewMode === 'grid' ? (
              // Grid Card View - Mobile-First Responsive Design with Consistent Height
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 hover:border-gray-300 w-full scroll-mt-4 sm:scroll-mt-6 flex flex-col h-full">
                {/* Product Image */}
                <div className="relative h-32 sm:h-36 md:h-40 bg-gray-100 w-full flex-shrink-0">
                  {(product.image_url || product.image || product.images?.[0]) ? (
                    <img
                      src={product.image_url || product.image || product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <FiImage className="w-6 h-6 sm:w-8 sm:h-8 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      product.status === 'Active' ? 'bg-green-100 text-green-800' :
                      product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                      product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                </div>

                {/* Product Info - Flex grow to fill available space */}
                <div className="p-3 sm:p-4 flex flex-col flex-grow">
                  <div className="mb-3 flex-grow">
                    <h3 className="font-medium text-gray-900 text-sm sm:text-base mb-1 line-clamp-2 min-h-[2.5rem]">
                      {product.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 capitalize">
                      {formatCategoryLabel(product.category)}
                    </p>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2">
                      <span className="text-base sm:text-lg font-semibold text-green-600">
                        GH₵{product.price}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-xs text-gray-400 line-through">
                          GH₵{product.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 mt-1">
                      Stock: {product.stock_quantity || product.stock || 0}
                    </p>
                  </div>

                  {/* Action Buttons - Always at the bottom */}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={() => openModal(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEdit className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>
                    <button
                      onClick={() => toggleActive(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        product.is_available !== false 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                      title={product.is_available !== false ? 'Deactivate Product' : 'Activate Product'}
                    >
                      {product.is_available !== false ? (
                        <FiEye className="w-3.5 h-3.5" />
                      ) : (
                        <FiEyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      title="Delete Product"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              // List Row View - Mobile-First Responsive Design
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 hover:shadow-md transition-all duration-200 hover:border-gray-300 w-full scroll-mt-4 sm:scroll-mt-6">
                {/* Mobile Layout */}
                <div className="block sm:hidden">
                  <div className="flex items-start gap-3">
                    {/* Product Image */}
                    <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                      {(product.image_url || product.image || product.images?.[0]) ? (
                        <img
                          src={product.image_url || product.image || product.images?.[0]}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center rounded-lg">
                          <FiImage className="w-6 h-6 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 text-sm truncate">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 capitalize">
                        {formatCategoryLabel(product.category)}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <span className="text-sm font-semibold text-green-600">
                            GH₵{product.price}
                          </span>
                          <p className="text-xs text-gray-500">
                            Stock: {product.stock_quantity || product.stock || 0}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          product.status === 'Active' ? 'bg-green-100 text-green-800' :
                          product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                          product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Mobile Action Buttons */}
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => openModal(product)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      <FiEdit className="w-3.5 h-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => toggleActive(product.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        product.is_available !== false 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-red-100 text-red-600 hover:bg-red-200'
                      }`}
                      title={product.is_available !== false ? 'Deactivate Product' : 'Activate Product'}
                    >
                      {product.is_available !== false ? (
                        <FiEye className="w-3.5 h-3.5" />
                      ) : (
                        <FiEyeOff className="w-3.5 h-3.5" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                      title="Delete Product"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Desktop/Tablet Layout */}
                <div className="hidden sm:flex items-center gap-4">
                  {/* Product Image */}
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-lg flex-shrink-0">
                    {(product.image_url || product.image || product.images?.[0]) ? (
                      <img
                        src={product.image_url || product.image || product.images?.[0]}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center rounded-lg">
                        <FiImage className="w-5 h-5 md:w-6 md:h-6 text-gray-300" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-gray-900 text-sm md:text-base truncate">
                          {product.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 capitalize">
                          {formatCategoryLabel(product.category)}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4 ml-4">
                        <div className="text-right">
                          <span className="text-sm md:text-base font-semibold text-green-600">
                            GH₵{product.price}
                          </span>
                          <p className="text-xs md:text-sm text-gray-500">
                            Stock: {product.stock_quantity || product.stock || 0}
                          </p>
                        </div>
                        
                        <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${
                          product.status === 'Active' ? 'bg-green-100 text-green-800' :
                          product.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' :
                          product.status === 'Out of Stock' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {product.status}
                        </span>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => openModal(product)}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-3 rounded-lg text-xs font-medium transition-colors flex items-center gap-1"
                          >
                            <FiEdit className="w-3 h-3" />
                            <span className="hidden lg:inline">Edit</span>
                          </button>
                          <button
                            onClick={() => toggleActive(product.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              product.is_available !== false 
                                ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                                : 'bg-red-100 text-red-600 hover:bg-red-200'
                            }`}
                            title={product.is_available !== false ? 'Deactivate Product' : 'Activate Product'}
                          >
                            {product.is_available !== false ? (
                              <FiEye className="w-3 h-3" />
                            ) : (
                              <FiEyeOff className="w-3 h-3" />
                            )}
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors"
                            title="Delete Product"
                          >
                            <FiTrash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto">
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl w-full max-w-2xl my-4 sm:my-8 max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto border border-white/20">
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Images Section */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Product Images
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">Upload up to 3 images (minimum 1 required)</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[0, 1, 2].map((index) => (
                      <div key={index} className="relative">
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-400 transition-colors">
                          {formData.images && formData.images[index] ? (
                            <div className="relative">
                              <img
                                src={formData.images[index].url || formData.images[index]}
                                alt={`Product ${index + 1}`}
                                className="w-full h-32 object-cover rounded-md"
                              />
                              <button
                                type="button"
                                onClick={() => removeImage(index)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            </div>
                          ) : (
                            <>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, index)}
                                className="hidden"
                                id={`image-${index}`}
                              />
                              <label htmlFor={`image-${index}`} className="cursor-pointer">
                                <div className="text-gray-400 mb-2">
                                  <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                  </svg>
                                </div>
                                <p className="text-sm text-gray-600">
                                  {index === 0 ? 'Primary Image *' : `Image ${index + 1}`}
                                </p>
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Basic Information */}
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Basic Information
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        placeholder="Enter product name"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm sm:text-base"
                        required
                      >
                        <option value="">Select a category</option>
                        {categories.slice(1).map(category => (
                          <option key={category} value={category}>
                            {formatCategoryLabel(category)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="mt-4 sm:mt-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                      placeholder="Provide a detailed description of the product..."
                      required
                    />
                  </div>
                </div>

                {/* Pricing & Inventory */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Pricing & Inventory
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                        Price (GH₵) *
                      </label>
                      <div className="relative">
                        <span className="absolute left-3 top-3 text-gray-500">GH₵</span>
                        <input
                          type="number"
                          id="price"
                          step="0.01"
                          min="0"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-2">
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        id="stock_quantity"
                        min="0"
                        value={formData.stock_quantity}
                        onChange={(e) => setFormData({ ...formData, stock_quantity: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="Enter stock quantity"
                        required
                      />
                    </div>

                    <div>
                      <label htmlFor="unit_of_measure" className="block text-sm font-medium text-gray-700 mb-2">
                        Unit of Measure
                      </label>
                      <input
                        type="text"
                        id="unit_of_measure"
                        value={formData.unit_of_measure}
                        onChange={(e) => setFormData({ ...formData, unit_of_measure: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., kg, piece, box"
                      />
                    </div>
                  </div>
                </div>

                {/* Product Options */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Product Options
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                        Product Rating (0-5)
                      </label>
                      <input
                        type="number"
                        id="rating"
                        min="0"
                        max="5"
                        step="0.1"
                        value={formData.rating}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                        placeholder="e.g., 4.5"
                      />
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="is_available"
                        checked={formData.is_available}
                        onChange={(e) => setFormData({ ...formData, is_available: e.target.checked })}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                      />
                      <label htmlFor="is_available" className="text-sm font-medium text-gray-700">
                        Product Available for Sale
                      </label>
                    </div>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingAction}
                    className="flex-1 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    {loadingAction ? 'Saving...' : (editingProduct ? 'Update Product' : 'Add Product')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/20 flex items-center justify-center p-4 z-50">
          <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-2xl max-w-md w-full mx-4 border border-white/20">
            <div className="p-6">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                <FiTrash2 className="w-6 h-6 text-red-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                Delete Product
              </h3>
              <p className="text-gray-600 text-center mb-6">
                Are you sure you want to delete "{deleteConfirm.productName}"? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm({ show: false, productId: null, productName: '' })}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={loadingAction}
                  className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-red-300 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                >
                  {loadingAction ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProductMgmt;