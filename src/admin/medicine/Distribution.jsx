import React, { useState } from "react";
import { Check } from "lucide-react";

const Distribution = () => {
  const [form, setForm] = useState({ regNo: "", medicine: "", quantity: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.regNo || !form.medicine || !form.quantity) {
      setMessage("Please fill in all fields");
      return;
    }
    setMessage(`Medicine distributed to ${form.regNo} successfully!`);
    setForm({ regNo: "", medicine: "", quantity: "" });
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Medicine Distribution
        </h2>
        {message && (
          <div className="bg-green-100 text-green-800 p-3 rounded mb-4">
            {message}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Student Register Number"
            value={form.regNo}
            onChange={(e) => setForm({ ...form, regNo: e.target.value })}
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <input
            type="text"
            placeholder="Medicine Name"
            value={form.medicine}
            onChange={(e) => setForm({ ...form, medicine: e.target.value })}
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full mb-4 p-3 border rounded-lg"
          />
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            <Check size={18} className="inline mr-1" />
            Distribute
          </button>
        </form>
      </div>
    </div>
  );
};

export default Distribution;
