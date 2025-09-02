import React from 'react';
import NavBar from './NavBar';

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(to bottom, #80e4be, #a9e0cb)',
      
      }}
    >
      {/* NavBar now included inside gradient */}
      <NavBar />

      {/* Page Content */}
      <div style={{ padding: '20px' }}>
        <h2>Welcome to MediCare</h2>
        <p>This is your medical center platform.</p>
      </div>
    </div>
  );
};

export default HomePage;
