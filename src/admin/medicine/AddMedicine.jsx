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
} from "@mui/material";
import { motion } from "framer-motion";
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
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(-45deg, #b3f3d9, #d4f9e6, #c8f5e2, #a9e0cb)",
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
            <form onSubmit={handleAddMedicine}>
              <TextField
                label="Medicine Name"
                fullWidth
                value={newMedicine.name}
                onChange={(e) =>
                  setNewMedicine({ ...newMedicine, name: e.target.value })
                }
                sx={{ mb: 3 }}
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

              {/* INFO BOX */}
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

              {/* SUBMIT BUTTON */}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                startIcon={<Plus size={18} />}
                sx={{
                  backgroundColor: "#1f8f7e",
                  py: 1.4,
                  fontWeight: "bold",
                  borderRadius: 2,
                  fontSize: "1rem",
                  "&:hover": {
                    backgroundColor: "#157b68",
                    transform: "translateY(-2px)",
                    boxShadow: "0 6px 20px rgba(31,143,126,0.3)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                Add Medicine
              </Button>
            </form>

            {/* FOOTER */}
            <Typography
              variant="body2"
              align="center"
              sx={{ mt: 4, color: "text.secondary" }}
            >
              © 2025 MediCare Admin Portal | Sabaragamuwa University
            </Typography>
          </Paper>
        </motion.div>
      </Fade>
    </Box>
  );
};

export default AddMedicine;
