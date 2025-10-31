import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  Alert,
  Divider,
  IconButton,
  Grid,
  Autocomplete,
} from "@mui/material";
import { User, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

// Medicine_List
const medicineList = [
  "Paracetamol",
  "Ibuprofen",
  "Aspirin",
  "Diclofenac sodium",
  "Naproxen",
  "Amoxicillin",
  "Azithromycin",
  "Ciprofloxacin",
  "Metronidazole",
  "Cefuroxime",
  "Doxycycline",
  "Cetirizine",
  "Loratadine",
  "Chlorpheniramine maleate",
  "Diphenhydramine",
  "Pantoprazole",
  "Ranitidine",
  "Antacid syrup",
  "Loperamide",
  "Oral Rehydration Salts",
  "Domperidone",
  "Metoclopramide",
  "Povidone-iodine solution",
  "Hydrogen peroxide",
  "Alcohol (70% isopropyl)",
  "Chlorhexidine",
  "Hand sanitizer",
  "Dextromethorphan syrup",
  "Guaifenesin syrup",
  "Salbutamol inhaler",
  "Steam inhalation preparations",
  "Burn cream (Silver sulfadiazine)",
  "Antifungal cream (Clotrimazole, Miconazole)",
  "Hydrocortisone cream",
  "Antibiotic ointment (Neomycin, Bacitracin)",
  "Calamine lotion",
  "Multivitamin tablets",
  "Vitamin C",
  "Iron & Folic acid tablets",
  "Calcium supplements",
  "Adrenaline injection",
  "Hydrocortisone injection",
  "Atropine",
  "Diazepam injection",
  "Glucose IV solution (5%)",
  "Normal saline IV solution (0.9%)",
  "Oral contraceptive pills",
  "Antifungal tablets (Fluconazole)",
  "Antimalarial drugs (Chloroquine / Artemether-Lumefantrine)",
  "Blood pressure medication (Amlodipine, Losartan)",
  "Diabetes medication (Metformin, Glibenclamide)",
];

const StudentMedicine = () => {
  const [registerNumber, setRegisterNumber] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [medicines, setMedicines] = useState([
    { id: 1, medicineName: "", dosage: "", frequency: "", timing: "morning" },
  ]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Auto-fill_date_and_time
  useEffect(() => {
    const now = new Date();
    setDate(now.toISOString().split("T")[0]);
    setTime(now.toTimeString().slice(0, 5));
  }, []);

  const handleMedicineChange = (id, field, value) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addMedicine = () => {
    const newId =
      medicines.length > 0 ? Math.max(...medicines.map((m) => m.id)) + 1 : 1;
    setMedicines([
      ...medicines,
      { id: newId, medicineName: "", dosage: "", frequency: "", timing: "morning" },
    ]);
  };

  const removeMedicine = (id) => {
    if (medicines.length > 1)
      setMedicines(medicines.filter((m) => m.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!registerNumber.trim()) {
      setError("Please enter student register number.");
      return;
    }
    if (medicines.some((m) => !m.medicineName || !m.dosage || !m.frequency)) {
      setError("Please fill in all medicine fields before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/doctor/add-medicine",
        { regNumber: registerNumber, date, time, medicines }
      );

      setMessage(response.data.message || "Medicine record added successfully!");
      setRegisterNumber("");
      setMedicines([{ id: 1, medicineName: "", dosage: "", frequency: "", timing: "morning" }]);
    } catch (err) {
      console.error("Error adding medicine:", err);
      setError(err.response?.data?.message || "Error adding medicine record. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #b3f3d9 0%, #e0fff3 50%, #d4f9e6 100%)",  minHeight: "100vh", py: 6, px: 2, }} >
      <Paper
        elevation={10}
        sx={{
          maxWidth: 950,
          mx: "auto",
          p: 5,
          borderRadius: 4,
          background: "linear-gradient(to bottom right, #ffffff, #eafcf4)",
          boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Logo_Section */}
        <Box textAlign="center" mb={4}>
          <motion.img
            src="/medicare_logo.png"
            alt="University Logo"
            style={{ height: "85px", objectFit: "contain", marginBottom: "10px" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <Divider sx={{ mt: 1, borderColor: "#13a67a",  borderBottomWidth: 2, width: "65%",  mx: "auto",  }}  />
        </Box>

        {/* Title */}
        <Typography variant="h4" fontWeight="bold" color="#065a45"  textAlign="center" mb={1} >
          Student Medicine Record
        </Typography>
        <Typography variant="body1" color="text.secondary"  textAlign="center"  mb={4}  >
          Quickly record and submit prescribed medicines for students.
        </Typography>

        {/* Alerts */}
        {message && <Alert severity="success" sx={{ mb: 3 }}>{message}</Alert>}
        {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField label="Register Number" value={registerNumber} onChange={(e) => setRegisterNumber(e.target.value)}  fullWidth
                  required
                  InputProps={{
                    startAdornment: (
                      <User size={18} style={{ marginRight: 8, color: "#0a5443" }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Date" value={date} fullWidth InputProps={{ readOnly: true }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Time" value={time} fullWidth InputProps={{ readOnly: true }} />
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Medicines Header */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6" fontWeight="bold" color="#065a45">
                Medicines
              </Typography>
              <Button
                startIcon={<Plus size={18} />}
                onClick={addMedicine}
                variant="contained"
                sx={{
                  borderRadius: "20px",
                  background: "linear-gradient(90deg, #0a5443, #1ca37f)",
                  "&:hover": { background: "#09856e", transform: "scale(1.05)" },
                  textTransform: "none",
                  transition: "all 0.3s",
                }}
              >
                Add Medicine
              </Button>
            </Box>

            {/* Medicine Fields */}
            {medicines.map((m, index) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Paper
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    mt: 2,
                    backgroundColor: "#f8fffb",
                    border: "1px solid #b2dfdb",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 6px 15px rgba(0,0,0,0.1)",
                      transform: "translateY(-3px)",
                    },
                  }}
                >
                  <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography fontWeight="bold" color="#0a5443">
                      Medicine {index + 1}
                    </Typography>
                    {medicines.length > 1 && (
                      <IconButton onClick={() => removeMedicine(m.id)} color="error" size="small">
                        <Trash2 size={20} />
                      </IconButton>
                    )}
                  </Box>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} sm={5}>
                      <Autocomplete
                        freeSolo
                        options={medicineList.filter(
                          (med) =>
                            med.toLowerCase().includes(m.medicineName.toLowerCase()) &&
                            m.medicineName.length >= 1
                        )}
                        value={m.medicineName}
                        onInputChange={(e, newValue) =>
                          handleMedicineChange(m.id, "medicineName", newValue)
                        }
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Medicine Name"
                            required
                            sx={{ width: 270, }}
                          />
                        )}
                      />
                    </Grid>

                    <Grid item xs={6} sm={3.5}>
                      <TextField
                        label="Dosage (mg)"
                        type="number"
                        value={m.dosage}
                        onChange={(e) => handleMedicineChange(m.id, "dosage", e.target.value)}
                        fullWidth
                        required

                      />
                    </Grid>
                    <Grid item xs={6} sm={3.5}>
                      <TextField
                        label="Frequency (per day)"
                        type="number"
                        value={m.frequency}
                        onChange={(e) =>
                          handleMedicineChange(m.id, "frequency", e.target.value)
                        }
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>

                  <Divider sx={{ my: 2 }} />

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" sx={{ mb: 1 }} color="#065a45">
                      Timing
                    </Typography>
                    <Stack direction="row" spacing={2}>
                      {["morning", "night", "both"].map((t) => (
                        <Box
                          key={t}
                          onClick={() => handleMedicineChange(m.id, "timing", t)}
                          sx={{
                            px: 2.5,
                            py: 0.8,
                            borderRadius: 2,
                            cursor: "pointer",
                            fontWeight: "bold",
                            backgroundColor: m.timing === t ? "#0a5443" : "#e0f2f1",
                            color: m.timing === t ? "#fff" : "#0a5443",
                            transition: "all 0.3s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                              backgroundColor: m.timing === t ? "#0a5443" : "#c8e6c9",
                            },
                          }}
                        >
                          {t.charAt(0).toUpperCase() + t.slice(1)}
                        </Box>
                      ))}
                    </Stack>
                  </Grid>
                </Paper>
              </motion.div>
            ))}

            {/* Submit */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                borderRadius: "25px",
                py: 1.6,
                fontSize: "1.1rem",
                fontWeight: "bold",
                background: "linear-gradient(90deg, #0a5443, #13a67a)",
                "&:hover": { background: "#09856e", transform: "scale(1.03)" },
                transition: "all 0.3s",
              }}
            >
              Submit All Medicines
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};

export default StudentMedicine;
