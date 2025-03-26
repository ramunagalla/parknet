import React from 'react';
import Navbar from '../components/Navbar';
import '../css/ParknetHome.css';

function ParknetHome() {
  const redirectToItineraryStartPage = () => {
    window.location.href = '/start';
  };

  return (
    <div>
      <Navbar />
      <div className="cropped-image"></div>
      <div className="itinerarytxt">
        <span>Plan your </span><span style={{ color: '#008080' }}>itinerary</span><span> in minutes.</span>
      </div>
      <button
        type="button"
        className="startadventurebutton"
        onClick={redirectToItineraryStartPage}
      >
        Start Adventure
      </button>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <span style={{ display: 'inline-block', color: '#2F5429', fontSize: '20px' }}>
          Top Articles
        </span>
        <div className="bottomHome">
          <img
            alt="ranked"
            src="/assets/nationalparksranked.jpg"
            id="nationaparks15"
            onClick={() => window.open('https://morethanjustparks.com/national-parks-ranked/', '_blank')}
          />
          <img
            alt="hike"
            src="/assets/hqdefault.jpg"
            id="hike"
            onClick={() => window.open('https://stories.strava.com/articles/10-of-the-most-famous-hikes-in-us-national-parks', '_blank')}
          />
          <img
            alt="mvn"
            src="/assets/mvn.jpg"
            id="mvn"
            onClick={() => window.open('https://morethanjustparks.com/most-visited-national-parks/', '_blank')}
          />
          <img
            alt="seven"
            src="/assets/seven.png"
            id="seven"
            onClick={() => window.open('https://thewanderclub.com/blogs/blog/national-parks-with-waterfalls', '_blank')}
          />
        </div>
      </div>
    </div>
  );
}

export default ParknetHome;
