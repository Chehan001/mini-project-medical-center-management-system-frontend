import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
  Divider,
  Paper,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";


const RegistrationForm = () => {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null); // preview URL
  const [photoFile, setPhotoFile] = useState(null); // actual file object

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


 const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
      setPhotoFile(file);
    }
  };

  const handleDateChange = (date) => {
  setForm({ ...form, dob: date });
};

   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const fd = new FormData();

      // append all text fields and radio selections
      for (const key in form) {
        if (form[key] instanceof Object && form[key].$d) {
          // handle dayjs date object
          fd.append(key, dayjs(form[key]).format("YYYY-MM-DD"));
        } else {
          fd.append(key, form[key] || "");
        }
      }

      // append photo file
      if (photoFile) fd.append("photo", photoFile);

      const res = await axios.post(
        "http://localhost:8000/api/user",
        fd,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("Server response:", res.data);
      alert("Medical Examiner’s Report Submitted Successfully!");

      // reset form
      setForm({});
      setPhoto(null);
      setPhotoFile(null);
    } catch (err) {
      console.error(err);
      alert("Submission failed: " + (err.response?.data?.message || err.message));
    }
  };


  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header Section */}
      <Box textAlign="center" mb={3}>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <img
            src="/medicare_logo.png"
            alt="University Logo"
            style={{ height: "70px", objectFit: "contain" }}
          />
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            fontStyle: "italic",
            color: "#1f8f7e",
            mb: 2,
          }}
        >
          Medical Examiner’s Report
        </Typography>
      </Box>

      <Paper
        elevation={5}
        sx={{
          p: 4,
          borderRadius: 4,
          bgcolor: "#ffffff",
          boxShadow: "0px 6px 20px rgba(31, 143, 126, 0.15)",
          transition: "0.3s",
          "&:hover": {
            boxShadow: "0px 8px 25px rgba(31, 143, 126, 0.25)",
          },
        }}
      >
        <Box component="form" onSubmit={handleSubmit}>
          {/* Candidate Info */}
          <Typography variant="h6" sx={{ color: "#1f8f7e", mb: 2 }}>
            Candidate Information
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <TextField label="Name of Candidate" name="name" onChange={handleChange} fullWidth />
              <TextField label="Permanent Address" name="address" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
              <TextField label="Faculty" name="faculty" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
              <TextField label="Course of Study" name="course" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
              <TextField label="Registration Number" name="regNumber" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
              {/*  Date of Birth field */}
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Date of Birth"
                  value={form.dob}
                  onChange={handleDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      margin: "normal",
                      sx: { mt: 2 },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          {/* image */}
            <Grid item xs={12} sx={{ mt: 4 }} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
              <Avatar src={photo} sx={{ width: 120, height: 150, mb: 2, borderRadius: 2, border: "2px solid #1f8f7e" }} variant="rounded" />
              <Button variant="contained" component="label" size="small" sx={{ bgcolor: "#1f8f7e", "&:hover": { bgcolor: "#167366" }, borderRadius: 2 }}>
                Upload Photo
                <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
              </Button>
            </Grid>
        

          <Divider sx={{ my: 4 }} />

          {/* Physical Details */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Physical Details</Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}><TextField label="Weight (kg)" name="weight" onChange={handleChange} fullWidth /></Grid>
            <Grid item xs={12} sm={4}><TextField label="Height (cm)" name="height" onChange={handleChange} fullWidth /></Grid>
            </Grid>
            <Grid item xs={12} sx={{ mt: 2 }}>
              <TextField select label="Blood Group" name="bloodGroup" onChange={handleChange} fullWidth>
                {[
                  "A positive (A+)", "A negative (A-)",
                  "B positive (B+)", "B negative (B-)",
                  "AB positive (AB+)", "AB negative (AB-)",
                  "O positive (O+)", "O negative (O-)"
                ].map((group) => (<MenuItem key={group} value={group}>{group}</MenuItem>))}
              </TextField>
            </Grid>

          <Divider sx={{ my: 4 }} />

          {/* Condition of Teeth, Gums, Throat */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Condition of Teeth, Gums, Throat & Nasal Passages</Typography>
          <Typography sx={{ mt: 1 }}>Are gums and teeth healthy?</Typography>
          <RadioGroup row name="teethHealthy" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Divider sx={{ my: 4 }} />

          {/* Heart Examination */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Examination of Heart</Typography>
          <Typography sx={{ mt: 1 }}>Past history of heart disease or Rheumatic fever?</Typography>
          <RadioGroup row name="heartDisease" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Typography sx={{ mt: 1 }}>Cardiac enlargement?</Typography>
          <RadioGroup row name="CardiacEnlargement" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Typography sx={{ mt: 1 }}>Unusual heart sounds?</Typography>
          <RadioGroup row name="HeartSounds" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <TextField label="Blood Pressure (mmHg)" name="bp" onChange={handleChange} fullWidth sx={{ mt: 2 }} />

          <Divider sx={{ my: 4 }} />

          {/* Lungs */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Examination of Lungs</Typography>
          <Typography sx={{ mt: 1 }}>History of Tuberculosis, Bronchitis, or Asthma?</Typography>
          <RadioGroup row name="lungsHistory" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <Typography sx={{ mt: 1 }}>Any abnormalities in lungs?</Typography>
          <RadioGroup row name="lungsAbnormalities" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Divider sx={{ my: 4 }} />

          {/* Abdomen */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Examination of Abdomen</Typography>
          {[
            ["EnlargementOfLiverSpleen", "Evidence of enlargement of liver or spleen?"],
            ["HistoryOfPepticUlcer", "Past history of peptic ulcers?"],
            ["kidneysPalpable", "Are kidneys palpable?"],
            ["otherAbnormalities", "Any other abnormalities?"],
          ].map(([name, label]) => (
            <Box key={name} sx={{ mt: 1 }}>
              <Typography>{label}</Typography>
              <RadioGroup row name={name} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          ))}

          <Divider sx={{ my: 4 }} />

          {/* Nervous System */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Examination of the Nervous System</Typography>
          {[
            ["HistoryOfConvulsions", "Any history of convulsions or insanity?"],
            ["HistoryOfPoliomyelitis", "Any past history of poliomyelitis?"],
          ].map(([name, label]) => (
            <Box key={name} sx={{ mt: 1 }}>
              <Typography>{label}</Typography>
              <RadioGroup row name={name} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          ))}

          <Divider sx={{ my: 4 }} />

          {/* Vision */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Examination of Vision</Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}><TextField label="Vision without Glass - Right" name="visionR" onChange={handleChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Vision without Glass - Left" name="visionL" onChange={handleChange} fullWidth /></Grid>
          </Grid> 
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}><TextField label="Vision with Glass - Right" name="visionWR" onChange={handleChange} fullWidth /></Grid>
            <Grid item xs={6}><TextField label="Vision with Glass - Left" name="visionWL" onChange={handleChange} fullWidth /></Grid>
          </Grid>
          <TextField select label="Color Vision" name="colorVision" onChange={handleChange} fullWidth sx={{ mt: 2 }}>
            <MenuItem value="normal">Normal</MenuItem>
            <MenuItem value="RGColorBlindness">Red-green color blindness</MenuItem>
            <MenuItem value="BYColorBlindness">Blue-yellow color blindness</MenuItem>
            <MenuItem value="TColorBlindness">Total color blindness</MenuItem>
          </TextField>

          <Divider sx={{ my: 4 }} />

          {/* Hearing */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Examination of Hearing</Typography>
          {[
            ["HearingDefectPresent", "Have any hearing defects at present?"],
            ["HearingDefectPast", "Past history of discharge from the ear?"],
          ].map(([name, label]) => (
            <Box key={name} sx={{ mt: 1 }}>
              <Typography>{label}</Typography>
              <RadioGroup row name={name} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Box>
          ))}

          <Divider sx={{ my: 4 }} />

          {/* Speech */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Examination of Speech</Typography>
          <Typography sx={{ mt: 1 }}>Have any speech defects?</Typography>
          <RadioGroup row name="SpeechDefect" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Divider sx={{ my: 4 }} />

          {/* Operations & Other Details */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Operations & Other Details</Typography>
          <Typography sx={{ mt: 1 }}>Any operations or accidents?</Typography>
          <RadioGroup row name="Operation" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
          <TextField label="If yes, give a short description" name="Operations" onChange={handleChange} fullWidth sx={{ mt: 1 }} />

          <Typography sx={{ mt: 2 }}>Any deformities (congenital/acquired)?</Typography>
          <RadioGroup row name="Deformities" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Typography sx={{ mt: 2 }}>Any hernia, hydrocele, varicose veins, or hemorrhoids?</Typography>
          <RadioGroup row name="EvidenceOfHernia" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Typography sx={{ mt: 2 }}>How is your immunity?</Typography>
          <RadioGroup row name="Immunity" onChange={handleChange}>
            <FormControlLabel value="good" control={<Radio />} label="Good" />
            <FormControlLabel value="bad" control={<Radio />} label="Bad" />
          </RadioGroup>

          <Divider sx={{ my: 4 }} />

          {/* Chest X-ray */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Chest X-ray / Mantoux (If Indicated)</Typography>
          <Typography sx={{ mt: 2 }}>Chest X-ray (if indicated)</Typography>
          <RadioGroup row name="Xray" onChange={handleChange}>
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>

          <Divider sx={{ my: 4 }} />

          {/* Remarks */}
          <Typography variant="h6" sx={{ color: "#1f8f7e" }}>Other Physical Defects</Typography>
          <TextField
            label="Any other physical defect or disease (Reg. 89)?"
            name="remarks"
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
            sx={{ mt: 2 }}
          />
          {/* submit */}
          <Box textAlign="center" sx={{ mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                bgcolor: "#1f8f7e",
                px: 5,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                borderRadius: 3,
                "&:hover": { bgcolor: "#167366", transform: "scale(1.03)" },
                transition: "0.3s",
              }}
            >
              Submit Report
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default RegistrationForm;
