import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import LoginPage from './Components/LoginPage';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import GiveRide from './Components/GiveRide';
import TakeRide from './Components/TakeRide';
import Notifications from './Components/Notifications'
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/give-ride" element={<GiveRide />} />
        <Route path="/take-ride" element={<TakeRide />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </Router>
  );
}

export default App;
