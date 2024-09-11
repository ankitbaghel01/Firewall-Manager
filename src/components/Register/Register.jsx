// import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // Import Link from react-router-dom
// import axios from 'axios';

// const Registration = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [errorMessage, setErrorMessage] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      
//       setSuccessMessage('Registration successful! You can now log in.');
//       setErrorMessage(''); // Clear the error message on success

//       // Redirect or additional logic after successful registration
//     } catch (error) {
//       if (error.response && error.response.data) {
//         setErrorMessage(error.response.data.message); // Show the error message from the server
//       } else {
//         setErrorMessage('Registration failed. Please try again.');
//       }
//       setSuccessMessage(''); // Clear success message if there's an error
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-800">
//       <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full max-w-sm">
//         <h2 className="text-2xl font-semibold mb-6 text-center">Register</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block mb-1">Name</label>
//             <input
//               type="text"
//               placeholder="Enter name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Email</label>
//             <input
//               type="email"
//               placeholder="Enter email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-1">Password</label>
//             <input
//               type="password"
//               placeholder="Enter password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
//               required
//             />
//           </div>

//           {/* Display error or success messages */}
//           {errorMessage && (
//             <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
//           )}
//           {successMessage && (
//             <div className="text-green-500 text-sm mb-4">{successMessage}</div>
//           )}

//           <button
//             type="submit"
//             className="w-full mt-4 sm:mt-6 border border-green-500 text-green-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-500 hover:text-white text-sm sm:text-base md:text-lg"
//           >
//             Register
//           </button>
//         </form>

//         {/* Link to Login page */}
//         <Link to="/login">
//           <button
//             className="w-full mt-4 sm:mt-6 border border-gray-500 text-gray-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-gray-500 hover:text-white text-sm sm:text-base md:text-lg"
//           >
//             I Have an Account
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Registration;

