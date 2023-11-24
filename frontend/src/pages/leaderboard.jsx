import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    // Fetch leaderboard data from your backend API
    axios.get('http://localhost:8081/calculateAndShowLeaderboard')
      .then(response => {
        console.log(response.data.leaderboardData[0]); // Log the response to check the structure
        setLeaderboardData(response.data.leaderboardData[0]);
      })
      .catch(error => console.error('Error fetching leaderboard:', error));
  }, []); // Empty dependency array ensures the effect runs once on component mount

  return (
    <div style={{ background: '#121212', color: 'white', minHeight: '100vh', backgroundImage: 'url("loginpage.jpeg")', backgroundSize: 'cover', padding: '20px' }}>
      <h2 style={{ fontWeight: 'bold', fontSize: '24px', marginBottom: '20px' }}>Police Leaderboard</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', color: 'white' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid white' }}>
            <th style={{ border: '1px solid white', padding: '8px' }}>Police ID</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Badge Number</th>
            <th style={{ border: '1px solid white', padding: '8px' }}>Cases Solved</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map(police => (
            <tr key={police.police_id} style={{ borderBottom: '1px solid white' }}>
              <td style={{ border: '1px solid white', padding: '8px' }}>{police.police_id}</td>
              <td style={{ border: '1px solid white', padding: '8px' }}>{police.name}</td>
              <td style={{ border: '1px solid white', padding: '8px' }}>{police.badge_number}</td>
              <td style={{ border: '1px solid white', padding: '8px' }}>{police.cases_solved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;