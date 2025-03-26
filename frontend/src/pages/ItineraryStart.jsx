import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../css/ItineraryStart.css';

function ItineraryStart() {
  useEffect(() => {
    const slider1 = document.getElementById("mySlider1");
    const selectedValue1 = document.getElementById("selectedValue1");

    slider1.oninput = function () {
      const value = parseInt(this.value);
      const emojis = ['\ud83e\udcad', '\ud83d\ude10', '\ud83d\ude03', '\ud83d\ude04', '\ud83e\udd29'];
      selectedValue1.innerText = emojis[value - 1];
    };

    const slider2 = document.getElementById("mySlider2");
    const selectedValue2 = document.getElementById("selectedValue2");

    slider2.oninput = function () {
      const value = parseInt(this.value);
      const emojis = ['\ud83e\udcad', '\ud83d\ude10', '\ud83d\ude03', '\ud83d\ude04', '\ud83e\udd29'];
      selectedValue2.innerText = emojis[value - 1];
    };
  }, []);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const form = document.getElementById("myForm");
    const formData = new FormData(form);
    const jsonObject = {};
    formData.forEach((value, key) => (jsonObject[key] = value));
    const destination = formData.get("destination");

    localStorage.setItem("itineraryInformation", JSON.stringify(jsonObject));

    fetch("/api/generateBasicItinerary", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonObject),
    })
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("itinerary", JSON.stringify(data.itinerary));
        window.location.href = `/itinerary?destination=${encodeURIComponent(destination)}`;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Navbar />
      <h1 style={{ fontSize: '50px', marginLeft: '125px', marginBottom: '20px', marginTop: '20px' }}>Hi!</h1>
      <h2 style={{ marginLeft: '125px' }}>How would you like to create your itinerary?</h2>
      <div className="itinerarycontainer">
        <div className="itinerarystartform">
          <h2 style={{ fontSize: '40px', margin: '15px 0px 20px 20px' }}>Let us decide for you</h2>
          <form id="myForm" onSubmit={handleSubmitForm} style={{ marginLeft: '40px' }}>
            <label>Name:</label>
            <input type="text" name="name" required />
            <label>Age:</label>
            <input type="number" name="age" required />
            <label>No. of People:</label>
            <input type="number" name="number_o_fpeople" required />
            <label>Enthusiasm Level:</label>
            <input type="range" min="1" max="5" defaultValue="1" className="slider1" id="mySlider1" name="enthusiasmlevel" />
            <span id="selectedValue1" className="slider-label1" style={{ fontSize: '20px' }}>\ud83e\udcad</span>
            <label>Travel Dates:</label>
            <input type="date" name="start_date" required />
            <span>to</span>
            <input type="date" name="end_date" required />
            <label>Starting Location:</label>
            <input type="text" name="starting_location" required />
            <label>Destination:</label>
            <input type="text" name="destination" required list="national_parks" />
            <datalist id="national_parks">
              <option value="Acadia National Park" />
              <option value="Zion National Park" />
              <option value="Yellowstone National Park" />
              <option value="Grand Canyon National Park" />
              <option value="Yosemite National Park" />
            </datalist>
            <input type="submit" value="Continue" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default ItineraryStart;