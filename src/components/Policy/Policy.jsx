

import React, { useState, useEffect, useRef } from 'react';
import { Settings2, Trash2 } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Policy = () => {
  const [rules, setRules] = useState([]);
  const [editingRule, setEditingRule] = useState(null);
  const [formData, setFormData] = useState({
    app_name: '',
    action: '',
    ip_address: '',
    domain: '',
  });

  const modalRef = useRef(null);

  useEffect(() => {
    // Fetch rules from the API
    const fetchRules = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/rules');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setRules(data);
      } catch (error) {
        console.error('Failed to fetch rules:', error);
      }
    };

    fetchRules();
  }, []);

  const handleUpdateClick = (rule) => {
    setEditingRule(rule);
    setFormData({
      app_name: rule.app_name,
      action: rule.action,
      ip_address: rule.ip_address,
      domain: rule.domain,
    });
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    // Prepare data to be sent
    const updateData = {
      app_name: formData.app_name !== 'N/A' ? formData.app_name : undefined,
      action: formData.action !== 'N/A' ? formData.action : undefined,
      ip_address: formData.ip_address !== 'N/A' ? formData.ip_address : undefined,
      domain: formData.domain !== 'N/A' ? formData.domain : undefined,
    };

    try {
      const response = await fetch(`http://localhost:8080/api/rules/${editingRule.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update rule');
      }

      const updatedData = await response.json();
      toast.success('Update Successful!');
      setRules((prevRules) =>
        prevRules.map((r) =>
          r.id === editingRule.id ? updatedData.rule : r
        )
      );
      setEditingRule(null); // Hide the form
    } catch (error) {
      toast.error('Failed to update rule');
      console.error('Failed to update rule:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/rules/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete rule');
      }

      setRules((prevRules) => prevRules.filter((r) => r.id !== id));
      toast.success('Rule deleted successfully');
    } catch (error) {
      toast.error('Failed to delete rule');
      console.error('Failed to delete rule:', error);
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setEditingRule(null); // Hide the form
    }
  };

  useEffect(() => {
    // Add event listener for clicks outside the modal
    document.addEventListener('mousedown', handleClickOutside);
    
    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="border border-white p-2 md:p-4 rounded-lg mb-4">
      <h2 className="mb-4 text-lg md:text-xl text-white">Firewall Rules</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-white text-sm md:text-base">
          <thead>
            <tr className="border-b border-white">
              <th className="p-2 border-r border-white">ID</th>
              <th className="p-2 border-r border-white">Application Name</th>
              <th className="p-2 border-r border-white">IP Address</th>
              <th className="p-2 border-r border-white">Domain</th>
              <th className="p-2 border-r border-white">Action</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rules.length > 0 ? (
              rules.map((rule) => (
                <tr key={rule.id} className="text-center border-b border-white">
                  <td className="p-2 border-r border-white">{rule.id}</td>
                  <td className="p-2 border-r border-white">{rule.app_name || 'N/A'}</td>
                  <td className="p-2 border-r border-white">{rule.ip_address || 'N/A'}</td>
                  <td className="p-2 border-r border-white">{rule.domain || 'N/A'}</td>
                  <td className="p-2 border-r border-white">{rule.action || 'N/A'}</td>
                  <td className="p-2 flex justify-center space-x-2">
                    <button
                      className="border border-yellow-500 text-yellow-500 px-2 py-1 rounded-lg hover:bg-yellow-500 hover:text-white text-xs sm:text-sm"
                      onClick={() => handleUpdateClick(rule)}
                    >
                      <Settings2 className="w-4 h-4" />
                    </button>
                    <button
                      className="border border-red-500 text-red-500 px-2 py-1 rounded-lg hover:bg-red-500 hover:text-white text-xs sm:text-sm"
                      onClick={() => handleDelete(rule.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-2 text-center">No rules available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {editingRule && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 p-4">
          <div
            ref={modalRef}
            className="bg-gray-900 p-4 sm:p-6 md:p-8 rounded-lg shadow-lg max-w-lg w-full"
          >
            <h3 className="text-lg font-semibold mb-4 text-white">Edit Rule</h3>
            <form className="space-y-4" onSubmit={handleUpdateSubmit}>
              {/* Application Name */}
              <div>
                <label className="block mb-1 text-white">Application Name</label>
                <input
                  type="text"
                  name="app_name"
                  value={formData.app_name}
                  onChange={handleFormChange}
                  className="border text-white bg-gray-900 border-gray-300 p-2 w-full rounded"
                />
              </div>
              
              {/* Action */}
              <div>
                <label className="block mb-1 text-white">Action</label>
                <select
                  name="action"
                  value={formData.action}
                  onChange={handleFormChange}
                  className="border text-white bg-gray-900 border-gray-300 p-2 w-full rounded"
                >
                  <option value="Block">Block</option>
                  <option value="Allow">Allow</option>
                </select>
              </div>

              {/* IP Address */}
              <div>
                <label className="block mb-1 text-white">IP Address</label>
                <input
                  type="text"
                  name="ip_address"
                  value={formData.ip_address}
                  onChange={handleFormChange}
                  className="border text-white bg-gray-900 border-gray-300 p-2 w-full rounded"
                />
              </div>

              {/* Domain */}
              <div>
                <label className="block mb-1 text-white">Domain</label>
                <input
                  type="text"
                  name="domain"
                  value={formData.domain}
                  onChange={handleFormChange}
                  className="border text-white bg-gray-900 border-gray-300 p-2 w-full rounded"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="border border-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-800 w-full text-sm sm:text-base"
              >
                Update Rule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default Policy;
