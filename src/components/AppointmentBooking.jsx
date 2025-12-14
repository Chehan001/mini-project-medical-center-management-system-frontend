import React, { useMemo, useState, useCallback, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  Divider,
} from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import API_ROOT from "../services/api";

function toLocalIsoDateInputValue(date) {
  const tzOffset = date.getTimezoneOffset() * 60000;
  return new Date(date - tzOffset).toISOString().slice(0, 10);
}

function formatTime(date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function isWeekday(date) {
  const d = date.getDay();
  return d !== 0 && d !== 6;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export default function AppointmentBooking() {
  const holidays = useMemo(() => ["2025-12-25", "2025-10-20", "2025-04-14"], []);
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(toLocalIsoDateInputValue(today));
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [studentData, setStudentData] = useState({
    name: "",
    regNumber: "",
    mobile: "",
  });
  const [booked, setBooked] = useState([]);
  const [message, setMessage] = useState(null);

  // Generate --> available slots
  const generateSlotsForDate = useCallback(
    (dateIso) => {
      const [year, month, day] = dateIso.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      if (!isWeekday(date) || holidays.includes(dateIso)) return [];

      const start = new Date(date);
      start.setHours(8, 30, 0, 0);
      const end = new Date(date);
      end.setHours(16, 0, 0, 0);

      const lunchStart = new Date(date);
      lunchStart.setHours(12, 0, 0, 0);
      const lunchEnd = new Date(date);
      lunchEnd.setHours(13, 0, 0, 0);

      const slots = [];
      let cursor = new Date(start);

      while (cursor.getTime() + 20 * 60000 <= end.getTime()) {
        if (cursor >= lunchStart && cursor < lunchEnd) {
          cursor = new Date(lunchEnd);
        } else {
          slots.push(new Date(cursor));
          cursor = addMinutes(cursor, 20);
        }
      }

      const now = new Date();
      const isToday = toLocalIsoDateInputValue(now) === dateIso;

      return slots.map((s) => ({
        iso: s.toISOString(),
        label: formatTime(s),
        disabled: isToday && s.getTime() <= now.getTime(),
      }));
    },
    [holidays]
  );

  const slots = useMemo(() => generateSlotsForDate(selectedDate), [selectedDate, generateSlotsForDate]);

  const fetchBookedSlots = async (date) => {
    try {
      const res = await axios.get(`${API_ROOT}/api/appointments/by-date/${date}`);
      if (res.data.ok) setBooked(res.data.bookings);
    } catch (err) {
      console.error("Failed to fetch booked appointments:", err);
    }
  };

  useEffect(() => {
    fetchBookedSlots(selectedDate);
  }, [selectedDate]);

  // Auto-fill --> student info
  useEffect(() => {
    const regNumber = localStorage.getItem("regNumber");
    if (!regNumber || !selectedSlot) return;

    axios
      .get(`${API_ROOT}/api/user/${regNumber}`)
      .then((res) => {
        setStudentData({
          name: res.data.name,
          regNumber: res.data.regNumber,
          mobile: res.data.mobile || "",
        });
      })
      .catch(() => {
        setMessage({
          type: "error",
          text: "Failed to auto-fill your student details.",
        });
      });
  }, [selectedSlot]);

  const handleBook = async () => {
    setMessage(null);
    if (!selectedSlot)
      return setMessage({ type: "error", text: "Please select a time slot." });
    if (!studentData.mobile)
      return setMessage({ type: "error", text: "Mobile number is required." });

    const existing = booked.find((b) => b.time === selectedSlot.label);
    if (existing)
      return setMessage({ type: "error", text: "That slot is already booked." });

    try {
      const res = await axios.post(`${API_ROOT}/api/appointments`, {
        date: selectedDate,
        time: selectedSlot.label,
        mobile: studentData.mobile,
        name: studentData.name,
        regNumber: studentData.regNumber,
      });

      if (res.data.ok) {
        setBooked((prev) => [...prev, res.data.appointment]);
        setMessage({
          type: "success",
          text: `Appointment booked successfully for ${selectedDate} at ${selectedSlot.label}.`,
        });
        setSelectedSlot(null);
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Failed to book appointment.",
      });
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #b3f3d9, #d4f9e6, #c8f5e2, #a6f1d7)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        "@keyframes gradientMove": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Paper
            elevation={8}
            sx={{
              p: { xs: 2, sm: 4 },
              borderRadius: 4,
              bgcolor: "#ffffff",
              boxShadow: "0px 8px 30px rgba(31,143,126,0.25)",
              transition: "transform 0.3s, box-shadow 0.3s",
              "&:hover": {
                transform: "translateY(-5px)",
                boxShadow: "0px 12px 40px rgba(31,143,126,0.35)",
              },
            }}
          >
            {/* Header */}
            <Box textAlign="center" mb={3}>
              <motion.img
                src="/medicare_logo.png"
                alt="MediCare Logo"
                style={{
                  height: "70px",
                  objectFit: "contain",
                  marginBottom: "10px",
                }}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: "#1f8f7e",
                  fontWeight: "bold",
                  letterSpacing: 0.5,
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                Quick Channel Appointment
              </Typography>
              <Divider
                sx={{
                  mt: 1,
                  borderColor: "#1f8f7e",
                  borderBottomWidth: 2,
                  width: "60%",
                  mx: "auto",
                }}
              />
            </Box>

            {/* Main Content */}
            <Grid container spacing={3} alignItems="center" justifyContent="center">

              {/* Left side -->  Date & Slots */}
              <Grid item xs={12} md={6}>
                <Typography sx={{ color: "#1f8f7e", fontWeight: "bold" }}>
                  Choose a Date
                </Typography>
                <TextField
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  fullWidth
                  sx={{ mt: 1, mb: 2 }}
                  inputProps={{ min: toLocalIsoDateInputValue(today) }}
                />
                <Typography sx={{ color: "#1f8f7e", fontWeight: "bold" }}>
                  Available Slots
                </Typography>
                {!slots.length ? (
                  <Alert severity="info" sx={{ mt: 1 }}>
                    No slots available (Weekend or Holiday)
                  </Alert>
                ) : (
                  <List sx={{ maxHeight: 300, overflowY: "auto", mt: 1 }}>
                    {slots.map((s) => {
                      const disabled =
                        s.disabled || booked.some((b) => b.time === s.label);
                      return (
                        <motion.div
                          key={s.iso}
                          whileHover={{ scale: !disabled ? 1.02 : 1 }}
                        >
                          <ListItem
                            button
                            onClick={() => !disabled && setSelectedSlot(s)}
                            selected={selectedSlot?.iso === s.iso}
                            sx={{
                              bgcolor:
                                selectedSlot?.iso === s.iso
                                  ? "#d1f5e1"
                                  : "transparent",
                              borderRadius: 1,
                              mb: 0.5,
                              "&:hover": !disabled && { bgcolor: "#e8fdf4" },
                            }}
                            secondaryAction={
                              disabled ? (
                                <Chip
                                  label={s.disabled ? "Past" : "Booked"}
                                  size="small"
                                  color="error"
                                  variant="outlined"
                                />
                              ) : null
                            }
                          >
                            <ListItemText primary={s.label} />
                          </ListItem>
                        </motion.div>
                      );
                    })}
                  </List>
                )}
              </Grid>

              {/* Right side --> Doctor Image */}
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <motion.img
                  src="/Doctor.png"
                  alt="Doctor"
                  style={{
                    height: "450px",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                />
              </Grid>
            </Grid>

            {/* Student_Info */}
            <Box textAlign="center" mt={4}>
              <Typography
                fontWeight="bold"
                textAlign="center"
                mb={2}
                sx={{ fontSize: "1.1rem", color: "#1f8f7e" }}
              >
                Student Information
              </Typography>
              <TextField
                label="Name"
                value={studentData.name}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Registration Number"
                value={studentData.regNumber}
                fullWidth
                InputProps={{ readOnly: true }}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Mobile Number"
                value={studentData.mobile}
                onChange={(e) =>
                  setStudentData({ ...studentData, mobile: e.target.value })
                }
                fullWidth
                placeholder="+94 7XXXXXXXX"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  sx={{
                    mt: 3,
                    bgcolor: "#1f8f7e",
                    "&:hover": {
                      bgcolor: "#157666",
                      boxShadow: "0 8px 20px rgba(31,143,126,0.3)",
                    },
                    fontWeight: "bold",
                    borderRadius: 5,
                    py: 1.5,
                    px: 4,
                  }}
                  onClick={handleBook}
                >
                  Confirm Appointment
                </Button>
              </motion.div>

              {message && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box mt={2}>
                    <Alert severity={message.type}>{message.text}</Alert>
                  </Box>
                </motion.div>
              )}
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </Box>
  );
}
