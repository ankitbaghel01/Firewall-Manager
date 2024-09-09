
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      alert('Registration successful!');
      console.log('Registration Data:', data);

      // Redirect user after successful registration
    } catch (error) {
      console.error('Error during registration:', error);
      alert('Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="name"
              placeholder="enter name"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              placeholder="enter email"
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
              placeholder="enter password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 sm:mt-6 md:mt-8 border border-green-500 text-green-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-500 hover:text-white text-sm sm:text-base md:text-lg"
          >
            Register
          </button>
        </form>

        {/* Link to Login page */}
        <Link to="/">
          <button
            className="w-full mt-4 sm:mt-6 border border-gray-500 text-gray-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-500 hover:text-white text-sm sm:text-base md:text-lg"
          >
            I Have an Account
          </button>
        </Link>

      </div>
    </div>
  );
};

export default Registration;
