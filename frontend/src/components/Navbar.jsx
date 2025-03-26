import React from 'react';
import '../css/Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <img alt="bar" src="/assets/Hamburger_icon.svg.png" id="barimg" />
      <span className="parknettxt">ParkNet</span>
      <span className="mytripstxt">My Trips</span>
      <span className="myaccounttxt">My Account</span>
    </div>
  );
}

export default Navbar;