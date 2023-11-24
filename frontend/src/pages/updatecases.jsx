import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';



function CrimeReportForm() {
    const [formData, setFormData] = useState({
        name: '',
        // aadhar: '',
        // phone_number: '',
        // dob: '',
         location: 'Koramangala',
        // date_of_crime: '',
         type_of_crime: 'Assault',
        // description: '',
        // victim_id: '',
        // police_id: '',
        // station_id: '',
        culprit: '', // New field
        case_status: '', // New field
      });

  const navigate = useNavigate();
  const { complaint_id } = useParams();
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put('http://localhost:8081/complaintupdate/'+complaint_id,formData)
    .then(res => {
      console.log(res);
      console.log(complaint_id);
      navigate('/policecases');
    })
    .catch(err => console.error(err));
  }

  const crimeTypes = [
    //"Murder",
    "Assault",
    "Robbery",
    "Kidnapping",
    "Sexual Assault",
    "Burglary",
     "Theft",
     "Shoplifting",
    // "Vandalism",
    // "Arson",
    // "Fraud",
    // "Embezzlement",
    // "Money Laundering",
    // "Identity Theft",
    // "Tax Evasion",
    // "Possession of Controlled Substances",
    // "Drug Trafficking",
    // "Manufacturing of Illegal Drugs",
     "Hacking",
    // "Phishing",
    // "Identity Theft (online)",
    // "Cyberbullying",
     "Speeding",
    // "Reckless Driving",
    // "Driving Under the Influence (DUI)",
    // "Hit and Run",
    // "Vehicle Theft",
    // "Domestic Violence",
    // "Child Abuse",
    // "Elder Abuse",
    // "Stalking",
    // "Pollution",
    // "Illegal Dumping",
    // "Poaching",
    // "Environmental Damage",
  ];
  const locations = [
    "Koramangala",
    "Indiranagar",
    "MG Road",
    "Jayanagar",
   // "Whitefield",
    "Malleshwaram",
    // "Electronic City",
    // "Bannerghatta Road",
    // "Yelahanka",
    // "Hosur Road",
    
  ];
  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          

          

          

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
              Location
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type_of_crime">
              Type of Crime
            </label>
            <select
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          
          


          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="type_of_crime">
              Type of Crime
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="type_of_crime"
              name="type_of_crime"
              value={formData.type_of_crime}
              onChange={handleChange}
              required
            />
          </div> */}

          {/* <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div> */}
{/* 
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="victim_id">
              Victim ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="victim_id"
              name="victim_id"
              value={formData.victim_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="police_id">
              Police ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="police_id"
              name="police_id"
              value={formData.police_id}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="station_id">
              Station ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="station_id"
              name="station_id"
              value={formData.station_id}
              onChange={handleChange}
              required
            />
          </div> */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="culprit">
              Culprit
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="culprit"
              name="culprit"
              value={formData.culprit}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="case_status">
              Case Status
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="case_status"
              name="case_status"
              value={formData.case_status}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-span-2 text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
