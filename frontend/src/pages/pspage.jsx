import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PolicestationPage = () => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    const policeStationID = localStorage.getItem('station_id');
    console.log('station_id:', policeStationID);

    const fetchLocation = async () => {
      try {
        const locationMapping = {
          '1': 'Koramangala',
          '2': 'Indiranagar',
          '3': 'MG Road',
          '4': 'Jayanagar',
          '5': 'Whitefield',
          '6': 'Malleshwaram',
          '7': 'Electronic City',
          '8': 'Bannerghata Road',
        };

        const mappedLocation = locationMapping[policeStationID];
        console.log('mappedLocation:', mappedLocation);

        setLocation(mappedLocation || 'Police Station');
      } catch (error) {
        console.error('Error fetching location:', error);
        setLocation(' Police Station');
      }
    };

    fetchLocation();
  }, []);

  return (
    <div
      className="h-screen flex flex-col justify-center items-center"
      style={{
        backgroundImage: `url('/loginpage.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1 className="text-4xl font-bold text-white">{location} Police Station</h1>
      <div className="mt-8 flex">
        <Link to="/stationpolice" className="mx-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            style={{ fontSize: '18px' }}
          >
            Police
          </button>
        </Link>
        <Link to="/caseupdate" className="mx-4">
          <button
            className="bg-blue-500 hover.bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            style={{ fontSize: '18px' }}
          >
            Case
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PolicestationPage;
