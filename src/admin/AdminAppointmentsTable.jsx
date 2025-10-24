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
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const AdminAppointmentsTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/appointments");
        if (res.data.ok) {
          setAppointments(res.data.data);
          setFiltered(res.data.data);
        } else setError("No appointments found.");
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const filteredData = appointments.filter(
      (a) =>
        a.name.toLowerCase().includes(value) ||
        a.regNumber.toLowerCase().includes(value)
    );
    setFiltered(filteredData);
  };

  if (loading)
    return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="70vh"
      >
        <CircularProgress color="success" size={60} />
        <Typography sx={{ mt: 2, color: "text.secondary" }}>
          Loading appointments...
        </Typography>
      </Box>
    );

  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4, fontWeight: 500 }}>
        {error}
      </Typography>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #b3f3d9 0%, #c8f5e2 50%, #d4f9e6 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        py: 6,
        px: 2,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: "95%",
          maxWidth: 1200,
          borderRadius: 4,
          p: { xs: 3, md: 5 },
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
          boxShadow: "0px 8px 25px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header Logo */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <img
            src="/medicare_logo.png"
            alt="University Logo"
            style={{ height: "70px", objectFit: "contain" }}
          />
        </Box>

        {/* Header Text */}
        <Typography
          variant="h5"
          align="center"
          sx={{
            fontWeight: "bold",
            color: "#007B5E",
            mb: 3,
            letterSpacing: 0.8,
            textTransform: "uppercase",
          }}
        >
          Student Appointment Records
        </Typography>

        {/* Search Bar */}
        <TextField
          placeholder="Search by student name or reg number..."
          fullWidth
          value={search}
          onChange={handleSearch}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              backgroundColor: "#f9f9f9",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="success" />
              </InputAdornment>
            ),
          }}
        />

        {/* Table */}
        <TableContainer
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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
                      fontSize: "0.95rem",
                      textTransform: "uppercase",
                    }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {filtered.map((a, index) => (
                <TableRow
                  key={a._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 150, 136, 0.08)",
                      transform: "scale(1.01)",
                      transition: "0.3s",
                    },
                    backgroundColor:
                      index % 2 === 0
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(240,255,250,0.7)",
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

        {/* Footer */}
        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 3, color: "text.secondary" }}
        >
          © 2025 MediCare Admin Portal | Sabaragamuwa University
        </Typography>
      </Paper>
    </Box>
  );
};

export default AdminAppointmentsTable;
