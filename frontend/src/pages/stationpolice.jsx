import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PoliceListPage = () => {
  const [policeList, setPoliceList] = useState([]);
  const [stationName, setStationName] = useState('');

  useEffect(() => {
    // Get the station ID from local storage
    const stationId = localStorage.getItem('station_id');

    // Fetch the list of police officers for the specified station
    axios.get(`http://localhost:8081/getPoliceByStation/${stationId}`)
      .then((response) => {
        setPoliceList(response.data);
      })
      .catch((error) => {
        console.error("Error fetching police officers:", error);
      });

    // Fetch the station name based on the station ID
    axios.get(`http://localhost:8081/getStationName/${stationId}`)
      .then((response) => {
        setStationName(response.data.stationName);
      })
      .catch((error) => {
        console.error("Error fetching station name:", error);
      });
  }, []); // Fetch data when the component mounts

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold">Police Station: {stationName}</h1>
      <div className="mt-4">
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Badge Number</th>
              <th className="border border-gray-200 px-4 py-2">Position</th>
              <th className="border border-gray-200 px-4 py-2">Email</th>
              <th className="border border-gray-200 px-4 py-2">Specialization</th>
              <th className="border border-gray-200 px-4 py-2">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {policeList.map((police) => (
              <tr key={police.police_id}>
                <td className="border border-gray-200 px-4 py-2">{police.name}</td>
                <td className="border border-gray-200 px-4 py-2">{police.badge_number}</td>
                <td className="border border-gray-200 px-4 py-2">{police.position}</td>
                <td className="border border-gray-200 px-4 py-2">{police.email}</td>
                <td className="border border-gray-200 px-4 py-2">{police.specialization}</td>
                <td className="border border-gray-200 px-4 py-2">{police.phone_number}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PoliceListPage;
