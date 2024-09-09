
import React from 'react';

const DotsTopLeft = () => {
  return (
    <div className="flex items-center justify-between p-2 border-b border-gray-700">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="absolute left-1/2 transform text-gray-200 -translate-x-1/2 text-sm font-medium">
         Firewall Manager
        </div>
        <div className="w-9"></div> {/* Placeholder for balance */}
      </div>
  );
};

export default DotsTopLeft;
