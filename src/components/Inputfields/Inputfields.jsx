

import React, { useState, useEffect } from 'react';
import ConnectedEndpoints from '../ConnectedAgent/ConnectedAgent';
import axios from 'axios';
import Activity from '../Activity/Activity';
import Policy from '../Policy/Policy';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Inputfields = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [appName, setAppName] = useState('');
  const [domain, setDomain] = useState('');
  const [action, setAction] = useState('Block');
  const [endpoint, setEndpoint] = useState('');
  const [error, setError] = useState('');
  const [endpoints, setEndpoints] = useState([]);

  const validateIP = (value) => {
    const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return ipRegex.test(value);
  };

  useEffect(() => {
    const fetchEndpoints = async () => {
      try {
        const response = await fetch('http://20.51.249.42/api/agents');
        const data = await response.json();
        setEndpoints(data);
      } catch (error) {
        console.error('Error fetching endpoints:', error);
      }
    };
    fetchEndpoints();
  }, []);

  const handleIPChange = (e) => {
    const value = e.target.value;
    setIpAddress(value);
    if (!validateIP(value)) {
      setError('Invalid IP address');
    } else {
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ruleData = {
      app_name: appName,
      action: action,
      agent_ip: endpoint,
      ip_address: ipAddress,
      domain: domain
    };

    try {
      const response = await axios.post('http://20.51.249.42/api/rules', ruleData);
      if (response.status === 201) {
       
        toast.success('Rule Add Successful!');
      }
    } catch (error) {
      console.error('There was an error adding the rule:', error);
      toast.error('Failed to update rule');
    }
  };

  return (
    <div className="min-h-screen text-white bg-gray-900 rounded-lg p-4 md:p-6 sm:p-4">
      <div className="header text-left text-lg md:text-xl sm:p-6 mb-6">
        <h1>Hi Ankit</h1>
      </div>

      {/* Input Form Section */}
      <form className="border border-white p-4 md:p-6 rounded-lg mb-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Endpoint Dropdown */}
          <div className=" relative col-span-1 sm:col-span-2 lg:col-span-1">
            <select
              className=" appearance-none border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base md:text-lg w-full"
              value={endpoint}
              onChange={(e) => setEndpoint(e.target.value)}
            >
              <option className="text-black">Select Endpoint</option>
              {endpoints.map((agent) => (
                <option key={agent.ip} value={agent.ip} className="text-black">
                  {agent.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white" viewBox="0 0 20 20">
                <path d="M7 7l3-3 3 3H7z" />
              </svg>
            </div>
          </div>

          {/* IP Input */}
          <div className="w-full">
            <input
              type="text"
              placeholder="Enter IP Address"
              value={ipAddress}
              onChange={handleIPChange}
              className={`w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg ${
                error ? 'border-red-500' : ''
              }`}
            />
            {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
          </div>

          {/* App Input */}
          <input
            type="text"
            placeholder="App Name"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
          />

          {/* Domain Input */}
          <input
            type="text"
            placeholder="Domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base md:text-lg"
          />

          {/* Action Dropdown */}
          <div className="relative">
            <select
              className="appearance-none border border-white bg-transparent p-2 sm:p-3 md:p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm sm:text-base md:text-lg w-full"
              value={action}
              onChange={(e) => setAction(e.target.value)}
            >
              <option value="Block" className="text-black">Block</option>
              <option value="Allow" className="text-black">Allow</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white" viewBox="0 0 20 20">
                <path d="M7 7l3-3 3 3H7z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full lg:w-1/3 mt-4 sm:mt-6 md:mt-8 border border-green-500 text-green-500 px-4 sm:px-6 py-2 sm:py-3 rounded-lg hover:bg-green-500 hover:text-white text-sm sm:text-base md:text-lg"
        >
          Add Rule
        </button>
        <ToastContainer />
      </form>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <Policy />
      </div>

      <ConnectedEndpoints />
    </div>
  );
};

export default Inputfields;

