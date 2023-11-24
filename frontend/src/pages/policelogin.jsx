import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PoliceLogin = () => {
  const backgroundStyle = {
    backgroundImage: 'url("loginpage.jpeg")',
    backgroundSize: 'cover',
  };

  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:8081/policelogin', values)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === "Police Login Successful") {
          const police_id = res.data.police_id;
          localStorage.setItem('police_id', police_id);
          navigate('/policepage');
        } else {
          setErrorMessage('Invalid email or password');
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('Error occurred while logging in');
      });
  };

  return (
    <div className="flex justify-center items-center h-screen" style={backgroundStyle}>
      <div className="bg-gray-800 bg-opacity-75 p-8 rounded-lg text-white shadow-md">
        <h1 className="text-2xl font-bold mb-4">Police Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-semibold">Email</label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full border rounded-md py-2 px-3 bg-opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block font-semibold">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded-md py-2 px-3 bg-opacity-50"
              onChange={handleChange}
            />
          </div>
          <div className="text-center">
            <button className="bg-yellow-700 hover:bg-yellow-900 text-white font-semibold py-2 px-4 rounded-full">
              Login
            </button>
          </div>
          {errorMessage && (
            <div className="text-red-500 text-center mt-4">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default PoliceLogin;
