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
  FiKey,
  FiEye,
  FiEyeOff,
  FiShield,
  FiCheck
} from 'react-icons/fi';

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    role: 'Administrator',
    avatar: null
  });

  const [editedData, setEditedData] = useState(profileData);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    // Try to load profile from API, fallback to adminAuth in localStorage
    let mounted = true;
    const loadProfile = async () => {
      try {
        const data = await userAPI.getProfile();
        if (!mounted) return;
        const profile = {
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
          role: data.role || 'Administrator',
          avatar: data.avatar || null
        };
        setProfileData(profile);
        setEditedData(profile);
      } catch (error) {
        // Fallback to localStorage data
        console.warn('Failed to load profile from API, falling back to local adminAuth', error);
        const adminAuth = localStorage.getItem('adminAuth');
        if (adminAuth) {
          try {
            const authData = JSON.parse(adminAuth);
            const profile = {
              firstName: authData.firstName || '',
              lastName: authData.lastName || '',
              email: authData.email || '',
              phone: authData.phone || '',
              address: authData.address || '',
              role: authData.role || 'Administrator',
              avatar: null
            };
            setProfileData(profile);
            setEditedData(profile);
          } catch (e) {
            console.error('Error loading admin data from localStorage:', e);
          }
        }
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
      // Call API to update profile
      const res = await userAPI.updateProfile(editedData);
      setProfileData(prev => ({ ...prev, ...res }));
      setIsEditing(false);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });

      // Update localStorage if needed
      const adminAuth = localStorage.getItem('adminAuth');
      if (adminAuth) {
        try {
          const authData = JSON.parse(adminAuth);
          localStorage.setItem('adminAuth', JSON.stringify({
            ...authData,
            email: editedData.email,
            firstName: editedData.firstName,
            lastName: editedData.lastName,
            phone: editedData.phone,
            address: editedData.address
          }));
        } catch (e) {
          console.warn('Failed to update adminAuth in localStorage', e);
        }
      }
    } catch {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match!' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters long!' });
      return;
    }

    setLoading(true);
    try {
      // Call API to change password
      await userAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setIsChangingPassword(false);
      setMessage({ type: 'success', text: 'Password changed successfully!' });
    } catch (e) {
      const errMsg = e?.response?.data?.message || 'Failed to change password. Please try again.';
      setMessage({ type: 'error', text: errMsg });
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

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
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
                className="flex items-center justify-center px-4 py-2.5 sm:py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base min-h-[44px] sm:min-h-[40px]"
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
                {profileData.firstName || profileData.lastName 
                  ? `${profileData.firstName} ${profileData.lastName}`.trim()
                  : 'Admin User'
                }
              </h3>
              <div className="flex items-center justify-center sm:justify-start mt-2">
                <FiShield className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-sm text-gray-600 font-medium">{profileData.role}</span>
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.firstName}
                  onChange={(e) => setEditedData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  placeholder="Enter your first name"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[44px] sm:min-h-[48px]">
                  <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">{profileData.firstName || 'Not set'}</span>
                </div>
              )}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={editedData.lastName}
                  onChange={(e) => setEditedData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  placeholder="Enter your last name"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[44px] sm:min-h-[48px]">
                  <FiUser className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">{profileData.lastName || 'Not set'}</span>
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
                  value={editedData.phone}
                  onChange={(e) => setEditedData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="flex items-center p-3 bg-gray-50 rounded-lg border border-gray-100 min-h-[44px] sm:min-h-[48px]">
                  <FiPhone className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 mr-3 flex-shrink-0" />
                  <span className="text-gray-900 text-sm sm:text-base">{profileData.phone || 'Not set'}</span>
                </div>
              )}
            </div>

            {/* Address */}
            <div className="lg:col-span-2">
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

        {/* Security Settings Card */}
        {!isEditing && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6 lg:p-8 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-0">
                Security Settings
              </h2>
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="flex items-center justify-center px-4 py-2.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base min-h-[44px] sm:min-h-[40px]"
              >
                <FiKey className="w-4 h-4 mr-2" />
                Change Password
              </button>
            </div>

            {isChangingPassword && (
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg border border-blue-100">
                <div className="space-y-4 sm:space-y-5">
                  {/* Current Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Current Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.current ? 'text' : 'password'}
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                        placeholder="Enter current password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('current')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 min-h-[44px]"
                      >
                        {showPasswords.current ? (
                          <FiEyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <FiEye className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.new ? 'text' : 'password'}
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                        placeholder="Enter new password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('new')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 min-h-[44px]"
                      >
                        {showPasswords.new ? (
                          <FiEyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <FiEye className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm New Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPasswords.confirm ? 'text' : 'password'}
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-sm sm:text-base min-h-[44px] sm:min-h-[48px]"
                        placeholder="Confirm new password"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility('confirm')}
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 min-h-[44px]"
                      >
                        {showPasswords.confirm ? (
                          <FiEyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                        ) : (
                          <FiEye className="h-4 w-4 sm:h-5 sm:w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Password Change Actions */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 mt-6 border-t border-blue-200">
                  <button
                    onClick={handlePasswordChange}
                    disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                    className="flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base min-h-[44px] order-2 sm:order-1"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                    ) : (
                      <FiSave className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    )}
                    Update Password
                  </button>
                  <button
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordData({
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: ''
                      });
                    }}
                    disabled={loading}
                    className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors font-medium text-sm sm:text-base min-h-[44px] order-1 sm:order-2"
                  >
                    <FiX className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
