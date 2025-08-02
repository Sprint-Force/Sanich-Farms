// src/components/Dashboard/MyProfile.jsx
import React, { useState } from 'react';

const MyProfile = () => {
  // Mock user data (replace with actual user data from context/backend)
  const [userData, setUserData] = useState({
    firstName: 'Sanich',
    lastName: 'User',
    email: 'user@example.com',
    phone: '0241234567',
    address: '123 Farm Road, Kumasi, Ghana',
    company: 'Sanich Farms Customer',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving user data:", userData);
    // In a real app, send this data to your backend to update user profile
    alert("Profile updated successfully!"); // Using alert for simplicity
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset to original data if cancel (in a real app, fetch original data again)
    // For now, just exit editing mode
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4 border-gray-200">
          Personal Information
        </h2>
        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
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
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              ></textarea>
            </div>
            <div className="md:col-span-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company (Optional)</label>
              <input
                type="text"
                id="company"
                name="company"
                value={userData.company}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full border border-gray-300 rounded-lg px-4 py-2 ${isEditing ? 'focus:outline-none focus:ring-2 focus:ring-green-500' : 'bg-gray-100 cursor-not-allowed'} transition duration-200`}
              />
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full font-semibold hover:bg-gray-300 transition duration-300 shadow-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition duration-300 shadow-md"
                >
                  Save Changes
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
