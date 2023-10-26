import React, { useState } from 'react';
import { RiArrowLeftLine } from "react-icons/ri";
import { Link } from "react-router-dom";
function Notifications() {
  const [notifications, setNotifications] = useState([]);

  // Simulated notifications data
  const mockNotifications = [
    'Your ride request has been accepted.',
    'New ride available from John Doe.',
    'Reminder: Your ride is scheduled for tomorrow.',
  ];

  return (
    <div className="profile-container">
         <div className="profile-header">
      
      <Link to="/home">
          <RiArrowLeftLine />
        </Link>
        <h2>Notifications</h2>
      <ul>
       
      </ul>
      </div>
    </div>
  );
}

export default Notifications;
