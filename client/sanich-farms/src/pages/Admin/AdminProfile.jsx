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
  FiSettings,
  FiClock,
  FiCheck,
  FiActivity
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
    name: 'Admin User',
    email: 'admin@sanichfarms.com',
    phone: '+1 (555) 123-4567',
    address: '123 Farm Road, Agricultural District',
    role: 'Administrator',
    joinDate: '2024-01-15',
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
          name: data.name || 'Admin User',
          email: data.email || 'admin@sanichfarms.com',
          phone: data.phone || '+1 (555) 123-4567',
          address: data.address || '123 Farm Road, Agricultural District',
          role: data.role || 'Administrator',
          joinDate: data.joinDate || '2024-01-15',
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
            setProfileData(prev => ({ ...prev, email: authData.email, name: authData.name || prev.name }));
            setEditedData(prev => ({ ...prev, email: authData.email, name: authData.name || prev.name }));
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
            name: editedData.name
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6 sm:mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Admin Profile
                </h1>
                <p className="mt-2 text-sm sm:text-base text-gray-600">
                  Manage your account settings and security preferences
                </p>
              </div>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="flex items-center justify-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                >
                  <FiEdit3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  <span className="hidden sm:inline">Edit Profile</span>
                  <span className="sm:hidden">Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div className={`mb-6 p-4 rounded-xl border ${
            message.type === 'success' 
              ? 'bg-green-50 border-green-200 text-green-700' 
              : 'bg-red-50 border-red-200 text-red-700'
          } shadow-sm`}>
            <div className="flex items-center">
              {message.type === 'success' ? (
                <FiCheck className="w-5 h-5 mr-2 flex-shrink-0" />
              ) : (
                <FiX className="w-5 h-5 mr-2 flex-shrink-0" />
              )}
              <span className="text-sm sm:text-base">{message.text}</span>
            </div>
          </div>
        )}

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="text-center">
                {/* Avatar Section */}
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-full mx-auto flex items-center justify-center overflow-hidden ring-4 ring-white shadow-lg">
                    {(isEditing ? editedData.avatar : profileData.avatar) ? (
                      <img 
                        src={isEditing ? editedData.avatar : profileData.avatar} 
                        alt="Admin Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FiUser className="w-8 h-8 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-green-600" />
                    )}
                  </div>
                  {isEditing && (
                    <label className="absolute bottom-0 right-0 bg-gradient-to-r from-green-600 to-green-700 text-white p-2 sm:p-3 rounded-full cursor-pointer hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl">
                      <FiCamera className="w-4 h-4 sm:w-5 sm:h-5" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* Profile Info */}
                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {isEditing ? editedData.name : profileData.name}
                  </h3>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-green-100 to-blue-100 text-green-800 text-sm font-medium">
                    <FiShield className="w-4 h-4 mr-1" />
                    {profileData.role}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-500">
                    <FiClock className="w-4 h-4 mr-1" />
                    Member since {new Date(profileData.joinDate).toLocaleDateString()}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">100%</div>
                      <div className="text-xs text-gray-500">Profile Complete</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">24/7</div>
                      <div className="text-xs text-gray-500">Admin Access</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Profile Content */}
          <div className="lg:col-span-8">
            <div className="space-y-6">
              {/* Basic Information Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                <div className="flex items-center mb-6">
                  <div className="p-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg mr-3">
                    <FiUser className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                    Basic Information
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.name}
                        onChange={(e) => setEditedData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Enter your full name"
                      />
                    ) : (
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                        <FiUser className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-900 truncate">{profileData.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    {isEditing ? (
                      <input
                        type="email"
                        value={editedData.email}
                        onChange={(e) => setEditedData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Enter your email"
                      />
                    ) : (
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                        <FiMail className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-900 truncate">{profileData.email}</span>
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    {isEditing ? (
                      <input
                        type="tel"
                        value={editedData.phone}
                        onChange={(e) => setEditedData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Enter your phone number"
                      />
                    ) : (
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                        <FiPhone className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-900 truncate">{profileData.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedData.address}
                        onChange={(e) => setEditedData(prev => ({ ...prev, address: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors"
                        placeholder="Enter your address"
                      />
                    ) : (
                      <div className="flex items-center p-4 bg-gray-50 rounded-lg border border-gray-100 hover:bg-gray-100 transition-colors">
                        <FiMapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                        <span className="text-gray-900 truncate">{profileData.address}</span>
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
                      className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      ) : (
                        <FiSave className="w-5 h-5 mr-2" />
                      )}
                      Save Changes
                    </button>
                    <button
                      onClick={handleCancel}
                      disabled={loading}
                      className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all duration-200 font-medium"
                    >
                      <FiX className="w-5 h-5 mr-2" />
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Security Settings Card */}
              {!isEditing && (
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="p-2 bg-gradient-to-r from-blue-100 to-green-100 rounded-lg mr-3">
                        <FiShield className="w-5 h-5 text-blue-600" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-semibold text-gray-900">
                        Security Settings
                      </h4>
                    </div>
                    <button
                      onClick={() => setIsChangingPassword(!isChangingPassword)}
                      className="flex items-center px-4 py-2 sm:px-6 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                    >
                      <FiKey className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      <span className="hidden sm:inline">Change Password</span>
                      <span className="sm:hidden">Password</span>
                    </button>
                  </div>

                  {isChangingPassword && (
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-xl border border-blue-100 space-y-6">
                      <div className="space-y-4">
                        {/* Current Password */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.current ? 'text' : 'password'}
                              value={passwordData.currentPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="Enter current password"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('current')}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-blue-600 transition-colors"
                            >
                              {showPasswords.current ? (
                                <FiEyeOff className="h-5 w-5 text-gray-400" />
                              ) : (
                                <FiEye className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.new ? 'text' : 'password'}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="Enter new password"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('new')}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-blue-600 transition-colors"
                            >
                              {showPasswords.new ? (
                                <FiEyeOff className="h-5 w-5 text-gray-400" />
                              ) : (
                                <FiEye className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showPasswords.confirm ? 'text' : 'password'}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                              placeholder="Confirm new password"
                            />
                            <button
                              type="button"
                              onClick={() => togglePasswordVisibility('confirm')}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-blue-600 transition-colors"
                            >
                              {showPasswords.confirm ? (
                                <FiEyeOff className="h-5 w-5 text-gray-400" />
                              ) : (
                                <FiEye className="h-5 w-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Password Action Buttons */}
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t border-blue-200">
                        <button
                          onClick={handlePasswordChange}
                          disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                          className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl font-medium"
                        >
                          {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                          ) : (
                            <FiSave className="w-5 h-5 mr-2" />
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
                          className="flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-all duration-200 font-medium"
                        >
                          <FiX className="w-5 h-5 mr-2" />
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Security Features */}
                  {!isChangingPassword && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                      <div className="flex items-center p-4 bg-green-50 rounded-lg border border-green-100">
                        <div className="p-2 bg-green-100 rounded-lg mr-3">
                          <FiShield className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <div className="font-medium text-green-900">Secure Access</div>
                          <div className="text-sm text-green-700">Two-factor authentication enabled</div>
                        </div>
                      </div>
                      <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <div className="p-2 bg-blue-100 rounded-lg mr-3">
                          <FiActivity className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium text-blue-900">Session Active</div>
                          <div className="text-sm text-blue-700">Last login: Today</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
