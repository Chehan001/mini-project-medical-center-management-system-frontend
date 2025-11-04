import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MedicineStockNavBar from "./MedicineStockNavBar";
import AddMedicine from "./AddMedicine";
import ShowStock from "./ShowStock";
import Distribution from "./Distribution";

const MedicineStockSystem = () => {
  return (
    <div>
      <MedicineStockNavBar />
      <Routes>
        <Route path="/" element={<Navigate to="show" replace />} />
        <Route path="show" element={<ShowStock />} />
        <Route path="add" element={<AddMedicine />} />
        <Route path="distribution" element={<Distribution />} />
      </Routes>
    </div>
  );
};

export default MedicineStockSystem;
