import React from 'react';
import { Link } from 'react-router-dom';

const darkTheme = {
  backgroundColor: '#1a202c',
  color: '#e2e8f0',
};

const buttonStyle = {
  backgroundColor: '#7e481c',
  hoverColor: '#543310',
};

const headingStyle = {
  fontSize: '3rem', // Adjust the font size as needed
  fontWeight: 'bold',
  marginBottom: '2rem',
};

export default function VictimLand() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100" style={{backgroundImage:'url("loginpage.jpeg")',...darkTheme}}>
      <div className="text-center">
        <h1 style={headingStyle}>Welcome to VictimLand</h1>
        <Link to="/complaint">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full mx-2"
            style={{ ...buttonStyle }}
          >
            File a Complaint
          </button>
        </Link>
        <Link to="/seeupdatevictim">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-full mx-2"
            style={{ ...buttonStyle }}
          >
            See Updates
          </button>
        </Link>
      </div>
    </div>
  );
}
