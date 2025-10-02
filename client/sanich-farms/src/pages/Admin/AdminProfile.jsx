import React, { useState, useEffect } from 'react';
import { userAPI } from '../../services/api';
import { 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiEdit3, 
  FiSave, 
  FiX, 
  FiCamera,
  FiCheck
} from 'react-icons/fi';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    company_name: '',
    role: 'Administrator',
    avatar: null
  });

  const [editedData, setEditedData] = useState(profileData);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Try to load profile from API, fallback to adminAuth in localStorage
    let mounted = true;
    const loadProfile = async () => {
      setLoading(true);
      try {
        const response = await userAPI.getProfile();
        console.log('Profile API response:', response);
        
        if (!mounted) return;
        
        // Handle both possible response structures
        const userData = response.user || response;
        
        const profile = {
          name: userData.name || '',
          email: userData.email || '',
          phone_number: userData.phone_number || '',
          address: userData.address || '',
          company_name: userData.company_name || '',
          role: userData.role || 'Administrator',
          avatar: userData.avatar || null
        };
        
        console.log('Processed profile data:', profile);
        setProfileData(profile);
        setEditedData(profile);
        setMessage({ type: 'success', text: 'Profile loaded successfully' });
      } catch (error) {
        console.error('Failed to load profile from API:', error);
        setMessage({ type: 'error', text: 'Failed to load profile data' });
        
        // Fallback to localStorage data
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth) {
          try {
            const authData = JSON.parse(adminAuth);
            const profile = {
              name: authData.name || '',
              email: authData.email || '',
              phone_number: authData.phone_number || authData.phone || '',
              address: authData.address || '',
              company_name: authData.company_name || '',
              role: authData.role || 'Administrator',
              avatar: null
            };
            setProfileData(profile);
            setEditedData(profile);
            console.log('Loaded profile from localStorage:', profile);
          } catch (e) {
            console.error('Error loading admin data from localStorage:', e);
          }
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();

    return () => { mounted = false; };
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData(profileData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData(profileData);
    setMessage({ type: '', text: '' });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Transform data to match backend expectations - backend expects firstName/lastName but stores as name
      const nameParts = editedData.name.trim().split(' ');
      const firstName = nameParts[0] || '';
      const lastName = nameParts.slice(1).join(' ') || '';
      
      const updateData = {
        firstName: firstName,
        lastName: lastName,
        email: editedData.email,
        phone_number: editedData.phone_number,
        address: editedData.address,
        company_name: editedData.company_name
      };
      
      const response = await userAPI.updateProfile(updateData);
      
      // Update profile data with the response
      if (response.user) {
        const userData = response.user;
        
        const updatedProfile = {
          name: userData.name || '',
          email: userData.email || '',
          phone_number: userData.phone_number || '',
          address: userData.address || '',
          company_name: userData.company_name || '',
          role: userData.role || 'Administrator',
          avatar: userData.avatar || null
        };
        
        setProfileData(updatedProfile);
        setEditedData(updatedProfile);
      } else {
        setProfileData(prev => ({ ...prev, ...editedData }));
      }
      
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      // Update localStorage if needed
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth) {
        try {
          const authData = JSON.parse(adminAuth);
          localStorage.setItem('adminAuth', JSON.stringify({
            ...authData,
            name: editedData.name,
            email: editedData.email,
            phone_number: editedData.phone_number,
            address: editedData.address,
            company_name: editedData.company_name
          }));
        } catch (e) {
          console.warn('Failed to update adminAuth in localStorage', e);
        }
      }
    } catch (error) {
      console.error('Profile update error:', error);
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setEditedData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: '', text: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gray-50 py-4 px-3 sm:py-6 sm:px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Admin Profile</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Manage your account settings and preferences</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-blue-700 text-sm sm:text-base">Loading profile data...</span>
            </div>
          </div>
        )}

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          }`}>
            <div className="flex items-start sm:items-center">
              {message.type === 'success' ? (
                <FiCheck className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
              ) : (
                <FiX className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
              )}
              <span className="text-sm sm:text-base">{message.text}</span>
            </div>
          </div>
        )}

        {/* Profile Information Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
              Personal Information
            </h2>
            {!isEditing && (
              <button
                onClick={handleEdit}
                className="hidden sm:flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
              >
                <FiEdit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Avatar Section */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6 mb-6 sm:mb-8">
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                  {(isEditing ? editedData.avatar : profileData.avatar) ? (
                    <img 
                      src={isEditing ? editedData.avatar : profileData.avatar} 
                      alt="Admin Avatar" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FiUser className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-gray-400" />
                  )}
                </div>
                {isEditing && (
                  <label className="absolute -bottom-1 -right-1 sm:bottom-0 sm:right-0 bg-green-600 text-white p-2 rounded-full cursor-pointer hover:bg-green-700 transition-colors">
                    <FiCamera className="w-3 h-3 sm:w-4 sm:h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                {profileData.name || 'Admin User'}
              </h3>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <FiUser className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm text-gray-600 font-medium">{profileData.role}</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) => setEditedData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  placeholder="Enter your full name"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[44px] sm:min-h-[48px]">
                  <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">{profileData.name || 'Not set'}</span>
                </div>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              {isEditing ? (
                <input
                  type="email"
                  value={editedData.email}
                  onChange={(e) => setEditedData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  placeholder="Enter your email"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[44px] sm:min-h-[48px]">
                  <FiMail className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base break-all">{profileData.email || 'Not set'}</span>
                </div>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              {isEditing ? (
                <input
                  type="tel"
                  value={editedData.phone_number}
                  onChange={(e) => setEditedData(prev => ({ ...prev, phone_number: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[44px] sm:min-h-[48px]">
                  <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">{profileData.phone_number || 'Not set'}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.address}
                  onChange={(e) => setEditedData(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  placeholder="Enter your address"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[44px] sm:min-h-[48px]">
                  <FiMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">{profileData.address || 'Not set'}</span>
                </div>
              )}
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Name
                <span className="text-gray-400 text-xs ml-1">(Optional)</span>
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.company_name}
                  onChange={(e) => setEditedData(prev => ({ ...prev, company_name: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  placeholder="Enter your company name"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[44px] sm:min-h-[48px]">
                  <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">{profileData.company_name || 'Not set'}</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons for Editing */}
          {isEditing && (
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 mt-6 border-t border-gray-100">
              <button
                onClick={handleSave}
                disabled={loading}
                className="flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base min-h-[44px] order-2 sm:order-1"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <FiSave className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                )}
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors font-medium text-sm sm:text-base min-h-[44px] order-1 sm:order-2"
              >
                <FiX className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Cancel
              </button>
            </div>
          )}
        </div>

        {/* Mobile Edit Profile Button */}
        {!isEditing && (
          <div className="sm:hidden mb-6">
            <button
              onClick={handleEdit}
              className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-base"
            >
              <FiEdit3 className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
