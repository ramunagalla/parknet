import React, { useEffect, useState } from 'react';
import Navbar from '../components/NavBar';

function AdventureSelection() {
  const [parks, setParks] = useState(["Park A", "Park B", "Park C"]);

  return (
    <div>
      <Navbar />
      <h2 style={{ fontSize: '30px', marginLeft: '125px', marginTop: '40px' }}><u>Where Would You Like to Explore?</u></h2>
      <div style={{ marginLeft: '125px', marginTop: '40px' }}>
        {parks.map((park, index) => (
          <div key={index} style={{ backgroundColor: '#3A882D', color: '#fff', padding: '20px', marginBottom: '10px', borderRadius: '15px' }}>
            <input type="checkbox" name="park" value={park} />
            <span style={{ marginLeft: '10px' }}>{park}</span>
          </div>
        ))}
      </div>
      <button style={{
        margin: '30px 0px 30px 1200px',
        fontSize: '20px',
        background: 'linear-gradient(to right, #63C366, #3A882D)',
        borderRadius: '10px',
        cursor: 'pointer',
        padding: '15px'
      }}>View my Adventure</button>
    </div>
  );
}

export default AdventureSelection;