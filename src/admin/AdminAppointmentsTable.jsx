import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Box,
  TableContainer,
} from "@mui/material";
import axios from "axios";

const AdminAppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/appointments");
        if (res.data.ok) setAppointments(res.data.data);
        else setError("No appointments found.");
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <CircularProgress color="success" size={60} />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4, fontWeight: 500 }}>
        {error}
      </Typography>
    );

  if (!appointments.length)
    return (
      <Typography
        variant="body1"
        sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}
      >
        No appointment data available.
      </Typography>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #b3f3d9, #d4f9e6, #c8f5e2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        p: 4,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "90%",
          maxWidth: 1100,
          borderRadius: 4,
          p: 4,
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* --- HEADING --- */}
        <Typography
          variant="h5"
          align="center"
          gutterBottom
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#008060",
            letterSpacing: 0.5,
          }}
        >
          All Student Appointments
        </Typography>

        {/* --- TABLE --- */}
        <TableContainer
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
          }}
        >
          <Table>
            <TableHead
              sx={{
                background: "linear-gradient(to right, #80e4be, #a9e0cb)",
              }}
            >
              <TableRow>
                {[
                  "#",
                  "Student Name",
                  "Reg Number",
                  "Date",
                  "Time",
                  "Mobile",
                  "Created At",
                ].map((header) => (
                  <TableCell
                    key={header}
                    sx={{
                      color: "#004d40",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {appointments.map((a, index) => (
                <TableRow
                  key={a._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(128, 224, 190, 0.15)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell align="center">{a.name}</TableCell>
                  <TableCell align="center">{a.regNumber}</TableCell>
                  <TableCell align="center">{a.date}</TableCell>
                  <TableCell align="center">{a.time}</TableCell>
                  <TableCell align="center">{a.mobile}</TableCell>
                  <TableCell align="center">
                    {new Date(a.createdAt).toLocaleString("en-GB")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default AdminAppointmentsTable;
