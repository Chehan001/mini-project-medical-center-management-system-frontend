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
  Avatar,
  TableContainer,
} from "@mui/material";
import axios from "axios";

const StudentTable = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/");
        setStudents(res.data);
      } catch (err) {
        console.error("Fetch student data error:", err);
        setError("Failed to fetch student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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

  if (!students.length)
    return (
      <Typography
        variant="body1"
        sx={{ mt: 3, textAlign: "center", color: "text.secondary" }}
      >
        No student data available.
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
        {/* --- LOGO SECTION --- */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <img
            src="/medicare_logo.png"
            alt="University Logo"
            style={{ height: "70px", objectFit: "contain" }}
          />
        </Box>

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
          Registered Student Data
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
                  "Photo",
                  "Name",
                  "Reg Number",
                  "Faculty",
                  "Course",
                  "Blood Group",
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
              {students.map((s) => (
                <TableRow
                  key={s._id}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(128, 224, 190, 0.15)",
                      transition: "0.3s",
                    },
                  }}
                >
                  <TableCell align="center">
                    {s.photo ? (
                      <Avatar
                        src={`http://localhost:8000${s.photo}`}
                        alt="Student"
                        sx={{ width: 50, height: 50, mx: "auto" }}
                      />
                    ) : (
                      <Avatar
                        sx={{
                          width: 50,
                          height: 50,
                          mx: "auto",
                          bgcolor: "#a9e0cb",
                          color: "#004d40",
                        }}
                      >
                        {s.name?.charAt(0) || "?"}
                      </Avatar>
                    )}
                  </TableCell>

                  <TableCell align="center" sx={{ fontWeight: 500 }}>
                    {s.name}
                  </TableCell>
                  <TableCell align="center">{s.regNumber}</TableCell>
                  <TableCell align="center">{s.faculty}</TableCell>
                  <TableCell align="center">{s.course}</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>
                    {s.bloodGroup}
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

export default StudentTable;
