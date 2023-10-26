import React, { useState } from 'react';
import './takeride.css'; // Import your CSS file here
import { RiArrowLeftLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';
function TakeRide() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  const handleSearchRides = () => {
    // Implement logic to search for rides with the provided source and destination
  };

  return (
    <div className="take-ride-container">

      <div className="nav-bar">
        <Link to="/home"><RiArrowLeftLine /></Link>
        <h2>Take a Ride</h2>
      </div>
      <form>
        <input
          className="ride-input" 
          type="text"
          placeholder="Source"
          value={source}
          onChange={(e) => setSource(e.target.value)}
        />
        <input
          className="ride-input" 
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />
        <button className="search-button" onClick={handleSearchRides}>Search Rides</button> {/* Apply a class for styling */}
      </form>
    </div>
  );
}

export default TakeRide;
