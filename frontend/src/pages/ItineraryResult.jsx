import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../css/Itinerary.css';

function ItineraryResult() {
  const [pageCount, setPageCount] = useState(0);
  const [itineraryArray, setItineraryArray] = useState([]);
  const [destination, setDestination] = useState('');
  const [forecast, setForecast] = useState('');
  const [weatherIcon, setWeatherIcon] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawDestination = params.get('destination') || '';
    const destinationClean = rawDestination.replace(/national park/gi, '').trim();
    setDestination(destinationClean);

    const itinerary = JSON.parse(localStorage.getItem('itinerary')) || '';
    const days = itinerary.split('#### Day');
    days.shift();

    const parsed = days.map(day => {
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

    setItineraryArray(parsed);
    document.getElementById('itinerary').innerHTML = parsed[0];
    getWeather(parsed[0]);
    initMap(destinationClean);
  }, []);

  const toggleEdit = () => {
    const itineraryDiv = document.getElementById('itinerary');
    itineraryDiv.contentEditable = itineraryDiv.contentEditable === 'true' ? 'false' : 'true';
    document.getElementById('saveButton').style.display = 'block';
  };

  const saveChanges = () => {
    const itineraryDiv = document.getElementById('itinerary');
    const updated = [...itineraryArray];
    updated[pageCount] = itineraryDiv.innerHTML;
    setItineraryArray(updated);
    document.getElementById('saveButton').style.display = 'none';
    toggleEdit();
  };

  const shareItinerary = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => alert(`URL copied to clipboard: ${url}`))
      .catch(() => alert('Failed to copy URL'));
  };

  const nextDay = () => {
    if (pageCount < itineraryArray.length - 1) {
      const newCount = pageCount + 1;
      setPageCount(newCount);
      document.getElementById('itinerary').innerHTML = itineraryArray[newCount];
      getWeather(itineraryArray[newCount]);
    }
  };

  const previousDay = () => {
    if (pageCount > 0) {
      const newCount = pageCount - 1;
      setPageCount(newCount);
      document.getElementById('itinerary').innerHTML = itineraryArray[newCount];
      getWeather(itineraryArray[newCount]);
    }
  };

  const getWeather = (dateText) => {
    const pattern = /([A-Z][a-z]+ \d{1,2}, \d{4})/;
    const matches = dateText.match(pattern);
    if (matches && matches.length > 1) {
      const date = new Date(matches[1]);
      const formatted = `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}/${date.getFullYear()}`;
      const apiKey = '6b4663f619c9424397340014242404';
      const apiUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${destination}&dt=${formatted}`;

      fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
          const temp = data.forecast.forecastday[0].day.avgtemp_c;
          setForecast(`${temp}°C`);
          setWeatherIcon(getWeatherIcon(temp));
        })
        .catch(() => setForecast('Error'));
    }
  };

  const getWeatherIcon = (temp) => {
    if (temp < 0) return '❄️';
    if (temp < 10) return '🌨️';
    if (temp < 20) return '🌥️';
    if (temp < 30) return '⛅';
    return '☀️';
  };

  const initMap = (location) => {
    if (!window.google || !window.google.maps) return;
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: { lat: 0, lng: 0 },
    });
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === 'OK') {
        map.setCenter(results[0].geometry.location);
        new window.google.maps.Marker({
          map,
          position: results[0].geometry.location,
          title: results[0].formatted_address,
        });
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="navbar" />
      <div id="destination">The Majestic {destination} Awaits!</div>

      <div className="itineraryMain">
        <div id="itinerary" contentEditable={false}></div>
        <button type="button" id="saveButton" onClick={saveChanges}>Save</button>
        {pageCount > 0 && <button type="button" id="pagebutton1" onClick={previousDay}>Previous Day</button>}
        {pageCount < itineraryArray.length - 1 && <button type="button" id="pagebutton2" onClick={nextDay}>Next Day</button>}
      </div>

      <button type="button" className="buttonsclass" onClick={shareItinerary}>Share</button>
      <button type="button" className="buttonsclass" onClick={toggleEdit}>Customize</button>

      <div id="map"></div>
      <div className="quickUpdates">
        <div id="forecastResult" style={{ margin: '70px 0px 0px 120px' }}>{forecast}</div>
        <div id="weatherIcon" style={{ marginLeft: '140px' }}>{weatherIcon}</div>
      </div>
    </div>
  );
}

export default ItineraryResult;