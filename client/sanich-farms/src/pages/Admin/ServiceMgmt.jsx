import React, { useState, useEffect, useCallback } from 'react';
import { 
  FiPlus, 
  FiEdit, 
  FiTrash2, 
  FiSearch, 
  FiX, 
  FiPackage, 
  FiCheckCircle, 
  FiXCircle, 
  FiDollarSign, 
  FiGrid, 
  FiList, 
  FiEye, 
  FiEyeOff,
  FiChevronDown 
} from 'react-icons/fi';
import { servicesAPI } from '../../services/api';
import { useToast } from '../../context/ToastContext';

const ServiceMgmt = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, serviceId: null, serviceName: '' });
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    is_available: true,
    images: []
  });

  const { addToast } = useToast();

  // Fetch services from API
  const fetchServices = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log('Fetching services...');
    
    try {
      const response = await servicesAPI.getAll();
      console.log('API Response:', response);
      
      const servicesData = Array.isArray(response) ? response : response.services || [];
      console.log('Services data:', servicesData);
      
      const processedServices = servicesData.map((service, index) => ({
        ...service,
        id: service.id || service._id || `temp-${index}`,
        status: getServiceStatus(service)
      }));
      
      console.log('Processed services:', processedServices);
      setServices(processedServices);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      setError(`Failed to load services: ${error.response?.data?.message || error.message}`);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const getServiceStatus = (service) => {
    if (service.is_available === false) return 'Inactive';
    return 'Active';
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      const imagesArr = [];
      if (Array.isArray(service.images)) imagesArr.push(...service.images);
      else if (service.images) imagesArr.push(service.images);
      if (service.image_url) imagesArr.unshift(service.image_url);
      if (service.image) imagesArr.unshift(service.image);

      const uniqueImages = Array.from(new Set(imagesArr.filter(Boolean)));

      setFormData({
        name: service.name || '',
        description: service.description || '',
        price: service.price != null ? String(service.price) : '',
        is_available: service.is_available !== false,
        images: uniqueImages
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        is_available: true,
        images: []
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.price) {
      setError('Please fill in all required fields: name, description, and price.');
      return;
    }

    if (isNaN(parseFloat(formData.price)) || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price greater than 0.');
      return;
    }

    setLoadingAction(true);
    setError(null);

    try {
      const submitData = new FormData();
      
      submitData.append('name', formData.name.trim());
      submitData.append('description', formData.description || '');
      submitData.append('price', parseFloat(formData.price));
      submitData.append('is_available', formData.is_available ? 'true' : 'false');
      
      // Handle image - for now, use the first image as the main image
      const imageFiles = formData.images.filter(img => img && img.file);
      if (imageFiles.length > 0) {
        submitData.append('file', imageFiles[0].file);
      }

      if (editingService) {
        const idToUse = editingService._id || editingService.id;
        if (!idToUse) {
          throw new Error('Service ID is missing for update operation');
        }
        await servicesAPI.updateAdmin(idToUse, submitData);
        addToast('Service updated successfully!');
      } else {
        await servicesAPI.createAdmin(submitData);
        addToast('Service added successfully!');
      }

      const refreshedData = await servicesAPI.getAll();
      setServices(Array.isArray(refreshedData) ? refreshedData : refreshedData.services || []);
      
      closeModal();
      
    } catch (error) {
      console.error('Service save failed:', error);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to save service';
      addToast(errorMessage, 'error');
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id) => {
    const service = services.find(s => s.id === id);
    setDeleteConfirm({
      show: true,
      serviceId: id,
      serviceName: service?.name || 'this service'
    });
  };

  const confirmDelete = async () => {
    const { serviceId } = deleteConfirm;
    setLoadingAction(true);
    try {
      const idToUse = services.find(s => s.id === serviceId)?._id || serviceId;
      await servicesAPI.removeAdmin(idToUse);
      setServices(prev => prev.filter(s => s.id !== serviceId));
      addToast('Service deleted successfully!');
    } catch (error) {
      console.error('Failed to delete service:', error);
      addToast('Failed to delete service', 'error');
    } finally {
      setLoadingAction(false);
      setDeleteConfirm({ show: false, serviceId: null, serviceName: '' });
    }
  };

  const toggleActive = async (id) => {
    try {
      const service = services.find(s => s.id === id);
      if (!service) return;

      const newActive = !(service.is_available !== false);
      const updateData = new FormData();
      updateData.append('is_available', newActive);
      
      const idToUse = service._id || service.id;
      await servicesAPI.updateAdmin(idToUse, updateData);
      
      setServices(prev => prev.map(s => {
        if (s.id === id) {
          return { 
            ...s, 
            is_available: newActive,
            status: getServiceStatus({ ...s, is_available: newActive })
          };
        }
        return s;
      }));
      
      addToast(`Service ${newActive ? 'activated' : 'deactivated'}!`);
    } catch (error) {
      console.error('Failed to toggle active status:', error);
      addToast('Failed to update active status', 'error');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Process files and create preview URLs
    const newImages = files.map(file => {
      return {
        file: file,
        preview: URL.createObjectURL(file),
        id: Date.now() + Math.random()
      };
    });
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => {
      const newImages = [...prev.images];
      if (newImages[index]?.preview && newImages[index]?.file) {
        URL.revokeObjectURL(newImages[index].preview);
      }
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const getStatsData = () => {
    const totalServices = services.length;
    const activeServices = services.filter(s => s.status === 'Active').length;
    const inactiveServices = services.filter(s => s.status === 'Inactive').length;

    return [
      {
        title: 'Total Services',
        value: totalServices.toString(),
        icon: FiPackage,
        color: 'blue',
        trend: services.length > 0 ? 'up' : 'neutral'
      },
      {
        title: 'Active Services',
        value: activeServices.toString(),
        icon: FiCheckCircle,
        color: 'green',
        trend: activeServices > inactiveServices ? 'up' : 'down'
      },
      {
        title: 'Inactive Services',
        value: inactiveServices.toString(),
        icon: FiXCircle,
        color: 'red',
        trend: inactiveServices > activeServices ? 'up' : 'down'
      }
    ];
  };

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6 pb-8 sm:pb-12 lg:pb-20">
      {/* Header */}
      <div className="mb-4 sm:mb-6 lg:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
          <div className="flex-1">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Services Management
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Manage your farm service offerings
            </p>
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

            {/* Add Service Button */}
            <button 
              onClick={() => openModal()}
              className="bg-green-500 hover:bg-green-600 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg font-medium flex items-center space-x-1.5 sm:space-x-2 transition-colors text-sm sm:text-base flex-shrink-0"
            >
              <FiPlus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden xs:inline sm:hidden">Add</span>
              <span className="hidden sm:inline">Add Service</span>
            </button>
          </div>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
        {getStatsData().map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4">
            <div className="flex items-center justify-between">
              <div className="min-w-0 flex-1">
                <p className={`text-xs sm:text-sm font-medium truncate mb-1 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  'text-red-600'
                }`}>{stat.title}</p>
                <p className={`text-lg sm:text-xl font-bold ${
                  stat.color === 'blue' ? 'text-blue-900' :
                  stat.color === 'green' ? 'text-green-900' :
                  'text-red-900'
                }`}>{stat.value}</p>
              </div>
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                'bg-red-100'
              }`}>
                <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${
                  stat.color === 'blue' ? 'text-blue-600' :
                  stat.color === 'green' ? 'text-green-600' :
                  'text-red-600'
                }`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
        <div className="space-y-3 sm:space-y-0 sm:flex sm:items-center sm:gap-4">
          {/* Search and Status Filter Row */}
          <div className="flex w-full gap-3 sm:gap-4">
            <div className="relative flex-1 sm:max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
              />
            </div>
            <div className="relative w-full sm:w-auto sm:min-w-[140px]">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-3 sm:px-4 py-2.5 sm:py-3 pr-8 sm:pr-9 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base w-full"
              >
                <option value="all">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <FiChevronDown className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            Showing {filteredServices.length} of {services.length} services
          </p>
        </div>
      </div>

      {/* Services Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 lg:p-12 text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-8 lg:p-12 text-center">
            <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Services Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterStatus !== 'all' 
                ? 'No services match your current filters.' 
                : 'Get started by adding your first service.'}
            </p>
            {(!searchTerm && filterStatus === 'all') && (
              <button
                onClick={() => openModal()}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all duration-200 mx-auto hover:scale-105"
              >
                <FiPlus className="w-4 h-4" />
                Add First Service
              </button>
            )}
          </div>
        ) : (
          <div className="p-3 sm:p-4 lg:p-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 pb-2 sm:pb-4">
                {filteredServices.map((service) => (
                  <div key={service.id} className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg hover:border-green-300 transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-50 to-gray-100">
                      {service.image_url ? (
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="w-full h-32 sm:h-40 lg:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-32 sm:h-40 lg:h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                          <FiPackage className="w-8 sm:w-10 lg:w-12 h-8 sm:h-10 lg:h-12 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                        </div>
                      )}
                      {/* Status Badge */}
                      <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
                        <span className={`px-2 sm:px-3 py-1 text-xs font-semibold rounded-full shadow-sm ${
                          service.status === 'Active' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-red-500 text-white'
                        }`}>
                          {service.status}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 lg:p-5">
                      <div className="mb-3">
                        <h3 className="font-semibold text-gray-900 text-sm sm:text-base lg:text-lg mb-1 group-hover:text-green-700 transition-colors duration-200 line-clamp-1">{service.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <p className="text-base sm:text-lg lg:text-xl font-bold text-green-600">
                          GH₵{parseFloat(service.price || 0).toLocaleString()}
                        </p>
                      </div>
                      {/* Action Buttons */}
                      <div className="flex flex-col gap-2 sm:gap-2">
                        <button
                          onClick={() => openModal(service)}
                          className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-105"
                          title="Edit service"
                        >
                          <FiEdit className="w-3 sm:w-4 h-3 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
                          Edit Service
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => toggleActive(service.id)}
                            className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 group hover:scale-105 ${
                              service.status === 'Active'
                                ? 'bg-orange-50 hover:bg-orange-100 text-orange-600 hover:text-orange-700'
                                : 'bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700'
                            }`}
                            title={service.status === 'Active' ? 'Deactivate' : 'Activate'}
                          >
                            {service.status === 'Active' ? 
                              <>
                                <FiEyeOff className="w-3 sm:w-4 h-3 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
                                <span className="hidden sm:inline">Deactivate</span>
                                <span className="sm:hidden">Off</span>
                              </> : 
                              <>
                                <FiEye className="w-3 sm:w-4 h-3 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
                                <span className="hidden sm:inline">Activate</span>
                                <span className="sm:hidden">On</span>
                              </>
                            }
                          </button>
                          <button
                            onClick={() => handleDelete(service.id)}
                            className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 flex items-center justify-center gap-1 sm:gap-2 group hover:scale-105"
                            title="Delete service"
                          >
                            <FiTrash2 className="w-3 sm:w-4 h-3 sm:h-4 group-hover:scale-110 transition-transform duration-200" />
                            <span className="hidden sm:inline">Delete</span>
                            <span className="sm:hidden">Del</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 sm:space-y-5 pb-2 sm:pb-4">
                {filteredServices.map((service) => (
                  <div key={service.id} className="group bg-white border border-gray-200 rounded-xl p-4 sm:p-5 hover:shadow-lg hover:border-green-300 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                      <div className="relative w-full sm:w-16 lg:w-20 h-32 sm:h-16 lg:h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl flex-shrink-0 overflow-hidden">
                        {service.image_url ? (
                          <img
                            src={service.image_url}
                            alt={service.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FiPackage className="w-6 sm:w-8 h-6 sm:h-8 text-gray-400 group-hover:text-green-500 transition-colors duration-300" />
                          </div>
                        )}
                        {/* Status Badge */}
                        <div className="absolute top-2 right-2 sm:-top-1 sm:-right-1">
                          <span className={`px-2 py-1 text-xs font-semibold rounded-full shadow-sm ${
                            service.status === 'Active' 
                              ? 'bg-green-500 text-white' 
                              : 'bg-red-500 text-white'
                          }`}>
                            {service.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3">
                          <div className="flex-1 mb-2 sm:mb-0">
                            <h3 className="font-semibold text-gray-900 text-base sm:text-lg mb-1 group-hover:text-green-700 transition-colors duration-200 line-clamp-1">{service.name}</h3>
                            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                              {service.description}
                            </p>
                          </div>
                          <div className="sm:ml-4 sm:text-right">
                            <p className="text-lg sm:text-xl font-bold text-green-600">
                              GH₵{parseFloat(service.price || 0).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2">
                          <button
                            onClick={() => openModal(service)}
                            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-600 hover:text-blue-700 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-105"
                            title="Edit service"
                          >
                            <FiEdit className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                            Edit Service
                          </button>
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleActive(service.id)}
                              className={`flex-1 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-105 ${
                                service.status === 'Active'
                                  ? 'bg-orange-50 hover:bg-orange-100 text-orange-600 hover:text-orange-700'
                                  : 'bg-green-50 hover:bg-green-100 text-green-600 hover:text-green-700'
                              }`}
                              title={service.status === 'Active' ? 'Deactivate' : 'Activate'}
                            >
                              {service.status === 'Active' ? 
                                <>
                                  <FiEyeOff className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                  <span className="hidden xs:inline">Deactivate</span>
                                  <span className="xs:hidden">Off</span>
                                </> : 
                                <>
                                  <FiEye className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                                  <span className="hidden xs:inline">Activate</span>
                                  <span className="xs:hidden">On</span>
                                </>
                              }
                            </button>
                            <button
                              onClick={() => handleDelete(service.id)}
                              className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 px-3 sm:px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 group hover:scale-105"
                              title="Delete service"
                            >
                              <FiTrash2 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                              <span className="hidden xs:inline">Delete</span>
                              <span className="xs:hidden">Del</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden border border-gray-100">
            <div className="flex items-center justify-between p-4 sm:p-5 lg:p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-blue-50">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition duration-200 touch-manipulation"
              >
                <FiX className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-5 lg:p-6 overflow-y-auto max-h-[calc(95vh-6rem)] sm:max-h-[calc(90vh-8rem)]">
              {error && (
                <div className="mb-4 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm sm:text-base text-red-700">{error}</p>
                </div>
              )}

              <div className="space-y-3 sm:space-y-4 lg:space-y-6">
                {/* Service Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                    placeholder="Enter service name"
                    required
                  />
                </div>

                {/* Service Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base resize-none"
                    placeholder="Enter service description"
                    required
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (GH₵) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm sm:text-base"
                    placeholder="0.00"
                    required
                  />
                </div>

                {/* Service Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Status
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_available"
                      checked={formData.is_available}
                      onChange={(e) => setFormData(prev => ({ ...prev, is_available: e.target.checked }))}
                      className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <label className="ml-2 text-sm text-gray-900">
                      Service is available
                    </label>
                  </div>
                </div>

                {/* Service Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Images
                  </label>
                  <div className="space-y-3 sm:space-y-4">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="block w-full text-xs sm:text-sm text-gray-500 file:mr-3 sm:file:mr-4 file:py-2.5 sm:file:py-3 file:px-3 sm:file:px-4 file:rounded-xl file:border-0 file:text-xs sm:file:text-sm file:font-medium file:bg-green-50 file:text-green-700 hover:file:bg-green-100 file:cursor-pointer cursor-pointer"
                    />
                    
                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.preview || image}
                              alt={`Service ${index + 1}`}
                              className="w-full h-20 sm:h-24 lg:h-28 object-cover rounded-xl border border-gray-200"
                            />
                            <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 p-1 sm:p-1.5 bg-red-600 text-white rounded-full opacity-100 sm:opacity-0 group-hover:opacity-100 transition duration-200 touch-manipulation"
                            >
                              <FiX className="w-3 h-3 sm:w-4 sm:h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={closeModal}
                  className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-all duration-200 hover:scale-105 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingAction}
                  className="w-full sm:flex-1 px-4 sm:px-6 py-3 sm:py-3.5 text-sm sm:text-base bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 disabled:from-green-400 disabled:to-green-400 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 hover:scale-105 disabled:hover:scale-100 touch-manipulation"
                >
                  {loadingAction && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>}
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

            {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md border border-gray-100">
            <div className="p-4 sm:p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiTrash2 className="w-5 h-5 sm:w-6 sm:h-6 text-red-600" />
                </div>
                <div className="ml-3 sm:ml-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900">Delete Service</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1">
                    This action cannot be undone.
                  </p>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-gray-700 mb-6">
                Are you sure you want to delete "{deleteConfirm.service?.name}"?
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => setDeleteConfirm({ show: false, service: null })}
                  className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg sm:rounded-xl font-medium transition-all duration-200 touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={loadingAction}
                  className="w-full sm:flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg sm:rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 disabled:cursor-not-allowed touch-manipulation"
                >
                  {loadingAction && <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>}
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceMgmt;