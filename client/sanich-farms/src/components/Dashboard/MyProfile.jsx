import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../../hooks/useAuthContext';
import { userAPI } from '../../services/api';

const MyProfile = () => {
  const { user, updateUser } = useAuthContext();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone_number: '',
    address: '',
    company_name: '',
  });
  const [originalData, setOriginalData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // PROFILE API INTEGRATION: Load user profile data
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use data from context if available, otherwise fetch from API
        if (user) {
          const profileData = {
            name: user.name || '',
            email: user.email || '',
            phone_number: user.phone_number || '',
            address: user.address || '',
            company_name: user.company_name || '',
          };
          setUserData(profileData);
          setOriginalData(profileData);
        } else {
          // Fetch fresh profile data from backend
          const response = await userAPI.getProfile();
          const profileData = {
            name: response.user?.name || response.name || '',
            email: response.user?.email || response.email || '',
            phone_number: response.user?.phone_number || response.phone_number || '',
            address: response.user?.address || response.address || '',
            company_name: response.user?.company_name || response.company_name || '',
          };
          setUserData(profileData);
          setOriginalData(profileData);
          setUserData(profileData);
          setOriginalData(profileData);
        }
      } catch (err) {
        console.error('Error loading profile:', err);
        setError('Failed to load profile data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadUserProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  // PROFILE API INTEGRATION: Save profile changes to backend
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      
      // Update profile via API
      const response = await userAPI.updateProfile(userData);
      
      // Update local context with new user data
      if (updateUser && response) {
        updateUser(response);
      }
      
      // Update original data to reflect saved changes
      setOriginalData(userData);
      setIsEditing(false);
      
      alert("Profile updated successfully!");
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile. Please try again.');
      alert('Failed to update profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // PROFILE API INTEGRATION: Cancel editing and restore original data
  const handleCancel = () => {
    setUserData(originalData);
    setIsEditing(false);
    setError(null);
  };

  // PROFILE API INTEGRATION: Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-12 bg-gray-200 rounded w-1/3 animate-pulse"></div>
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={i >= 2 ? "md:col-span-2" : ""}>
                <div className="h-4 bg-gray-200 rounded w-1/4 mb-2 animate-pulse"></div>
                <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl sm:text-2xl font-extrabold text-gray-800 mb-6">My Profile</h1>

      {/* PROFILE API INTEGRATION: Error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
          Personal Information
        </h2>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Enter your full name" : ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Enter your email address" : ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              />
            </div>
            <div>
              <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone_number"
                name="phone_number"
                value={userData.phone_number}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Enter your phone number" : ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea
                id="address"
                name="address"
                rows="3"
                value={userData.address}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Enter your address" : ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">Company Name (Optional)</label>
              <input
                type="text"
                id="company_name"
                name="company_name"
                value={userData.company_name}
                onChange={handleChange}
                disabled={!isEditing}
                placeholder={isEditing ? "Enter your company name (optional)" : ""}
                className={`w-full border border-gray-300 rounded-lg px-3 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={saving}
                  className="bg-gray-200 text-gray-800 px-3 py-2 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-green-600 text-white px-3 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
