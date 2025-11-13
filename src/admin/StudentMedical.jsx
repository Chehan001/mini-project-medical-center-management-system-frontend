import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Stack,
  TextField,
  Alert,
  Divider,
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import axios from "axios";

const StudentMedical = () => {
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState("University");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    studentName: "",
    regNumber: "",
    medicalDate: "",
    pdfFile: null,
  });

  // Fetch all records
  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/studentmedical");
      setRecords(res.data);
    } catch (err) {
      console.error("Error fetching records:", err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFormData((prev) => ({ ...prev, pdfFile: file.name }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!formData.studentName || !formData.regNumber || !formData.medicalDate) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:5000/api/studentmedical", {
        studentName: formData.studentName,
        regNumber: formData.regNumber,
        medicalDate: formData.medicalDate,
        pdfFile: formData.pdfFile,
        type: formType,
      });

      setMessage(res.data.message);
      fetchRecords(); // Refresh data
      setShowForm(false);
      setFormData({
        studentName: "",
        regNumber: "",
        medicalDate: "",
        pdfFile: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add record.");
    } finally {
      setLoading(false);
    }
  };

  const handleDoctorApproval = async (id, approval) => {
    try {
      await axios.put(
        `http://localhost:5000/api/studentmedical/${id}/doctor-approval`,
        { doctorApproval: approval }
      );
      fetchRecords();
    } catch (err) {
      console.error("Error updating approval:", err);
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
            Medical Approval System
          </Typography>
          <Divider sx={{ mt: 1, borderColor: "#13a67a", borderBottomWidth: 2, width: "70%", mx: "auto" }} />
        </Box>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

        {/* Add Form */}
        {showForm && (
          <Box sx={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Paper sx={{ p: 4, borderRadius: 3, width: "100%", maxWidth: 600 }}>
              <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h6" color="#065a45">
                  Add Medical Record
                </Typography>
                <Button onClick={() => setShowForm(false)}><X /></Button>
              </Stack>
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <FormControl>
                    <FormLabel>Record Type</FormLabel>
                    <RadioGroup row value={formType} onChange={(e) => setFormType(e.target.value)}>
                      <FormControlLabel value="University" control={<Radio color="success" />} label="University Medical" />
                      <FormControlLabel value="Other" control={<Radio color="success" />} label="Other Medical" />
                    </RadioGroup>
                  </FormControl>
                  <TextField label="Student Name" name="studentName" value={formData.studentName} onChange={handleInputChange} required />
                  <TextField label="Register Number" name="regNumber" value={formData.regNumber} onChange={handleInputChange} required />
                  <TextField type="date" label="Medical Date" name="medicalDate" value={formData.medicalDate} onChange={handleInputChange} required InputLabelProps={{ shrink: true }} />
                  {formType === "Other" && (
                    <Button variant="outlined" component="label">
                      Upload PDF
                      <input type="file" hidden accept=".pdf" onChange={handleFileChange} />
                    </Button>
                  )}
                  <Stack direction="row" spacing={2}>
                    <Button type="submit" variant="contained" fullWidth disabled={loading}>
                      {loading ? <CircularProgress size={22} sx={{ mr: 1 }} /> : "Add Record"}
                    </Button>
                    <Button onClick={() => setShowForm(false)} variant="outlined" fullWidth>Cancel</Button>
                  </Stack>
                </Stack>
              </form>
            </Paper>
          </Box>
        )}

        {/* Data Table */}
        <Box mt={6}>
          <Typography variant="h5" fontWeight="bold" color="#065a45" mb={2}>
            Student Medical Records
          </Typography>
          <Table>
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
                  <TableCell sx={{ color: r.medicalApproval === "Approved" ? "green" : "red", fontWeight: "bold" }}>
                    {r.medicalApproval}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button onClick={() => handleDoctorApproval(r._id, "Yes")} size="small" variant="contained">
                        Yes
                      </Button>
                      <Button onClick={() => handleDoctorApproval(r._id, "No")} size="small" variant="contained" color="error">
                        No
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>

        <Typography variant="body2" align="center" sx={{ mt: 4, color: "text.secondary" }}>
          © MediCare | University Medical Approval | Sabaragamuwa University
        </Typography>
      </Paper>
    </Box>
  );
};

export default StudentMedical;
