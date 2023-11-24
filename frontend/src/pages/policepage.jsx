import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import './dark-theme.css'; // Import the dark theme CSS

const PolicePage = () => {
  const [policeInfo, setPoliceInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve police_id from local storage
    const policeId = localStorage.getItem('police_id');

    // Make an API call to fetch police officer information
    axios
      .get(`http://localhost:8081/getPoliceInfo/${policeId}`)
      .then((response) => {
        setPoliceInfo(response.data);
      })
      .catch((error) => {
        console.error('Error fetching police officer information:', error);
      });
  }, []); // Empty dependency array to run the effect once

  const backgroundStyle = {
    backgroundImage: `url('police.jpeg')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="flex justify-center items-center h-screen" style={backgroundStyle}>
      <div className="text-center text-white">
        {policeInfo ? (
          <div>
            <h2 className="text-6xl font-bold">Profile Information</h2>
            <p className="text-2xl font-bold">Name: {policeInfo.name}</p>
            <p className="text-2xl font-bold">Badge number: {policeInfo.badge_number}</p>
            <p className="text-2xl font-bold">Position: {policeInfo.position}</p>
            <p className="text-2xl font-bold">Specialization: {policeInfo.specialization}</p>
            <p className="text-2xl font-bold">Location: {policeInfo.location}</p>
            <p className="text-2xl font-bold">Phone number: {policeInfo.phone_number}</p>
            {/* Add other police officer details here */}
          </div>
        ) : (
          <p>Loading police officer information...</p>
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => {
            navigate('/policecases');
          }}
        >
          View Cases
        </button>
      </div>
    </div>
  );
};

export default PolicePage;
