import React, { useState, useEffect } from "react";

const ShowStock = () => {
  const [stock, setStock] = useState([]);

  useEffect(() => {
    const sampleStock = [
      { name: "Paracetamol", quantity: 120, expiry: "2025-10-10" },
      { name: "Amoxicillin", quantity: 75, expiry: "2025-06-22" },
      { name: "Ibuprofen", quantity: 60, expiry: "2026-02-12" },
    ];
    setStock(sampleStock);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Stock Details</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="p-3 text-left">Medicine Name</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Expiry Date</th>
            </tr>
          </thead>
          <tbody>
            {stock.map((item, i) => (
              <tr
                key={i}
                className="border-b hover:bg-gray-50 transition duration-200"
              >
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">{item.expiry}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowStock;
