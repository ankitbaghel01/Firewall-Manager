
import React, { useState, useEffect } from 'react';

const AlertTable = () => {
  const [alerts, setAlerts] = useState([]);
  const [agents, setAgents] = useState([]);

  useEffect(() => {
    // Fetch alerts from the API
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://20.51.249.42/api/alerts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Failed to fetch alerts:', error);
      }
    };

    // Fetch agents from the API
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

    fetchAlerts();
    fetchAgents();
  }, []);

  const formatBandwidth = (bandwidth) => {
    // Assuming the bandwidth is provided in bytes, convert it to MB
    return (bandwidth / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Get the agent name by matching the ip_address
  const getAgentName = (ip) => {
    const agent = agents.find((agent) => agent.ip_address === ip);
    return agent ? agent.name : 'Unknown';
  };

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold mb-4">Alerts</h2>
      <div className="space-y-4">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg shadow-lg max-w-lg ${
                alert.alert_type === 'warning'
                  ? 'bg-yellow-100 border-yellow-400 text-yellow-700'
                  : alert.alert_type === 'error'
                  ? 'bg-red-100 border-red-400 text-red-700'
                  : 'bg-blue-100 border-blue-400 text-blue-700'
              } border-l-4 flex items-start space-x-4`}
            >
              <div className="flex-shrink-0">
                {/* This can be an icon based on the alert type */}
                <span
                  className={`p-2 rounded-full ${
                    alert.alert_type === 'warning'
                      ? 'bg-yellow-500 text-white'
                      : alert.alert_type === 'error'
                      ? 'bg-red-500 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  {alert.alert_type === 'warning' ? '⚠️' : alert.alert_type === 'error' ? '❌' : 'ℹ️'}
                </span>
              </div>
              <div className="space-y-2">
                {/* Display the IP address, agent name, alert title, and formatted message */}
                <p className="font-bold">{alert.title}</p>
                <p>{alert.message}</p>
                <div className="text-sm text-gray-600">
                  <p>IP Address: <span className="font-semibold">{alert.agent_ip || 'N/A'}</span></p>
                  <p>Agent Name: <span className="font-semibold">{getAgentName(alert.ip_address)}</span></p>
                  <p>Bandwidth: <span className="font-semibold">{formatBandwidth(alert.current_usage)}</span></p>
                  <p>Alert Type: <span className="font-semibold capitalize">{alert.alert_type}</span></p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No alerts available.</p>
        )}
      </div>
    </div>
  );
};

export default AlertTable;
