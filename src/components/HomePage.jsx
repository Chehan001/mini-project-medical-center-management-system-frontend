// src/components/HomePage.jsx
import React from "react";
import NavBar from "./NavBar";
import Slideshow from "./Slideshow"; // ✅ import added

const HomePage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        position: "relative",
        background: "linear-gradient(to bottom, #80e4be, #a9e0cb)",
        margin: 0,
        padding: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Gradient also covers NavBar */}
      <NavBar />

      {/* Page Content */}
      <div style={{ padding: "20px", flexGrow: 1 }}>
        {/* Slideshow Component */}
        <Slideshow />
      </div>
    </div>
  );
};

export default HomePage;
