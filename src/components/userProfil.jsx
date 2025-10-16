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
      {/* Header Section with Logo */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 2,
          flexDirection: "column",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img
            src="/medicare_logo.png"
            alt="University Logo"
            style={{
              height: "70px",
              objectFit: "contain",
              marginRight: "15px",
            }}
          />
        </Box>
        <Typography
          variant="h6"
          align="center"
          sx={{ mt: 1, fontStyle: "italic", color: "text" }}
        >
          Medical Examiner’s Report
        </Typography>
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ mt: 3, p: 4, borderRadius: 5, boxShadow: 3, bgcolor: "white" }}
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
        <Typography variant="h6" sx={{ mt: 4 }}>Condition of Teeth, Gums, Throat, and Nasal Passages</Typography>
        <Typography sx={{ mt: 1 }}>Are gums and teeth healthy ?
        <RadioGroup row name="teethHealthy" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        </Typography>

        {/* Heart Examination */}
        <Typography variant="h6" sx={{ mt: 4 }}>Examination of Heart </Typography>
        <Typography sx={{ mt: 1 }}>Past history of heart disease or Rheumatic fever ?</Typography>
        <RadioGroup row name="heartDisease" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        <Typography  sx={{ mt: 1 }}>Do you have any cardiac enlargement in the heart ?</Typography>
        <RadioGroup row name="CardiacEnlargement" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        <Typography  sx={{ mt: 1 }}>Do you hear a strange sound when your heart beats ?</Typography>
        <RadioGroup row name="HeartSounds" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={6}><TextField label="Blood Pressure  (mmHg)" name="bp" onChange={handleChange} fullWidth /></Grid>
        </Grid>

        {/* Lungs Examination */}
        <Typography variant="h6" sx={{ mt: 5 }}>Examination of Lungs </Typography>
        <Typography sx={{ mt: 1 }}>History of Tuberculosis, Bronchitis or Asthma ?</Typography>
        <RadioGroup row name="lungsHistory" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        <Typography sx={{ mt: 1 }}>Has any abnormality been found clinically in the lungs ?</Typography>
        <RadioGroup row name="lungsAbnormalities" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        {/* Abdomen */}
        <Typography variant="h6" sx={{ mt: 4 }}>Examination of Abdomen </Typography>
        <Typography sx={{ mt: 1 }}>Is there any evidence of enlargement of the liver or spleen ?</Typography>
        <RadioGroup row name="EnlargementOfLiverSpleen" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

         <Typography sx={{ mt: 1 }}>Do you have any past history of peptic ulcers ?</Typography>
        <RadioGroup row name="HistoryOfPepticUlcer" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

         <Typography sx={{ mt: 1 }}>Are the kidneys palpable ?</Typography>
        <RadioGroup row name="kidneysPalpable" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

         <Typography sx={{ mt: 1 }}>Are there any other abnormalities ?</Typography>
        <RadioGroup row name="otherAbnormalities" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

        {/* Nervous System */}
        <Typography variant="h6" sx={{ mt: 4 }}>Examination of the Nervous System</Typography>
        <Typography sx={{ mt: 1 }}>Any history of convulsions or insanity?</Typography>
        <RadioGroup row name="HistoryOfConvulsions" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>

         <Typography sx={{ mt: 1 }}>Any past history of poliomyelitis?</Typography>
        <RadioGroup row name="HistoryOfPoliomyelitis" onChange={handleChange}>
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
        
         {/* Vision */}
         <Typography variant="h6" sx={{ mt: 4 }}>Examination of the Vision</Typography>
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
              <MenuItem value="RGColorBlindness">Red-green color blindness</MenuItem>
              <MenuItem value="BYColorBlindness">Blue-yellow color blindness</MenuItem>
              <MenuItem value="TColorBlindness">Total color blindness (achromatopsia)</MenuItem>
            </TextField>
          </Grid>
        {/* Hearing  */}
        <Typography variant="h6" sx={{ mt: 4 }}>Examination of the Hearing</Typography>
        <TextField label="Hearing Defects / Ear Discharge" name="hearing" onChange={handleChange} fullWidth sx={{ mt: 2 }} />
        {/* speech  */}
        <Typography variant="h6" sx={{ mt: 4 }}>Examination of the Speech</Typography>
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
