import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Divider,
  Stack,
  Button,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";

const StudentMedical = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAllRecords();
  }, []);

  const fetchAllRecords = async () => {
    try {
      setLoading(true);

      // Fetch all types of medical records in parallel
      const [studentRes, universityRes, otherRes] = await Promise.all([
        axios.get("http://localhost:8000/api/student-medical"),
        axios.get("http://localhost:8000/api/university-medical"),
        axios.get("http://localhost:8000/api/other-medical/all"),
      ]);

      // Combine all records
      const combined = [
        ...studentRes.data.map((r) => ({
          ...r,
          source: "Student",
          medicalApproval: r.medicalApproval || "Pending",
          doctorApproval: r.doctorApproval || "Pending",
          medicalDate: r.medicalDate,
          type: r.type || "Student",
        })),
        ...universityRes.data.map((r) => ({
          _id: r._id,
          studentName: r.studentName,
          regNumber: r.regNumber,
          medicalDate: r.treatmentDate,
          type: "University",
          medicalApproval: r.medicalApproval || "Pending",
          doctorApproval: r.doctorApproval || "Pending",
          pdfFile: null,
          source: "University",
        })),
        ...otherRes.data.map((r) => ({
          _id: r._id,
          studentName: r.studentName,
          regNumber: r.regNumber,
          medicalDate: r.medicalDate || r.treatmentDate,
          type: r.type || "Other",
          medicalApproval: r.medicalApproval || "Pending",
          doctorApproval: r.doctorApproval || "Pending",
          pdfFile: r.pdfFile || r.file || null,
          source: "Other",
        })),
      ];

      // Filter duplicates by regNumber + date + type
      const uniqueMap = new Map();
      combined.forEach((r) => {
        const key = `${r.regNumber}_${new Date(r.medicalDate).toDateString()}_${r.type}`;
        if (!uniqueMap.has(key)) {
          uniqueMap.set(key, r);
        }
      });

      const uniqueRecords = Array.from(uniqueMap.values());

      // Sort descending by date
      uniqueRecords.sort((a, b) => new Date(b.medicalDate) - new Date(a.medicalDate));

      setRecords(uniqueRecords);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch records.");
    } finally {
      setLoading(false);
    }
  };

  // Update doctor approval
  const handleDoctorApproval = async (record, approval) => {
    try {
      let url = "";
      if (record.source === "Student") {
        url = `http://localhost:8000/api/student-medical/${record._id}/doctor-approval`;
      } else if (record.source === "University") {
        url = `http://localhost:8000/api/university-medical/${record._id}/doctor-approval`;
      } else if (record.source === "Other") {
        url = `http://localhost:8000/api/other-medical/${record._id}/doctor-approval`;
      }

      await axios.put(url, { doctorApproval: approval });

      fetchAllRecords();
    } catch (err) {
      console.error("Approval update error:", err);
    }
  };

  return (
    <Box sx={{ background: "linear-gradient(135deg,#b3f3d9,#e0fff3)", minHeight: "100vh", py: 6 }}>
      <Paper elevation={8} sx={{ maxWidth: 1000, mx: "auto", p: 5, borderRadius: 4 }}>
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <motion.img
            src="/medicare_logo.png"
            alt="Medicare Logo"
            style={{ height: "80px", marginBottom: "10px" }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7 }}
          />
          <Typography variant="h4" fontWeight="bold" color="#065a45">
            Medical Records
          </Typography>
          <Divider
            sx={{ mt: 1, borderColor: "#13a67a", borderBottomWidth: 2, width: "70%", mx: "auto" }}
          />
        </Box>

        {loading && <CircularProgress sx={{ display: "block", mx: "auto", my: 3 }} />}
        {error && <Typography color="error" align="center">{error}</Typography>}

        {!loading && (
          <Table sx={{ mt: 4 }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Reg No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Medical Approval</TableCell>
                <TableCell>Doctor Approval</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {records.map((r) => (
                <TableRow key={r._id}>
                  <TableCell>{r.studentName}</TableCell>
                  <TableCell>{r.regNumber}</TableCell>
                  <TableCell>{new Date(r.medicalDate).toLocaleDateString()}</TableCell>
                  <TableCell>{r.type}</TableCell>
                  <TableCell
                    sx={{
                      color: r.medicalApproval === "Approved" ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {r.medicalApproval}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        onClick={() => handleDoctorApproval(r, "Yes")}
                      >
                        Yes
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="error"
                        onClick={() => handleDoctorApproval(r, "No")}
                      >
                        No
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Typography variant="body2" align="center" sx={{ mt: 4, color: "text.secondary" }}>
          © MediCare | University Medical Records | Sabaragamuwa University
        </Typography>
      </Paper>
    </Box>
  );
};

export default StudentMedical;
