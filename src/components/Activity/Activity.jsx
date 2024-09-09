

import React from 'react';
import SideIcons from '../SideIcons/SideIcons';
import { Settings2, Trash2 } from 'lucide-react';

const Activity = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-800 min-h-screen">
      
      {/* Sidebar for Icons */}
      {/* <div className="md:w-16 w-full bg-gray-900 md:fixed md:h-screen">
        <SideIcons />
      </div> */}
      
      {/* Box container for content */}
      <div className="flex-1 ml-0 md:ml-16 p-6 text-white">
        <div className="border border-white p-4 md:p-6 rounded-lg">
          <h2 className="mb-4 text-lg md:text-xl">Activity</h2>
          <table className="w-full border-collapse border border-white text-sm md:text-base">
            <thead>
              <tr className="border-b border-white">
                <th className="p-2 border-r border-white">ID</th>
                <th className="p-2 border-r border-white">Application Name</th>
                <th className="p-2 border-r border-white">IP Address</th>
                <th className="p-2 border-r border-white">Domain</th>
                <th className="p-2 border-r border-white">Action</th>
                <th className="p-2">Edit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-center border-b border-white">
                <td className="p-2 border-r border-white">1</td>
                <td className="p-2 border-r border-white">Google</td>
                <td className="p-2 border-r border-white">21.23.1.23.18</td>
                <td className="p-2 border-r border-white">www.google.com</td>
                <td className="p-2 border-r border-white">Allow</td>
                <td className="p-2 flex space-x-2">
                  <button className="border border-yellow-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white text-sm md:text-base">
                    <Settings2 />
                  </button>
                  <button className="border border-red-500 text-green-500 px-4 py-2 rounded-lg hover:bg-green-500 hover:text-white text-sm md:text-base">
                    <Trash2 />
                  </button>
                </td>
              </tr>
              {/* Repeat Rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}

export default Activity;
