import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CrimeReportForm() {
  const [formData, setFormData] = useState({
    name: '',
    aadhar: '',
    phone_number: '',
    dob: '',
    location: 'Koramangala', // Default location
    date_of_crime: '',
    type_of_crime: 'Assault', // Default type of crime
    description: '',
    victim_id: '', // Default value will be set in useEffect
    police_id: '',
    station_id: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve victim_id from localStorage and set it in the state
    const victimIdFromLocalStorage = localStorage.getItem('victim_id');
    if (victimIdFromLocalStorage) {
      setFormData({
        ...formData,
        victim_id: victimIdFromLocalStorage,
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Validate the length of aadhar and phone_number
    if ((name === 'aadhar' && value.length <= 8) || (name === 'phone_number' && value.length <= 10)) {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post('http://localhost:8081/complaint', formData)
      .then((res) => {
        console.log('Complaint Registered Successfully');
        navigate('/victimland');
      })
      .catch((err) => console.error(err));
    // Add your form submission logic here
  };

  const crimeTypes = [
    //'Murder',
    'Assault',
    'Robbery',
    'Kidnapping',
    'Sexual Assault',
    'Burglary',
    'Theft',
    'Shoplifting',
    //'Vandalism',
    //'Arson',
    //'Fraud',
    //'Embezzlement',
    //'Money Laundering',
    //'Identity Theft',
    //'Tax Evasion',
    //'Possession of Controlled Substances',
    //'Drug Trafficking',
    //'Manufacturing of Illegal Drugs',
    'Hacking',
    //'Phishing',
    //'Identity Theft (online)',
    //'Cyberbullying',
    'Speeding',
    //'Reckless Driving',
    //'Driving Under the Influence (DUI)',
    //'Hit and Run',
    //'Vehicle Theft',
    //'Domestic Violence',
    //'Child Abuse',
    //'Elder Abuse',
    //'Stalking',
    //'Pollution',
    //'Illegal Dumping',
    //'Poaching',
    //'Environmental Damage',
  ];
  const locations = [
    'Koramangala',
    'Indiranagar',
    'MG Road',
    'Jayanagar',
    //'Whitefield',
    'Malleshwaram',
    //'Electronic City',
    //'Bannerghatta Road',
    //'Yelahanka',
    //'Hosur Road',
  ];
  return (
    <div
      className="container mx-auto mt-8 bg-cover"
      style={{ backgroundImage: 'url("loginpage.jpeg")' }}
    >
      <div className="bg-gray-800 bg-opacity-25 shadow-md rounded px-8 pt-6 pb-8 mb-4 text-white">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-brown text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-brown text-sm font-bold mb-2" htmlFor="aadhar">
              Aadhar
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="aadhar"
              name="aadhar"
              value={formData.aadhar}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-brown text-sm font-bold mb-2" htmlFor="phone_number">
              Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              id="phone_number"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-brown text-sm font-bold mb-2" htmlFor="dob">
              Date of Birth
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-brown text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-brown text-sm font-bold mb-2" htmlFor="date_of_crime">
              Date of Crime
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              type="date"
              id="date_of_crime"
              name="date_of_crime"
              value={formData.date_of_crime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-brown text-sm font-bold mb-2" htmlFor="type_of_crime">
              Type of Crime
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="type_of_crime"
              name="type_of_crime"
              value={formData.type_of_crime}
              onChange={handleChange}
              required
            >
              {crimeTypes.map((crimeType) => (
                <option key={crimeType} value={crimeType}>
                  {crimeType}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-brown text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2 text-center">
            <button
              className="bg-brown-500 hover:bg-brown-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrimeReportForm;