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
  CircularProgress,
  Autocomplete,
} from "@mui/material";
import { motion } from "framer-motion";
import { CheckCircle, Pill, Hash, CalendarClock } from "lucide-react";
import axios from "axios";

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

const Distribution = () => {
  const [form, setForm] = useState({ medicine: "", quantity: "" });
  const [message, setMessage] = useState({ text: "", type: "" });
  const [lastDistribution, setLastDistribution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.medicine || !form.quantity) {
      setMessage({ text: "Please fill in all fields", type: "error" });
      return;
    }

    if (Number(form.quantity) <= 0) {
      setMessage({ text: "Quantity must be greater than 0", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/medicineStock/distribute", {
        medicineName: form.medicine.trim(),
        quantity: Number(form.quantity),
      });

      const currentDateTime = new Date().toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      });
      setLastDistribution(currentDateTime);

      setMessage({
        text: response.data.message || `Medicine "${form.medicine}" distributed successfully!`,
        type: "success",
      });

      setForm({ medicine: "", quantity: "" });

      setTimeout(() => {
        setMessage({ text: "", type: "" });
      }, 4000);
    } catch (error) {
      console.error("Error distributing medicine:", error);
      setMessage({
        text: error.response?.data?.message || "Failed to distribute medicine. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredMedicines =
    form.medicine.length >= 2
      ? MEDICINE_NAMES.filter((item) =>
          item.toLowerCase().includes(form.medicine.toLowerCase())
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
          initial={{ opacity: 0, y: 40 }}
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
            {/* LOGO */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
              <img
                src="/medicare_logo.png"
                alt="MediCare Logo"
                style={{ height: "70px", objectFit: "contain" }}
              />
            </Box>

            {/* TITLE */}
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
              Medicine Distribution
            </Typography>

            <Divider
              sx={{
                width: 220,
                mx: "auto",
                mb: 3,
                borderBottomWidth: 3,
                borderColor: "#80e4be",
                borderRadius: 5,
              }}
            />

            {/* ALERT MESSAGE */}
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
              </Alert>
            )}

            {/* FORM */}
            <form onSubmit={handleSubmit}>
              <Autocomplete
                freeSolo
                options={filteredMedicines}
                value={form.medicine}
                onInputChange={(e, newValue) =>
                  setForm({ ...form, medicine: newValue })
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Medicine Name"
                    fullWidth
                    sx={{ mb: 3 }}
                    InputProps={{
                      ...params.InputProps,
                      startAdornment: (
                        <>
                          <Pill size={18} style={{ marginRight: 8, color: "#0a5443" }} />
                          {params.InputProps.startAdornment}
                        </>
                      ),
                    }}
                  />
                )}
              />

              <TextField
                label="Quantity"
                type="number"
                fullWidth
                value={form.quantity}
                onChange={(e) =>
                  setForm({ ...form, quantity: e.target.value })
                }
                InputProps={{
                  startAdornment: (
                    <Hash size={18} style={{ marginRight: 8, color: "#0a5443" }} />
                  ),
                }}
                sx={{ mb: 3 }}
              />

              {/* DATE & TIME DISPLAY */}
              {lastDistribution && (
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mb: 3,
                    justifyContent: "center",
                    color: "#0a5443",
                    fontWeight: 500,
                  }}
                >
                  <CalendarClock size={18} />
                  <Typography variant="body2">
                    Last distributed on: {lastDistribution}
                  </Typography>
                </Box>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <CheckCircle size={18} />}
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
                {loading ? "Distributing..." : "Distribute Medicine"}
              </Button>
            </form>

            {/* FOOTER */}
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

export default Distribution;