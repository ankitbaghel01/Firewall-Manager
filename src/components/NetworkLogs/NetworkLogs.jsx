
import React, { useState, useEffect } from 'react';
import SideIcons from '../SideIcons/SideIcons';
import { Settings2, Trash2 } from 'lucide-react';
import DotsTopLeft from '../Dots/Dots';

const NetworkLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchLogs = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/logs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLogs(data);
      } catch (error) {
        console.error('Failed to fetch logs:', error);
      }
    };

    fetchLogs();
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-800 min-h-screen">
      
      {/* Sidebar for Icons */}
      <div className="md:w-16 w-full bg-gray-900 md:fixed md:h-screen">
        <SideIcons />
      </div>
      
      {/* Box container for content */}
      <div className="flex-1 p-4 md:ml-16">
    
        <DotsTopLeft/>
      <div className="flex-1 ml-0 md:ml-16 p-4 md:p-6 text-white">
        <div className="border border-white p-4 md:p-6 rounded-lg bg-gray-900">
          <h2 className="mb-4 text-lg md:text-xl">Network Logs</h2>

          {/* Table container with overflow scroll for smaller screens */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-white text-xs md:text-sm lg:text-base">
              <thead>
                <tr className="border-b border-white">
                  <th className="p-2 border-r border-white">Time</th>
                  <th className="p-2 border-r border-white">Local Address</th>
                  <th className="p-2 border-r border-white">Remote Address</th>
                  <th className="p-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {logs.length > 0 ? (
                  logs.map((log, index) => (
                    <tr key={index} className="text-center border-b border-white">
                      <td className="p-2 border-r border-white">{log.time}</td>
                      <td className="p-2 border-r border-white">{log.local_address}</td>
                      <td className="p-2 border-r border-white">{log.remote_address}</td>
                      <td className="p-2 border-r border-white">{log.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-2 text-center">No logs available</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default NetworkLogs;
