import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Alert,
  Fade,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import { Plus, Calendar } from "lucide-react";
import axios from "axios";
import API_ROOT from "../../services/api";

const MEDICINE_NAMES = [
  "Paracetamol", "Ibuprofen", "Aspirin", "Diclofenac sodium", "Naproxen",
  "Amoxicillin", "Azithromycin", "Ciprofloxacin", "Metronidazole", "Cefuroxime",
  "Doxycycline", "Cetirizine", "Loratadine", "Chlorpheniramine maleate",
  "Diphenhydramine", "Pantoprazole", "Ranitidine", "Antacid syrup", "Loperamide",
  "Oral Rehydration Salts", "Domperidone", "Metoclopramide", "Povidone-iodine solution",
  "Hydrogen peroxide", "Alcohol (70% isopropyl)", "Chlorhexidine", "Hand sanitizer",
  "Dextromethorphan syrup", "Guaifenesin syrup", "Salbutamol inhaler", "Steam inhalation preparations",
  "Burn cream (Silver sulfadiazine)", "Antifungal cream (Clotrimazole, Miconazole)",
  "Hydrocortisone cream", "Antibiotic ointment (Neomycin, Bacitracin)", "Calamine lotion",
  "Multivitamin tablets", "Vitamin C", "Iron & Folic acid tablets", "Calcium supplements",
  "Adrenaline injection", "Hydrocortisone injection", "Atropine", "Diazepam injection",
  "Glucose IV solution (5%)", "Normal saline IV solution (0.9%)", "Oral contraceptive pills",
  "Antifungal tablets (Fluconazole)", "Antimalarial drugs (Chloroquine / Artemether-Lumefantrine)",
  "Blood pressure medication (Amlodipine, Losartan)", "Diabetes medication (Metformin, Glibenclamide)",
];

const AddMedicine = () => {
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    quantity: "",
    manufacturingDate: "",
    expiryDate: "",
    licenseNumber: "",
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [addedTime, setAddedTime] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAddMedicine = async (e) => {
    e.preventDefault();
    const { name, quantity, manufacturingDate, expiryDate, licenseNumber } = newMedicine;

    if (!name || !quantity || !manufacturingDate || !expiryDate || !licenseNumber) {
      setMessage({ text: "Please fill all fields", type: "error" });
      setAddedTime(null);
      return;
    }

    if (Number(quantity) <= 0) {
      setMessage({ text: "Quantity must be greater than 0", type: "error" });
      return;
    }

    if (new Date(expiryDate) <= new Date(manufacturingDate)) {
      setMessage({ text: "Expiry date must be after manufacturing date", type: "error" });
      return;
    }

    setLoading(true);
    try {
    const response = await axios.post(`${API_ROOT}/api/medicineStock/add`, {
        name: name.trim(),
        quantity: Number(quantity),
        manufacturingDate,
        expiryDate,
        licenseNumber: licenseNumber.trim().toUpperCase(),
      });

      const now = new Date();
      const formattedTime = now.toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });

      setAddedTime(formattedTime);
      setMessage({ text: response.data.message || "Medicine added successfully!", type: "success" });

      setNewMedicine({
        name: "",
        quantity: "",
        manufacturingDate: "",
        expiryDate: "",
        licenseNumber: "",
      });

      setTimeout(() => {
        setMessage({ text: "", type: "" });
        setAddedTime(null);
      }, 4000);
    } catch (error) {
      console.error("Error adding medicine:", error);
      setMessage({ text: error.response?.data?.message || "Failed to add medicine. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const filteredMedicines =
    newMedicine.name.length >= 2
      ? MEDICINE_NAMES.filter((item) =>
          item.toLowerCase().includes(newMedicine.name.toLowerCase())
        )
      : [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 8,
        px: 2,
      }}
    >
      <style>
        {`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        `}
      </style>

      <Fade in timeout={1000}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Paper
            elevation={8}
            sx={{
              width: "95%",
              maxWidth: 600,
              borderRadius: 4,
              p: { xs: 3, md: 5 },
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(10px)",
              boxShadow: "0px 8px 25px rgba(0,0,0,0.1)",
              transition: "all 0.3s ease",
              "&:hover": { boxShadow: "0px 12px 30px rgba(0,0,0,0.15)" },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img
                src="/medicare_logo.png"
                alt="MediCare Logo"
                style={{ height: "70px", objectFit: "contain" }}
              />
            </Box>

            <Typography
              variant="h5"
              align="center"
              sx={{
                fontWeight: "bold",
                color: "#007B5E",
                letterSpacing: 1,
                mb: 1,
                textTransform: "uppercase",
              }}
            >
              Add New Medicine
            </Typography>

            <Divider
              sx={{
                width: 180,
                mx: "auto",
                mb: 3,
                borderBottomWidth: 3,
                borderColor: "#80e4be",
                borderRadius: 5,
              }}
            />

            {message.text && (
              <Alert
                severity={message.type === "success" ? "success" : "error"}
                sx={{
                  mb: 3,
                  fontWeight: 500,
                  borderRadius: 2,
                  backgroundColor:
                    message.type === "success"
                      ? "rgba(200,255,230,0.7)"
                      : "rgba(255,230,230,0.7)",
                }}
              >
                {message.text}
                {addedTime && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 0.5, color: "#00695c", fontWeight: 500 }}
                  >
                    Added on: {addedTime}
                  </Typography>
                )}
              </Alert>
            )}

            <form onSubmit={handleAddMedicine}>
              <Autocomplete
                freeSolo
                options={filteredMedicines}
                value={newMedicine.name}
                onInputChange={(e, newValue) =>
                  setNewMedicine({ ...newMedicine, name: newValue })
                }
                renderInput={(params) => (
                  <TextField {...params} label="Medicine Name" fullWidth sx={{ mb: 3 }} />
                )}
              />

              <TextField
                label="Quantity"
                type="number"
                fullWidth
                value={newMedicine.quantity}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, quantity: e.target.value })
                }
                sx={{ mb: 3 }}
              />

              <TextField
                label="License Number"
                fullWidth
                value={newMedicine.licenseNumber}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    licenseNumber: e.target.value.toUpperCase(),
                  })
                }
                sx={{ mb: 3 }}
              />

              <TextField
                label="Manufacturing Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newMedicine.manufacturingDate}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    manufacturingDate: e.target.value,
                  })
                }
                sx={{ mb: 3 }}
              />

              <TextField
                label="Expiry Date"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={newMedicine.expiryDate}
                onChange={(e) =>
                  setNewMedicine({
                    ...newMedicine,
                    expiryDate: e.target.value,
                  })
                }
                sx={{ mb: 3 }}
              />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#e0f7fa",
                  p: 1.5,
                  borderRadius: 2,
                  mb: 3,
                }}
              >
                <Calendar size={20} style={{ marginRight: 8, color: "#007B5E" }} />
                <Typography variant="body2" sx={{ color: "#004d40" }}>
                  The current date and time will be recorded automatically when added.
                </Typography>
              </Box>

              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <Plus size={18} />}
                disabled={loading}
                sx={{
                  backgroundColor: "#1f8f7e",
                  py: 1.4,
                  fontWeight: "bold",
                  borderRadius: 10,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#157b68",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(31,143,126,0.3)",
                  },
                  "&:disabled": { backgroundColor: "#9e9e9e" },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Adding..." : "Add Medicine"}
              </Button>
            </form>

            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 4, color: "text.secondary" }}
            >
              © 2025 MediCare | Medicine Stock | Sabaragamuwa University
            </Typography>
          </Paper>
        </motion.div>
      </Fade>
    </Box>
  );
};

export default AddMedicine;
