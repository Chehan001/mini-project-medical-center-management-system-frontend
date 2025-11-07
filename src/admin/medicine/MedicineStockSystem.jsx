import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MedicineStockNavBar from "./MedicineStockNavBar";
import AddMedicine from "./AddMedicine";
import ShowStock from "./ShowStock";
import Distribution from "./Distribution";
import { motion } from "framer-motion";

const MedicineStockSystem = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        minHeight: "100vh",
        background: "linear-gradient(-45deg, #b3f3d9, #a0eac8, #c6f6e2, #8cd8b8)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 10s ease infinite",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <MedicineStockNavBar />
      <div style={{ width: "100%", maxWidth: "1200px", padding: "20px" }}>
        <Routes>
          <Route path="/" element={<Navigate to="show" replace />} />
          <Route path="show" element={<ShowStock />} />
          <Route path="add" element={<AddMedicine />} />
          <Route path="distribution" element={<Distribution />} />
        </Routes>
      </div>

      {/* Animated gradient keyframes */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </motion.div>
  );
};

export default MedicineStockSystem;
