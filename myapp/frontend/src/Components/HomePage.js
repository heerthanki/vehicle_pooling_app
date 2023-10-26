import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './homepage.css';
import { FaUser, FaBell, FaSignOutAlt } from 'react-icons/fa';
function handleLogout(navigate) {
  navigate('/login');
}
function HomePage() {
  useEffect(() => {
    fetch("http://localhost/myapp/backendnew/employeedata.php")
      .then((response) => response.json())
      .then((data) => {
console.log(data);
        setEmployeeName(data.emp_name);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);
const [employeeName, setEmployeeName] = useState('Riya Thakker'); // Replace with actual employee name
  const navigate = useNavigate(); 
  return (
    <div>
      <div className="navbar">
        <div className="left">
        <span className="logout-icon" onClick={() => handleLogout(navigate)}>
            <FaSignOutAlt />
          </span>
          <Link to="/profile">
            <FaUser />
          </Link>
        </div>
        <div className="center">
          <span className="employee-name">Welcome to Employee Carpooling , {employeeName} !!</span>
        </div>
        <div className="right">
          <Link to="/notifications"><FaBell /></Link>
        </div>
      </div>
      <br></br><br></br>
      
      <br></br>
      <div className="body">
        <div className="card-container">
          <Link to="/give-ride">
            <button className="card-button">Give a Ride</button>
          </Link>
          <Link to="/take-ride">
            <button className="card-button">Take a Ride</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;