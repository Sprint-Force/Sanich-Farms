// MessageBox
import React from 'react';

const MessageBox = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 font-poppins">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center">
        <p className="text-lg font-medium text-gray-800 mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default MessageBox;