import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../css/AdventureSelection.css';

function AdventureSelection() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itinerary = params.get('itinerary');
    const parksArray = itinerary ? itinerary.split(',') : [];

    const parkImages = [
      '/assets/park1.jpg',
      '/assets/park2.jpg',
      '/assets/park3.jpg'
    ];

    const parkHighlights = [
      ['Great hiking trails', 'Beautiful scenery', 'Abundant wildlife'],
      ['Scenic viewpoints', 'Picnic areas', 'Nature walks'],
      ['Wildlife safari', 'Camping sites', 'Bird watching']
    ];

    const checkboxesDiv = document.getElementById('choices');

    parksArray.forEach((park, index) => {
      const div = document.createElement('div');
      div.classList.add('park1');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'park';
      checkbox.value = park;
      div.appendChild(checkbox);

      const img = document.createElement('img');
      img.src = parkImages[index];
      img.alt = 'Park Image';
      div.appendChild(img);

      const parkInfoContainer = document.createElement('div');
      parkInfoContainer.classList.add('park-info');
      const parkName = document.createElement('span');
      parkName.classList.add('park-name');
      parkName.textContent = park;
      parkInfoContainer.appendChild(parkName);
      div.appendChild(parkInfoContainer);

      const highlightsContainer = document.createElement('div');
      highlightsContainer.classList.add('highlights-container');
      const highlightsDiv = document.createElement('div');
      highlightsDiv.classList.add('highlights');
      const highlightsTitle = document.createElement('h3');
      highlightsTitle.textContent = 'Highlights';
      highlightsDiv.appendChild(highlightsTitle);
      parkHighlights[index].forEach(text => {
        const span = document.createElement('span');
        span.textContent = text;
        highlightsDiv.appendChild(span);
      });
      highlightsContainer.appendChild(highlightsDiv);
      div.appendChild(highlightsContainer);

      checkboxesDiv.appendChild(div);
    });

    checkboxesDiv.addEventListener('change', function (event) {
      const checkboxes = document.querySelectorAll('input[name=park]');
      checkboxes.forEach(cb => {
        if (cb !== event.target) cb.checked = false;
      });
    });
  }, []);

  const handleViewAdventure = () => {
    const progress = document.getElementById('myProgress');
    const overlay = document.getElementById('overlay');
    const elem = document.getElementById('myBar');
    let width = 1;
    const intervalId = setInterval(() => {
      if (width >= 100) width = 1;
      else {
        width++;
        elem.style.width = width + '%';
      }
    }, 50);
    progress.style.display = 'block';
    overlay.style.display = 'block';

    const selectedPark = document.querySelector('input[name=park]:checked');
    if (selectedPark) {
      fetch('/api/choicesSelection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedPark.value)
      })
        .then(res => res.json())
        .then(data => {
          clearInterval(intervalId);
          progress.style.display = 'none';
          overlay.style.display = 'none';
          localStorage.setItem('itinerary', JSON.stringify(data.itinerary));
          window.location.href = `/itinerary?destination=${encodeURIComponent(selectedPark.value)}`;
        })
        .catch(err => {
          clearInterval(intervalId);
          progress.style.display = 'none';
          overlay.style.display = 'none';
          console.error('Error:', err);
        });
    } else {
      clearInterval(intervalId);
      progress.style.display = 'none';
      overlay.style.display = 'none';
      console.log('No park selected.');
    }
  };

  return (
    <div>
      <Navbar />
      <div id="overlay"></div>
      <div className="navbar" />
      <div id="myProgress">
        <div id="myBar"></div>
      </div>
      <h2 style={{ fontSize: '30px', marginLeft: '125px', marginBottom: '20px', marginTop: '40px' }}>
        <u>Where Would You Like to Explore?</u>
      </h2>
      <div id="choices" style={{ marginLeft: '125px', marginTop: '40px' }}></div>
      <button id="viewMyAdventureBtn" onClick={handleViewAdventure}>View my Adventure</button>
    </div>
  );
}

export default AdventureSelection;