import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/Itinerary.css';

function Itinerary() {
  const [pageCount, setPageCount] = useState(0);
  const [itineraryArray, setItineraryArray] = useState([]);
  const [updatedItineraryArray, setUpdatedItineraryArray] = useState([]);
  const [destination, setDestination] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let destinationParam = params.get('destination') || '';
    const itineraryRaw = JSON.parse(localStorage.getItem('itinerary')) || '';

    const destText = destinationParam.replace(/national park/gi, '').trim();
    setDestination(destText);

    const days = itineraryRaw.split('#### Day');
    days.shift();

    const parsedDays = days.map(day => {
      const [date, ...sections] = day.trim().split('***').map(item => item.trim());
      let html = `<h2>Day ${date.replace(/\?/, ' ')}</h2><ul>`;

      sections.forEach(section => {
        const [timeRange, activities] = section.split('\n-').map(item => item.trim());
        html += timeRange
          ? `<li style='margin: 10px 0;'><strong>${timeRange}:</strong> ${activities}</li>`
          : `<li style='margin: 10px 0;'>${activities}</li>`;
      });

      html += '</ul>';
      return html;
    });

    setItineraryArray(parsedDays);
    setUpdatedItineraryArray(parsedDays);
    document.getElementById('itinerary').innerHTML = parsedDays[0];
  }, []);

  const updatePage = (next) => {
    const newPageCount = next ? pageCount + 1 : pageCount - 1;
    setPageCount(newPageCount);
    document.getElementById('itinerary').innerHTML = itineraryArray[newPageCount];
  };

  const toggleEdit = () => {
    const itineraryDiv = document.getElementById('itinerary');
    itineraryDiv.contentEditable = itineraryDiv.contentEditable === 'true' ? 'false' : 'true';
    document.getElementById('saveButton').style.display = 'block';
  };

  const saveChanges = () => {
    const itineraryDiv = document.getElementById('itinerary');
    updatedItineraryArray[pageCount] = itineraryDiv.innerHTML;
    setItineraryArray([...updatedItineraryArray]);
    toggleEdit();
    document.getElementById('saveButton').style.display = 'none';
  };

  const shareItinerary = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => alert(`Copied: ${currentUrl}`))
      .catch(err => alert('Failed to copy URL'));
  };

  return (
    <div>
      <Navbar />
      <div id="overlay"></div>
      <div id="myProgress">
        <div id="myBar"></div>
      </div>
      <div id="destination">The Majestic {destination} Awaits!</div>
      <div className="itineraryMain">
        <div id="itinerary" contentEditable={false}></div>
        <button id="saveButton" onClick={saveChanges}>Save</button>
        {pageCount > 0 && <button id="pagebutton1" onClick={() => updatePage(false)}>Previous Day</button>}
        {pageCount < itineraryArray.length - 1 && <button id="pagebutton2" onClick={() => updatePage(true)}>Next Day</button>}
      </div>
      <button id="shareButton" className="buttonsclass" onClick={shareItinerary}>Share</button>
      <button id="customizeButton" className="buttonsclass" onClick={toggleEdit}>Customize</button>
    </div>
  );
}

export default Itinerary;
