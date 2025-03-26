import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';

function MyTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('itineraryArray')) || [];
    setTrips(saved);
  }, []);

  return (
    <div>
      <Navbar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px'
      }}>
        {trips.length === 0 ? "There are no saved trips." : trips.join(', ')}
      </div>
    </div>
  );
}

export default MyTrips;