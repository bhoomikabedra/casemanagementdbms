import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const policeId = localStorage.getItem('police_id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/complaints/${policeId}`);
        setComplaints(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchComplaints();
  }, [policeId]);

  const handleCaseUpdate = (complaintId) => {
    navigate(`/updatecases/${complaintId}`);
  };

  const handleDelete = async (complaintId) => {
    try {
      await axios.delete(`http://localhost:8081/complaintdelete/` + complaintId);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="bg-gray-200 p-4">
      <h1 className="text-2xl font-semibold mb-4">Complaint List</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {complaints.map((complaint) => (
          <div key={complaint.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-semibold mb-2">{complaint.name}</h2>
            <p className="text-gray-600 mb-2">Type of Crime: {complaint.type_of_crime}</p>
            <p className="text-gray-600 mb-2">Aadhar: {complaint.aadhar}</p>
            <p className="text-gray-600 mb-2">Date of Crime: {complaint.date_of_crime}</p>
            <p className="text-gray-600 mb-2">Phone number: {complaint.phone_number}</p>
            <p className="text-gray-600">Description: {complaint.description}</p>
            <button onClick={() => handleCaseUpdate(complaint.complaint_id)} className="mt-2 bg-blue-500 text-white p-2 rounded">
              Update Case
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={(e) => handleDelete(complaint.complaint_id)}
            >
              Delete
            </button>
            {complaint.case_status === 1 && (
              <img src="solved.png" alt="solved" style={{ height: '50px', width: 'auto' }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplaintList;
