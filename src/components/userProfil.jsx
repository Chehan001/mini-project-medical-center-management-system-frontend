import React, { useState } from "react";
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
  FormGroup,
  Checkbox,
  MenuItem,
} from "@mui/material";

const UserProfil = () => {
  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) setPhoto(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Medical Examiner’s Report Submitted Successfully!");
  };

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        Sabaragamuwa University of Sri Lanka
      </Typography>
      <Typography variant="h6" align="center" gutterBottom>
        Medical Examiner’s Report
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, p: 3, borderRadius: 3, boxShadow: 3, bgcolor: "white" }}
      >
        {/* Candidate Info */}
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8}>
            <TextField label="Name of Candidate" name="name" onChange={handleChange} fullWidth />
            <TextField label="Permanent Address" name="address" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
            <TextField label="Faculty" name="faculty" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
            <TextField label="Course of Study" name="course" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
            <TextField label="Registration Number" name="regNumber" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
          </Grid>
          <Grid item xs={12} sm={4} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Avatar src={photo} sx={{ width: 120, height: 150, mb: 2, borderRadius: 2 }} variant="rounded" />
            <Button variant="contained" component="label" size="small">
              Upload Photo
              <input type="file" hidden accept="image/*" onChange={handlePhotoUpload} />
            </Button>
          </Grid>
        </Grid>

        {/* Physical Details */}
        <Typography variant="h6" sx={{ mt: 4 }}>Physical Details</Typography>
        <Grid container spacing={2} sx={{ mt: 2}}>
          <Grid item xs={12} sm={4}><TextField label="Weight (kg)" name="weight" onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={12} sm={4}><TextField label="Height (cm)" name="height" onChange={handleChange} fullWidth /></Grid>
        </Grid>
        <Grid item xs={12} sm={4} sx={{ mt:2 }}  >
            <TextField
              select
              label="Blood Group"
              name="bloodGroup"
              onChange={handleChange}
              fullWidth
            >
              {[
                "A positive (A+)",
                "A negative (A-)",
                "B positive (B+)",
                "B negative (B-)",
                "AB positive (AB+)",
                "AB negative (AB-)",
                "O positive (O+)",
                "O negative (O-)"
              ].map((group) => (
                <MenuItem key={group} value={group}>{group}</MenuItem>
              ))}
            </TextField>
          </Grid>

        {/* Teeth & Gums */}
        <Typography variant="h6" sx={{ mt: 4 }}>Teeth, Gums, Throat & Nasal Passages</Typography>
        <Typography>Are gums and teeth healthy?
        <RadioGroup row name="teethHealthy" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup></Typography>
        <TextField label="State of tongue, fauces, nasal passages" name="throat" onChange={handleChange} fullWidth sx={{ mt: 1 }} />

        {/* Heart Examination */}
        <Typography variant="h6" sx={{ mt: 4 }}>Heart Examination</Typography>
        <Typography>Past history of heart disease or rheumatic fever?</Typography>
        <RadioGroup row name="heartDisease" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}><TextField label="Cardiac enlargement?" name="cardiac" onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Heart Sounds" name="heartSounds" onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Murmurs" name="murmurs" onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Blood Pressure" name="bp" onChange={handleChange} fullWidth /></Grid>
        </Grid>

        {/* Lungs Examination */}
        <Typography variant="h6" sx={{ mt: 4 }}>Lungs Examination</Typography>
        <Typography>History of Tuberculosis, Bronchitis or Asthma?</Typography>
        <RadioGroup row name="lungsHistory" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        <TextField label="Any abnormalities?" name="lungsAbnormalities" onChange={handleChange} fullWidth sx={{ mt: 1 }} />

        {/* Abdomen */}
        <Typography variant="h6" sx={{ mt: 4 }}>Abdomen Examination</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Enlargement of liver or spleen" />
          <FormControlLabel control={<Checkbox />} label="History of peptic ulcer" />
          <FormControlLabel control={<Checkbox />} label="Kidneys palpable" />
        </FormGroup>
        <TextField label="Other abnormalities" name="abdomenOther" onChange={handleChange} fullWidth sx={{ mt: 1 }} />

        {/* Nervous System & Vision */}
        <Typography variant="h6" sx={{ mt: 4 }}>Nervous System & Vision</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="History of convulsions or insanity" />
          <FormControlLabel control={<Checkbox />} label="History of poliomyelitis" />
        </FormGroup>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}><TextField label="Vision without Glass - Right" name="visionR" onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Vision without Glass - Left" name="visionL" onChange={handleChange} fullWidth /></Grid>
        </Grid>
         <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}><TextField label="Vision with Glass - Right" name="visionWR" onChange={handleChange} fullWidth /></Grid>
          <Grid item xs={6}><TextField label="Vision with Glass - Left" name="visionWL" onChange={handleChange} fullWidth /></Grid>
        </Grid>
        <Grid item xs={12} sx={{ mt: 2 }}>
            <TextField select label="Color Vision" name="colorVision" onChange={handleChange} fullWidth>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="defective">Defective</MenuItem>
            </TextField>
          </Grid>
        
        <TextField label="Hearing Defects / Ear Discharge" name="hearing" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        <TextField label="Speech" name="speech" onChange={handleChange} fullWidth sx={{ mt: 2 }} />

        {/* Operations & Other Details */}
        <Typography variant="h6" sx={{ mt: 4 }}>Operations & Other Details</Typography>
        <FormGroup>
          <FormControlLabel control={<Checkbox />} label="Any operations or accidents" />
          <FormControlLabel control={<Checkbox />} label="Congenital or acquired deformities" />
          <FormControlLabel control={<Checkbox />} label="Evidence of hernia, hydrocele, varicose veins or hemorrhoids" />
        </FormGroup>
        <TextField label="Immunisations" name="immunisations" onChange={handleChange} fullWidth sx={{ mt: 2 }} />

        {/* Chest X-ray */}
        <Typography variant="h6" sx={{ mt: 4 }}>Chest X-ray / Mantoux (If Indicated)</Typography>
        <TextField label="Notes" name="chestXray" onChange={handleChange} fullWidth />

        {/* Remarks */}
        <Typography variant="h6" sx={{ mt: 4 }}>Other Physical Defects (Reg. 89)</Typography>
        <TextField label="Remarks" name="remarks" onChange={handleChange} fullWidth multiline rows={2} />

        <Box textAlign="center" sx={{ mt: 4 }}>
          <Button type="submit" variant="contained" color="primary" size="large">Submit Report</Button>
        </Box>
      </Box>
    </Container>
  );
};
export default UserProfil;
