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
  return `${String(date.getHours()).padStart(2, "0")}:${String(
    date.getMinutes()
  ).padStart(2, "0")}`;
}

function isWeekday(date) {
  return date.getDay() !== 0 && date.getDay() !== 6;
}

function addMinutes(date, minutes) {
  return new Date(date.getTime() + minutes * 60000);
}

export default function AppointmentBooking() {
  const holidays = useMemo(
    () => ["2025-12-25", "2025-10-20", "2025-04-14"],
    []
  );

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(
    toLocalIsoDateInputValue(today)
  );
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [studentData, setStudentData] = useState({
    name: "",
    regNumber: "",
    mobile: "",
  });
  const [booked, setBooked] = useState([]);
  const [message, setMessage] = useState(null);

  /*  Slot  */
  const generateSlotsForDate = useCallback(
    (dateIso) => {
      const [y, m, d] = dateIso.split("-").map(Number);
      const date = new Date(y, m - 1, d);
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
          cursor = lunchEnd;
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
        disabled: isToday && s <= now,
      }));
    },
    [holidays]
  );

  const slots = useMemo(
    () => generateSlotsForDate(selectedDate),
    [selectedDate, generateSlotsForDate]
  );

  /*  Fetch booked slots  */
  useEffect(() => {
    axios
      .get(`${API_ROOT}/api/appointments/by-date/${selectedDate}`)
      .then((res) => res.data.ok && setBooked(res.data.bookings))
      .catch(() => console.error("Failed to load bookings"));
  }, [selectedDate]);

  /* AUTO-FILL */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const regNumber = localStorage.getItem("regNumber");
    if (!regNumber) return;

    axios
      .get(`${API_ROOT}/api/user/${regNumber}`)
      .then((res) =>
        setStudentData({
          name: res.data.name,
          regNumber: res.data.regNumber,
          mobile: res.data.mobile || "",
        })
      )
      .catch(() =>
        setMessage({
          type: "error",
          text: "Failed to load student details.",
        })
      );
  }, []);

  /* Book Appointment */
  const handleBook = async () => {
    setMessage(null);

    if (!selectedSlot)
      return setMessage({ type: "error", text: "Please select a time slot." });

    if (!studentData.mobile)
      return setMessage({ type: "error", text: "Mobile number required." });

    try {
      const res = await axios.post(`${API_ROOT}/api/appointments`, {
        date: selectedDate,
        time: selectedSlot.label,
        ...studentData,
      });

      if (res.data.ok) {
        setBooked((p) => [...p, res.data.appointment]);
        setSelectedSlot(null);
        setMessage({
          type: "success",
          text: "Appointment booked successfully.",
        });
      }
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.error || "Booking failed.",
      });
    }
  };

  /* UI */
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#b3f3d9,#d4f9e6,#c8f5e2,#a6f1d7)",
        display: "flex",
        alignItems: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper elevation={8} sx={{ p: 4, borderRadius: 4 }}>
          <Typography variant="h5" align="center" fontWeight="bold" mb={3}>
            Quick Channel Appointment
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                type="date"
                fullWidth
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />

              <List sx={{ mt: 2, maxHeight: 300, overflowY: "auto" }}>
                {slots.map((s) => {
                  const disabled =
                    s.disabled || booked.some((b) => b.time === s.label);

                  return (
                    <ListItem
                      key={s.iso}
                      component="button"
                      disabled={disabled}
                      selected={selectedSlot?.iso === s.iso}
                      onClick={() => setSelectedSlot(s)}
                    >
                      <ListItemText primary={s.label} />
                      {disabled && (
                        <Chip size="small" label="Booked" color="error" />
                      )}
                    </ListItem>
                  );
                })}
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField label="Name" value={studentData.name} fullWidth disabled />
              <TextField
                label="Reg Number"
                value={studentData.regNumber}
                fullWidth
                disabled
                sx={{ mt: 2 }}
              />
              <TextField
                label="Mobile"
                value={studentData.mobile}
                onChange={(e) =>
                  setStudentData({ ...studentData, mobile: e.target.value })
                }
                fullWidth
                sx={{ mt: 2 }}
              />

              <Button
                fullWidth
                sx={{ mt: 3 }}
                variant="contained"
                onClick={handleBook}
              >
                Confirm Appointment
              </Button>

              {message && (
                <Alert sx={{ mt: 2 }} severity={message.type}>
                  {message.text}
                </Alert>
              )}
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}
