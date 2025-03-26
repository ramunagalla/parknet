import React from 'react';
import Navbar from '../components/NavBar';

function ItineraryStart() {
  return (
    <div>
      <Navbar />
      <h1 style={{ fontSize: '50px', marginLeft: '125px', marginBottom: '20px', marginTop: '20px' }}>Hi!</h1>
      <h2 style={{ marginLeft: '125px' }}>How would you like to create your itinerary?</h2>
      <div style={{ display: 'flex' }}>
        <div style={{
          marginLeft: '125px',
          border: '3px solid black',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '3px 3px 5px rgba(0, 0, 0, 0.3)',
          height: '520px',
          width: '475px',
          padding: '20px'
        }}>
          <h2 style={{ fontSize: '40px' }}>Let us decide for you</h2>
          <form>
            <label>Name:</label>
            <input type="text" name="name" required />
            <label>Age:</label>
            <input type="number" name="age" required />
            <label>No. of People:</label>
            <input type="number" name="number_of_people" required />
            <label>Enthusiasm Level:</label>
            <input type="range" min="1" max="5" defaultValue="1" />
            <label>Travel Dates:</label>
            <input type="date" name="start_date" required />
            <span>to</span>
            <input type="date" name="end_date" required />
            <label>Starting Location:</label>
            <input type="text" name="starting_location" required />
            <label>Destination:</label>
            <input type="text" name="destination" required />
            <input type="submit" value="Continue" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItineraryStart;