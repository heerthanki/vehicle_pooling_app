import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RiArrowLeftLine } from 'react-icons/ri';
import { FaUserCircle } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './giveride.css';
import { FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';

function handleLogout(navigate) {
  navigate('/login');
}

function GiveRide() {
  const navigate = useNavigate();
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [seats, setSeats] = useState(1);
  const [vehicle, setVehicle] = useState('');
  const [preference, setPreference] = useState('');
  const [error, setError] = useState('');

  const carOptions = ['car1', 'car2'];

  const currentDate = new Date();
  const minTime = new Date(currentDate);
  minTime.setMinutes(Math.ceil(currentDate.getMinutes() / 15) * 15);
  const maxTime = new Date();
  maxTime.setHours(24, 0); // Set maxTime to 6:00 PM

  const handleCreateRide = async () => {
    setError('');

    if (
      !source ||
      !destination ||
      seats < 1 ||
      seats > 4 ||
      !vehicle ||
      !preference.trim()
    ) {
      setError('Please fill in all the required fields correctly.');
      return;
    }

    if (
      (['Ahmedabad', 'Vadodara', 'Anand', 'Vadtal', 'Valetva', 'Nadiad'].includes(source) &&
        destination !== 'Changa') ||
      (source === 'Changa' && !['Ahmedabad', 'Vadodara', 'Anand', 'Vadtal', 'Valetva', 'Nadiad'].includes(destination))
    ) {
      setError('For selected source-destination combination, please choose Changa as the destination.');
      return;
    }

    try {
      // Submit the form using native form submission
      const form = document.getElementById('ride-form');
      form.submit();
    } catch (error) {
      console.error(error);
      setError('An error occurred while giving a ride. Please try again later.');
    }
  };

  // Function to handle changes in the source selection
  const handleSourceChange = (e) => {
    setSource(e.target.value);
  };

  // Function to handle changes in the destination selection
  const handleDestinationChange = (e) => {
    setDestination(e.target.value);
  };

  return (
    <div className="give-ride-container">
      <div className="nav-bar">
        <span className="logout-icon" onClick={() => handleLogout(navigate)}>
          <FaSignOutAlt />
        </span>
        <Link to="/home">
          <RiArrowLeftLine />
        </Link>
        <h2>Give a Ride</h2>
        <Link to="/profile">
          <FaUserCircle className="profile-button-icon" />
        </Link>
      </div>
      <form id="ride-form" action="http://localhost/myapp/backendnew/submit_ride.php" method="POST">
        {error && <div className="error">{error}</div>}

        <div className="form-row">
          <label>Source:</label>
          <select
            name="source"
            value={source}
            onChange={handleSourceChange}
          >
            <option value="" disabled>Select Source</option>
            <option value="Ahmedabad">Ahmedabad</option>
            <option value="Vadodara">Vadodara</option>
            <option value="Anand">Anand</option>
            <option value="Nadiad">Nadiad</option>
            <option value="Vadtal">Vadtal</option>
            <option value="Valetva">Valetva</option>
            <option value="Changa">Changa</option>
          </select>
        </div>

        <div className="form-row">
          <label>Destination:</label>
          <select
            name="destination" // Add the name attribute
            value={destination}
            onChange={handleDestinationChange}
          >
            <option value="" disabled>Select Destination</option>
            {['Ahmedabad', 'Vadodara', 'Anand', 'Vadtal', 'Valetva', 'Nadiad'].includes(source) ? (
              <option value="Changa">Changa</option>
            ) : (
              <option value="Changa" disabled>Changa</option>
            )}
          </select>
        </div>

        <div className="form-row date-picker">
          <label>Date:</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            dateFormat="dd-MM-yyyy"
            placeholderText="dd-MM-yyyy"
            minDate={currentDate}
            name="date"
          />
        </div>
        <div className="form-row date-picker">
          <label>Time:</label>
          <DatePicker
            selected={time}
            onChange={(time) => setTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            dateFormat="hh:mm aa"
            timeCaption="Time"
            name="time"
            placeholderText="hh:mm"
            minTime={minTime} // Ensure that minTime is defined correctly
            maxTime={maxTime} // Ensure that maxTime is defined correctly
          />
        </div>

        <div className="form-row">
          <label>Number of Seats:</label>
          <input
            type="number"
            placeholder="Number of seats"
            name="number"
            value={seats}
            onChange={(e) => {
              const newValue = parseInt(e.target.value, 10);
              setSeats(isNaN(newValue) ? 1 : Math.min(4, Math.max(1, newValue)));
            }}
            min="1"
            max="4"
          />
        </div>

        <div className="form-row">
          <label>Select Vehicle:</label>
          {carOptions.map((carOption) => (
            <label key={carOption}>
              <input
                type="radio"
                name="vehicle"
                value={carOption}
                checked={vehicle === carOption}
                onChange={(e) => setVehicle(e.target.value)}
              />
              {carOption}
            </label>
          ))}
        </div>

        <div className="form-row">
          <label>Select Gender:</label>
          <select
            value={preference}
            name="gender"
            onChange={(e) => setPreference(e.target.value)}
          >
            <option value="" disabled>Select Preference</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <button type="button" onClick={handleCreateRide}>
          Create Ride
        </button>
      </form>
    </div>
  );
}

export default GiveRide;
