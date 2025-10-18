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

  if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />;
  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );

  if (!students.length)
    return (
      <Typography variant="body1" sx={{ mt: 3, textAlign: "center" }}>
        No student data available.
      </Typography>
    );

  return (
    <Paper sx={{ mt: 4, p: 3, overflowX: "auto" }}>
      <Typography variant="h6" gutterBottom>
        Registered Student Data
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Reg Number</TableCell>
            <TableCell>Faculty</TableCell>
            <TableCell>Course</TableCell>
            <TableCell>Blood Group</TableCell>
            <TableCell>Photo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((s) => (
            <TableRow key={s._id}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.regNumber}</TableCell>
              <TableCell>{s.faculty}</TableCell>
              <TableCell>{s.course}</TableCell>
              <TableCell>{s.bloodGroup}</TableCell>
              <TableCell>
                {s.photo ? (
                  <img
                    src={`http://localhost:8000${s.photo}`}
                    alt="Student"
                    width="50"
                    height="50"
                    style={{ borderRadius: "50%" }}
                  />
                ) : (
                  "No Photo"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default StudentTable;
