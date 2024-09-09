import React from 'react';

const Profile = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Personal Information */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Personal Information</h2>
        <p className="text-gray-700">Your personal details go here.</p>
        {/* Add additional personal information fields as needed */}
      </div>

      {/* Current Resume */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Current Resume</h2>
        <p className="text-gray-700">Details about your current resume go here.</p>
        {/* Add additional resume information as needed */}
      </div>

      {/* Top Skills */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Top Skills</h2>
        <ul className="list-disc list-inside text-gray-700">
          <li>Skill 1</li>
          <li>Skill 2</li>
          <li>Skill 3</li>
          {/* Add additional skills as needed */}
        </ul>
      </div>

      {/* Connect Information */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-4">
        <h2 className="text-xl font-semibold mb-2">Connect Information</h2>
        <p className="text-gray-700">Your contact information and links go here.</p>
        {/* Add contact details or social links as needed */}
      </div>
    </div>
  );
};

export default Profile;
