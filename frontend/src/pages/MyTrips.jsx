import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/MyTrips.css';

function MyTrips() {
  const [message, setMessage] = useState('Loading saved trips...');

  useEffect(() => {
    const itineraryArray = JSON.parse(localStorage.getItem('itineraryArray'));
    if (!itineraryArray || itineraryArray.length === 0) {
      setMessage('There are no saved trips.');
    } else {
      setMessage(itineraryArray.join(', '));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div id="overlay"></div>
      <div id="mytrips" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {message}
      </div>
    </div>
  );
}

export default MyTrips;
