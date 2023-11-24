// import React, { useState } from 'react';
// import './register.css';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // You can add registration logic here, e.g., sending data to a server or storing it locally.
//   };

//   return (
//     <div className="registration-page">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(event) => setEmail(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(event) => setPassword(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>First Name:</label>
//           <input
//             type="text"
//             placeholder="First Name"
//             value={firstName}
//             onChange={(event) => setFirstName(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Last Name:</label>
//           <input
//             type="text"
//             placeholder="Last Name"
//             value={lastName}
//             onChange={(event) => setLastName(event.target.value)}
//           />
//         </div>
//         <div className="form-group">
//           <label>Phone Number:</label>
//           <input
//             type="tel"
//             placeholder="Phone Number"
//             value={phoneNumber}
//             onChange={(event) => setPhoneNumber(event.target.value)}
//           />
//         </div>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from 'react';
import './register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
    const [values ,setValues] = useState({
      email:'',
      password:'',
      fullname:'',
      phonenumber:''
    })

    const [isRegistered, setIsRegistered] = useState(false);

    const handleChange = (event) =>{
       setValues({...values , [event.target.name] : [event.target.value]})
    }
    
    const handleSubmit = (event) => {
      event.preventDefault();
      axios.post('http://localhost:8081/register',values)
      .then((res) => {
        console.log("Registered Successfully");
        setIsRegistered(true);
      })
      .catch(err => console.error(err));
    }
    if(isRegistered){
      navigate('/victimlogin');
    }
 
  return (
    <div className="registration-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Full Name:</label>
          <input
            type="text"
            name="fullname"
            placeholder="Full Name"
           
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="number"
            name="phonenumber"
            placeholder="phonenumber"
           
            onChange={handleChange}
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;