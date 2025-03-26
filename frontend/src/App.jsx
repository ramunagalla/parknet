import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ParknetHome from './pages/ParknetHome';
import ItineraryStart from './pages/ItineraryStart';
import AdventureSelection from './pages/AdventureSelection';
import Itinerary from './pages/Itinerary';
import MyTrips from './pages/MyTrips';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ParknetHome />} />
        <Route path="/start" element={<ItineraryStart />} />
        <Route path="/adventure" element={<AdventureSelection />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/my-trips" element={<MyTrips />} />
      </Routes>
    </Router>
  );
}

export default App;