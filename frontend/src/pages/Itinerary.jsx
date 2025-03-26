import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';

function Itinerary() {
  const [dayContent, setDayContent] = useState("Sample itinerary content...");

  return (
    <div>
      <Navbar />
      <h1 style={{ fontSize: '30px', margin: '40px 70px', color: '#3A882D' }}>The Majestic Destination Awaits!</h1>
      <div style={{
        height: '450px',
        width: '830px',
        borderRadius: '15px',
        overflow: 'auto',
        fontSize: '17px',
        marginLeft: '70px',
        backgroundColor: '#F5F5F5',
        padding: '10px'
      }}>
        {dayContent}
      </div>
    </div>
  );
}

export default Itinerary;