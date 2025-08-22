import React, { useState, useEffect } from 'react';
import { productsAPI } from '../../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiFilter, FiEye, FiStar, FiToggleLeft, FiToggleRight, FiX, FiUpload, FiTag, FiChevronDown } from 'react-icons/fi';

const ProductMgmt = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
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

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingProducts(true);
      try {
        const data = await productsAPI.getAll();
        if (!mounted) return;
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch {
        console.warn('Failed to fetch products from API, using local mock data');
        // fallback: keep products empty or provide a small mock
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  const categories = ['all', 'feeds', 'poultry', 'equipment', 'supplies', 'tools', 'seeds'];

  const formatCategoryLabel = (key) => {
    if (!key) return '';
    if (key === 'feeds') return 'Feeds';
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

  const filteredProducts = products.filter(product => {
    const name = (product && product.name) ? String(product.name) : '';
    const category = (product && product.category) ? String(product.category).toLowerCase() : '';
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || category === String(filterCategory).toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // store files for upload and previews
    const previews = files.map(file => ({ file, url: URL.createObjectURL(file) }));
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
  stock: product.stock != null ? String(product.stock) : '',
  description: product.description || '',
  tags: Array.isArray(product.tags) ? product.tags.join(', ') : (product.tags ? String(product.tags) : ''),
  featured: !!product.featured,
  active: product.active == null ? true : !!product.active,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: editingProduct?.id || Date.now(),
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      originalPrice: parseFloat(formData.originalPrice),
      discount: parseFloat(formData.discount),
      stock: parseInt(formData.stock),
      status: formData.stock > 0 && formData.active ? 'Active' : formData.stock === 0 ? 'Out of Stock' : 'Inactive',
      featured: formData.featured,
      active: formData.active,
      seasonal: formData.seasonal,
      bulkAvailable: formData.bulkAvailable,
      bulkMinQuantity: formData.bulkMinQuantity ? parseInt(formData.bulkMinQuantity) : '',
      bulkDiscount: formData.bulkDiscount ? parseFloat(formData.bulkDiscount) : '',
      seasonStartDate: formData.seasonStartDate,
      seasonEndDate: formData.seasonEndDate,
      description: formData.description,
      tags: formData.tags.split(',').map(tag => tag.trim()),
  images: formData.images
    };

    const submit = async () => {
      try {
        // Use admin endpoints with multipart form data when files are present
        const buildForm = () => {
          const fd = new FormData();
          fd.append('name', newProduct.name);
          fd.append('category', newProduct.category);
          fd.append('price', newProduct.price);
          if (newProduct.originalPrice) fd.append('originalPrice', newProduct.originalPrice);
          if (newProduct.discount) fd.append('discount', newProduct.discount);
          fd.append('stock_quantity', newProduct.stock);
          fd.append('description', newProduct.description || '');
          fd.append('tags', Array.isArray(newProduct.tags) ? newProduct.tags.join(',') : newProduct.tags);
          fd.append('featured', newProduct.featured ? '1' : '0');
          fd.append('is_available', newProduct.active ? '1' : '0');
          // append file inputs
          (formData.images || []).forEach((img) => {
            // if stored as {file, url} it's a new file; if string it's an existing url
            if (img && img.file) fd.append('file', img.file);
          });
          return fd;
        };

        if (editingProduct) {
          const idToUse = editingProduct._id || editingProduct.id;
          const fd = buildForm();
          try {
            await productsAPI.updateAdmin(idToUse, fd);
            // Reload all products to ensure fresh data
            const refreshedData = await productsAPI.getAll();
            setProducts(Array.isArray(refreshedData) ? refreshedData : refreshedData.products || []);
            // Invalidate product cache for other components
            localStorage.setItem('productCacheInvalidated', Date.now().toString());
          } catch {
            console.warn('Admin patch failed, trying regular update');
            await productsAPI.update(idToUse, newProduct);
            // Reload all products to ensure fresh data
            const refreshedData = await productsAPI.getAll();
            setProducts(Array.isArray(refreshedData) ? refreshedData : refreshedData.products || []);
            // Invalidate product cache for other components
            localStorage.setItem('productCacheInvalidated', Date.now().toString());
          }
        } else {
          const fd = buildForm();
          try {
            await productsAPI.createAdmin(fd);
            // Reload all products to ensure fresh data
            const refreshedData = await productsAPI.getAll();
            setProducts(Array.isArray(refreshedData) ? refreshedData : refreshedData.products || []);
            // Invalidate product cache for other components
            localStorage.setItem('productCacheInvalidated', Date.now().toString());
          } catch {
            console.warn('Admin create failed, falling back to public create');
            await productsAPI.create(newProduct);
            // Reload all products to ensure fresh data
            const refreshedData = await productsAPI.getAll();
            setProducts(Array.isArray(refreshedData) ? refreshedData : refreshedData.products || []);
            // Invalidate product cache for other components
            localStorage.setItem('productCacheInvalidated', Date.now().toString());
          }
        }
      } catch {
        // Surface the error to the developer/user instead of silently mutating local state
        console.error('Product save failed');
        alert('Failed to save product. See console for details.');
      } finally {
        closeModal();
      }
    };

    submit();
  };

  const deleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const remove = async () => {
        try {
          const idToUse = id && id._id ? id._id : id;
          try {
            await productsAPI.removeAdmin(idToUse);
          } catch {
            // fallback to generic delete
            await productsAPI.remove(idToUse);
          }
          // Reload all products to ensure fresh data
          const refreshedData = await productsAPI.getAll();
          setProducts(Array.isArray(refreshedData) ? refreshedData : refreshedData.products || []);
          // Invalidate product cache for other components
          localStorage.setItem('productCacheInvalidated', Date.now().toString());
        } catch {
          console.error('Failed to delete product');
          alert('Failed to delete product. See console for details.');
        }
      };
      remove();
    }
  };

  const toggleFeatured = (id) => {
    setProducts(prev => prev.map(p => 
      p.id === id ? { ...p, featured: !p.featured } : p
    ));
  };

  const toggleActive = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const newActive = !p.active;
        return { 
          ...p, 
          active: newActive,
          status: newActive && p.stock > 0 ? 'Active' : !newActive ? 'Inactive' : 'Out of Stock'
        };
      }
      return p;
    }));
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
                  Special Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                            src={product?.images?.[0] || product?.image_url || product?.image || product?.thumbnail || ''}
                            alt={product && product.name ? product.name : 'product'}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500">ID: {product.id}</div>
                      </div>
                    </div>
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
                    {product && product.stock != null ? product.stock : 0}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product && product.status ? product.status : '')}`}>
                      {product && product.status ? product.status : 'Unknown'}
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
                      className={`p-1 rounded ${product.featured ? 'text-yellow-500' : 'text-gray-300'}`}
                    >
                      <FiStar className={`w-4 h-4 ${product.featured ? 'fill-current' : ''}`} />
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => toggleActive(product.id)}
                        className={`p-1 ${product.active ? 'text-green-600' : 'text-gray-400'}`}
                        title={product.active ? 'Deactivate' : 'Activate'}
                      >
                        {product.active ? (
                          <FiToggleRight className="w-5 h-5" />
                        ) : (
                          <FiToggleLeft className="w-5 h-5" />
                        )}
                      </button>
                      <button 
                        onClick={() => openModal(product)}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteProduct(product.id)}
                        className="text-red-600 hover:text-red-900 p-1"
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
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-6 py-2 rounded-lg font-medium transition-colors"
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