

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // axios import is retained

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = formData;

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      setSuccessMessage('Login successful!');
      localStorage.setItem('token', response.data.token);
      setErrorMessage('');
      setFormData({
        email: '',
        password: '',
      });
      navigate('/home');
    } catch (err) {
      if (err.response && err.response.data) {
        setErrorMessage(err.response.data.message);
      } else {
        setErrorMessage('An error occurred');
      }
      setSuccessMessage('');
    }
  };

  return (
    <div className="flex justify-center text-white items-center bg-gray-800 h-screen">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
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

          {/* Display error or success message */}
          {errorMessage && (
            <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="text-green-500 text-sm mb-4">{successMessage}</div>
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
