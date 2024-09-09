
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  
  const [errorMessage, setErrorMessage] = useState(''); // To store the error message
  const navigate = useNavigate(); // Initialize useNavigate to redirect the user

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    // Check if the username and password match 'admin@gmail.com' and 'admin'
    if (username === 'admin@gmail.com' && password === 'admin') {
      setErrorMessage(''); // Clear error message if credentials are correct
      navigate('/home');   // Navigate to the home page
    } else {
      setErrorMessage('Email or password is incorrect'); // Set error message
    }
  };

  return (
    <div className="flex justify-center text-white items-center bg-gray-800 h-screen">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="email"
              placeholder="Enter email"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
              required
            />
          </div>
          <div className="mb-2">
            <label className="block mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
              required
            />
          </div>

          {/* Display error message if credentials are incorrect */}
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full mt-4 sm:mt-6 md:mt-8 border border-blue-500 text-blue-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-blue-500 hover:text-white text-sm sm:text-base md:text-lg"
          >
            Login
          </button>
        </form>

        {/* Link to registration page */}
        <Link to="/register">
          <button
            className="w-full mt-4 sm:mt-6 border border-gray-500 text-gray-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-500 hover:text-white text-sm sm:text-base md:text-lg"
          >
            I don't Have an Account
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
