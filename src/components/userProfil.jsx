// src/components/PersonalData.jsx
import React from 'react';
import { Container, Typography } from '@mui/material';

const PersonalData = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Personal Data
      </Typography>
      <Typography variant="body1">
        Welcome! You have successfully logged in.
      </Typography>
    </Container>
  );
};

export default PersonalData;
