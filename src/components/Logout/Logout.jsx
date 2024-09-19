import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem('token');
    
    // Redirect to login page or home page
    navigate('/login');
  };

  const handleCancel = () => {
    // Redirect to the previous page or home page
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
        <h2 className="text-2xl font-semibold mb-6">Logout</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-between">
          <button
            onClick={handleCancel}
            className="w-1/2 mr-2 border border-gray-500 text-gray-500 px-4 py-2 rounded-lg hover:bg-gray-500 hover:text-white"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="w-1/2 ml-2 border border-red-500 text-red-500 px-4 py-2 rounded-lg hover:bg-red-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
