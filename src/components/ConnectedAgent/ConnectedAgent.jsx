import React, { useState, useEffect } from 'react';

const ConnectedEndpoints = () => {
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchAgents = async () => {
      try {
        const response = await fetch('http://20.51.249.42/api/agents');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAgents(data);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchAgents();
  }, []);

  return (
    <div className="border border-white  p-4 rounded-lg mb-4">
      <h2 className="mb-4 text-lg md:text-xl text-white">Connected Endpoints</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-white text-sm md:text-base">
          <thead>
            <tr className="border-b border-white">
              <th className="p-2 border-r border-white">Name</th>
              <th className="p-2 border-r border-white">IP Address</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {agents.length > 0 ? (
              agents.map((agent, index) => (
                <tr key={index} className="text-center border-b border-white">
                  <td className="p-2 border-r border-white">{agent.name}</td>
                  <td className="p-2 border-r border-white">{agent.ip}</td>
                  <td className="p-2">
                    <div className="">
                      <select className="appearance-none border border-white bg-transparent p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm md:text-base w-full">
                        <option className="text-black">Action</option>
                        <option className="text-black">Allow</option>
                        <option className="text-black">Block</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20">
                          <path d="M7 7l3-3 3 3H7z" />
                        </svg>
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center">No endpoints available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ConnectedEndpoints;
