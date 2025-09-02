import React from 'react';
import NavBar from './NavBar';

const Channel = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        position: 'relative',
        background: 'linear-gradient(to bottom, #80e4be, #a9e0cb)',
        margin: 0,
        padding: 0,
        display: 'flex',
        flexDirection: 'column', 
      }}
    >
      {/*  Gradient also covers NavBar */}
      <NavBar />

      {/* Page Content */}
      <div style={{ padding: '20px', flexGrow: 1 }}>
        
      </div>
    </div>
  );
};

export default Channel;
