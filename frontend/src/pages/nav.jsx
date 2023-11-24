import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url("nav.jpeg")' }}>
      <div className="text-center bg-opacity-60 p-8 rounded-lg w-80">
        <h1 className="text-3xl font-bold mb-4 text-white">Choose Your Login</h1>
        <div className="space-y-4">
          <Link to="/police_login">
            <button className="bg-transparent hover:bg-gray-300 text-white font-bold py-2 px-4 rounded-full text-xl">
              Police Login
            </button>
          </Link>
          <Link to="/police_station_login">
            <button className="bg-transparent hover:bg-gray-300 text-white font-bold py-2 px-4 rounded-full text-xl">
              Police Station Login
            </button>
          </Link>
          <Link to="/victimlogin">
            <button className="bg-transparent hover:bg-gray-300 text-white font-bold py-2 px-4 rounded-full text-xl">
              Victim Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
