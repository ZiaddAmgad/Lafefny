/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/homepage.css';

const TouristHome = () => {
  return (
    <div>
      <h1>Welcome to the Tourist HomePage</h1>
      <nav>
        <h2>Activity Management</h2>
        <Link to="/touristActivities">View Activities</Link> | {' '}
        <Link to="/tourist-Itineraries">View My Itineraries</Link> | {' '}
        <Link to="/touristAll-Itineraries">View All Itineraries</Link> | {' '}
        <Link to="/touristMuseums">View Historical Places/Museums</Link>

        <h2>Profile Management</h2>
        <Link to="/viewTouristInfo">View Info</Link> | {' '}
        <Link to="/touristEditInfo">Edit Info</Link> | {' '}
        <Link to="/touristSelectPreferences">Select Preferences</Link>

        <h2>Product Management</h2>
        <Link to="/touristProducts">View Products</Link>
      </nav>
    </div>
  );
};

export default TouristHome;
