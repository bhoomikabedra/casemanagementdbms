import React, { useState, useEffect } from 'react';
import axios from 'axios';

const darkTheme = {
  backgroundColor: '#1a202c',
  color: '#e2e8f0',
};

const renderCaseStatus = (status, index) => {
  const statusClass = status === 0 ? 'bg-red-500' : 'bg-green-500';

  return (
    <div className={`w-6 h-6 rounded-full ${statusClass}`}>
    </div>
  );
};

const Case = () => {
  const [cases, setCases] = useState([]);
  const [policeNames, setPoliceNames] = useState([]);
  const stationId = localStorage.getItem('station_id');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/stationcomplaints/${stationId}`);
        setCases(response.data);

        // Fetch police names for each case asynchronously
        const namesPromises = response.data.map((caseItem) => getPoliceName(caseItem.police_id));
        const names = await Promise.all(namesPromises);
        setPoliceNames(names);
      } catch (error) {
        console.error('Error fetching complaint data:', error);
      }
    };

    fetchData();
  }, [stationId]);

  const getPoliceName = async (policeId) => {
    try {
      const response = await axios.get(`http://localhost:8081/getPoliceInfo/${policeId}`);
      return response.data.name;
    } catch (error) {
      console.error('Error fetching police information:', error);
      return 'Unknown Police';
    }
  };

  return (
    <div className="container mx-auto p-4" style={darkTheme}>
      <h1 className="text-2xl font-bold mb-4">Complaint Information</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300">Name</th>
            <th className="border border-gray-300">Date of Crime</th>
            <th className="border border-gray-300">Description</th>
            <th className="border border-gray-300">Assigned Police</th>
            <th className="border border-gray-300">Culprit</th>
            <th className="border border-gray-300">Case Status</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((caseItem, index) => (
            <tr key={index}>
              <td className="border border-gray-300">{caseItem.name}</td>
              <td className="border border-gray-300">{caseItem.date_of_crime}</td>
              <td className="border border-gray-300">{caseItem.description}</td>
              <td className="border border-gray-300">
                {caseItem.police_id && policeNames[index]}
              </td>
              <td className="border border-gray-300">{caseItem.culprit}</td>
              <td className="border border-gray-300">
                {renderCaseStatus(caseItem.case_status, index)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Case;
