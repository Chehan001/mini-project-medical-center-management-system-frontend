import React, { useState } from "react";
import { Plus, Calendar } from "lucide-react";

const AddMedicine = () => {
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    quantity: "",
    expiryDate: "",
  });
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleAddMedicine = (e) => {
    e.preventDefault();
    if (!newMedicine.name || !newMedicine.quantity || !newMedicine.expiryDate) {
      setMessage({ text: "Please fill all fields", type: "error" });
      return;
    }
    setMessage({ text: "Medicine added successfully!", type: "success" });
    setNewMedicine({ name: "", quantity: "", expiryDate: "" });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Add New Medicine
        </h2>
        {message.text && (
          <div
            className={`mb-4 p-3 rounded-lg ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}
        <input
          type="text"
          placeholder="Medicine Name"
          value={newMedicine.name}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, name: e.target.value })
          }
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newMedicine.quantity}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, quantity: e.target.value })
          }
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <input
          type="date"
          value={newMedicine.expiryDate}
          onChange={(e) =>
            setNewMedicine({ ...newMedicine, expiryDate: e.target.value })
          }
          className="w-full mb-4 p-3 border rounded-lg"
        />
        <div className="bg-blue-50 p-3 rounded mb-4 flex items-center space-x-2 text-sm text-blue-700">
          <Calendar size={18} />
          <span>
            The current date and time will be recorded automatically when added.
          </span>
        </div>
        <button
          onClick={handleAddMedicine}
          className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} className="inline mr-1" />
          Add Medicine
        </button>
      </div>
    </div>
  );
};

export default AddMedicine;
