import React, { useState, useEffect } from 'react';
import { servicesAPI } from '../../services/api';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye, FiX, FiUpload, FiTag, FiDollarSign } from 'react-icons/fi';

const ServiceMgmt = () => {
  // ADMIN SERVICES FIX: State management for services
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  });

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // ADMIN SERVICES FIX: Fetch services from API
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoadingServices(true);
      setError(null);
      try {
        const response = await servicesAPI.getAll();
        if (!mounted) return;
        const servicesData = Array.isArray(response) ? response : 
                            Array.isArray(response?.services) ? response.services :
                            Array.isArray(response?.data) ? response.data : [];
        setServices(servicesData);
      } catch (err) {
        console.error('Failed to fetch services:', err);
        setError('Failed to load services. Please try again.');
        setServices([]);
      } finally {
        if (mounted) setLoadingServices(false);
      }
    };
    load();
    return () => { mounted = false; };
  }, []);

  // ADMIN SERVICES FIX: Filter services based on search term
  const filteredServices = services.filter(service =>
    service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ADMIN SERVICES FIX: Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  // ADMIN SERVICES FIX: Reset form and modal state
  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: null
    });
    setEditingService(null);
    setShowModal(false);
    setError(null);
    setSuccessMessage('');
  };

  // ADMIN SERVICES FIX: Handle add new service
  const handleAddService = () => {
    resetForm();
    setShowModal(true);
  };

  // ADMIN SERVICES FIX: Handle edit service
  const handleEditService = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || '',
      description: service.description || '',
      price: service.price || '',
      image: null // Don't pre-populate file input
    });
    setShowModal(true);
  };

  // ADMIN SERVICES FIX: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true);
    setError(null);
    setSuccessMessage('');

    // Validate required fields
    if (!formData.name.trim() || !formData.description.trim() || !formData.price) {
      setError('Please fill in all required fields: name, description, and price.');
      setLoadingAction(false);
      return;
    }

    try {
      // Create FormData for multipart/form-data
      const submitData = new FormData();
      submitData.append('name', formData.name.trim());
      submitData.append('description', formData.description.trim());
      submitData.append('price', parseFloat(formData.price));
      
      if (formData.image) {
        submitData.append('file', formData.image);
      }

      if (editingService) {
        // Update existing service
        await servicesAPI.updateAdmin(editingService.id, submitData);
        setSuccessMessage('Service updated successfully!');
      } else {
        // Create new service
        await servicesAPI.createAdmin(submitData);
        setSuccessMessage('Service added successfully!');
      }

      // Refresh services list
      const refreshResponse = await servicesAPI.getAll();
      const servicesData = Array.isArray(refreshResponse) ? refreshResponse : 
                          Array.isArray(refreshResponse?.services) ? refreshResponse.services :
                          Array.isArray(refreshResponse?.data) ? refreshResponse.data : [];
      setServices(servicesData);
      
      resetForm();
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      console.error('Error saving service:', err);
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to save service. Please try again.');
    } finally {
      setLoadingAction(false);
    }
  };

  // ADMIN SERVICES FIX: Handle delete service with confirmation
  const handleDeleteService = async (service) => {
    if (!window.confirm(`Are you sure you want to delete "${service.name}"? This action cannot be undone.`)) {
      return;
    }

    setLoadingAction(true);
    setError(null);
    setSuccessMessage('');

    try {
      await servicesAPI.removeAdmin(service.id);
      
      // Refresh services list
      const refreshResponse = await servicesAPI.getAll();
      const servicesData = Array.isArray(refreshResponse) ? refreshResponse : 
                          Array.isArray(refreshResponse?.services) ? refreshResponse.services :
                          Array.isArray(refreshResponse?.data) ? refreshResponse.data : [];
      setServices(servicesData);
      
      setSuccessMessage('Service deleted successfully!');
      
      // Auto-hide success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);

    } catch (err) {
      console.error('Error deleting service:', err);
      setError(err.response?.data?.error || err.response?.data?.message || 'Failed to delete service. Please try again.');
    } finally {
      setLoadingAction(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-6">
      {/* ADMIN SERVICES FIX: Header */}
      <div className="mb-6 lg:mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Services Management</h1>
        <p className="text-gray-600">Manage your farm services offerings</p>
      </div>

      {/* ADMIN SERVICES FIX: Success Message */}
      {successMessage && (
        <div className="mb-4 lg:mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-700 font-medium">{successMessage}</p>
        </div>
      )}

      {/* ADMIN SERVICES FIX: Error Message */}
      {error && (
        <div className="mb-4 lg:mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {/* ADMIN SERVICES FIX: Controls */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 lg:p-6 mb-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          {/* Add Service Button */}
          <button
            onClick={handleAddService}
            disabled={loadingAction}
            className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition duration-200"
          >
            <FiPlus className="w-4 h-4" />
            Add Service
          </button>
        </div>
      </div>

      {/* ADMIN SERVICES FIX: Services List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {loadingServices ? (
          <div className="p-12 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-4 text-gray-600">Loading services...</p>
          </div>
        ) : filteredServices.length === 0 ? (
          <div className="p-12 text-center">
            <FiTag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">
              {searchTerm ? 'No services found matching your search.' : 'No services available.'}
            </p>
            {!searchTerm && (
              <button
                onClick={handleAddService}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Add your first service
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {service.image_url && (
                            <img 
                              src={service.image_url} 
                              alt={service.name}
                              className="h-10 w-10 rounded-lg object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{service.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={service.description}>
                          {service.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          GH₵{service.price}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditService(service)}
                            disabled={loadingAction}
                            className="text-blue-600 hover:text-blue-700 disabled:text-blue-400 p-1"
                            title="Edit Service"
                          >
                            <FiEdit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteService(service)}
                            disabled={loadingAction}
                            className="text-red-600 hover:text-red-700 disabled:text-red-400 p-1 ml-2"
                            title="Delete Service"
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

            {/* Mobile Card View */}
            <div className="lg:hidden divide-y divide-gray-200">
              {filteredServices.map((service) => (
                <div key={service.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {service.image_url && (
                          <img 
                            src={service.image_url} 
                            alt={service.name}
                            className="h-12 w-12 rounded-lg object-cover mr-3"
                          />
                        )}
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">{service.name}</h3>
                          <p className="text-sm font-medium text-green-600">GH₵{service.price}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-4">
                      <button
                        onClick={() => handleEditService(service)}
                        disabled={loadingAction}
                        className="text-blue-600 hover:text-blue-700 disabled:text-blue-400 p-2"
                        title="Edit Service"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service)}
                        disabled={loadingAction}
                        className="text-red-600 hover:text-red-700 disabled:text-red-400 p-2"
                        title="Delete Service"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ADMIN SERVICES FIX: Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-600"
              >
                <FiX className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Service Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter service name"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter service description"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                  Price (GH₵) *
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter price"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              {/* Image Upload */}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                  Service Image {!editingService && '(Optional)'}
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-gray-400">
                  <div className="space-y-1 text-center">
                    <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    {formData.image && (
                      <p className="text-sm text-green-600 font-medium">Selected: {formData.image.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Form Error */}
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{error}</p>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loadingAction}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 disabled:bg-green-400 transition duration-200 flex items-center gap-2"
                >
                  {loadingAction && (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  )}
                  {editingService ? 'Update Service' : 'Add Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceMgmt;
