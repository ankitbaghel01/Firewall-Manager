import React, { useState, useEffect } from 'react';

const PortTable = () => {
  const [ports, setPorts] = useState({});

  useEffect(() => {
    // Fetch data from the API
    const fetchPorts = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/open_ports');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPorts(data);
      } catch (error) {
        console.error('Failed to fetch ports:', error);
      }
    };

    fetchPorts();
  }, []);

  return (
    
    <div className="border border-white bg-gray-900 p-2 md:p-4 rounded-lg mb-4">
      <h2 className="mb-4 text-lg md:text-xl text-white">Open Ports</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-white border-collapse border border-white text-sm md:text-base">
          <thead>
            <tr className="border-b border-white">
              <th className="p-2 border-r border-white">IP Address</th>
              <th className="p-2 border-r border-white">Port</th>
              <th className="p-2 border-r border-white">Service</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(ports).length > 0 ? (
              Object.entries(ports).map(([ip, portList]) => (
                portList.map((portInfo, index) => (
                  <tr key={`${ip}-${index}`} className="text-center border-b border-white">
                    {index === 0 && (
                      <td rowSpan={portList.length} className="p-2 border-r border-white">{ip}</td>
                    )}
                    <td className="p-2 border-r border-white">{portInfo.port}</td>
                    <td className="p-2 border-r border-white">{portInfo.service}</td>
                  </tr>
                ))
              ))
            ) : (
              <tr>
                <td colSpan="3" className="p-2 text-center">No open ports available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PortTable;
